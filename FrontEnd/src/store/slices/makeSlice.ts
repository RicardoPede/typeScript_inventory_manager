import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Make {
    _id: string;
    name: string;
}

interface MakeState {
    makes: Make[];
    loading: boolean;
    error: string | null;
}

const initialState: MakeState = {
    makes: [],
    loading: false,
    error: null,
};

export const fetchMakes = createAsyncThunk('make/fetchMakes', async () => {
    const response = await axios.get('http://localhost:4000/api/make');
    return response.data;
});

export const deleteMake = createAsyncThunk('make/deleteMake', async (id: string) => {
    await axios.delete(`http://localhost:4000/api/make/${id}`);
    return id;
});

const makeSlice = createSlice({
    name: 'make',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMakes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMakes.fulfilled, (state, action: PayloadAction<Make[]>) => {
                state.makes = action.payload;
                state.loading = false;
            })
            .addCase(fetchMakes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch makes';
            })
            .addCase(deleteMake.fulfilled, (state, action) => {
                state.makes = state.makes.filter(make => make._id !== action.payload);
            });
    },
});

export default makeSlice.reducer;