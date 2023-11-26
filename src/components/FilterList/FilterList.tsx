import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Theme,
  useTheme,
  ButtonGroup,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Button,
  Image,
  Wrap,
  WrapItem,
  Box,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Text,
  ModalOverlay,
  ModalProps,
  useDisclosure,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import ListCoin from 'components/ListCoin/ListCoin';
import { Option } from 'models/Options';
import { QueryPair } from 'models/Pairs';
import React, { memo, useEffect, useState } from 'react';
import { Colors } from 'themes/colors';
import { v4 as uuid } from 'uuid';
import ModalFilterSetting from 'components/ModalFilterSetting/ModalFilterSetting';
import { useLocation } from 'react-router-dom';

const tabs: Option[] = [
  { id: uuid(), title: 'Top', value: 'top' },
  { id: uuid(), title: 'All', value: 'all' },
  { id: uuid(), title: 'New', value: 'new' },
  { id: uuid(), title: 'Starred', value: 'starred' },
];
const tabs2 = [
  { id: 0, title: 'Juno', icon: 'https://coinhall.org/assets/chain_logos/juno.png', value: 'Juno' },
  { id: 1, title: 'Osmosis', icon: 'https://coinhall.org/assets/chain_logos/osmo.svg', value: 'Osmosis' },
];

const options1: Option[] = [
  {
    id: uuid(),
    title: 'Market Cap',
    value: 'mcap',
  },
  {
    id: uuid(),
    title: 'Fully Diluted Val.',
    value: 'fdv',
  },
  {
    id: uuid(),
    title: 'Volume (24h)',
    value: 'vol24h',
  },
  {
    id: uuid(),
    title: '% Change (24h)',
    value: 'change24h',
  },
  {
    id: uuid(),
    title: 'Liquidity',
    value: 'liq',
  },
];
const options2 = [
  {
    id: uuid(),
    title: 'All',
    value: 'all',
  },
  {
    id: uuid(),
    title: 'Derivatives',
    value: 'derivatives',
  },
  {
    id: uuid(),
    title: 'mAssets',
    value: 'massets',
  },
  {
    id: uuid(),
    title: 'Prism',
    value: 'prism',
  },
];

interface FilterListProps {
  onChangeValue: (value: QueryPair) => void;
  loading: boolean;
}

