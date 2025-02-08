import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { Product } from "../types/product";

// base url will be dynamic depending on the environment
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  currentProduct: Product | null;
  formData: Omit<Product, "id">;
  setFormData: (formData: Omit<Product, "id">) => void;
  resetForm: () => void;
  addProduct: (e: React.FormEvent) => Promise<void>;
  fetchProducts: () => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  fetchProduct: (id: string) => Promise<void>;
  updateProduct: (id: string) => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct: null,
  formData: {
    name: "",
    price: 0,
    image: "",
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: 0, image: "" } }),

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Product added successfully");
      (
        document.getElementById("add_product_modal") as HTMLDialogElement
      )?.close();
    } catch (error) {
      console.error("Error in addProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data, error: null });
    } catch (err: unknown) {
      set({
        error:
          err instanceof Error && "status" in err && err.status === 429
            ? "Rate limit exceeded"
            : "Something went wrong",
        products: [],
      });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    console.log("deleteProduct function called", id);
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error in deleteProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({
        currentProduct: response.data.data,
        formData: response.data.data,
        error: null,
      });
    } catch (error) {
      console.error("Error in fetchProduct function", error);
      set({ error: "Something went wrong", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await axios.put(
        `${BASE_URL}/api/products/${id}`,
        formData
      );
      set({ currentProduct: response.data.data });
      toast.success("Product updated successfully");
    } catch (error) {
      console.error("Error in updateProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },
}));
