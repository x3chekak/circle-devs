import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const itemsApi = createApi({
    reducerPath: 'items',
    tagTypes: ['items'],
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:3001/'}),
    endpoints: (build) => ({
        getItems: build.query({
            query: ({ categoryId }) => `items?categoryId=${categoryId}`,
            providesTags: (result) => result
                ? [
                    ...result.map(({ id }) => ({ type: 'items', id })),
                    { type: 'items', id: 'LIST' }
                    ]
                : [{ type: 'items', id: 'LIST' }],
        }),
        addItem: build.mutation({
            query: (body) => ({
                url: 'items',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'items', id: 'LIST'}]
        }),
        deleteItem: build.mutation({
            query: (id) => ({
                url: `items/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'items', id: 'LIST' }]
        }),

        ///////////////////////////////////////////////////////
        getCategory: build.query({
            query: () => 'categories',
            providesTags: (result) => result
                ? [
                    ...result.map(({ id }) => ({ type: 'categories', id })),
                    { type: 'categories', id: 'LIST' }
                ]
                : [{ type: 'categories', id: 'LIST' }],
        }),
        addCategory: build.mutation({
            query: (body) => ({
                url: 'categories',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'categories', id: 'LIST' }]
        }),
        deleteCategory: build.mutation({
            query: (id) => ({
                url: `categories/${id}?_dependent=items`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'categories', id: 'LIST' }, { type: 'items', id: 'LIST' }]
        })
    })
})

export const {useGetItemsQuery, useAddItemMutation, useDeleteItemMutation,
                useGetCategoryQuery, useAddCategoryMutation, useDeleteCategoryMutation
             } = itemsApi;