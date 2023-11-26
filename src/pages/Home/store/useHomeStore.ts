import { PairResponse, Pairs } from 'models/Pairs';
import create from 'zustand';

interface HomeState {
  pairs: Pairs[];
  next?: number;
  total: number;
  trendings: Pairs[];
  setPairs: (data: PairResponse) => void;
  setTrendings: (data: Pairs[]) => void;
}

const initialState: Pick<HomeState, 'pairs' | 'next' | 'total' | 'trendings'> = {
  pairs: [],
  total: 0,
  next: 0,
  trendings: [],
};

export const useHomeStore = create<HomeState>((set) => ({
  ...initialState,
  setPairs: (data: PairResponse) => {
    return set((state) => ({
      ...state,
      pairs: data?.pairs ?? [],
      next: data?.next,
      total: data.total,
    }));
  },
  setTrendings: (data: Pairs[]) => {
    return set((state) => ({
      ...state,
      trendings: data,
    }));
  },
}));
