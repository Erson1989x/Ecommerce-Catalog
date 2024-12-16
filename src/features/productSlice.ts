import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, Product } from '../services/productService';

interface ProductState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    error: null,
};

export const loadProducts = createAsyncThunk('product/loadProducts', async () => {
    const products = await fetchProducts();
    return products;
});

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadProducts.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(loadProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to load products';
        })
    }
});

export default productSlice.reducer;
