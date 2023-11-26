import { AxiosResponse } from 'axios';
import { PairResponse, QueryPair, TxResponse } from 'models/Pairs';
import { useSwapStore } from 'pages/Swap/store/useSwapStore';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import fetchAPI from 'utils/fetchAPI';

export function fetchGetTransactions(pairAddress?: string) {
  return fetchAPI.request({
    url: '/v1/txs/' + pairAddress,
    method: 'get',
  });
}

export function useGetTx(pairAddress?: string) {
  return useQuery(['transactions'], () => fetchGetTransactions(pairAddress), {
    refetchOnWindowFocus: false,
    retry: 1,
    onSuccess: (data: TxResponse) => {
      return data;
    },
    select(data: AxiosResponse<TxResponse>) {
      return data.data;
    },
  });
}
