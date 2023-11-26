import { FC, memo } from 'react';
import TraddingView from './TraddingView';

interface IProp {
  symbol: string;
  contractAddress: string;
  pairAddress: string;
}
const Chart: FC<IProp> = ({ symbol, contractAddress, pairAddress }) => {
  return <TraddingView symbol={symbol} contractAddress={contractAddress} pairAddress={pairAddress}></TraddingView>;
};
export default memo(Chart);
