import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const userApi = createApi({
    reducerPath: 'user-api-reducer',
    tagTypes: ['data', 'cartData', 'orderData'],
    baseQuery: fetchBaseQuery({baseUrl:'https://clothing-store-api.vercel.app/' ,credentials: 'include'}),
    endpoints: builder => ({
        signupUser : builder.mutation({
            query:(body)=>({
                url:'/signup',
                method: 'post',
                body
            })
        }),

        loginUser: builder.mutation({
            query:({email,password})=>({
                url: '/login',
                method: 'post',
                body:{email, password}
            })
        }),

        getByCategoryUser: builder.query({
            query:(category)=>({
                url: `/get_byCategoryuser/${category}`,
                method: 'get',
            }),
            providesTags: (result, err, arg) =>{
                return [{type:'data', id:arg}, {type:'data', id:'CloathCat'}]
            }
        }),

        getBuCategoryAndType: builder.query({
            query:({category,type})=>({
                url: `/getby_type/${category}/${type}`,
                method: 'get'
            })
        }),

        getCartItems: builder.query({
            query:()=>({
                url: '/cart',
                method: 'get'
            }),
            providesTags:(result, err, arg) =>{
                return [{type:'cartData', id:'userCart'}]
            }
        }),

        addToCart: builder.mutation({
            query:(body)=>({
                url: '/addto_cart',
                method: 'post',
                body
            }),
            invalidatesTags:(result, err, args) =>{
                return [{type:'cartData', id:'userCart'}]
            }
        }),

        removeItem: builder.mutation({
            query:(id)=>({
                url: `/delete_item/${id}`,
                method: 'delete'
            }),
            invalidatesTags:(result, err, args)=>{
                return [{type:'cartData', id:'userCart'}, [{type:'cartData', id:args}]]
            }
        }),

        getUserAddress: builder.query({
            query:()=>({
                url: '/address',
                method: 'get'
            }),
            providesTags:(result, err, arg) =>{
                return [{type:'cartData', id:'userAddress'}]
            }
        }),

        updateAddress: builder.mutation({
            query:(body)=>({
                url: '/update_address',
                method: 'put',
                body
            }), 
            invalidatesTags:(result, err, args)=>{
                return [{type:'cartData', id:'userAddress'}]
            }
        }),

        placeOrder: builder.mutation({
            query:(body)=>({
                url: '/place_order',
                method: 'post',
                body
            }),
            invalidatesTags:(result, err, arg)=>{
                return [{type:'orderData', id:'userOrder'}]
            }
        }),

        getOrderDetails: builder.query({
            query:()=>({
                url: '/order_details',
                method: 'get'
            }),
            providesTags:(result, err, arg) =>{
                return [{type:'orderData', id:'userOrder'}]
            }
        }),

        logoutUser: builder.mutation({
            query:()=>({
                url: '/logout',
                method: 'post'
            }),
            invalidatesTags:(result, err, arg) =>{
                return [{type:'cartData', id:'userCart'}, {type:'cartData', id:'userAddress'}]
            },
        }),
    })
})

export const { useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetByCategoryUserQuery, useGetCartItemsQuery, useAddToCartMutation, useRemoveItemMutation, useGetUserAddressQuery, useUpdateAddressMutation, usePlaceOrderMutation, useGetOrderDetailsQuery, useGetBuCategoryAndTypeQuery } = userApi
export default userApi
