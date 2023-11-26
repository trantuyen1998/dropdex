import { Box, Button, Flex, Image, Stack, Text, Theme, useTheme } from '@chakra-ui/react';
import { PairType } from 'components/ListCoin/type';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Colors } from 'themes/colors';
import { borderColorMap, formatPrice, getDex, getTitle } from 'utils/helper';

type Props = PairType;
const CoinCard = (props: Props) => {
  const navigate = useNavigate();
  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;

  return (
    <Flex
      direction="column"
      backgroundColor={colors.bgPrimary}
      borderRadius={'16px'}
      role="group"
      transition=".3s ease all"
      p="15px"
      position="relative"
      onClick={() => {}}
      _hover={{
        bgColor: '#6d28d930',
        border: '1px solid rgb(80, 80, 80)',
      }}>
      <Box display={'flex'} alignItems="center">
        <Box>
          <Box display={'flex'} flexDirection={'row'}>
            <Box>
              <Image src={props.asset0.symbol} width={'20px'} height={'20px'} />
            </Box>
            <Box>
              <Image src={props.asset1.symbol} width={'20px'} height={'20px'} />
            </Box>
          </Box>
        </Box>
        <Box marginLeft={4}>
          <Text fontSize={'1.6rem'} fontFamily="Work Sans" fontWeight={500}>
            {props.asset0.name} - {props.asset0.name}
          </Text>
        </Box>
        <Box marginLeft={4}>
          <Text fontSize={'1.2rem'} fontWeight={400} backgroundColor={'#1183B733'} borderRadius="10px" padding={'2px 6px'}>
            Fee {props.fee}%
          </Text>
        </Box>
      </Box>

      <Text marginTop={'16px'} lineHeight={1} fontSize={'1.2rem'} color="#A9A9A9">
        Avg APR
      </Text>
      <Text fontWeight={500} fontFamily={'Work Sans'} fontSize={'2.8rem'} color="rgb(15, 170, 162)">
        {props.avgAPR ?? 0}%
      </Text>
      <Box display={'flex'} justifyContent="space-between" borderBottomWidth={'1px'} borderColor="rgb(80, 80, 80)">
        <Box marginBottom={'1.6rem'}>
          <Text marginTop={'16px'} lineHeight={1} fontSize={'1.2rem'} color="#A9A9A9">
            Volume (24H)
          </Text>
          <Text fontWeight={500} fontFamily={'Work Sans'} fontSize={'1.6rem'} color="#FFF">
            ${props.volume24H ?? 0}
          </Text>
        </Box>
        <Box>
          <Text marginTop={'16px'} lineHeight={1} fontSize={'1.2rem'} color="#A9A9A9">
            Fees (24H)
          </Text>
          <Text fontWeight={500} fontFamily={'Work Sans'} fontSize={'1.6rem'} color="#FFF">
            ${props.fee24H ?? 0}
          </Text>
        </Box>
      </Box>
      <Box display={'flex'} justifyContent="space-between">
        <Box marginBottom={'1.6rem'}>
          <Text marginTop={'16px'} lineHeight={1} fontSize={'1.2rem'} color="#A9A9A9">
            TVL
          </Text>
          <Text fontWeight={500} fontFamily={'Work Sans'} fontSize={'1.6rem'} color="#FFF">
            ${props.tvl ?? 0}
          </Text>
        </Box>
        <Box>
          <Text marginTop={'16px'} lineHeight={1} fontSize={'1.2rem'} color="#A9A9A9">
            Total Liqidity
          </Text>
          <Text fontWeight={500} fontFamily={'Work Sans'} fontSize={'1.6rem'} color="#FFF">
            ${formatPrice(props.poolAmount) ?? 0}
          </Text>
        </Box>
      </Box>
      <Box flex={1}>
        <Button borderRadius={'999px'} height={'3.6rem'} padding="10px" backgroundColor={'#321C6B'} alignItems="center" display={'flex'} width="100%">
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
      </Box>
    </Flex>
  );
};

export default memo(CoinCard);
