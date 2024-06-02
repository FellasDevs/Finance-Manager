import { create } from 'zustand';

type Store = {
  userId: string;
};

export const useUserStore = create<Store>()(() => ({
  userId: '4f1065de-2d7e-4892-a493-99969a64acab',
}));
