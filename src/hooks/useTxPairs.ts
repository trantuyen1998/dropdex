import { AxiosResponse } from 'axios';
import { PairResponse, QueryPair } from 'models/Pairs';
import { useQuery } from 'react-query';
import fetchAPI from 'utils/fetchAPI';

function fetchTxPairs(query: QueryPair, address, pair_id) {
  return fetchAPI.request({
    url: `/p1/eth/pools/${address}/swaps?include=from_token,to_token&pair_id=${pair_id}&page[after]=1701381716`,
    method: 'get',
  });
}

export function useTxPairs(filter: any, address, pair_id) {
  return useQuery(['txPairs', filter], () => fetchTxPairs(filter, address, pair_id), {
    retry: 1,
    onSuccess: (data: any) => {
      return data;
    },
    select(data: AxiosResponse<any>) {
      return data.data;
    },
  });
}
