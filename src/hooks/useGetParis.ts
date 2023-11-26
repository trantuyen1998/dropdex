import { AxiosResponse } from 'axios';
import { PairResponse, Pairs, QueryPair } from 'models/Pairs';
import { useHomeStore } from 'pages/Home/store/useHomeStore';
import { useQuery } from 'react-query';
import fetchAPI from 'utils/fetchAPI';
import queryString from 'query-string';
import { useEffect, useState } from 'react';

function fetchGetPairs(query: QueryPair) {
  const parseQuery = queryString.stringify(query, { arrayFormat: 'comma' });
  console.log('query', parseQuery);
  return fetchAPI.request({
    url: '/v1/pairs?' + parseQuery,
    method: 'get',
  });
}

export function useGetPairs(filter: any) {
  const [queryPair, setQueryPair] = useState<QueryPair>({
    // chains: ['Terra Classic', 'Terra 2.0', 'Juno', 'Near', 'Osmosis', 'Kujira'],
    chains: ['Juno', 'Osmosis'],
    filterBy: 'all',
    verified: true,
    tab: 'top',
    sortBy: 'mcap',
    sortDir: 'asc',
    offset: 0,
    limit: 24,
  });

  useEffect(() => {
    setQueryPair((prev) => ({ ...prev, ...filter }));
  }, [filter]);

  return useQuery(['pairs', queryPair], () => fetchGetPairs(queryPair), {
    enabled: !!queryPair.tab,
    refetchOnWindowFocus: false,
    retry: 1,
    onSuccess: (data: PairResponse) => {
      return data;
    },
    select(data: AxiosResponse<PairResponse>) {
      return data.data;
    },
  });
}
