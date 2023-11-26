import { PairResponse, Pairs } from 'models/Pairs';
import create from 'zustand';

interface SearchPairState {
  seachPairs: Pairs[];
  setSearchPairs: (data: PairResponse) => void;
  next?: number;
  total: number;
}

const initialState: Pick<SearchPairState, 'seachPairs' | 'next' | 'total'> = {
  seachPairs: [],
  total: 0,
  next: 0,
};

export const useSearchStore = create<SearchPairState>((set) => ({
  ...initialState,
  setSearchPairs: (data: PairResponse) => {
    return set((state) => ({
      ...state,
      seachPairs: data?.pairs ?? [],
      next: data?.next,
      total: data.total,
    }));
  },
}));
