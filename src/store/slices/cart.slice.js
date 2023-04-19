import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import  getConfig from "../../helpers/getConfig";

export const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        setCartItems: (state, action) => {
            return action.payload;
        },
    }
});
const token = localStorage.getItem("token")
export const getCartItemsThunk = () => (dispatch) => {
    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/cart', getConfig())
    .then((res) => {
        dispatch(setCartItems(res?.data))
    })
    .catch(error=>{
        if(token){
            console.log("State 200")
        } else if(token === null) {
            console.log("State 403, However, you just have to log in to solve it. :)")
        } else {
            console.log(error)
        }
    })
}
export const addCartItemThunk = (data) => (dispatch) => {
    axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/cart', data, getConfig())
    .then((res) => {
        dispatch(getCartItemsThunk())
    })
    .catch((error) => {
        console.log(error)
    })
}

export const deleteCartItemThunk = (id) => (dispatch) => {
    axios.delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, getConfig())
    .then((res) => {
        dispatch(getCartItemsThunk())
    })
    .catch((error) => {
        console.log(error)
    })
}

export const updateCartItemThunk = (id, data) => (dispatch) => {
    axios.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, data, getConfig())
    .then((res) => {
        dispatch(getCartItemsThunk())
    })
    .catch((error) => {
        console.log(error)
    })
}

export const cartCheckoutThunk = () => (dispatch) => {
    axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', {} , getConfig())
    .then((res) => {
        dispatch(getCartItemsThunk())
    })
    .catch((error) => {
        console.log(error)
    })
}



export const { setCartItems } = cartSlice.actions;

export default cartSlice.reducer;