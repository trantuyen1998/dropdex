import { Box, Center, Flex, Spinner } from '@chakra-ui/react';
import Chart from 'components/Chart/Chart';
import TraddingViewChart from 'components/Chart/TraddingView';
import { ExchangeToken } from './components/ExchangeToken';
import ListTxCoin from 'components/ListCoin/ListTxCoin';

const SwapChart = () => {
  // const { isOpen, onClose, onOpen } = useDisclosure();
  // const param = useParams();
  // const theme = useTheme<Theme>();
  // const colors = theme.colors as Colors;
  // const { pairs: coins } = useHomeStore();
  // const [txs, setTxs] = useState<Tx[]>([]);
  // const [addresses, setAddresses] = useState<Pairs[]>([]);
  // const [pairInfo, setPairInfo] = useState<any>();
  // const [contextSwap, setContextSwap] = useState<any>();
  // const { data: dataTx, isLoading: loadingTx } = useGetTx(param.pairAddress);
  // const { data: pairAddresses, isLoading: loadingPA } = useGetPairByAddress(param.pairAddress);
  // const { data: dataSwap, isLoading: loadingDS } = useGetContextSwap(`/${param.chain?.toLowerCase()}/${param.pairAddress}`);
  // const { swapToken, swapDisabled, connected, address } = useSwapDex();

  // useEffect(() => {
  //   document.addEventListener('keydown', (event) => {
  //     if (event.code === 'KeyK' && event.metaKey) {
  //       onOpen();
  //     }
  //   });
  // }, []);
  // useEffect(() => {
  //   if (dataTx && !isEmpty(dataTx)) {
  //     setTxs(dataTx.txs);
  //   }
  // }, [dataTx, param]);

  // useEffect(() => {
  //   if (dataSwap && !isEmpty(dataSwap)) {
  //     const pageContext = dataSwap.pageContext;
  //     setContextSwap(pageContext);
  //     setPairInfo(pageContext.pageProps.pairInfo);
  //   }
  // }, [dataSwap, param]);

  // const btn = {
  //   width: 'calc(100% / 3 - 4px)',
  //   background: `${colors.bg3}`,
  //   height: '42px',
  //   display: 'flex',
  //   alignItems: 'center',
  //   fontFamily: 'Nunito Sans',
  //   fontSize: '18px',
  //   color: colors.light2,
  //   fontWeight: 600,
  // };
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
    <Box maxW={'140rem'} margin={'0 auto'}>
      <Flex mt={5} marginTop="50px" direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'center', md: 'unset' }}>
        <Box padding={'6px'}>
          <ExchangeToken />
        </Box>
        <Box padding={'6px'} width="100%" mb={{ md: 0, base: '16px' }} height={{ base: '640px' }}>
          <TraddingViewChart symbol={'BTCUSD'} />
        </Box>
      </Flex>
      <Box mt={'16px'}>
        <ListTxCoin loading={false} onChangeFilter={(params) => {}} isReset={true} />
      </Box>
    </Box>
  );
};

export default SwapChart;
