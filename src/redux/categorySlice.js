import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { options } from "../utils/Fetch";
import axios from "axios";
import sampleVideos from "../utils/sampleVideos";
const base_url = "https://youtube-v31.p.rapidapi.com";

const initialState = {
  selectedCategory: "Home",
  categoryVideos: sampleVideos,
  isLoading: false,
  sidebarExtend: false,
  feedError: null,
  usingSampleVideos: true,
};
export const getCategoryVideos = createAsyncThunk(
  "redux/categorySlice",
  async (url, { rejectWithValue }) => {
    if (!process.env.REACT_APP_SECRET_KEY) {
      return { items: sampleVideos, usingSampleVideos: true };
    }

    try {
      const { data } = await axios.get(`${base_url}/${url}`, options);
      return {
        items: data.items?.length ? data.items : sampleVideos,
        usingSampleVideos: !data.items?.length,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Unable to load videos."
      );
    }
  }
);
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectedCategory: (state, { payload }) => {
      state.selectedCategory = payload;
    },
    setSidebarExtendedValue: (state, { payload }) => {
      state.sidebarExtend = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryVideos.pending, (state, action) => {
        state.isLoading = true;
        state.feedError = null;
      })
      .addCase(getCategoryVideos.fulfilled, (state, { payload }) => {
        state.categoryVideos = payload.items;
        state.usingSampleVideos = payload.usingSampleVideos;
        state.feedError = null;
        state.isLoading = false;
      })
      .addCase(getCategoryVideos.rejected, (state, { payload }) => {
        state.categoryVideos = sampleVideos;
        state.usingSampleVideos = true;
        state.feedError = payload || "Unable to load videos.";
        state.isLoading = false;
      });
  },
});
export const { setSelectedCategory, setSidebarExtendedValue } =
  categorySlice.actions;
export default categorySlice.reducer;
