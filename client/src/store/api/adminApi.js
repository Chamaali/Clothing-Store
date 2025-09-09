import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const adminAPI = createApi({
    reducerPath: 'admin-api-reducer',
    tagTypes: ['data'],
    baseQuery: fetchBaseQuery({baseUrl:'https://clothing-store-api.vercel.app/' ,credentials: 'include'} ),
    endpoints: builder => ({
        getByCategory: builder.query({
            query:(category)=>({
                url: `/get_byCategory/${category}`,
                method: 'get',
            }),
            providesTags: (result, err, arg) =>{
                return [{type:'data', id:arg}, {type:'data', id:'CloathCat'}]
            }
        }),

        deleteById: builder.mutation({
            query:(id)=>({
                url:`/delete_cloth/${id}`,
                method:'delete'
            }),
            invalidatesTags: (result, err, arg)=>{
                return [{type:'data', id:arg}, {type:'data', id:'CloathCat'}]
            }
        }),

        addCloth: builder.mutation({
            query:(body)=>({
                url:'/add_cloth',
                method: 'post',
                body
            }),
            invalidatesTags: (result, err, arg)=>{
                return [{type:'data', id:'CloathCat'}]
            }
        }),

        getById: builder.query({
            query:(id)=>({
                url: `/get_byId/${id}`,
                method: 'get'
            }),
            providesTags:(result, err, arg) => {
                return [{type: 'data', id: arg}]
            }
        }),

        updateById: builder.mutation({
            query:(data)=>({
                url: `/update_cloth/${data.id}`,
                method: 'put',
                body: data.body
            }),
            invalidatesTags:(result, err, arg)=>{
                return [{type: 'data', id: arg.id}, {type:'data', id:'CloathCat'}]
            }
        })
    })
})

export const { useGetByCategoryQuery, useDeleteByIdMutation, useAddClothMutation, useGetByIdQuery, useUpdateByIdMutation } = adminAPI
export default adminAPI