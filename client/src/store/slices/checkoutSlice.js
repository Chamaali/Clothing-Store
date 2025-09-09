import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items : [],
    subTotal : 0,
    deliveryCharge : 5,
    grandTotal: 0
}
const checkoutSlice = createSlice({
    name: "checkOut",
    initialState,
    reducers:{
        addItem:(state, action) => {
            if(state.items.length === 0){
                console.log(action.payload)
                state.items.push(action.payload)
                state.subTotal = action.payload.map((item) => item.total).reduce((acc, currnt) => acc + currnt, 0)
                state.grandTotal = state.subTotal + state.deliveryCharge
            }
            else{
                state.items.splice(0, 1, action.payload)
                state.subTotal = action.payload.map((item) => item.total).reduce((acc, currnt) => acc + currnt, 0)
                state.grandTotal = state.subTotal + state.deliveryCharge
            } 
        },

        increaseQuantity:(state,action) =>{
            const {itemId} = action.payload
            
            const updateItem = state.items[0].find(item => item._id === itemId)
            if(updateItem){
                updateItem.quantity += 1
                updateItem.total = updateItem.quantity * updateItem.price
                state.subTotal += updateItem.price
                state.grandTotal += updateItem.price
            }
        },

        decreaseQuantity:(state,action) => {
            const {itemId} = action.payload

            const updateItem = state.items[0].find(item => item._id === itemId)
            if(updateItem && updateItem.quantity > 1){
                updateItem.quantity -= 1
                updateItem.total = updateItem.quantity * updateItem.price
                state.subTotal -= updateItem.price
                state.grandTotal -= updateItem.price
            }
        },
    }
})

export default checkoutSlice.reducer
export const {addItem, increaseQuantity, decreaseQuantity, removeItem} = checkoutSlice.actions
export const checkoutSliceSelector = (store) => store.checkoutSlice