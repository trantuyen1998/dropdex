import { Box, Flex, Input, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, useTheme, Theme } from '@chakra-ui/react';
import React, { memo, useEffect, useState } from 'react';
import { Colors } from 'themes/colors';

interface SliderStakeProps {
  onChangeValue: (v: number) => void;
}

function SliderStake({ onChangeValue }: SliderStakeProps) {
  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;

  const [sliderValue, setSliderValue] = React.useState(100);
  const [valueInput, setValueInput] = useState('100');

  const getTextSliderMark = () => {
    if (sliderValue > 25 && sliderValue < 101) {
      return 'Intern';
    }
    if (sliderValue > 100 && sliderValue < 1000) {
      return 'Engineer';
    }
    if (sliderValue < 26) {
      return 'Free';
    }
    if (sliderValue >= 1000) {
      return 'Astronaut';
    }
  };

  useEffect(() => {
    onChangeValue(sliderValue);
  }, [sliderValue]);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setSliderValue(0);
    } else {
      setSliderValue(parseInt(event.target.value));
    }
    setValueInput(event.target.value);
  };

  const handleChangeSlider = (v: number) => {
    setSliderValue(v);
    setValueInput(v.toString());
  };
  return (
    <Box>
      <Slider
        id="slider"
        defaultValue={100}
        min={0}
        value={sliderValue}
        focusThumbOnChange={false}
        max={1000}
        borderRadius="full"
        colorScheme="purple"
        onChange={handleChangeSlider}>
        <SliderTrack background="gray.300" height="1rem" borderRadius="full">
          <SliderFilledTrack />
        </SliderTrack>
        <SliderMark
          value={sliderValue}
          textAlign="center"
          width="112px"
          bg={colors.bg6}
          px={4}
          borderRadius={4}
          color="white"
          bottom="100%"
          padding="4px 0"
          transform="translate(-50%,-100%)"
          textTransform="uppercase"
          {...(sliderValue >= 1000 ? { left: '100% !important' } : {})}>
          {getTextSliderMark()}
        </SliderMark>
        <SliderThumb width={7} height={7} />
      </Slider>
      <Flex justifyContent="center" alignItems="center">
        <Input
          value={valueInput}
          color="#fff"
          borderWidth={1}
          borderColor="gray.600"
          fontWeight="bold"
          width="100px"
          height="40px"
          outline="none"
          textAlign="right"
          margin={'10px 0'}
          _focus={{
            outline: 'none !important',
          }}
          fontSize="2rem"
          maxLength={5}
          backgroundColor="#182033"
          onChange={handleChangeInput}
        />
        <Text fontFamily="Work Sans" color={colors.light1} fontWeight="bold" fontSize="24px" ml="10px">
          Kyltn Staked
        </Text>
      </Flex>
    </Box>
  );
}

export default memo(SliderStake);
