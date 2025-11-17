import { create } from "zustand";

export interface ICartItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

interface IStoreState {
  user: any;
  cartItems: ICartItem[];
  addCartItems: (item: ICartItem) => void;
  updateLoggedInUser: (user: any) => void;
}

const useSleekStore = create<IStoreState>((set) => ({
  user: null,
  cartItems: [],
  addCartItems: (item: ICartItem) => set((state) => ({ cartItems: [...state.cartItems, item] })),
  updateLoggedInUser: (user: any) => set(() => ({ user })),
}));

export default useSleekStore;
