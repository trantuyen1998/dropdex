import { Box, Button, Center, Flex, Spinner, Stack, Theme, useDisclosure, useTheme } from '@chakra-ui/react';
import TraddingViewChart from 'components/Chart/TraddingView';
import Exchange from 'components/Exchange/Exchange';
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
import { useSwapDex } from './hooks/swap.hook';

const Swap = () => {
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
    <Box maxW={'1440px'} margin={'0 auto'}>
      <Box
        maxW={'1024px'}
        mx="auto"
        display={'flex'}
        flexDirection={{
          md: 'row',
          sm: 'column',
        }}>
        <Box flex={1} display="flex" justifyContent={'space-between'} flexDirection="column">
          {loadingPA ? (
            renderLoading()
          ) : (
            <>
              {pairInfo ? <SwapInfo pairInfo={pairInfo} /> : renderLoading()}
              <Flex justify={'space-between'}>
                <Button sx={btn}>
                  <SVGIcon name="swap" width={24} height={24} />
                  &nbsp; Swap
                </Button>
                <Button sx={btn}>
                  <SVGIcon name="star" width={24} height={24} /> &nbsp; Star
                </Button>
                <Button sx={btn}>
                  <SVGIcon name="ring" width={24} height={24} /> &nbsp; Alerts
                </Button>
              </Flex>
            </>
          )}
        </Box>
        {loadingPA ? renderLoading() : pairInfo ? <Volume pairInfo={pairInfo} /> : renderLoading()}
      </Box>
      <Flex p={{ md: 2, base: 0 }} mt={5} maxW="90rem" margin="20px auto" direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'center', md: 'unset' }}>
        <Box mx={{ md: 2, base: 0 }} width="100%" mb={{ md: 0, base: 5 }} height={{ base: '693px', md: '693px' }}>
          {loadingPA ? (
            renderLoading()
          ) : pairInfo ? (
            <TraddingViewChart symbol={pairInfo.name} contractAddress={pairInfo.quoteAsset.contractAddress} pairAddress={pairInfo.pairAddress} />
          ) : (
            renderLoading()
          )}
        </Box>
        <Box mx={{ md: 2, base: 0 }} maxW={'352px'} width="100%">
          {loadingPA ? (
            renderLoading()
          ) : pairInfo ? (
            <Exchange pairInfo={pairInfo} swapToken={swapToken} swapDisable={swapDisabled} connected={connected} address={address} />
          ) : (
            renderLoading()
          )}
        </Box>
      </Flex>
      <Box maxW={'1024px'} mx={'auto'}>
        {loadingTx ? renderLoading() : pairInfo ? <TableTx txs={txs} pairInfo={pairInfo} /> : renderLoading()}
      </Box>
      <ModalSearch isOpen={isOpen} onClose={onClose} children={undefined} />
    </Box>
  );
};

export default Swap;
