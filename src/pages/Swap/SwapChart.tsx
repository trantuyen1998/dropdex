import { Box, Center, Flex, Spinner } from '@chakra-ui/react';
import Chart from 'components/Chart/Chart';
import TraddingViewChart from 'components/Chart/TraddingView';
import { ExchangeToken } from './components/ExchangeToken';
import ListTxCoin from 'components/ListCoin/ListTxCoin';
import { useParams } from 'react-router-dom';
import { useTxPairs } from 'hooks/useTxPairs';
import { useGlobal } from 'hooks/useGlobal';

const SwapChart = () => {
  const param = useParams();
  const { data, isLoading } = useTxPairs({}, param.pairAddress, param.pairId)
  console.log(`param`, param.name)

  const renderLoading = () => {
    return (
      <Center height="100%">
        <Box>
          <Spinner size="xl" />
        </Box>
      </Center>
    );
  };
  return (
    <Box maxW={'140rem'} margin={'0 auto'} mb={'100px'}>
      <Flex mt={5} marginTop="50px" direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'center', md: 'unset' }}>
        <Box padding={'6px'}>
          <ExchangeToken from={`${param?.name?.split('-')[0] ?? ''}`} to={`${param?.name?.split('-')[1] ?? ''}`} />
        </Box>
        <Box padding={'6px'} width="100%" mb={{ md: 0, base: '16px' }} height={{ base: '640px' }}>
          <TraddingViewChart symbol={param.name ?? ''} />
        </Box>
      </Flex>
      <Box mt={'16px'}>
        {data && <ListTxCoin pairs={data.data} loading={isLoading} onChangeFilter={(params) => { }} isReset={true} />}
      </Box>
    </Box>
  );
};

export default SwapChart;
