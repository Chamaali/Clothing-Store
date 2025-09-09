import {configureStore} from '@reduxjs/toolkit'
import adminAPI from './api/adminApi'
import userApi from './api/userApi'
import checkoutSliceReducer from './slices/checkoutSlice'
import authSliceReducer from './slices/authSlice'

const store = configureStore({
    reducer:{
        [adminAPI.reducerPath]: adminAPI.reducer, 
        [userApi.reducerPath]: userApi.reducer,
        checkoutSlice: checkoutSliceReducer,
        auth:authSliceReducer
    },
    middleware: getMiddleWare => getMiddleWare().concat(adminAPI.middleware, userApi.middleware)
})

export default store