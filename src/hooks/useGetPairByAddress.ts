import { AxiosResponse } from 'axios';
import { PairResponse, QueryPair, TxResponse } from 'models/Pairs';
import { useSwapStore } from 'pages/Swap/store/useSwapStore';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import fetchAPI from 'utils/fetchAPI';

function fetchGetPairsByAddress(pairAddress?: string) {
  return fetchAPI.request({
    url: '/v1/pairs?addresses=' + pairAddress + '&limit=2',
    method: 'get',
  });
}

export function useGetPairByAddress(pairAddress?: string) {
  return useQuery(['addresses'], () => fetchGetPairsByAddress(pairAddress), {
    refetchOnWindowFocus: false,
    // retry: 1,
    onSuccess: (data: PairResponse) => {
      return data;
    },
    select(data: AxiosResponse<PairResponse>) {
      return data.data;
    },
  });
}
