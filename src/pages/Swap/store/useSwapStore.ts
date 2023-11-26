import { PairResponse, Pairs, Tx, TxResponse } from 'models/Pairs';
import create from 'zustand';

interface SwapState {
  transactions: Tx[];
  setTransactions: (data: TxResponse) => void;
  next: number;
}

const initialState: Pick<SwapState, 'transactions' | 'next'> = {
  transactions: [],
  next: 0,
};

export const useSwapStore = create<SwapState>((set) => ({
  ...initialState,
  setTransactions: (data: TxResponse) => {
    return set((state) => ({
      ...state,
      txs: data.txs ?? [],
      next: data.next,
    }));
  },
}));
