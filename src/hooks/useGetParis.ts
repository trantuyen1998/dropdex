import { AxiosResponse } from 'axios';
import { PairResponse, QueryPair } from 'models/Pairs';
import { useQuery } from 'react-query';
import fetchAPI from 'utils/fetchAPI';

function fetchGetPairs(query: QueryPair) {
  return fetchAPI.request({
    url: '/p1/eth/pools?include=dex,dex.network,dex.network.network_metric,tokens&include_network_metrics=true',
    method: 'get',
  });
}

export function useGetPairs(filter: any) {
  return useQuery(['pairs', filter], () => fetchGetPairs(filter), {
    retry: 1,
    onSuccess: (data: PairResponse) => {
      return data;
    },
    select(data: AxiosResponse<PairResponse>) {
      return data.data;
    },
  });
}
