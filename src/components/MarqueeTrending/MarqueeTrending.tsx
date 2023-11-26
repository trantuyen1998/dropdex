import { Image, Link, Text, Theme, useTheme } from '@chakra-ui/react';
import { TrendingCoin } from 'components/Trending/Trending';
import React from 'react';
import Marquee from 'react-fast-marquee';
import { Colors } from 'themes/colors';

interface MarqueeTrendingProps {
  data: TrendingCoin[];
}

export default function MarqueeTrending({ data }: MarqueeTrendingProps) {
  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;
  return (
    <Marquee play gradient={false} pauseOnClick loop={0}>
      {data?.map((item: any, index) => (
        <Link
          display="flex"
          alignItems="center"
          justifyContent="center"
          key={index.toString()}
          px={3}
          py="6px"
          transition=".3s ease all"
          _hover={{
            bgColor: colors.primary,
            borderRadius: 4,
            color: '#fff',
          }}>
          <Text mr={1}>#{index + 1}</Text>
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
          <Text mx={1} fontWeight={700} textTransform="uppercase">
            {item[item.defaultBase].symbol}/{item[item.defaultBase === 'asset0' ? 'asset1' : 'asset0'].symbol}
          </Text>
        </Link>
      ))}
    </Marquee>
  );
}
