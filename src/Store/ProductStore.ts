import create, { StateCreator, SetState } from "zustand";
import axios from "axios";
import { persist } from "zustand/middleware";
import { Product } from "../Types/ProductsInterface";

interface ProductStore {
  cartItemsArray: [];
  cart: [];
  products: Product[];
  allProducts: Product[];
  activeFilter: string | null;
  fetchProducts: () => void;
  handleSort: (sort: string) => void;
  handleFilter: (filter: string) => void;
  handleProductDetail: (cartItemsArray: Product) => void;
  handleAddItem: (cartItem: Product) => void;
  handleDeleteItem: (cartItem: Product) => void;
  handleAddToCart: (cartItem: Product) => void;
  handleBuyNow: (cartItem: Product) => void;
  handleRemoveItem: (cartItem: Product) => void;
  handleOnSubmit: (search: string) => void;
  handleOnBlur: () => void;
  handleClearCart: () => void;
  handleHeartClick: (id: number, cartItem: Product) => void;
  // handleRemoveHeartClick: (cartItem: Product) => void;
  handleModalFilter: (modalFilter: string) => void;
  wishlistItemsArray: [];
  purchaseItemArray: [];
  firstName: string;
  lastName: string;
  setFirstName: (name: string) => void;
  setLastName: (name: string) => void;
}

