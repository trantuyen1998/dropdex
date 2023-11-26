import {
  Box,
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalProps,
  Text,
  Theme,
  useTheme,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useSearchPairs } from 'hooks/useSearchPair';
import { debounce, isEmpty, mapValues } from 'lodash';
import { QueryPair } from 'models/Pairs';
import { useSearchStore } from 'pages/Pairs/store/useSearchStore';
import React, { useEffect, useState } from 'react';
import { Colors } from 'themes/colors';

interface ModalSearchProps extends ModalProps {
  // chains: string[];
  // handleChangeChains: (val: string, index: number) => void;
  // tabs2: any;
}
const tabs2 = [
  // { id: 1, title: 'Terra Classic', icon: 'https://coinhall.org/assets/chain_logos/lunc.svg', value: 'Terra Classic' },
  // { id: 2, title: 'Terra 2.0', icon: 'https://coinhall.org/assets/chain_logos/luna.png', value: 'Terra 2.0' },
  { id: 0, title: 'Juno', icon: 'https://coinhall.org/assets/chain_logos/juno.png', value: 'Juno' },
  // { id: 4, title: 'Near', icon: 'https://coinhall.org/assets/chain_logos/near.svg', value: 'Near' },
  { id: 1, title: 'Osmosis', icon: 'https://coinhall.org/assets/chain_logos/osmo.svg', value: 'Osmosis' },
  // { id: 6, title: 'Kujira', icon: 'https://coinhall.org/assets/chain_logos/kuji.svg', value: 'Kujira' },
];

export default function ModalSearch({ ...props }: ModalSearchProps) {
  const theme = useTheme<Theme>();
  const { seachPairs, setSearchPairs } = useSearchStore();
  const colors = theme.colors as Colors;
  // const [chains, setChains] = useState<string[]>(['Terra Classic', 'Terra 2.0', 'Juno', 'Near', 'Osmosis', 'Kujira']);
  const [chains, setChains] = useState<string[]>(['Juno', 'Osmosis']);
  const [filterObj, setFilterObj] = useState<QueryPair>({
    chains: ['Juno', 'Osmosis'],
    // chains: ['Terra Classic', 'Terra 2.0', 'Juno', 'Near', 'Osmosis', 'Kujira'],
    limit: 10,
    search: '',
  });
  const [textInput, setTextInput] = useState<string>();

  const getSearchPairQuery = useSearchPairs(filterObj);
  useEffect(() => {
    if (getSearchPairQuery.data && !isEmpty(getSearchPairQuery.data)) {
      setSearchPairs(getSearchPairQuery.data);
    }
  }, [getSearchPairQuery.data]);

  const handleChangeChains = (value, indx) => {
    let newChange: string[] = [...chains];
    const valueReset = [...newChange].filter((item) => item);

    if (newChange[indx]) {
      newChange[indx] = '';
      if (valueReset.length == 1) {
        newChange = tabs2.map((item) => item.value);
      }
    } else {
      newChange[indx] = value;
    }
    setChains(newChange);
  };

  const handleChangeInput = (e) => {
    const value = e.target.value;
    setTextInput(value);
    setTimeout(() => {
      const filterValue = chains.filter((item) => item);
      setFilterObj((prev) => ({
        ...prev,
        chains: filterValue,
        search: textInput,
      }));
    }, 500);
  };
  const OverlayOne = () => <ModalOverlay backdropFilter="blur(5px)" />;
  return (
    <Modal isCentered preserveScrollBarGap blockScrollOnMount={false} {...props}>
      {OverlayOne()}
      <ModalContent position="relative" maxHeight="70vh" w="90vw" maxW="36rem" bgColor={colors.bgPrimary} border={'0.5px solid #56545d'}>
        <Input
          autoComplete="off"
          autoFocus
          autoCapitalize="off"
          placeholder="Search name/ contract/ pair address"
          bgColor={colors.bgSecondary}
          width="100%"
          variant="unstyled"
          height="60px"
          fontFamily={'Nunito Sans'}
          fontWeight={600}
          py={3}
          px={4}
          borderTopRadius="inherit"
          borderBottomRadius="none"
          fontSize="20px"
          onChange={handleChangeInput}
          value={textInput}
        />
        <ModalCloseButton
          position="absolute"
          top={-5}
          right={-5}
          borderRadius="full"
          color="#333"
          bgColor="#94A3B8"
          _hover={{
            bgColor: '#94A3B8',
          }}
        />
        <ModalBody display="flex" justifyContent="center" alignItems="center" p="12px">
          <Wrap spacing={2}>
            {tabs2.map((val, indx) => (
              <WrapItem bg={!!chains[indx] ? colors.bg6 : 'transparent'} borderRadius={'4px'} key={indx}>
                <Button colorScheme={colors.bg6} padding={'8px 12px'} onClick={() => handleChangeChains(val.value, indx)}>
                  <Image src={val.icon} alt="icon" width="20px" height="20px" mr={2} />
                  {val.title}
                </Button>
              </WrapItem>
            ))}
          </Wrap>
        </ModalBody>
        <ModalBody display="flex" justifyContent="center" bgColor={'#1E2A3D'} minH={'100px'} alignItems="center" p="12px">
          <Box fontFamily={'Nunito Sans'} fontWeight={600}>
            Nothing Found
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
