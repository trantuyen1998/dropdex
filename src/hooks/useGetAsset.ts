import { AxiosResponse } from 'axios';
import { PairResponse, QueryPair, TxResponse } from 'models/Pairs';
import { useSwapStore } from 'pages/Swap/store/useSwapStore';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import fetchAPI from 'utils/fetchAPI';

export function fetchGetAsset(asset: string) {
  return fetchAPI.request({
    url: '/v1/pairs?assets=' + asset,
    method: 'get',
  });
}

export function useGetAsset(asset: string) {
  return useQuery(['assets'], () => fetchGetAsset(asset), {
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