function FilterList({ onChangeValue, loading }: FilterListProps) {
  const theme = useTheme<Theme>();
  const { getButtonProps, getDisclosureProps, isOpen, onClose, onOpen } = useDisclosure();
  const colors = theme.colors as Colors;
  const [indexTab, setIndexTab] = useState(0);
  const [chains, setChains] = useState<string[]>(['Juno', 'Osmosis']);
  // const [chains, setChains] = useState<string[]>(['Terra Classic', 'Terra 2.0', 'Juno', 'Near', 'Osmosis', 'Kujira']);
  const [selected, setSelected] = useState<Option>(options1[0]);
  const [selectedAll, setSelectedAll] = useState<Option>(options2[0]);
  const [limit, setLimit] = useState<number>(24);
  const [verified, setVerified] = useState<boolean>(true);
  const [filterObj, setFilterObj] = useState<QueryPair>({
    // chains: ['Terra Classic', 'Terra 2.0', 'Juno', 'Near', 'Osmosis', 'Kujira'],
    chains: ['Juno', 'Osmosis'],
    sortDir: 'desc',
    sortBy: selected.value,
    filterBy: 'all',
    limit: 24,
    verified: true,
  });
  const { pathname } = useLocation();

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'KeyK' && event.metaKey) {
        onOpen();
      }
    });
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  useEffect(() => {
    onChangeValue(filterObj);
  }, [filterObj]);

  const handleTabsChange = (index: number) => {
    setIndexTab(index);
    onChangeValue({ ...filterObj, tab: tabs[index].value, offset: 0 });
  };

  const handleChangePage = (value: number) => {
    setLimit(value);
    setFilterObj((prev) => ({
      ...prev,
      limit: value,
    }));
  };

  const handleChangeVerified = (e) => {
    setVerified(e);
    setFilterObj((prev) => ({
      ...prev,
      verified: e,
    }));
  };

  const handleSelectedSortBy = (opt: Option) => () => {
    setSelected(opt);
    setFilterObj((prev) => ({
      ...prev,
      sortBy: opt.value,
      offset: 0,
    }));
  };

  const handleSelectedFilterBy = (opt: Option) => () => {
    setSelectedAll(opt);
    setFilterObj((prev) => ({
      ...prev,
      filterBy: opt.value,
      offset: 0,
    }));
  };

  const handleSort = () => {
    if (filterObj.sortDir === 'asc') {
      setFilterObj((prev) => ({
        ...prev,
        sortDir: 'desc',
        offset: 0,
      }));
    } else {
      setFilterObj((prev) => ({
        ...prev,
        sortDir: 'asc',
        offset: 0,
      }));
    }
  };

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
    const filterValue = newChange.filter((item) => item);
    setFilterObj((prev) => ({
      ...prev,
      chains: filterValue,
    }));
  };

  return (
    <Tabs variant="unstyled" mb={4} width="100%" index={indexTab} onChange={handleTabsChange} isLazy>
      <Wrap spacing={2} px={4}>
        {tabs2.map((val, indx) => (
          <WrapItem key={indx} bg={!!chains[indx] ? colors.bg6 : 'transparent'} borderRadius={'4px'}>
            <Button colorScheme={colors.bg6} padding={'8px 12px'} onClick={() => handleChangeChains(val.value, indx)}>
              <Image src={val.icon} alt="icon" width="20px" height="20px" mr={2} />
              {val.title}
            </Button>
          </WrapItem>
        ))}
      </Wrap>
      <TabList px="14px" mt={4}>
        {tabs.map((i) => (
          <Tab
            _selected={{ color: colors.light3, bgColor: colors.bg6, borderRadius: 4, fontWeight: 800 }}
            fontSize={'1.125rem'}
            padding={'8px 12px'}
            fontWeight={600}
            fontFamily="Nunito Sans"
            key={i.id}
            onClick={() => {}}
            mr={2}>
            <Text fontFamily="Nunito Sans">{i.title}</Text>
          </Tab>
        ))}
      </TabList>
      <Flex justifyContent="space-between" flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }} mt={4} px="14px">
        {((indexTab == 1 || indexTab == 0) && (
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} mb={{ base: '10px', md: '0' }}>
            <Menu>
              {({ isOpen: isOpenMenu }) => (
                <>
                  <ButtonGroup
                    position="relative"
                    border={isOpenMenu ? `2px solid ${colors.primary}` : `none`}
                    isAttached
                    variant="outline"
                    borderRadius={4}
                    bgColor={'#172033'}>
                    <IconButton
                      border="none"
                      width="50px"
                      py="20px"
                      _hover={{ bgColor: colors.primary }}
                      aria-label="sort list"
                      onClick={handleSort}
                      icon={
                        filterObj.sortDir === 'asc' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={colors.light1} strokeWidth="1.2" width={'20px'} height={'20px'}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path>
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={colors.light1} strokeWidth="1.2" width={'20px'} height={'20px'}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
                          </svg>
                        )
                      }
                    />
                    <Button
                      px={4}
                      py={2}
                      as={MenuButton}
                      border={isOpenMenu ? `2px solid ${colors.primary}` : `red`}
                      color={colors.light1}
                      _hover={{ bgColor: colors.primary }}
                      _active={{ bgColor: isOpenMenu ? colors.primary : 'none', border: `2px solid ${colors.primary}` }}
                      fontWeight={500}
                      fontFamily={'sans-serif'}
                      borderLeft="1px solid rgb(30 41 59)">
                      {selected?.title}
                    </Button>
                  </ButtonGroup>
                  <MenuList
                    rootProps={{
                      inset: '0px auto auto -50px !important',
                    }}
                    zIndex={10}
                    minWidth={0}
                    bgColor={colors.bgPrimary}
                    borderColor="rgb(30 41 59)"
                    boxShadow="lg"
                    borderWidth={1}
                    fontFamily="Nunito Sans"
                    width="170px">
                    {options1?.map((f) => (
                      <MenuItem
                        _hover={{ bgColor: colors.primary }}
                        _focus={{ backgroundColor: 'transparent' }}
                        color={colors.white}
                        key={f.id}
                        onClick={handleSelectedSortBy(f)}>
                        {f.title}
                      </MenuItem>
                    ))}
                  </MenuList>
                </>
              )}
            </Menu>
            {indexTab == 1 && (
              <Menu>
                {({ isOpen: isOpenAll }) => (
                  <>
                    <MenuButton
                      as={Button}
                      bg={'#172033'}
                      color={'#fff'}
                      variant="outline"
                      _hover={{ bgColor: colors.primary }}
                      fontSize="16px"
                      fontFamily={'Nunito Sans'}
                      border={'none'}
                      _active={{ bgColor: isOpenAll ? colors.primary : 'initial' }}
                      borderRadius={'4px'}>
                      <Box display="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="1.2"
                          className="h-5 w-5"
                          style={{ marginRight: '8px' }}
                          width="20px"
                          height="20px">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                        </svg>
                        {selectedAll?.title}
                      </Box>
                    </MenuButton>
                    <MenuList
                      rootProps={{
                        inset: '0px auto auto -50px !important',
                      }}
                      minWidth={0}
                      bgColor={colors.bgPrimary}
                      borderColor="rgb(30 41 59)"
                      boxShadow="lg"
                      borderWidth={1}
                      width="170px">
                      {options2?.map((f, i) => (
                        <MenuItem
                          _hover={{ bgColor: colors.primary }}
                          _focus={{ backgroundColor: 'transparent' }}
                          color={colors.white}
                          key={i}
                          onClick={handleSelectedFilterBy(f)}>
                          {f.title}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </>
                )}
              </Menu>
            )}
          </Stack>
        )) || <Box></Box>}

        <Button
          py="20px"
          color={colors.light1}
          fontSize={16}
          leftIcon={<SettingsIcon color={colors.light1} />}
          _hover={{ bgColor: colors.primary }}
          onClick={onOpen}
          bgColor={colors.primary}>
          Setting
        </Button>
      </Flex>
      {loading ? (
        <Center height="100vh">
          <Spinner size="xl" />
        </Center>
      ) : (
        <TabPanels>
          {tabs.map((i) => {
            return (
              <TabPanel key={i.id}>
                <ListCoin
                  loading
                  onChangeFilter={(params) =>
                    setFilterObj((prev) => ({
                      ...prev,
                      ...params,
                    }))
                  }
                  isReset={filterObj.offset === 0}
                />
              </TabPanel>
            );
          })}
        </TabPanels>
      )}

      <ModalFilterSetting
        isOpen={isOpen}
        onClose={onClose}
        children={undefined}
        limit={limit}
        setLimit={handleChangePage}
        verified={verified}
        setVerified={handleChangeVerified}
      />
    </Tabs>
  );
}

export default memo(FilterList);
