import { AxiosResponse } from 'axios';
import { PairItem, PairResponse, Pairs } from 'models/Pairs';
import { useHomeStore } from 'pages/Home/store/useHomeStore';
import { useQuery } from 'react-query';
import fetchAPI from 'utils/fetchAPI';
import trendingData from '../utils/dummy/trending.json';

function fetchGetTrendingCoin() {
  return fetchAPI.request({
    url: '/v1/pairs/trending',
    method: 'get',
  });
}

export function useGetTrendingCoin() {
  const { setTrendings } = useHomeStore();
  return useQuery('trendings', fetchGetTrendingCoin, {
    onSuccess: (data: { data: Pairs[] }) => {
      console.log('data', data);
      setTrendings(data.data);
      return data;
    },
  });
}
