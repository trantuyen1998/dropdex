import { FC, memo } from 'react';
import TraddingView from './TraddingView';

interface IProp {
  symbol: string;
  contractAddress?: string;
  pairAddress?: string;
}
const Chart = ({ symbol }: IProp) => {
  return <TraddingView symbol={symbol}></TraddingView>;
};
export default Chart;
