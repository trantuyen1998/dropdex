import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Flex,
  Image,
  Link,
  Stack,
  Text,
  Theme,
  useDisclosure,
  useMediaQuery,
  useTheme,
} from '@chakra-ui/react';
import MarqueeTrending from 'components/MarqueeTrending/MarqueeTrending';
import { AnyMxRecord } from 'dns';
import { useGetTrendingCoin } from 'hooks/useGetTrendingCoin';
import { isEmpty } from 'lodash';
import { InfoCoinItem } from 'models/Pairs';
import { useHomeStore } from 'pages/Home/store/useHomeStore';
import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Colors } from 'themes/colors';

export interface TrendingCoin {
  asset0: InfoCoinItem;
  asset1: InfoCoinItem;
}

function Trending() {
  const [isDesktop] = useMediaQuery('(min-width: 1024px)');
  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  const { trendings } = useHomeStore();
  const [dataTrending, setDataTrending] = useState<any>([]);

  const trendingData = useGetTrendingCoin();
  const overlay = <AlertDialogOverlay backdropFilter="blur(5px)" />;

  const renderDialog = () => {
    return (
      <AlertDialog onClose={onClose} isOpen={isOpen} isCentered leastDestructiveRef={cancelRef} preserveScrollBarGap size="md">
        {overlay}
        <AlertDialogContent bgColor="#182033" mx={{ base: '24px', md: 0 }}>
          <AlertDialogHeader>
            <Flex alignItems="center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#C4B5FD" width="1.5rem" height="1.5rem">
                <path
                  fillRule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clipRule="evenodd"></path>
              </svg>
              <Text px={2} color="#C4B5FD" fontSize={20} fontWeight="semibold">
                Trending Pairs
              </Text>
            </Flex>
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Text fontSize={16} fontWeight="400" color="#fff">
              Pairs listed here are ranked based on realtime traffic of Coinhall and indicate their popularity.
            </Text>
            <Text fontSize={14} py={2}>
              This is not an endorsement by Coinhall, please do your own research before trading!
            </Text>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  useEffect(() => {
    if (!isEmpty(trendings)) {
      // const trendingDataCoin = Object.keys(trendings)
      //   .filter((k) => trendingData.some((i) => i.pairAddress === k))
      //   .map((i) => trendings[i]);
      setDataTrending(trendings);
    }
  }, [trendings, trendingData]);
  if (isEmpty(dataTrending)) {
    return null;
  }

  return (
    <Flex alignItems="center" bgColor={colors.bg4} py={1} minHeight="36px" position="relative">
      <Stack
        direction="row"
        spacing={1}
        borderRightRadius="full"
        bgColor={colors.primary}
        transition=".3s ease all"
        alignItems="center"
        position="absolute"
        top={0}
        left={0}
        height="100%"
        cursor="pointer"
        pr={4}
        pl={2}
        py={2}
        zIndex={9}
        minWidth="40px"
        onClick={onOpen}
        _hover={{
          bgColor: colors.primary,
          color: '#fff',
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={colors.light4} width="1.25rem" height="1.25rem">
          <path
            fillRule="evenodd"
            d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
            clipRule="evenodd"></path>
        </svg>
        <Text fontWeight={600} color={colors.light4} display={{ base: 'none', md: 'block' }}>
          Trending
        </Text>
        {isDesktop && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={colors.light4} width="1.25rem" height="1.25rem">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"></path>
          </svg>
        )}
      </Stack>
      <Flex display={{ base: 'none', md: 'flex' }} justifyContent="center" alignItems="center" width="100%">
        {dataTrending?.map((item: any, index) => {
          const route = '/' + item.chain + '/' + item.pairAddress;
          return (
            <Link
              display="flex"
              alignItems="center"
              justifyContent="center"
              key={index.toString()}
              px={2}
              py="4px"
              onClick={() => navigate(route)}
              transition=".3s ease all"
              _hover={{
                bgColor: colors.bg5,
                borderRadius: 4,
                color: '#fff',
              }}>
              <Text mr={1} color={colors.light3} fontFamily="Ubuntu Mono" opacity={0.6}>
                #{index + 1}
              </Text>
              <Image
                src={item[item.defaultBase]?.icon || 'https://coinhall.org/assets/chain_logos/osmo.svg'}
                alt="icon"
                width="16px"
                height="16px"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = 'https://coinhall.org/assets/chain_logos/osmo.svg';
                }}
              />
              <Text mx={1} color={colors.light3} fontWeight={700} mt={'2px'}>
                {item[item.defaultBase].symbol}/{item[item.defaultBase === 'asset0' ? 'asset1' : 'asset0'].symbol}
              </Text>
            </Link>
          );
        })}
      </Flex>
      {!isDesktop && <MarqueeTrending data={dataTrending} />}
      {renderDialog()}
    </Flex>
  );
}

export default memo(Trending);
