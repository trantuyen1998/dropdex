import { Box, Button, Center, Flex, Spinner, Text, Theme, useTheme } from '@chakra-ui/react';
import ItemExchange, { ExchangType } from 'components/ItemExchange/ItemExchange';
import Slippage from 'components/Slippage/Slippage';
import { SVGIcon } from 'components/SVGIcon/SVGIcon';
import { isEmpty } from 'lodash';
import { InfoCoinItem, PairInfoContext } from 'models/Pairs';
import { FC, useEffect, useState } from 'react';
import { Colors } from 'themes/colors';
import { getTitleDex, trunceHash } from 'utils/helper';

interface IProp {
  pairInfo: PairInfoContext;
  swapToken: () => void;
  swapDisable: boolean;
  connected: boolean;
  address: string;
}
const Exchange: FC<IProp> = ({ pairInfo, swapToken, swapDisable, connected, address }) => {
  const [exchanges, setExchanges] = useState<boolean>(true);
  const [basePair, setBasePair] = useState<InfoCoinItem>(pairInfo.baseAsset);
  const [exchangePair, setExchangePair] = useState<InfoCoinItem>(pairInfo.quoteAsset);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    if (!isEmpty(pairInfo)) {
      setLoading(false);
    }
  }, [pairInfo]);

  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;
  const handleChange = () => {
    if (exchanges) {
      setExchangePair(pairInfo.baseAsset);
      setBasePair(pairInfo.quoteAsset);
    } else {
      setExchangePair(pairInfo.quoteAsset);
      setBasePair(pairInfo.baseAsset);
    }
    setExchanges(!exchanges);
  };

  const renderLoading = () => {
    return (
      <Center height="100%">
        <Spinner size="xl" />
      </Center>
    );
  };
  return (
    <Box bg={colors.bgSecondary} width="100%" borderRadius={'8px'} p={4} height={loading ? '640px' : 'unset'}>
      {loading ? (
        renderLoading()
      ) : (
        <>
          <Flex align={'flex-end'} mb={3}>
            <SVGIcon name="coinhall" width={24} height={24} />
            <Text color={colors.light1} fontSize={'20px'} fontFamily="Nunito Sans" fontWeight={'bold'} lineHeight="23px" ml={'3px'}>
              Kyltnswap
            </Text>
          </Flex>
          <Slippage />
          <ItemExchange
            fromCryptoImg={exchangePair.icon}
            fromBalance={0}
            // fromBalance={exchangePair.volume24h}
            title={'Kyltnswap'}
            priceExchange={0}
            cyptoExchanged={exchangePair.symbol}
            type={ExchangType.FROM}
            iconScale={exchanges}
          />
          <Flex justify={'center'}>
            <Box p={3} mb={3} borderRadius="50%" bg={colors.dark2} cursor={'pointer'} onClick={handleChange}>
              <SVGIcon name="exchange" width={24} height={24} />
            </Box>
          </Flex>
          <Box px={3} pt={3} borderWidth={1} borderColor={colors.dark1} borderRadius={'4px'}>
            <Flex justify={'space-between'}>
              <Text fontSize={'14px'} fontFamily="Nunito Sans" color={colors.dark1}>
                To (estimated)
              </Text>
              <Text fontSize={'14px'} fontFamily="Nunito Sans" color={colors.dark1}>
                {/* Balance: {basePair.volume24h} */}
                Balance: 0
              </Text>
            </Flex>
            <Flex my={1}>
              <img src={basePair.icon} width={exchanges[0]?.iconScale ? 28 : 32} height={exchanges[0]?.iconScale ? 28 : 32} />
              <Text fontSize={'18px'} color={colors.light1} fontWeight="600" textTransform="uppercase" ml={2}>
                {basePair.symbol}
              </Text>
            </Flex>
            <ItemExchange
              fromCryptoImg="https://whitelist.anchorprotocol.com/logo/ANC.png"
              fromBalance={0}
              title={'Kyltnswap'}
              priceExchange={0}
              cyptoExchanged={'ANS'}
              type={ExchangType.TO}
            />
            <ItemExchange
              fromCryptoImg="https://whitelist.anchorprotocol.com/logo/ANC.png"
              fromBalance={0}
              title={'Kyltnswap'}
              priceExchange={0}
              cyptoExchanged={'ANS'}
              type={ExchangType.TO}
            />
          </Box>
          <Button
            onClick={connected ? swapToken : () => { }}
            fontSize={'18px'}
            fontWeight="600"
            color={colors.light2}
            bg={colors.bg7}
            mt={4}
            mb={5}
            height={'40px'}
            width={'100%'}
            disabled={swapDisable}>
            {connected ? trunceHash(address) : 'Connect wallet'}
          </Button>
          <Flex justify={'space-between'} marginBottom={'5px'}>
            <Text fontSize={'16px'} color={colors.dark1} fontWeight={500}>
              Price per {basePair.symbol}
            </Text>
            <Text fontSize={'16px'} fontWeight="600" color={colors.light1} fontFamily="Ubuntu Mono">
              - {exchangePair.symbol}
            </Text>
          </Flex>
          <Flex justify={'space-between'} marginBottom={'5px'}>
            <Text fontSize={'16px'} color={colors.dark1} fontWeight={500}>
              Price impact
            </Text>
            <Text fontSize={'16px'} fontWeight="600" color={colors.light1} fontFamily="Ubuntu Mono">
              - %
            </Text>
          </Flex>
          <Flex justify={'space-between'} marginBottom={'5px'}>
            <Text fontSize={'16px'} color={colors.dark1} fontWeight={500}>
              Min recieved
            </Text>
            <Text fontSize={'16px'} fontWeight="600" color={colors.light1} fontFamily="Ubuntu Mono">
              - {basePair.symbol}
            </Text>
          </Flex>
          <Flex justify={'space-between'} marginBottom={'5px'}>
            <Text fontSize={'16px'} color={colors.dark1} fontWeight={500}>
              Tx Fee
            </Text>
            <Text fontSize={'16px'} fontWeight="600" color={colors.light1} fontFamily="Ubuntu Mono">
              - {exchangePair.symbol}
            </Text>
          </Flex>
          <Flex justify={'space-between'}>
            <Text fontSize={'16px'} color={colors.dark1} fontWeight={500}>
              DEX used
            </Text>
            <Text
              fontSize={'16px'}
              fontWeight="600"
              color={colors.light1}
              borderTopRightRadius={4}
              borderBottomLeftRadius={4}
              borderRadius="4px"
              padding={'0 4px'}
              bg={getTitleDex(pairInfo.dex).bg}
              fontFamily="Ubuntu Mono">
              {pairInfo.dex}
            </Text>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default Exchange;
