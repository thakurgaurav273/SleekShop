import { create } from "zustand";

export interface ICartItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  quantity: number;
}

interface IStoreState {
  user: any;
  cartItems: ICartItem[];
  addCartItems: (item: ICartItem) => void;
  removeCartItems: (id: string) => void;
  updateLoggedInUser: (user: any) => void;
}

const useSleekStore = create<IStoreState>((set) => ({
  user: null,
  cartItems: [],
  addCartItems: (item: ICartItem) => set((state) => {
    const existingItem = state.cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      return {
        cartItems: state.cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        ),
      };
    }
    return { cartItems: [...state.cartItems, item] };
  }),
  removeCartItems: (id:string) => set((state) => {
    const existingItem = state.cartItems.find((i) => i.id === id);
    if (existingItem && existingItem.quantity >=2) {
      return {
        cartItems: state.cartItems.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    }
    return { cartItems: state.cartItems.filter((item)=> item.id !== id) };
  }),
  updateLoggedInUser: (user: any) => set(() => ({ user })),
}));

export default useSleekStore;
