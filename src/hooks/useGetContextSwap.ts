import axios, { AxiosResponse } from 'axios';
import { PageContextResponse, PairResponse, QueryPair, TxResponse } from 'models/Pairs';
import { useSwapStore } from 'pages/Swap/store/useSwapStore';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import ConfigureAxios from 'utils/fetchAPI/fetchApi';
import qs from 'qs';
import fetchAPI from '../utils/fetchAPI';

function fetchGetContextSwap(route?: string) {
  return fetchAPI.request({
    url: '/v1/pairs-swap' + route,
    method: 'get',
  });
  // return axios.request({
  //   url: 'https://coinhall.org' + route + '.pageContext.json',
  //   method: 'get',
  // });
}

export function useGetContextSwap(route?: string) {
  return useQuery('contextSwap', () => fetchGetContextSwap(route), {
    refetchOnWindowFocus: false,
    // retry: 1,
    onSuccess: (data: PageContextResponse) => {
      return data;
    },
    select(data: AxiosResponse<PageContextResponse>) {
      return data.data;
    },
  });
}
