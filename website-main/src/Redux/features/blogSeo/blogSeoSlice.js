// src/redux/slices/blogSeoSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createBlogSEO,
  getAllBlogSEOs,
  getBlogSEOById,
  updateBlogSEO,
  deleteBlogSEO,
} from "./blogSeoThunk";

const initialState = {
  seoList: [],
  currentSEO: null,
  loading: false,
  error: null,
  successMessage: null,
};

const blogSeoSlice = createSlice({
  name: "blogSeo",
  initialState,
  reducers: {
    clearBlogSeoMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createBlogSEO.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlogSEO.fulfilled, (state, action) => {
        state.loading = false;
        state.seoList.push(action.payload.seo);
        state.successMessage = action.payload.message;
      })
      .addCase(createBlogSEO.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to create SEO";
      })

      // Get All
      .addCase(getAllBlogSEOs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBlogSEOs.fulfilled, (state, action) => {
        state.loading = false;
        state.seoList = action.payload;
      })
      .addCase(getAllBlogSEOs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch SEO data";
      })

      // Get by ID
      .addCase(getBlogSEOById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlogSEOById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSEO = action.payload;
      })
      .addCase(getBlogSEOById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "SEO not found";
      })

      // Update
      .addCase(updateBlogSEO.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlogSEO.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        const index = state.seoList.findIndex(
          (s) => s._id === action.payload.seo._id
        );
        if (index !== -1) {
          state.seoList[index] = action.payload.seo;
        }
        if (
          state.currentSEO &&
          state.currentSEO._id === action.payload.seo._id
        ) {
          state.currentSEO = action.payload.seo;
        }
      })
      .addCase(updateBlogSEO.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update SEO";
      })

      // Delete
      .addCase(deleteBlogSEO.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBlogSEO.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.seoList = state.seoList.filter(
          (seo) => seo._id !== action.meta.arg
        );
        if (state.currentSEO?._id === action.meta.arg) {
          state.currentSEO = null;
        }
      })
      .addCase(deleteBlogSEO.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to delete SEO";
      });
  },
});

export const { clearBlogSeoMessages } = blogSeoSlice.actions;
export default blogSeoSlice.reducer;
