import { Box, Flex, Image, Stack, Text, Theme, useTheme } from '@chakra-ui/react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Colors } from 'themes/colors';
import { borderColorMap, getDex, getTitle } from 'utils/helper';

interface CardItemProps {
  icon?: string;
  coinName?: string;
  symbol?: string;
  mktCap?: number;
  vol?: number;
  index: number;
  price: number;
  change: number | string;
  pairAddress: string;
  chain: string;
  dex: string;
  symbolOrigin: string;
}

function CardItem(props: CardItemProps) {
  const navigate = useNavigate();
  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;
  const { icon, coinName, symbol, mktCap, vol, index, price, change, pairAddress, chain, dex, symbolOrigin } = props;
  const handleClick = () => {
    const route = '/' + chain.toLowerCase() + '/' + pairAddress;
    navigate(route);
  };
  return (
    <Flex
      direction="column"
      backgroundColor={colors.bgPrimary}
      borderRadius={'8px'}
      role="group"
      transition=".3s ease all"
      p="15px"
      position="relative"
      onClick={handleClick}
      _hover={{
        bgColor: colors.primary,
      }}>
      <Box
        padding={'0px 5.2px'}
        borderTopRightRadius={4}
        borderBottomLeftRadius={4}
        bgColor={colors.bgSecondary}
        position="absolute"
        fontFamily="Nunito Sans"
        borderTopEndRadius={'8px'}
        borderBottomStartRadius={'8px'}
        lineHeight={'16px'}
        top={0}
        fontSize="12px"
        right={0}
        textColor={getTitle(chain)}
        _groupHover={{
          bgColor: colors.primary,
          color: '#fff',
        }}>
        {chain}
      </Box>
      <Box
        padding={'0px 5.2px'}
        borderTopStartRadius={'8px'}
        borderBottomEndRadius={'8px'}
        bgColor={colors.bgSecondary}
        position="absolute"
        top={0}
        left={0}
        fontSize="14px"
        lineHeight={'16px'}
        fontFamily="Ubuntu Mono"
        _groupHover={{
          bgColor: colors.primary,
          color: '#fff',
        }}>
        #{index + 1}
      </Box>
      <Stack direction="row" alignItems="center" spacing={3}>
        <Box border={'2px solid'} borderColor={borderColorMap(chain, dex)} borderRadius={'50%'} position="relative">
          <Image
            src={icon}
            width="2.5rem"
            height="2.5rem"
            borderRadius={'50%'}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = 'https://coinhall.org/assets/chain_logos/osmo.svg';
            }}
          />
          <Image src={getDex(dex)} width="20px" height="20px" position="absolute" bottom={'-5px'} right={'-8px'} zIndex={2} />
          <Box zIndex={1} width="20px" height="20px" position="absolute" bottom={'-5px'} right={'-8px'} background="black" opacity={'0.6'} borderRadius={'50%'}></Box>
        </Box>
        <Box>
          <Text fontSize={20} fontWeight="bold" color="#fff" textOverflow="ellipsis" noOfLines={1}>
            {coinName}
          </Text>
          <Text fontSize={16} fontWeight="semibold">
            {symbol}
          </Text>
        </Box>
      </Stack>
      <Flex position="relative" mt={3} mb={1}>
        <Stack direction="row" spacing={2}>
          <Box>
            <Text fontSize={12} color={colors.gray[400]}>
              Market cap
            </Text>
            <Text fontSize={12} color={colors.gray[400]}>
              Vol (24h)
            </Text>
          </Box>
          <Box>
            <Text fontSize={12} color={colors.gray[300]}>
              {mktCap?.toString().slice(0, 2)}.{mktCap?.toString().slice(2, 3)}M {symbolOrigin}
            </Text>
            <Text fontSize={12} color={colors.gray[300]}>
              {vol?.toString().slice(0, 2)}.{vol?.toString().slice(2, 3)}K {symbolOrigin}
            </Text>
          </Box>
        </Stack>
        <Flex position="absolute" right="0" bottom={0} flexDirection="column" alignItems="flex-end">
          <Text fontSize="lg" mb={1} color="#fff" fontWeight="semibold" display={'flex'}>
            {change > 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                color="green.300"
                style={{ transform: 'rotate(180deg)', color: '#86EFAc', marginTop: '2px' }}
                viewBox="0 0 32 32"
                width="24px"
                height="24px"
                className="h-6 w-6 mr-0.5 rotate-180 text-green-300 mt-0.5">
                <path fill="currentColor" d="m24 12l-8 10l-8-10z"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                color={change > 0 ? 'green.300' : '#FCA5A5'}
                className="mr-0.5 text-red-300"
                width="24px"
                height="24px">
                <path fill="currentColor" d="m24 12l-8 10l-8-10z"></path>
              </svg>
            )}
            {price?.toString()?.slice(0, 6) || 0} {symbolOrigin}
          </Text>
          <Text fontSize="medium" color={change > 0 ? 'green.300' : '#FCA5A5'}>
            24h: {change}%
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default memo(CardItem);
