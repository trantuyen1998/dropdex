import { Box, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Switch, Text } from '@chakra-ui/react';
import React, { memo, useEffect, useState } from 'react';

interface DashboardSettingsProps {
  onChangeItemDisplay?: (v: number) => void;
  onShowUSD?: (v: boolean) => void;
  defaultValue?: number;
}

function DashboardSettings({ onChangeItemDisplay, onShowUSD, defaultValue }: DashboardSettingsProps) {
  const [sliderValue, setSliderValue] = useState(12);

  useEffect(() => {
    setSliderValue(defaultValue ?? 0);
  }, [defaultValue]);

  const handleChangeSlider = (v: number) => {
    setSliderValue(v);
    onChangeItemDisplay?.(v);
  };
  return (
    <Box>
      <Text fontSize="20px" fontWeight="bold" mb="10px" color="white">
        Dashboard Settings
      </Text>
      <Stack direction="row" justifyContent="space-between" alignItems="center" bgColor="#1E2A3B" padding="10px" borderRadius={8}>
        <Box>
          <Text color="#fff" fontSize={18}>
            Show USD prices
          </Text>
          <Text fontSize={14}>Prices are quoted natively</Text>
        </Box>
        <Switch colorScheme="purple" />
      </Stack>
      <Box padding="10px" borderRadius={8} my="10px" bgColor="#1e2a3b">
        <Text fontSize={16} mb="10px">
          Pairs per page
        </Text>
        <Flex alignItems="center" pl="10px">
          <Slider step={6} min={12} max={36} value={sliderValue} onChange={handleChangeSlider}>
            <SliderTrack>
              <SliderFilledTrack bgColor="purple.600" />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <Text color="#fff" ml="10px">
            {sliderValue}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}

export default memo(DashboardSettings);
