import { Box, Flex, Input, Text, Theme, useTheme } from '@chakra-ui/react';
import { FC } from 'react';
import { Colors } from 'themes/colors';

export enum ExchangType {
  FROM = 'FROM',
  TO = 'TO',
}
export interface ItemExchangeProps {
  title: string;
  priceExchange: number;
  cyptoExchanged: string;
  type: ExchangType;
  fromBalance: number | string;
  fromCryptoImg: string;
  iconScale?: boolean;
}

const ItemExchange: FC<ItemExchangeProps> = ({ title, priceExchange, cyptoExchanged, type, fromBalance, fromCryptoImg, iconScale = true }) => {
  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;
  const toExchange = () => {
    return (
      <Flex justify={'space-between'} align="center" p={2} height="60px">
        <Text fontSize={'18px'} fontWeight="600" color={colors.light1} fontFamily="Nunito Sans">
          {title}
        </Text>
        <Box>
          <Text fontSize={'20px'} fontFamily="Ubuntu Mono" fontWeight={600} color={colors.light1} textAlign="right">
            {priceExchange}
          </Text>
          <Text fontSize={'12px'} color={colors.dark1} fontFamily="Ubuntu Mono" textAlign={'right'}>
            1 {cyptoExchanged} = -UST
          </Text>
        </Box>
      </Flex>
    );
  };
  const fromExchange = () => {
    return (
      <Box p={3}>
        <Flex justify={'space-between'} align="center">
          <Text fontSize={'14px'} color={colors.dark1} fontFamily="Nunito Sans">
            From
          </Text>
          <Text fontSize={'14px'} color={colors.dark1} fontFamily="Nunito Sans">
            Balance: {fromBalance}
          </Text>
        </Flex>
        <Flex justify={'space-between'} mt={1}>
          <Flex align={'center'}>
            <img src={fromCryptoImg} width={iconScale ? 32 : 28} height={iconScale ? 32 : 28} />
            <Text fontSize={'18px'} color={colors.light1} fontWeight="900" textTransform="uppercase" ml={2}>
              {cyptoExchanged}
            </Text>
          </Flex>
          <Input placeholder="0.00" border={'none'} fontFamily={'Ubuntu Mono'} textAlign="right" variant={'unstyled'} fontSize={'1.25rem'} />
        </Flex>
      </Box>
    );
  };
  return (
    <Box bg={colors.dark2} borderRadius={4} mb={3}>
      {type === ExchangType.FROM ? fromExchange() : toExchange()}
    </Box>
  );
};

export default ItemExchange;
