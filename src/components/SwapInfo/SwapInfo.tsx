import { Box, Flex, Text, Theme, useTheme } from '@chakra-ui/react';
import { SVGIcon } from 'components/SVGIcon/SVGIcon';
import { PairInfoContext } from 'models/Pairs';
import { FC } from 'react';
import { Colors } from 'themes/colors';
import { getTitle, trunceHash } from 'utils/helper';

interface Iprop {
  pairInfo: PairInfoContext;
}
const SwapInfo: FC<Iprop> = ({ pairInfo }) => {
  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;
  return (
    <Box bg={colors.bg3} px={4} pb={4} mt={5} mb={2} pt={3} borderRadius={'4px'} position="relative">
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
        fontSize="14px"
        right={0}
        textColor={getTitle(pairInfo.chain)}
        _groupHover={{
          bgColor: colors.primary,
          color: '#fff',
        }}>
        {pairInfo.chain}
      </Box>
      <Flex justify={'space-between'} align="center" marginTop={'16px'}>
        <Box width={'100%'}>
          <Flex align={'center'} flex={1} width={'100%'}>
            <img src={pairInfo.baseAsset.icon} width={48} height={48} />
            <Box ml={3} flex="1">
              <Flex justifyContent={'space-between'} alignItems={'center'}>
                <Text fontSize={'30px'} color={colors.light1} fontWeight="800">
                  {pairInfo.baseAsset.name}
                </Text>
                <SVGIcon name="verified" width={25} height={25} />
              </Flex>
              <Text color={colors.light2} fontSize="16px">
                {pairInfo.name}
              </Text>
            </Box>
          </Flex>
          <Box display={'flex'}>
            <Text fontSize={'16px'} color={colors.dark3} fontWeight="600" fontFamily={'Nunito Sans'}>
              {pairInfo.baseAsset.symbol}:
            </Text>
            <Text ml={2} fontSize={'16px'} color={colors.light2} fontWeight="600" fontFamily={'Ubuntu Mono'} letterSpacing={-0.9}>
              {pairInfo.baseAsset.contractAddress.length > 15 ? trunceHash(pairInfo.baseAsset.contractAddress) : pairInfo.baseAsset.contractAddress}
            </Text>
          </Box>
          <Box display={'flex'}>
            <Text fontSize={'16px'} color={colors.dark3} fontWeight="600" fontFamily={'Nunito Sans'}>
              Pair adress:
            </Text>
            <Text ml={2} fontSize={'16px'} color={colors.light2} letterSpacing={-0.9} fontWeight="600" fontFamily={'Ubuntu Mono'}>
              {trunceHash(pairInfo.pairAddress)}
            </Text>
          </Box>
        </Box>
      </Flex>
      <Flex justify={'space-between'} align={'center'} marginTop={'16px'}>
        <Flex>
          <Box mr={5}>
            <SVGIcon name="link" width={24} height={24} />
          </Box>
          <Box mr={5}>
            <SVGIcon name="telegram" width={24} height={24} />
          </Box>
          <Box mr={5}>
            <SVGIcon name="twitter" width={24} height={24} />
          </Box>
          <Box mr={5}>
            <SVGIcon name="monkey" width={24} height={24} />
          </Box>
          <Box mr={5}>
            <SVGIcon name="media" width={24} height={24} />
          </Box>
        </Flex>
        <Box>
          <Text fontSize={'20px'} color={colors.light1} fontWeight={'600'} fontFamily="Ubuntu Mono" textAlign={'right'}>
            {pairInfo.quoteAsset.nativePrice.toFixed(6)} {pairInfo.quoteAsset.symbol}
          </Text>
          <Text color={'#86EFAC'} fontSize={'16px'} fontFamily="Ubuntu Mono" textAlign={'right'}>
            24h: {pairInfo.quoteAsset.nativePriceChange24h.toFixed(2)}%
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default SwapInfo;
