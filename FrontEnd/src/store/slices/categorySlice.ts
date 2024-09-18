import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Category {
    _id: string;
    name: string;
    description: string;
}

interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
};

export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
    const response = await axios.get('http://localhost:4000/api/categories');
    return response.data;
});

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id: string) => {
    await axios.delete(`http://localhost:4000/api/categories/${id}`);
    return id;
});

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.categories = action.payload;
                state.loading = false;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch categories';
            })
            .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<string>) => {
                state.categories = state.categories.filter(category => category._id !== action.payload);
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to delete category';
            });
    },
});

export default categorySlice.reducer;