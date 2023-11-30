import { Box, Button, Flex, Image, Text, Theme, useTheme } from '@chakra-ui/react';
import { PairType } from 'components/ListCoin/type';
import { useGlobal } from 'hooks/useGlobal';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Colors } from 'themes/colors';
import { formatPrice, formatPrice24h } from 'utils/helper';

type Props = any;
const CoinCard = (props: Props) => {
  const { attributes, id } = props;
  const navigate = useNavigate()
  const { onHandlePair } = useGlobal()
  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;

  const onHandleNavigate = () => {
    const _name = attributes.name.replace(/\s/g, '');
    const _newName = _name?.split('/') ?? []
    const paramName = _newName.length > 1 ? `${_newName[0]}-${_newName[1]}` : 'null'

    navigate(`/swap/${attributes.address}/pairs/${id}/name/${paramName}`)

  }

  return (
    <Flex
      direction="column"
      onClick={() => onHandleNavigate()}
      backgroundColor={colors.bgPrimary}
      borderRadius={'16px'}
      cursor='pointer'
      role="group"
      transition=".3s ease all"
      p="15px"
      position="relative"

      _hover={{
        bgColor: '#6d28d930',
        border: '1px solid rgb(80, 80, 80)',
      }}>
      <Box display={'flex'} alignItems="center">
        <Box>
          <Box display={'flex'} flexDirection={'row'}>
            <Box>
              <Image src={`https://storage.googleapis.com/ks-setting-1d682dca/428c44cb-9078-4820-b864-faf20a62c56e.png`} width={'20px'} height={'20px'} />
            </Box>
            <Box>
              <Image src={`https://storage.googleapis.com/ks-setting-1d682dca/b36e57ad-e80b-4ca9-8bf9-4719c6903d7d.png`} width={'20px'} height={'20px'} />
            </Box>
          </Box>
        </Box>
        <Box marginLeft={4}>
          <Text fontSize={'1.6rem'} fontFamily="Work Sans" fontWeight={500}>
            {attributes.name}
          </Text>
        </Box>
        <Box marginLeft={4}>
          <Text fontSize={'1.2rem'} fontWeight={400} backgroundColor={'#1183B733'} borderRadius="10px" padding={'2px 6px'}>
            Fee {0}%
          </Text>
        </Box>
      </Box>

      <Text marginTop={'16px'} lineHeight={1} fontSize={'1.2rem'} color="#A9A9A9">
        Avg APR
      </Text>
      <Text fontWeight={500} fontFamily={'Work Sans'} fontSize={'2.8rem'} color={attributes.price_percent_change.includes('+') ? `rgb(15, 170, 162)` : `red`}>
        {attributes.price_percent_change ?? 0}
      </Text>
      <Box display={'flex'} justifyContent="space-between" borderBottomWidth={'1px'} borderColor="rgb(80, 80, 80)">
        <Box marginBottom={'1.6rem'}>
          <Text marginTop={'16px'} lineHeight={1} fontSize={'1.2rem'} color="#A9A9A9">
            Volume (24H)
          </Text>
          <Text fontWeight={500} fontFamily={'Work Sans'} fontSize={'1.6rem'} color="#FFF">
            ${formatPrice(formatPrice24h(attributes.to_volume_in_usd)) ?? 0}
          </Text>
        </Box>
        <Box>
          <Text marginTop={'16px'} lineHeight={1} fontSize={'1.2rem'} color="#A9A9A9">
            Price (24H)
          </Text>
          <Text fontWeight={500} fontFamily={'Work Sans'} fontSize={'1.6rem'} color="#FFF">
            ${attributes?.price_in_usd?.slice(0, 4) ?? 0}
          </Text>
        </Box>
      </Box>
      <Box display={'flex'} justifyContent="space-between">
        <Box marginBottom={'1.6rem'}>
          <Text marginTop={'16px'} lineHeight={1} fontSize={'1.2rem'} color="#A9A9A9">
            TVL
          </Text>
          <Text fontWeight={500} fontFamily={'Work Sans'} fontSize={'1.6rem'} color={attributes.price_percent_changes.last_24h.includes('+') ? `green` : `red`}>
            {attributes.price_percent_changes.last_24h ?? 0}
          </Text>
        </Box>
        <Box>
          <Text marginTop={'16px'} lineHeight={1} fontSize={'1.2rem'} color="#A9A9A9">
            Total Liqidity
          </Text>
          <Text fontWeight={500} fontFamily={'Work Sans'} fontSize={'1.6rem'} color="#FFF">
            ${formatPrice24h(attributes.reserve_in_usd) ?? 0}
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
    </Flex >
  );
};

export default memo(CoinCard);
