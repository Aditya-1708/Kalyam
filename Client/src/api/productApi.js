import axios from "axios";

const API_BASE =
  import.meta.env.VITE_API_URL;

const productApi = axios.create({
  baseURL: `${API_BASE}/api/v1`,
  withCredentials: true,
});

/**
 * GET ALL PRODUCTS
 */
export const getProducts = (
  params = {}
) => {
  return productApi.get(
    "/products",
    {
      params,
    }
  );
};

/**
 * GET PRODUCT BY ID
 */
export const getProductById = (
  id
) => {
  return productApi.get(
    `/products/${id}`
  );
};

/**
 * CREATE PRODUCT
 *
 * Expected FormData:
 * - name
 * - category
 * - image
 */
export const createProduct = (
  formData
) => {
  return productApi.post(
    "/products",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );
};

/**
 * UPDATE PRODUCT
 *
 * Expected FormData:
 * - name (optional)
 * - category (optional)
 * - image (optional)
 */
export const updateProduct = (
  id,
  formData
) => {
  return productApi.put(
    `/products/${id}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );
};

/**
 * DELETE PRODUCT
 */
export const deleteProduct = (
  id
) => {
  return productApi.delete(
    `/products/${id}`
  );
};

export default productApi;