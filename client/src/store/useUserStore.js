import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      signIn: (userData) => {
        set({ user: userData });
      },
      signOut: () => {
        set({ user: null });
      },
      isLoggedIn: () => {
        return !!get().user;
      },
    }),
    {
      name: "user-storage", 
      getStorage: () => localStorage,
    }
  )
);

export default useUserStore;
