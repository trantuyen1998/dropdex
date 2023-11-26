import { Box, Button, Flex, Stack, Text, Theme, useTheme } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { memo } from 'react';
import { Colors } from 'themes/colors';

interface PricinItemProps {
  title?: string;
  stake?: number;
  features?: string[];
  comming_soon?: string[];
  id?: string;
  selected?: boolean;
}

function PricingItem({ title, stake, features, comming_soon, selected }: PricinItemProps) {
  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;

  return (
    <Flex
      as={motion.div}
      direction="column"
      py={8}
      px={3}
      bgColor={colors.bgPrimary}
      borderRadius={4}
      animate={{
        scale: selected ? 1.1 : 1,
        border: selected ? `2px solid ${colors.primary}` : 'none',
      }}>
      <Text color={colors.light1} textAlign="center" textTransform="uppercase" fontWeight="bold" my={3} fontSize={20}>
        {title}
      </Text>
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
        <Text fontSize={48} color={colors.light1} fontWeight="bold">
          {stake}+
        </Text>
        <Text as="div" fontSize={14} color={colors.dark1}>
          <p>Luna</p>
          <p>Staked</p>
        </Text>
      </Stack>
      <Button color={colors.light5} fontSize={20} fontWeight="bold" borderRadius={4} backgroundColor={colors.bg6} _hover={{ bgColor: colors.secondary }} my="2rem">
        Stake Now
      </Button>
      <Box>
        <Text fontSize={16} color={colors.light1} fontWeight="semibold" marginY="10px">
          Key features
        </Text>
        {features?.map((i, index) => (
          <Text fontSize={16} as="li" key={index.toString()} color={colors.light1} listStyleType="initial">
            {i}
          </Text>
        ))}
      </Box>
      <Box mt="20px">
        <Text fontSize={16} color={colors.dark1} fontWeight="semibold" marginY="10px">
          Coming soon
        </Text>
        {comming_soon?.map((i, index) => (
          <Text fontSize={16} as="li" color={colors.dark1} key={index.toString()} fontWeight="semibold" listStyleType="initial">
            {i}
          </Text>
        ))}
      </Box>
    </Flex>
  );
}

export default memo(PricingItem);
