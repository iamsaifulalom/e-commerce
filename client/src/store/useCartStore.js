import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
    persist(
        (set, get) => ({
            cart: [],
            totalItems: 0,
            totalPrice: 0,
            totalWeight: 0,
            backendCart: [],

            updateTotalQnts: () => {
                const items = get().cart.reduce((acc, item) => acc + item.quantity, 0)
                set({ totalItems: items })
            },

            updataTotalPrice: () => {
                const totalPrice = get().cart.reduce((acc, item) => acc + item.price * item?.quantity, 0)
                set({ totalPrice })
            },

            updataTotalWeight: () => {
                const totalWeight = get().cart.reduce((acc, item) => acc + item.weight * item?.quantity, 0)
                const totalWeightInKg = totalWeight / 1000
                set({ totalWeight: totalWeightInKg })
            },


            mapCartForBackend: () => {
                const cart = get().cart
                    .map(({ _id, size, colour, quantity }) => ({ _id, size, colour, quantity }))
                set({ backendCart: cart })

            },

            addToCart: (item) => {
                const state = get();

                // Check if the exact same product variation (same id, size, and colour) is already in cart
                const isAlreadyAdded = state.cart.find(cartItem =>
                    cartItem._id === item._id &&
                    cartItem.size === item.size &&
                    cartItem.colour === item.colour
                );

                if (!isAlreadyAdded) {
                    set({ cart: [...state.cart, item] });
                } else {
                    // If already in cart with same variation, update quantity
                    const updatedCart = state.cart.map(cartItem =>
                        cartItem._id === item._id &&
                            cartItem.size === item.size &&
                            cartItem.colour === item.colour
                            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                            : cartItem
                    );
                    set({ cart: updatedCart });
                }

                // Update total quantity, price, etc.
                get().updateTotalQnts();
                get().updataTotalPrice();
                get().mapCartForBackend();
                get().updataTotalWeight();
            },



            updateQuantity: (id, qnt) => {
                const updatedCart = get().cart.map((item) =>
                    item._id === id ? { ...item, quantity: qnt } : item
                );
                set({ cart: updatedCart });

                // Update total quantity, price map it for backend
                // updata total weight
                get().updateTotalQnts();
                get().updataTotalPrice();
                get().mapCartForBackend();
                get().updataTotalWeight();
            },

            removeFromCart: (id, size, colour) => {
                const updatedCart = get().cart.filter(item =>
                    !(item._id === id && item.size === size && item.colour === colour)
                );
                set({ cart: updatedCart });


                // Update total quantity, price map it for backend
                // updata total weight
                get().updateTotalQnts();
                get().updataTotalPrice();
                get().mapCartForBackend();
                get().updataTotalWeight();
            },


            clearCart: () => {
                set({ cart: [] });

                // Update total quantity, price map it for backend
                // updata total weight
                get().updateTotalQnts();
                get().updataTotalPrice();
                get().mapCartForBackend();
                get().updataTotalWeight();
            },
        }),
        {
            name: 'cart-storage', // this will be the key in localStorage
            getStorage: () => (typeof window !== 'undefined' ? localStorage : undefined),
        }
    )
);

export default useCartStore;

