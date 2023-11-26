export interface InfoCoinItem {
  contractAddress: string;
  icon: string;
  name: string;
  symbol: string;
  timestamp: string;
  totalSupply: number;
  volume7d: number;
  volume24h: number;
  poolAmount: number;
  nativePriceChange24h: number;
  usdMcap: number;
  nativePrice: number;
  usdPrice: number;
}

export interface PairItem {
  pairAddress: string;
}

export interface PairResponse {
  next: number;
  pairs: Pairs[];
  total: number;
}

export interface PairInfoContext {
  baseAsset: InfoCoinItem;
  meta: {
    apr7d: string;
    circSupply: string;
    fdvMcap: string;
    mcap: string;
    totalLiquidity: string;
    totalSupply: string;
    volume24h: string;
  };
  name: string;
  pairAddress: string;
  quoteAsset: InfoCoinItem;
  chain: string;
  dex: string;
}

export interface PageContextResponse {
  pageContext: {
    documentProps: {
      card: string;
      description: string;
      image: string;
      title: string;
    };
    pageProps: {
      pairInfo: {
        baseAsset: InfoCoinItem;
        meta: {
          apr7d: string;
          circSupply: string;
          fdvMcap: string;
          mcap: string;
          totalLiquidity: string;
          totalSupply: string;
          volume24h: string;
        };
        name: string;
        pairAddress: string;
        quoteAsset: InfoCoinItem;
      };
    };
  };
}

export interface Pairs {
  asset0: InfoCoinItem;
  asset1: InfoCoinItem;
  dex: string;
  defaultBase: 'asset0' | 'asset1';
  apr7d: number;
  apr24h: number;
  chain: string;
  pairAddress: string;
  type: string;
  usdLiquidity: number;
  usdVolume7d: number;
  usdVolume24h: number;
}

export type QueryPair = {
  chains?: string[];
  filterBy?: string;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortDir?: string;
  tab?: string;
  verified?: boolean;
  search?: string;
};

export type Tx = {
  isHallswap: boolean;
  offerAmount: string;
  offerAsset: string;
  returnAmount: number;
  returnAsset: string;
  timestamp: string;
  traderAddress: string;
  txHash: string;
};

export type TxResponse = {
  next: number;
  txs: Tx[];
};
