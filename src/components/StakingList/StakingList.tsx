import { Box, SimpleGrid } from '@chakra-ui/react';
import PricingItem from 'components/PricingItem/PricingItem';
import React, { memo } from 'react';

const list = [
  {
    id: 'intern',
    title: 'intern',
    stake: 25,
    features: ['Realtime prices and charts', 'Pair analytics (volume/liquidity/APR)', '17+ starred pairs', '3+ active price alerts'],
    comming_soon: ['Portfolio tracker', 'Community voting'],
  },
  {
    id: 'enginerr',
    title: 'engineer',
    stake: 100,
    features: [
      'Realtime prices and charts',
      'Pair analytics (volume/liquidity/APR)',
      '17+ starred pairs',
      '3+ active price alerts',
      '530+ historical transactions',
      'New and verified pairs alerts',
    ],
    comming_soon: ['Portfolio tracker', 'Community voting', 'Whale trade alerts '],
  },
  {
    id: 'astronaut',
    title: 'ASTRONAUT',
    stake: 1000,
    features: ['Realtime prices and charts', 'Pair analytics (volume/liquidity/APR)', '17+ starred pairs', '3+ active price alerts', '5,030+ historical transactions'],
    comming_soon: ['Portfolio tracker', 'Community voting', 'Whale trade alerts', 'Early access to new features', 'Exclusive Telegram group'],
  },
];

interface StakingListProps {
  valueStake: number;
}

function StakingList({ valueStake }: StakingListProps) {
  return (
    <Box my={20}>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap="2rem">
        {list.map((i, index) => {
          const selected =
            valueStake === 1000 && i.id === 'astronaut'
              ? true
              : i.id === 'intern'
              ? valueStake >= i.stake && valueStake < 100
              : valueStake >= i.stake && valueStake < 1000;
          return <PricingItem selected={selected} key={index.toString()} title={i.title} comming_soon={i.comming_soon} features={i.features} stake={i.stake} />;
        })}
      </SimpleGrid>
    </Box>
  );
}

export default memo(StakingList);
