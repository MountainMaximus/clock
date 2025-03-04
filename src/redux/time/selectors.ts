import { RootState } from "../store";
import { createSelector } from "@reduxjs/toolkit";

export const getClock = (id: number) => (state: RootState) =>
  state.time.activeClocks.find((clock) => clock.id === id);
export const getClocks = (state: RootState) => state.time.activeClocks;
export const getTime = (state: RootState) => state.time.localTime;
export const getCity = (state: RootState) => state.time.city;

const selectAllCities = (state: RootState) => state.time.city;
const selectInaccessibleCities = (state: RootState) => state.time.activeClocks;
export const getAvailableCities = (id: number) =>
  createSelector(
    [selectAllCities, selectInaccessibleCities],
    (allCities, inaccessibleCities) => {
      return allCities.filter(
        (city) =>
          city.id === id ||
          !inaccessibleCities.some(
            (inaccessibleCity) => inaccessibleCity.city.id === city.id
          )
      );
    }
  );

const selectStatus = (state: RootState) => state.time.status;
const selectMessage = (state: RootState) => state.time.errorMassage;
export const getStatus = createSelector(
  [selectStatus, selectMessage],
  (status, message) => ({ status, message })
);