const useProductStore: StateCreator<ProductStore> = (
  items: SetState<ProductStore>,
) => ({
  // persist<ProductStore>(
  cart: [],
  products: [],
  allProducts: [],
  cartItemsArray: [],
  wishlistItemsArray: [],
  purchaseItemArray: [],
  activeFilter: null,
  firstName: "",
  lastName: "",
  setFirstName: (name: string) => {
    items({ firstName: name });
  },
  setLastName: (name: string) => {
    items({ lastName: name });
  },
  fetchProducts: async () => {
    try {
      const response = await axios.get<Product[]>("/products");
      const products = response.data;
      items({ products, allProducts: products });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },
  handleSort: (sort: string) => {
    if (sort === "Price") {
      items((state) => ({
        products: state.products.sort((a, b) => a.price - b.price),
      }));
    } else if (sort === "A - Z") {
      items((state) => ({
        products: state.products.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          } else if (b.name < a.name) {
            return 1;
          } else {
            return 0;
          }
        }),
      }));
    } else {
      items((data) => ({
        products: data.products.sort((a, b) => a.id - b.id),
      }));
    }
  },
  handleModalFilter: (modalFilter: string) => {
    console.log(modalFilter, "modalFilter");
    if (modalFilter === "Furniture") {
      items((state) => ({
        products: state.allProducts.filter(
          (modalProduct) => modalProduct.subCategory === "Furniture",
        ),
      }));
    } else if (modalFilter === "Fashion") {
      items((state) => ({
        products: state.allProducts.filter(
          (modalProduct) => modalProduct.subCategory === "Fashion",
        ),
      }));
    } else if (modalFilter === "Sneakers") {
      items((state) => ({
        products: state.allProducts.filter(
          (modalProduct) => modalProduct.subCategory === "Sneakers",
        ),
      }));
    } else if (modalFilter === "gadgets") {
      items((state) => ({
        products: state.allProducts.filter(
          (modalProduct) => modalProduct.subCategory === "gadgets",
        ),
      }));
    } else if (modalFilter === "Fitness") {
      items((state) => ({
        products: state.allProducts.filter(
          (modalProduct) => modalProduct.subCategory === "Fitness",
        ),
      }));
    } else if (modalFilter === "Education") {
      items((state) => ({
        products: state.allProducts.filter(
          (modalProduct) => modalProduct.subCategory === "Education",
        ),
      }));
    }
  },
  handleFilter: (filter: string) => {
    console.log("I am clicked");
    if (filter === "All Items") {
      items((state) => ({
        products: state.allProducts,
      }));
    } else if (filter === "Gadgets") {
      items((state) => ({
        products: state.allProducts.filter(
          (product) => product.subCategory === "gadgets",
        ),
      }));
    } else if (filter === "Toys") {
      items((state) => ({
        products: state.allProducts.filter(
          (product) => product.subCategory === "Toys",
        ),
      }));
    } else if (filter === "Education") {
      items((state) => ({
        products: state.allProducts.filter(
          (product) => product.subCategory === "Education",
        ),
      }));
    } else if (filter === "Beauty") {
      items((state) => ({
        products: state.allProducts.filter(
          (product) => product.subCategory === "Beauty",
        ),
      }));
    } else if (filter === "Fitness") {
      items((state) => ({
        products: state.allProducts.filter(
          (product) => product.subCategory === "Fitness",
        ),
      }));
    } else if (filter === "Furniture") {
      items((state) => ({
        products: state.allProducts.filter(
          (product) => product.subCategory === "Furniture",
        ),
      }));
    } else if (filter === "Sneakers") {
      items((state) => ({
        products: state.allProducts.filter(
          (product) => product.subCategory === "Sneakers",
        ),
      }));
    } else if (filter === "Fashion") {
      items((state) => ({
        products: state.allProducts.filter(
          (product) => product.subCategory === "Fashion",
        ),
      }));
    } else {
      items((state) => ({
        products: state.allProducts.filter(
          (product) => product.subCategory === filter,
        ),
      }));
    }
  },
  handleProductDetail: (cartItemsArray: Product) => {
    items(() => ({ cart: [cartItemsArray] }));
  },
  handleAddItem: (cartItem: Product) => {
    items((state) => ({
      cartItemsArray: state.cartItemsArray.map((item: Product) =>
        item.id === cartItem.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              price: cartItem.price + cartItem.initialPrice,
            }
          : item,
      ),
      cart: state.cart.map((item: Product) =>
        item.id === cartItem.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              price: cartItem.price + cartItem.initialPrice,
            }
          : item,
      ),
    }));
  },
  handleDeleteItem: (cartItem: Product) => {
    items((state) => ({
      ...state,
      cartItemsArray: state.cartItemsArray.filter(
        (item: Product) => item.id !== cartItem.id,
      ),
    }));
  },
  handleAddToCart: (cartItem: Product) => {
    items((state) => {
      const existingCartItem = state.cartItemsArray.find(
        (item: Product) => item.id === cartItem.id,
      );
      if (existingCartItem) {
        const updatedCartItems = state.cartItemsArray.map((item: Product) =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
        return { ...state, cartItemsArray: updatedCartItems };
      } else {
        return {
          ...state,
          cartItemsArray: [...state.cartItemsArray, cartItem],
        };
      }
    });
  },
  handleBuyNow: (cartItem: Product) => {
    items((state) => {
      const existingCartItem = state.cartItemsArray.find(
        (item: Product) => item.id === cartItem.id,
      );
      if (existingCartItem) {
        const updatedCartItems = state.cartItemsArray.map((item: Product) =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
        return { ...state, cartItemsArray: updatedCartItems };
      } else {
        return {
          ...state,
          cartItemsArray: [...state.cartItemsArray, cartItem],
        };
      }
    });
  },
  handleRemoveItem: (cartItem: Product) => {
    items((data) => ({
      cartItemsArray: data.cartItemsArray.map((item: Product) =>
        item.id === cartItem.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
              price: cartItem.price - cartItem.initialPrice,
            }
          : item,
      ),
      cart: data.cart.map((item: Product) =>
        item.id === cartItem.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
              price: cartItem.price - cartItem.initialPrice,
            }
          : item,
      ),
    }));
  },
  handleOnSubmit: (search: string) => {
    items((state) => {
      const filteredProducts = state.allProducts.filter((item: Product) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
      return {
        ...state,
        products: filteredProducts,
      };
    });
  },
  handleOnBlur: () => {
    items((state) => ({
      ...state,
      products: state.allProducts,
    }));
  },
  handleClearCart: () => {
    items(() => ({ cartItemsArray: [] }));
  },
  handleHeartClick: (id: number, wishlistItem: Product) => {
    items((state) => {
      const existingHeartItem = state.wishlistItemsArray.find(
        (item: Product) => item.id === wishlistItem.id,
      );
      if (existingHeartItem) {
        const updatedHeartItems = state.wishlistItemsArray.map(
          (item: Product) =>
            item.id === wishlistItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
        );
        return { ...state, wishlistItemsArray: updatedHeartItems };
      } else {
        return {
          ...state,
          wishlistItemsArray: [...state.wishlistItemsArray, wishlistItem],
        };
      }
    });

    items((state) => {
      const updatedProducts = state.products.map((product: Product) => {
        if (product.id === id) {
          return {
            ...product,
            isLiked: !product.isLiked,
          };
        }
        return product;
      });

      return { ...state, products: updatedProducts };
    });
  },
});
// {
//   name: "product-store",
//   getStorage: () => localStorage,
// }
// )

export default create(useProductStore);
