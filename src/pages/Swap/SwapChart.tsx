import { Box, Button, Center, Flex, Spinner, Stack, Theme, useDisclosure, useTheme } from '@chakra-ui/react';
import ChartDemo from 'components/Chart/ChartDemo';
import TraddingViewChart from 'components/Chart/TraddingView';
import Exchange from 'components/Exchange/Exchange';
import ListCointTable from 'components/ListCoin/ListCointTable';
import ModalSearch from 'components/ModalSearch/ModalSearch';
import { SVGIcon } from 'components/SVGIcon/SVGIcon';
import SwapInfo from 'components/SwapInfo/SwapInfo';
import TableTx from 'components/TableTx/TableTx';
import Volume from 'components/Volume/Volume';
import { useGetContextSwap } from 'hooks/useGetContextSwap';
import { useGetPairByAddress } from 'hooks/useGetPairByAddress';
import { useGetTx } from 'hooks/useGetTx';
import { isEmpty } from 'lodash';
import { Pairs, Tx } from 'models/Pairs';
import { useHomeStore } from 'pages/Home/store/useHomeStore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Colors } from 'themes/colors';
import { ExchangeToken } from './components/ExchangeToken';
import { useSwapDex } from './hooks/swap.hook';

const SwapChart = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const param = useParams();
  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;
  const { pairs: coins } = useHomeStore();
  const [txs, setTxs] = useState<Tx[]>([]);
  const [addresses, setAddresses] = useState<Pairs[]>([]);
  const [pairInfo, setPairInfo] = useState<any>();
  const [contextSwap, setContextSwap] = useState<any>();
  const { data: dataTx, isLoading: loadingTx } = useGetTx(param.pairAddress);
  const { data: pairAddresses, isLoading: loadingPA } = useGetPairByAddress(param.pairAddress);
  const { data: dataSwap, isLoading: loadingDS } = useGetContextSwap(`/${param.chain?.toLowerCase()}/${param.pairAddress}`);
  const { swapToken, swapDisabled, connected, address } = useSwapDex();

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'KeyK' && event.metaKey) {
        onOpen();
      }
    });
  }, []);
  useEffect(() => {
    if (dataTx && !isEmpty(dataTx)) {
      setTxs(dataTx.txs);
    }
  }, [dataTx, param]);

  useEffect(() => {
    if (dataSwap && !isEmpty(dataSwap)) {
      const pageContext = dataSwap.pageContext;
      setContextSwap(pageContext);
      setPairInfo(pageContext.pageProps.pairInfo);
    }
  }, [dataSwap, param]);

  const btn = {
    width: 'calc(100% / 3 - 4px)',
    background: `${colors.bg3}`,
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Nunito Sans',
    fontSize: '18px',
    color: colors.light2,
    fontWeight: 600,
  };
  const renderLoading = () => {
    return (
      <Center height="100%">
        <Spinner size="xl" />
      </Center>
    );
  };
  return (
    <Box maxW={'150rem'} margin={'0 auto'}>
      <Flex mt={5} marginTop="50px" direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'center', md: 'unset' }}>
        <Box padding={'6px'}>
          <ExchangeToken />
        </Box>
        <Box padding={'6px'} width="100%" mb={{ md: 0, base: 5 }} height={{ base: '693px', md: '693px' }}>
          <ChartDemo />
        </Box>
      </Flex>
      <ListCointTable loading={false} onChangeFilter={(params) => {}} isReset={false} />
    </Box>
  );
};

export default SwapChart;
