import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { City, Status } from "../../types";
import fetchCity from "./asyncAction";

interface TimeSlice {
  city: City[];
  localTime: string;
  activeClocks: { id: number; city: City }[];
  status: Status;
  errorMassage?: string;
}

const initialState: TimeSlice = {
  city: [],
  localTime: new Date().toISOString(),
  activeClocks: [],
  status: Status.LOADING,
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    updateTime(state) {
      state.localTime = new Date().toISOString();
    },
    addClock(state) {
      const newCity = state.city.find(
        (city) => !state.activeClocks.some((clock) => clock.city.id === city.id)
      );
      if (newCity) {
        const newId =
          Math.max(1,...state.activeClocks.map((clock) => clock.id)) + 1;
        state.activeClocks = [
          ...state.activeClocks,
          { city: newCity, id: newId },
        ];
      } else {
        state.status = Status.ERROR;
        state.errorMassage = "FATAL:Нет доступных городов";
      }
    },
    deleteClock(state, action: PayloadAction<{ clockId?: number }>) {
      const lenClocks = state.activeClocks.length;
      const newList = state.activeClocks.filter(
        (clock) => clock.id !== action.payload.clockId
      );
      if (newList.length&&action.payload.clockId&&newList.length + 1 === lenClocks) {
        state.activeClocks = newList;
      } else {
        state.status = Status.ERROR;
        state.errorMassage = "FATAL:Ошибка удаления часов";
      }
    },
    setCity(state, action: PayloadAction<{ city: City; clockId: number }>) {
      const clock = state.activeClocks.find(
        (clock) => clock.id === action.payload.clockId
      );
      if (clock) {
        clock.city=action.payload.city
      } else {
        state.status = Status.ERROR;
        state.errorMassage = "FATAL:Ошибка изменения часов";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCity.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchCity.fulfilled, (state, action) => {
      state.city = action.payload;
      state.activeClocks = [
        { city: action.payload[0], id: 1 },
      ];
      state.status = Status.SUCCESS;
      

    });
    builder.addCase(fetchCity.rejected, (state) => {
      state.status = Status.ERROR;
      state.errorMassage = "FATAL:Ошибка получения городов";
    });
  },
});
export const { updateTime, addClock, setCity,deleteClock } = timeSlice.actions;
export default timeSlice.reducer;
