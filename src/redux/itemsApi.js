import { createApi } from '@reduxjs/toolkit/query/react';
import { db } from './firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, where, writeBatch } from 'firebase/firestore';

export const itemsApi = createApi({
    reducerPath: 'items',
    tagTypes: ['items', 'categories'],
    baseQuery: async (arg, api, extraOptions) => {
        switch (arg.type) {
            case 'getItems':
                let queryRef;
                if (arg.categoryId) {
                    queryRef = query(collection(db, 'items'), where('categoryId', '==', arg.categoryId));
                } else {
                    queryRef = collection(db, 'items');
                }
                const snapshot = await getDocs(queryRef);
                return { data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) };
            case 'addItem':
                console.log(Object.keys(db))
                const addedItemRef = await addDoc(collection(db, 'items'),
                 {
                    title: arg.body.title,
                    categoryId: arg.body.categoryId
                });
                return { data: { id: addedItemRef.id, ...arg.body } };
            case 'deleteItem':
                await deleteDoc(doc(db, 'items', arg.id));
                return { data: true };
            case 'updateItem':
                await updateDoc(doc(db, 'items', arg.id), arg.body);
                return { data: true };
            case 'getCategory':
                const catSnapshot = await getDocs(collection(db, 'categories'));
                return { data: catSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) };
            case 'addCategory':
                const addedCatRef = await addDoc(collection(db, 'categories'), arg.body);
                return { data: { id: addedCatRef.id, ...arg.body } };
            case 'deleteCategory':
                const q = query(collection(db, 'items'), where('categoryId', '==', arg.id));
                const querySnapshot = await getDocs(q);

                // Создаем пакетную операцию
                const batch = writeBatch(db); // <<<<----- Обратите внимание на это изменение!
                querySnapshot.forEach((doc) => {
                    batch.delete(doc.ref);
                });

                // Удаляем саму категорию
                batch.delete(doc(db, 'categories', arg.id));

                // Выполняем пакетную операцию
                await batch.commit();
                return { data: true };
            case 'updateCategory':
                await updateDoc(doc(db, 'categories', arg.id), arg.body);
                return { data: true };
            default:
                throw new Error('Unknown request type');
        }
    },
    endpoints: (build) => ({
        getItems: build.query({
            query: ({ categoryId }) => ({ type: 'getItems', categoryId }),
            providesTags: (result) => result
                ? [
                    ...result.map(({ id }) => ({ type: 'items', id })),
                    { type: 'items', id: 'LIST' }
                ]
                : [{ type: 'items', id: 'LIST' }],
        }),
        addItem: build.mutation({
            query: (body) => ({ type: 'addItem', body }),
            invalidatesTags: [{ type: 'items', id: 'LIST' }],
        }),
        deleteItem: build.mutation({
            query: (id) => ({ type: 'deleteItem', id }),
            invalidatesTags: [{ type: 'items', id: 'LIST' }],
        }),
        updateItem: build.mutation({
            query: ({ id, body }) => ({ type: 'updateItem', id, body }),
            invalidatesTags: [{ type: 'items', id: 'LIST' }],
        }),
        getCategory: build.query({
            query: () => ({ type: 'getCategory' }),
            providesTags: (result) => result
                ? [
                    ...result.map(({ id }) => ({ type: 'categories', id })),
                    { type: 'categories', id: 'LIST' }
                ]
                : [{ type: 'categories', id: 'LIST' }],
        }),
        addCategory: build.mutation({
            query: (body) => ({ type: 'addCategory', body }),
            invalidatesTags: [{ type: 'categories', id: 'LIST' }],
        }),
        deleteCategory: build.mutation({
            query: (id) => ({ type: 'deleteCategory', id }),
            invalidatesTags: [{ type: 'categories', id: 'LIST' }, { type: 'items', id: 'LIST' }],
        }),
        updateCategory: build.mutation({
            query: ({ id, body }) => ({ type: 'updateCategory', id, body }),
            invalidatesTags: [{ type: 'categories', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetItemsQuery,
    useAddItemMutation,
    useDeleteItemMutation,
    useGetCategoryQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useUpdateItemMutation,
} = itemsApi;

             