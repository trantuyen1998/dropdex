import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Center,
  Collapse,
  Image,
  Input,
  Spinner,
  Text,
  Theme,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';
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

const SwapCoin = () => {
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
  const [show, setShow] = useState<boolean>(false);

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
    <Box maxW={'150rem'} margin="0 auto" justifyContent="center" display={'flex'}>
      <Box>
        <Box
          my="30px"
          borderRadius={'12px'}
          background={'#5b21b633'}
          border="1px solid #6d28d9"
          height={'fit-content'}
          display="flex"
          alignItems={'center'}
          justifyContent="center">
          <Text color={'#DDD6FE'} padding="8px 12px" fontSize={'14px'} fontFamily="Work Sans">
            Cross-chain swaps are now live - swap or transfer <br></br> tokens across any IBC-enabled Klaytn chain!
          </Text>
        </Box>
        <Box maxW={'425px'} background="#1c1c1c" height={500} padding="16px" borderRadius={'16px'}>
          <Box background={'#0f0f0f'} margin="0" padding={'12px'} borderRadius="16px">
            <Box margin={'0 0 12px'} display="flex" justifyContent={'flex-end'}>
              <Box display="flex" alignItems={'center'} fontSize="14px">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.66667 10.6667V5.33333C6.66667 4.6 7.26 4 8 4H14V3.33333C14 2.6 13.4 2 12.6667 2H3.33333C2.59333 2 2 2.6 2 3.33333V12.6667C2 13.4 2.59333 14 3.33333 14H12.6667C13.4 14 14 13.4 14 12.6667V12H8C7.26 12 6.66667 11.4 6.66667 10.6667ZM8.66667 5.33333C8.3 5.33333 8 5.63333 8 6V10C8 10.3667 8.3 10.6667 8.66667 10.6667H14.6667V5.33333H8.66667ZM10.6667 9C10.1133 9 9.66667 8.55333 9.66667 8C9.66667 7.44667 10.1133 7 10.6667 7C11.22 7 11.6667 7.44667 11.6667 8C11.6667 8.55333 11.22 9 10.6667 9Z"
                    fill="#A9A9A9"></path>
                </svg>
                <Text marginLeft={2}> 0</Text>
              </Box>
            </Box>
            <Box display={'flex'} alignItems="center">
              <Box flex={1} marginLeft="-12px">
                <Input placeholder="0.0" value={0} fontSize="2.4rem" border={'none'} _focus={{ border: 'none' }} />
              </Box>
              <Box flex={1} display="flex" justifyContent={'flex-end'}>
                <Box
                  fontFamily={'Work Sans'}
                  width={'fit-content'}
                  display="flex"
                  background={'#1c1c1c'}
                  alignItems="center"
                  fontSize={'1.6rem'}
                  padding="6px 0 6px 8px"
                  borderRadius={'999px'}>
                  <Image width={'20px'} height="20px" src="https://storage.googleapis.com/ks-setting-1d682dca/9412b9e7-161f-472e-94b2-a62d2c386ab7.png" />
                  <Text lineHeight={1} margin={'0 10px'}>
                    ETH
                  </Text>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.71005 11.71L11.3001 14.3C11.6901 14.69 12.3201 14.69 12.7101 14.3L15.3001 11.71C15.9301 11.08 15.4801 10 14.5901 10H9.41005C8.52005 10 8.08005 11.08 8.71005 11.71Z"
                      fill="currentColor"></path>
                  </svg>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box display={'flex'} alignItems="center" justifyContent={'space-between'} margin="10px 0">
            <Box display={'flex'} alignItems="center" fontSize="1.2rem" color={'#a9a9a9'}>
              <svg id="arrow_loading" xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" className="arrow-loading" width="16" height="16" color="#A9A9A9">
                <path
                  stroke="none"
                  fill="#373737"
                  d="M16.2751 7.78995C13.932 5.44681 10.133 5.44681 7.78986 7.78995C7.02853 8.55128 6.51457 9.4663 6.24798 10.4351C6.24473 10.4499 6.24114 10.4646 6.23719 10.4793C6.17635 10.7064 6.12938 10.9339 6.09577 11.161C5.83159 12.9457 6.39255 14.7026 7.52624 15.9944C7.61054 16.0901 7.69842 16.1838 7.78986 16.2752C8.08307 16.5685 8.39909 16.825 8.7322 17.0448C9.25533 17.3892 9.84172 17.6568 10.4798 17.8278C10.7386 17.8971 10.9979 17.9484 11.2565 17.9825C12.9537 18.2061 14.6187 17.6866 15.8747 16.6415C16.0123 16.5265 16.1459 16.4044 16.2751 16.2752C16.2848 16.2655 16.2947 16.2561 16.3047 16.2469C17.0123 15.531 17.5491 14.627 17.8283 13.5851C17.9712 13.0517 18.5196 12.7351 19.053 12.878C19.5865 13.021 19.9031 13.5693 19.7602 14.1028C19.3141 15.7676 18.3745 17.1684 17.1409 18.1899C16.1883 18.9822 15.0949 19.5189 13.9515 19.8002C11.8607 20.3147 9.6028 19.9749 7.7328 18.7809C7.06855 18.3579 6.47841 17.8432 5.97519 17.2589C5.12341 16.2738 4.55173 15.1302 4.26015 13.9324C4.01698 12.9416 3.96104 11.8931 4.12168 10.8379C4.36697 9.20484 5.1183 7.63309 6.37564 6.37574C9.49984 3.25154 14.5652 3.25154 17.6894 6.37574L18.2332 6.91959L18.2337 5.49951C18.2338 5.05769 18.5921 4.69964 19.034 4.69979C19.4758 4.69995 19.8338 5.05825 19.8337 5.50007L19.8325 9.03277L19.8322 9.8325L19.0325 9.83249L18.9401 9.83249C18.8146 9.85665 18.6854 9.85665 18.5599 9.83248L15.5005 9.83245C15.0587 9.83245 14.7005 9.47427 14.7005 9.03244C14.7005 8.59062 15.0587 8.23245 15.5005 8.23245L16.7176 8.23246L16.2751 7.78995Z"></path>
                <defs>
                  <path
                    id="arrow"
                    stroke="none"
                    fill="none"
                    d="M16.2751 7.78995C13.932 5.44681 10.133 5.44681 7.78986 7.78995C7.02853 8.55128 6.51457 9.4663 6.24798 10.4351C6.24473 10.4499 6.24114 10.4646 6.23719 10.4793C6.17635 10.7064 6.12938 10.9339 6.09577 11.161C5.83159 12.9457 6.39255 14.7026 7.52624 15.9944C7.61054 16.0901 7.69842 16.1838 7.78986 16.2752C8.08307 16.5685 8.39909 16.825 8.7322 17.0448C9.25533 17.3892 9.84172 17.6568 10.4798 17.8278C10.7386 17.8971 10.9979 17.9484 11.2565 17.9825C12.9537 18.2061 14.6187 17.6866 15.8747 16.6415C16.0123 16.5265 16.1459 16.4044 16.2751 16.2752C16.2848 16.2655 16.2947 16.2561 16.3047 16.2469C17.0123 15.531 17.5491 14.627 17.8283 13.5851C17.9712 13.0517 18.5196 12.7351 19.053 12.878C19.5865 13.021 19.9031 13.5693 19.7602 14.1028C19.3141 15.7676 18.3745 17.1684 17.1409 18.1899C16.1883 18.9822 15.0949 19.5189 13.9515 19.8002C11.8607 20.3147 9.6028 19.9749 7.7328 18.7809C7.06855 18.3579 6.47841 17.8432 5.97519 17.2589C5.12341 16.2738 4.55173 15.1302 4.26015 13.9324C4.01698 12.9416 3.96104 11.8931 4.12168 10.8379C4.36697 9.20484 5.1183 7.63309 6.37564 6.37574C9.49984 3.25154 14.5652 3.25154 17.6894 6.37574L18.2332 6.91959L18.2337 5.49951C18.2338 5.05769 18.5921 4.69964 19.034 4.69979C19.4758 4.69995 19.8338 5.05825 19.8337 5.50007L19.8325 9.03277L19.8322 9.8325L19.0325 9.83249L18.9401 9.83249C18.8146 9.85665 18.6854 9.85665 18.5599 9.83248L15.5005 9.83245C15.0587 9.83245 14.7005 9.47427 14.7005 9.03244C14.7005 8.59062 15.0587 8.23245 15.5005 8.23245L16.7176 8.23246L16.2751 7.78995Z"></path>
                  <clipPath id="arrow-clip">
                    <use xlinkHref="#arrow"></use>
                  </clipPath>
                </defs>
                <g clip-path="url(#arrow-clip)">
                  <circle
                    cx="12"
                    cy="12"
                    r="5"
                    transform="rotate(365,12,12)"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="16"
                    stroke-dasharray="30"
                    stroke-dashoffset="0">
                    <animate attributeName="stroke-dashoffset" values="0;-30" begin="0s" repeatCount="indefinite" dur="10s"></animate>
                  </circle>
                </g>
                <use xlinkHref="#arrow"></use>
                <animateTransform
                  id="transform_0"
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="0 0 0"
                  to="-10 0 0"
                  dur="0.07s"
                  begin="transform_0.start"
                  repeatCount="1"></animateTransform>
                <animateTransform
                  id="transform_1"
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="-45 0 0"
                  to="390 0 0"
                  dur="0.6s"
                  begin="transform_0.end"
                  repeatCount="1"></animateTransform>
                <animateTransform
                  id="transform_2"
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="390 0 0"
                  to="360 0 0"
                  dur="0.15s"
                  begin="transform_1.end"
                  repeatCount="1"></animateTransform>
              </svg>
              <Text marginLeft={'5px'}>1 ETH = 2,677.7243 MATIC</Text>
            </Box>
            <Box padding={'4px'} background="#292929" width={'fit-content'} borderRadius="50%">
              <svg width="24" height="24" transform="none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.14 6.13978L9.34997 3.35978C9.14997 3.16978 8.83997 3.16978 8.63997 3.35978L5.84997 6.13978C5.52997 6.44978 5.75997 6.98978 6.19997 6.98978L7.99997 6.98978L7.99997 12.9998C7.99997 13.5498 8.44997 13.9998 8.99997 13.9998C9.54997 13.9998 9.99997 13.5498 9.99997 12.9998L9.99997 6.98978L11.79 6.98978C12.24 6.98978 12.46 6.44978 12.14 6.13978ZM15.35 20.6498L18.14 17.8698C18.46 17.5598 18.23 17.0198 17.79 17.0198L16 17.0198L16 10.9998C16 10.4498 15.55 9.99979 15 9.99979C14.45 9.99979 14 10.4498 14 10.9998L14 17.0098L12.21 17.0098C11.76 17.0098 11.54 17.5498 11.86 17.8598L14.65 20.6398C14.84 20.8398 15.16 20.8398 15.35 20.6498Z"
                  fill="#A9A9A9"></path>
              </svg>
            </Box>
          </Box>

          <Box background={'#0f0f0f'} margin="0" padding={'12px'} borderRadius="16px">
            <Box margin={'0 0 12px'} display="flex" justifyContent={'space-between'}>
              <Text fontSize={'12px'} fontFamily="Work Sans">
                Est.Output
              </Text>
              <Box display="flex" alignItems={'center'} fontSize="14px">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.66667 10.6667V5.33333C6.66667 4.6 7.26 4 8 4H14V3.33333C14 2.6 13.4 2 12.6667 2H3.33333C2.59333 2 2 2.6 2 3.33333V12.6667C2 13.4 2.59333 14 3.33333 14H12.6667C13.4 14 14 13.4 14 12.6667V12H8C7.26 12 6.66667 11.4 6.66667 10.6667ZM8.66667 5.33333C8.3 5.33333 8 5.63333 8 6V10C8 10.3667 8.3 10.6667 8.66667 10.6667H14.6667V5.33333H8.66667ZM10.6667 9C10.1133 9 9.66667 8.55333 9.66667 8C9.66667 7.44667 10.1133 7 10.6667 7C11.22 7 11.6667 7.44667 11.6667 8C11.6667 8.55333 11.22 9 10.6667 9Z"
                    fill="#A9A9A9"></path>
                </svg>
                <Text marginLeft={2}> 0</Text>
              </Box>
            </Box>
            <Box display={'flex'} alignItems="center">
              <Box flex={1} marginLeft="-12px">
                <Input placeholder="0.0" value={10002} fontSize="2.4rem" border={'none'} _focus={{ border: 'none' }} />
              </Box>
              <Box flex={1} display="flex" justifyContent={'flex-end'}>
                <Box
                  fontFamily={'Work Sans'}
                  width={'fit-content'}
                  display="flex"
                  background={'#1c1c1c'}
                  alignItems="center"
                  fontSize={'1.6rem'}
                  padding="6px 0 6px 8px"
                  borderRadius={'999px'}>
                  <Image width={'20px'} height="20px" src="https://storage.googleapis.com/ks-setting-1d682dca/6e5645d9-4388-4916-b87d-8e5d3952df5f.png" />
                  <Text lineHeight={1} margin={'0 10px'}>
                    MATIC
                  </Text>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.71005 11.71L11.3001 14.3C11.6901 14.69 12.3201 14.69 12.7101 14.3L15.3001 11.71C15.9301 11.08 15.4801 10 14.5901 10H9.41005C8.52005 10 8.08005 11.08 8.71005 11.71Z"
                      fill="currentColor"></path>
                  </svg>
                </Box>
              </Box>
            </Box>
          </Box>

          <Button mt={'16px'} borderRadius={'999px'} height={'3.6rem'} padding="10px" backgroundColor={'#321C6B'} alignItems="center" display={'flex'} width="100%">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              color="#fff"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round">
              <polyline points="17 1 21 5 17 9"></polyline>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
              <polyline points="7 23 3 19 7 15"></polyline>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
            <Text marginLeft={'10px'} fontSize="1.4rem" color={'#fff'}>
              Swap Token
            </Text>
          </Button>

          <Box mt={'16px'}>
            <Accordion allowToggle>
              <AccordionItem border={'1px solid #505050'} background="rgb(15, 15, 15)" borderRadius={'16px'}>
                <Box display={'flex'} justifyContent="center">
                  <AccordionButton padding="12px" borderBottom={'1px solid #505050'} width="96%">
                    <Box as="span" flex="1" textAlign="left" fontSize={'12px'} color="#fff">
                      MORE INFORMATION
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </Box>
                <AccordionPanel pb={4}>
                  <Box mt={'12px'} display={'flex'} flexDirection={'row'} justifyContent="space-between">
                    <Text fontSize={'12px'} color="#a9a9a9" fontFamily={'Work Sans'}>
                      Minimum Received
                    </Text>
                    <Text fontSize={'12px'} color="#fff" fontFamily={'Work Sans'}>
                      2,069 USDT
                    </Text>
                  </Box>
                  <Box mt={'12px'} display={'flex'} flexDirection={'row'} justifyContent="space-between">
                    <Text fontSize={'12px'} color="#a9a9a9" fontFamily={'Work Sans'}>
                      Est. Gas Fee
                    </Text>
                    <Text fontSize={'12px'} color="#fff" fontFamily={'Work Sans'}>
                      $1.20
                    </Text>
                  </Box>
                  <Box mt={'12px'} display={'flex'} flexDirection={'row'} justifyContent="space-between">
                    <Text fontSize={'12px'} color="#a9a9a9" fontFamily={'Work Sans'}>
                      Price Impact
                    </Text>
                    <Text fontSize={'12px'} color="#fff" fontFamily={'Work Sans'}>
                      0.11%
                    </Text>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SwapCoin;
