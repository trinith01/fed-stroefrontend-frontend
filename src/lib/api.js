import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const baseUrl = import.meta.env.VITE_BASE_URL;
// console.log(baseUrl)





export const Api = createApi({
  reducerPath: "Api",
  // baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  baseQuery: fetchBaseQuery({
    //baseUrl: "http://localhost:8000/api/",
    baseUrl: "https://fed-storefront-backend-trinith.onrender.com/api/",
    prepareHeaders: async (headers, { getState }) => {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Product API Endpoints
    getProducts: builder.query({
      query: () => "products",
    }),
    getProductsById: builder.query({
      query: (id) => `products/${id}`,
    }),

    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "products",
        method: "POST",
        body: newProduct,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // Order API Endpoints
    getOrders: builder.query({
      query: (orderId) => "orders",
    }),

    getOrdersByUserId: builder.query({
      query: (userId) => `orders/${userId}`,
    }),
   
    addOrder: builder.mutation({
      query: (newOrder) => ({
        url: "orders",
        method: "POST",
        body: newOrder,
      }),
    }),
    
  createCategory: builder.mutation({
      query: (newCategory) => ({
        url: "categories",
        method: "POST",
        body: newCategory,
      }),
    }),  
    getAllCategories: builder.query({
      query: () => "categories",
    }),
    getCategoryById: builder.query({
      query: (id) => `categories/${id}`,
    }),
    updateCategoryById: builder.mutation({
      query: ({ id, updatedCategory }) => ({
        url: `categories/${id}`,
        method: "PUT",
        body: updatedCategory,
      }),
    }),
    deleteCategoryById: builder.mutation({
      query: (id) => ({
        url: `categories/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export Hooks
export const {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetOrdersQuery,
  useGetOrdersByUserIdQuery,
  useAddOrderMutation,
  useGetProductsByIdQuery,
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryByIdMutation,
  useDeleteCategoryByIdMutation,
  useGetCategoryByIdQuery
} = Api;
