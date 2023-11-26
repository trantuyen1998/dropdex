import { PairResponse, Pairs } from 'models/Pairs';
import create from 'zustand';

interface PairState {
  tabPairs: Pairs[];
  setTabPairs: (data: PairResponse) => void;
  next?: number;
  total: number;
}

const initialState: Pick<PairState, 'tabPairs' | 'next' | 'total'> = {
  tabPairs: [],
  total: 0,
  next: 0,
};

export const usePairStore = create<PairState>((set) => ({
  ...initialState,
  setTabPairs: (data: PairResponse) => {
    return set((state) => ({
      ...state,
      tabPairs: data?.pairs ?? [],
      next: data?.next,
      total: data.total,
    }));
  },
}));
