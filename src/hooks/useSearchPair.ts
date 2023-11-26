import { AxiosResponse } from 'axios';
import { PairResponse, Pairs, QueryPair } from 'models/Pairs';
import { useHomeStore } from 'pages/Home/store/useHomeStore';
import { useQuery } from 'react-query';
import fetchAPI from 'utils/fetchAPI';
import queryString from 'query-string';
import { useEffect, useState } from 'react';

function fetchGetSearchPairs(query: QueryPair) {
  const parseQuery = queryString.stringify(query, { arrayFormat: 'comma' });
  return fetchAPI.request({
    url: '/v1/pairs?' + parseQuery,
    method: 'get',
  });
}

export function useSearchPairs(filter: any) {
  const [queryPair, setQueryPair] = useState<QueryPair>({
    // chains: ['Terra Classic', 'Terra 2.0', 'Juno', 'Near', 'Osmosis', 'Kujira'],
    chains: ['Juno', 'Osmosis'],
    limit: 100,
    search: '',
  });

  useEffect(() => {
    setQueryPair((prev) => ({ ...prev, ...filter }));
  }, [filter]);

  return useQuery(['seachPairs', queryPair], () => fetchGetSearchPairs(queryPair), {
    // refetchOnWindowFocus: false,
    // retry: 1,
    onSuccess: (data: PairResponse) => {
      return data;
    },
    select(data: AxiosResponse<PairResponse>) {
      return data.data;
    },
  });
}
