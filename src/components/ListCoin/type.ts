export interface Params {
  offset: number;
  limit: number;
}
export interface ListCoinProps {
  filterWith?: string;
  isReset?: boolean;
  loading: boolean;
  onChangeFilter?: (params: Params) => void;
}

export interface PairType {
  asset0: {
    name: string;
    symbol: string;
  };
  asset1: {
    name: string;
    symbol: string;
  };
  fee: number;
  avgAPR: number;
  volume24H: number;
  fee24H: number;
  tvl: number;
  poolAmount: number;
  totalSupply: number;
}
