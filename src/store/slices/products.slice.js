import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from './isLoading.slice';

export const productsSlice = createSlice({
    name: "products",
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload;
        },
    }
});

export const getProductsThunk = () => (dispatch)  => {
    dispatch(setIsLoading(true));
    axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/products/")
        .then((res) => {
            dispatch(setProducts(res?.data));
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            dispatch(setIsLoading(false));
        });
};
    
export const filterCategoriesThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
        .then((res) => {
            dispatch(setProducts(res?.data));
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            dispatch(setIsLoading(false));
        });
};

export const filterNameThunk = (inputValue) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${inputValue}`)
        .then((res) => {
            console.log(res?.data)
            dispatch(setProducts(res?.data));
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            dispatch(setIsLoading(false));
        });
};

export const filterPriceThunk = () => (dispatch)  => {
    dispatch(setIsLoading(true));
    axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/products/")
        .then((res) => {
            const products = res?.data;
            const sortedProducts = products.filter((product) => product.price < 300 && product.price >= 500 && product.price <= 1000 && product.price > 1000);
            dispatch(setProducts(sortedProducts));
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            dispatch(setIsLoading(false));
        });
};




export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;



