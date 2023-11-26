import { Box, Theme, useTheme, Text, Flex } from '@chakra-ui/react';
import { SVGIcon } from 'components/SVGIcon/SVGIcon';
import { PairInfoContext } from 'models/Pairs';
import React, { FC } from 'react';
import { Colors } from 'themes/colors';

const volumeData = [
  { title: 'Market Cap', value: '488,296,460.75' },
  { title: 'Fully Diluted Valuation', value: '488,296,460.75' },
  { title: 'Total Liquidity', value: '488,296,460.75' },
  { title: 'Volume (24h)', value: '488,296,460.75' },
  { title: 'Pool APR (7d Estimate)', value: '488,296,460.75' },
];
interface Iprop {
  pairInfo: PairInfoContext;
}
const currency = 'UST';
const Volume: FC<Iprop> = ({ pairInfo }) => {
  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;
  return (
    <Box bg={colors.bg3} px={'16px'} py={'12px'} borderRadius="4px" ml={{ md: 3 }} mt={{ sm: 5 }}>
      <Box>
        <Flex display={'flex'} align="center" fontSize={'16px'} fontWeight="600" fontFamily={'Nunito Sans'} color={colors.dark1}>
          Market Cap &nbsp; <SVGIcon name="info" width={16} height={16} />
        </Flex>
        <Text color={colors.light1} fontSize={'18px'} fontFamily="Ubuntu Mono" fontWeight={700}>
          {pairInfo?.meta?.mcap || '-'}
        </Text>
      </Box>
      <Box>
        <Flex display={'flex'} align="center" fontSize={'16px'} fontWeight="600" fontFamily={'Nunito Sans'} color={colors.dark1}>
          Fully Diluted Valuation &nbsp;
          <SVGIcon name="info" width={16} height={16} />
        </Flex>
        <Text color={colors.light1} fontSize={'18px'} fontFamily="Ubuntu Mono" fontWeight={700}>
          {pairInfo?.meta?.fdvMcap || '-'}
        </Text>
      </Box>
      <Box>
        <Flex display={'flex'} align="center" fontSize={'16px'} fontWeight="600" fontFamily={'Nunito Sans'} color={colors.dark1}>
          Total Liquidity &nbsp;
          <SVGIcon name="info" width={16} height={16} />
        </Flex>
        <Text color={colors.light1} fontSize={'18px'} fontFamily="Ubuntu Mono" fontWeight={700}>
          {pairInfo?.meta?.totalLiquidity || '-'}
        </Text>
      </Box>
      <Box>
        <Flex display={'flex'} align="center" fontSize={'16px'} fontWeight="600" fontFamily={'Nunito Sans'} color={colors.dark1}>
          Volume (24h) &nbsp;
        </Flex>
        <Text color={colors.light1} fontSize={'18px'} fontFamily="Ubuntu Mono" fontWeight={700}>
          {pairInfo?.meta?.volume24h || '-'}
        </Text>
      </Box>
      <Box>
        <Flex display={'flex'} align="center" fontSize={'16px'} fontWeight="600" fontFamily={'Nunito Sans'} color={colors.dark1}>
          Pool APR (7d Estimate) &nbsp;
        </Flex>
        <Text color={colors.light1} fontSize={'18px'} fontFamily="Ubuntu Mono" fontWeight={700}>
          {pairInfo?.meta?.apr7d || '-'}
        </Text>
      </Box>
    </Box>
  );
};

export default Volume;
