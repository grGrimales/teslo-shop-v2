import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";



interface State {
    cart: CartProduct[];
    getTotalItems: () => number;
    getSummaryInformation: () => {
        subTotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
      };
    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;

    removeProductFromCart: (product: CartProduct) => void;
}


export const useCartStore = create<State>()(

    persist(
        (set, get) => ({

            cart: [],

            // Methods
            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.quantity, 0);
            },

            getSummaryInformation: () => {
                const { cart } = get();
        
                const subTotal = cart.reduce(
                  (subTotal, product) => (product.quantity * product.price) + subTotal,
                  0
                );
                const tax = subTotal * 0.15;
                const total = subTotal + tax;
                const itemsInCart = cart.reduce(
                  (total, item) => total + item.quantity,
                  0
                );
        
                return {
                  subTotal,
                  tax,
                  total,
                  itemsInCart,
                };
              },
            addProductToCart: (product: CartProduct) => {
                console.log(product)
                const { cart } = get();

                //1. Verificar si el producto ya existe en el carrito
                const productInCart = cart.some((p) => p.id === product.id && p.size === product.size);

                if (!productInCart) {
                    set({ cart: [...cart, product] })
                    return;
                }

                //2. Si el producto ya existe por talla, aumentar la cantidad

                const updatedCartProducts = cart.map((p) => {
                    if (p.id === product.id && p.size === product.size) {
                        return {
                            ...p,
                            quantity: p.quantity + product.quantity
                        }
                    }
                    return p;
                })
                set({ cart: updatedCartProducts })
            },

            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();

                const updatedCartProducts = cart.map((p) => {
                    if (p.id === product.id && p.size === product.size) {
                        return {
                            ...p,
                            quantity
                        }
                    }
                    return p;
                })
                set({ cart: updatedCartProducts })
            },
            
            removeProductFromCart: (product: CartProduct) => {
                const { cart } = get();
                const updatedCartProducts = cart.filter((p) => p.id !== product.id || p.size !== product.size);
                set({ cart: updatedCartProducts })
            }

        }),

        {
            name: "shopping-cart",
        }
    )

)