import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

import { City } from "../../types";

const fetchCity = createAsyncThunk("Time/fetchCity ", async () => {
  const { data } = await axios.get<City[]>("");

  return data;
});

export default fetchCity;
