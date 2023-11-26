import { Box, Container, Flex, SimpleGrid, Stat, StatLabel, StatNumber, Text, Theme, useTheme } from '@chakra-ui/react';
import SliderStake from 'components/SliderStake/SliderStake';
import StakingList from 'components/StakingList/StakingList';
import React, { useEffect, useState } from 'react';
import { Colors } from 'themes/colors';

export default function Subscribe() {
  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;
  const [stats, setStats] = useState([12, 0, 30, 0.1]);
  const [coinStatke, setCoinStake] = useState(0);
  const getTextStats = (index: number) => {
    switch (index) {
      case 0:
        return 'Starred Pairs';
      case 1:
        return 'Price Alerts';
      case 2:
        return 'Historical Txs';
      case 3:
        return 'Kyltnswap Fee';
      default:
        return '';
    }
  };
  useEffect(() => {
    const newStats = stats.map((i) => Math.random());
    setStats(newStats);
  }, [coinStatke]);

  return (
    <Container>
      <Box maxW={'1000px'} mx="auto">
        <Flex my={{ base: 24, sm: 32 }} height="100%" flexDir="column" justifyContent="center" alignItems="center">
          <Text
            fontWeight={800}
            fontFamily="Work Sans"
            textAlign="center"
            fontSize={{ base: 35, md: 60 }}
            color={colors.light1}
            lineHeight={{ base: '35px', md: '60px' }}>
            Stake-to-Subscribe
          </Text>
          <Text fontFamily="Work Sans" textAlign="center" my="20px" fontSize={'20px'} lineHeight="32px" fontWeight={400} color={colors.light2} maxWidth="580px">
            Enjoy premium features on top of Cosmos staking rewards (~10% APR) by staking with our validator
          </Text>
        </Flex>
        <Box>
          <SliderStake onChangeValue={setCoinStake} />
          <SimpleGrid columns={{ base: 2, md: 4 }} gap="0.5rem" my={5}>
            {stats.map((i, index) => (
              <Stat key={index.toString()} px={4} py={3} backgroundColor="#182033" borderRadius={4}>
                <StatLabel fontFamily="Work Sans" fontSize={{ base: 16, md: 18 }} fontWeight="500" color={colors.dark1}>
                  {getTextStats(index)}
                </StatLabel>
                <StatNumber color={colors.light1} fontSize={{ base: 14, md: 24 }} fontWeight={700} display="flex" alignItems="center" mt={1}>
                  {i.toFixed(2)}
                  {index === 3 && (
                    <Text fontSize={{ base: 16, md: 20 }} fontFamily="Work Sans" ml="5px">
                      UST
                    </Text>
                  )}
                </StatNumber>
              </Stat>
            ))}
          </SimpleGrid>
          <StakingList valueStake={coinStatke} />
        </Box>
      </Box>
    </Container>
  );
}
