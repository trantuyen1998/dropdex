import {
  Box,
  Button,
  ButtonGroup, Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Theme,
  useDisclosure,
  useTheme
} from '@chakra-ui/react';
import ListCoin from 'components/ListCoin/ListCoin';
import ListCointTable from 'components/ListCoin/ListCointTable';
import ModalFilterSetting from 'components/ModalFilterSetting/ModalFilterSetting';
import useWindowDimensions from 'hooks/useDimension';
import { Option } from 'models/Options';
import { QueryPair } from 'models/Pairs';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Colors } from 'themes/colors';
import { v4 as uuid } from 'uuid';




const options1: Option[] = [
  {
    id: uuid(),
    title: 'AVG APR ↑',
    value: 'mcap',
    direction: true,
  },
  {
    id: uuid(),
    title: 'AVG APR ↓',
    value: 'fdv',
    direction: false,
  },
  {
    id: uuid(),
    title: 'TVL ↑',
    value: 'vol24h',
    direction: true,
  },
  {
    id: uuid(),
    title: 'TVL ↓',
    value: 'vol24h',
    direction: false,
  },
  {
    id: uuid(),
    title: 'VOLUME ↑',
    value: 'vol24h',
    direction: true,
  },
  {
    id: uuid(),
    title: 'VOLUME ↓',
    value: 'vol24h',
    direction: false,
  },
  {
    id: uuid(),
    title: 'FEES ↑',
    value: 'liq',
    direction: true,
  },
  {
    id: uuid(),
    title: 'FEES ↓',
    value: 'liq',
    direction: false,
  },
  {
    id: uuid(),
    title: 'LIQUIDITY ↑',
    value: 'liq',
    direction: true,
  },
  {
    id: uuid(),
    title: 'LIQUIDITY ↓',
    value: 'liq',
    direction: false,
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
  pairs: Array<any>
}

function FilterCoinList({ onChangeValue, pairs, loading }: FilterListProps) {
  const theme = useTheme<Theme>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const windowDimensions = useWindowDimensions();
  const colors = theme.colors as Colors;
  const [indexTab, setIndexTab] = useState(0);
  const [chains, setChains] = useState<string[]>(['Juno', 'Osmosis']);
  const [selected, setSelected] = useState<Option>(options1[0]);
  const [selectedAll, setSelectedAll] = useState<Option>(options2[0]);
  const [limit, setLimit] = useState<number>(24);
  const [verified, setVerified] = useState<boolean>(true);
  const [filterObj, setFilterObj] = useState<QueryPair>({
    chains: ['Juno', 'Osmosis'],
    sortDir: 'desc',
    sortBy: selected.value,
    filterBy: 'all',
    limit: 24,
    verified: true,
  });

  const [isTable, setIsTable] = useState<boolean>(false);

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

  const renderCoin = () => {
    if (windowDimensions.width > 1440) {
      if (isTable) {
        return (
          <ListCointTable
            pairs={pairs}
            loading={false}
            onChangeFilter={(params) =>
              setFilterObj((prev) => ({
                ...prev,
                ...params,
              }))
            }
            isReset={filterObj.offset === 0}
          />
        );
      } else {
        return (
          <ListCoin
            pairs={pairs}
            loading={false}
            onChangeFilter={(params) =>
              setFilterObj((prev) => ({
                ...prev,
                ...params,
              }))
            }
            isReset={filterObj.offset === 0}
          />
        );
      }
    } else {
      return (
        <ListCoin
          pairs={pairs}
          loading={false}
          onChangeFilter={(params) =>
            setFilterObj((prev) => ({
              ...prev,
              ...params,
            }))
          }
          isReset={filterObj.offset === 0}
        />
      );
    }
  };
  return (
    <Tabs variant="unstyled" mb={4} width="100%" index={indexTab} onChange={handleTabsChange} isLazy>
      <Box
        padding={'0 16px'}
        display="flex"
        alignItems={windowDimensions.width > 680 ? 'center' : 'flex-start'}
        justifyContent="space-between"
        flexDirection={windowDimensions.width < 680 ? 'column' : 'row'}>
        <Box display="flex" alignItems={'center'}>
          <Box
            padding={'6px 12px'}
            background="#313131"
            borderRadius={'999px'}
            cursor="pointer"
            color={'#fff'}
            fontSize="1.4rem"
            fontWeight={500}
            _pressed={{
              background: '#313131',
            }}
            _active={{ background: '#313131' }}
            fontFamily={'Work Sans'}>
            All
          </Box>
          <Box
            padding={'12px 12px'}
            borderRadius={'999px'}
            display="flex"
            cursor="pointer"
            alignItems={'center'}
            color={'#a9a9a9'}
            minHeight="36px"
            fontWeight={500}
            marginLeft="10px"
            fontFamily={'Work Sans'}>
            <svg color="#a9a9a9" width="16" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.1111 16.983V17.8664H5.90553V16.983C5.89939 16.6669 6.0035 16.3585 6.19997 16.1108L8.09442 13.7441H11.9222C12.4833 14.4441 13.3333 15.5553 13.8111 16.1108C14.0087 16.3582 14.1147 16.6664 14.1111 16.983Z"
                fill="currentColor"></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.95004 5.55534C7.95003 6.23085 7.74979 6.89121 7.37461 7.45296C6.99942 8.01471 6.46614 8.45263 5.84215 8.71139C5.21816 8.97015 4.53147 9.03814 3.86885 8.90676C3.20623 8.77537 2.59743 8.45052 2.11938 7.97324C1.64133 7.49597 1.31549 6.8877 1.18303 6.2253C1.05057 5.56289 1.11744 4.87609 1.37519 4.25168C1.63294 3.62727 2.06999 3.09328 2.63113 2.71718C3.19227 2.34109 3.8523 2.13977 4.52781 2.13867C5.43448 2.13867 6.3041 2.49846 6.94573 3.13905C7.58736 3.77964 7.94856 4.64867 7.95004 5.55534Z"
                fill="currentColor"></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.889 5.55534C18.889 6.23109 18.6886 6.89167 18.3132 7.45354C17.9378 8.01541 17.4041 8.45333 16.7798 8.71193C16.1555 8.97053 15.4685 9.03819 14.8058 8.90636C14.143 8.77452 13.5342 8.44912 13.0564 7.97129C12.5786 7.49346 12.2531 6.88467 12.1213 6.2219C11.9895 5.55913 12.0571 4.87215 12.3157 4.24784C12.5743 3.62352 13.0123 3.08991 13.5741 2.71448C14.136 2.33906 14.7966 2.13867 15.4723 2.13867C16.378 2.14014 17.2462 2.50058 17.8867 3.14101C18.5271 3.78144 18.8875 4.64963 18.889 5.55534Z"
                fill="currentColor"></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.889 10.3442V11.7109C18.8893 11.8007 18.8718 11.8897 18.8375 11.9726C18.8032 12.0556 18.7527 12.1309 18.689 12.1942C18.6261 12.2584 18.5508 12.3093 18.4677 12.3436C18.3847 12.378 18.2955 12.3952 18.2056 12.3942H1.79453C1.70748 12.3984 1.62044 12.3854 1.53845 12.3558C1.45645 12.3263 1.38111 12.2808 1.31676 12.222C1.2489 12.1558 1.19558 12.0761 1.16019 11.9881C1.1248 11.9001 1.10812 11.8057 1.1112 11.7109V10.3442H18.889Z"
                fill="currentColor"></path>
            </svg>
            <Text marginLeft={'5px'} fontFamily="Work Sans" fontSize="1.4rem">
              Stablecoins
            </Text>
          </Box>
        </Box>
        <Box
          marginTop={windowDimensions.width > 680 ? 0 : '10px'}
          marginBottom={windowDimensions.width > 680 ? 0 : '10px'}
          display={'flex'}
          alignItems={windowDimensions.width > 680 ? 'center' : undefined}
          flexDirection={windowDimensions.width > 680 ? 'row' : 'column'}>
          <Box display={'flex'} alignItems="center" marginRight={'16px'}>
            <Box margin={'0 5px'} cursor="pointer" onClick={() => setIsTable(true)}>
              <svg color={isTable ? '#6d28d9' : '#313131'} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1061_37524)">
                  <path
                    d="M4.66667 16.3334H7C7.64167 16.3334 8.16667 15.8084 8.16667 15.1667V12.8334C8.16667 12.1917 7.64167 11.6667 7 11.6667H4.66667C4.025 11.6667 3.5 12.1917 3.5 12.8334V15.1667C3.5 15.8084 4.025 16.3334 4.66667 16.3334ZM4.66667 22.1667H7C7.64167 22.1667 8.16667 21.6417 8.16667 21V18.6667C8.16667 18.025 7.64167 17.5 7 17.5H4.66667C4.025 17.5 3.5 18.025 3.5 18.6667V21C3.5 21.6417 4.025 22.1667 4.66667 22.1667ZM4.66667 10.5H7C7.64167 10.5 8.16667 9.97504 8.16667 9.33337V7.00004C8.16667 6.35837 7.64167 5.83337 7 5.83337H4.66667C4.025 5.83337 3.5 6.35837 3.5 7.00004V9.33337C3.5 9.97504 4.025 10.5 4.66667 10.5ZM10.5 16.3334H23.3333C23.975 16.3334 24.5 15.8084 24.5 15.1667V12.8334C24.5 12.1917 23.975 11.6667 23.3333 11.6667H10.5C9.85833 11.6667 9.33333 12.1917 9.33333 12.8334V15.1667C9.33333 15.8084 9.85833 16.3334 10.5 16.3334ZM10.5 22.1667H23.3333C23.975 22.1667 24.5 21.6417 24.5 21V18.6667C24.5 18.025 23.975 17.5 23.3333 17.5H10.5C9.85833 17.5 9.33333 18.025 9.33333 18.6667V21C9.33333 21.6417 9.85833 22.1667 10.5 22.1667ZM9.33333 7.00004V9.33337C9.33333 9.97504 9.85833 10.5 10.5 10.5H23.3333C23.975 10.5 24.5 9.97504 24.5 9.33337V7.00004C24.5 6.35837 23.975 5.83337 23.3333 5.83337H10.5C9.85833 5.83337 9.33333 6.35837 9.33333 7.00004Z"
                    fill="currentColor"></path>
                </g>
                <defs>
                  <clipPath id="clip0_1061_37524">
                    <rect width="28" height="28" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </Box>
            <Box margin={'0 5px'} cursor="pointer" onClick={() => setIsTable(false)}>
              <svg color={!isTable ? '#6d28d9' : '#313131'} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_1061_37525)">
                  <path
                    d="M17.115 7.00004V12.25C17.115 12.8917 16.59 13.4167 15.9483 13.4167H12.0633C11.4217 13.4167 10.8967 12.8917 10.8967 12.25V7.00004C10.8967 6.35837 11.4217 5.83337 12.0633 5.83337H15.9483C16.59 5.83337 17.115 6.35837 17.115 7.00004ZM19.4483 13.4167H23.3333C23.975 13.4167 24.5 12.8917 24.5 12.25V7.00004C24.5 6.35837 23.975 5.83337 23.3333 5.83337H19.4483C18.8067 5.83337 18.2817 6.35837 18.2817 7.00004V12.25C18.2817 12.8917 18.795 13.4167 19.4483 13.4167ZM17.115 21V15.75C17.115 15.1084 16.59 14.5834 15.9483 14.5834H12.0633C11.4217 14.5834 10.8967 15.1084 10.8967 15.75V21C10.8967 21.6417 11.4217 22.1667 12.0633 22.1667H15.9483C16.59 22.1667 17.115 21.6417 17.115 21ZM18.2817 15.75V21C18.2817 21.6417 18.8067 22.1667 19.4483 22.1667H23.3333C23.975 22.1667 24.5 21.6417 24.5 21V15.75C24.5 15.1084 23.975 14.5834 23.3333 14.5834H19.4483C18.795 14.5834 18.2817 15.1084 18.2817 15.75ZM8.55167 14.5834H4.66667C4.025 14.5834 3.5 15.1084 3.5 15.75V21C3.5 21.6417 4.025 22.1667 4.66667 22.1667H8.55167C9.19333 22.1667 9.71833 21.6417 9.71833 21V15.75C9.71833 15.1084 9.205 14.5834 8.55167 14.5834ZM9.71833 12.25V7.00004C9.71833 6.35837 9.19333 5.83337 8.55167 5.83337H4.66667C4.025 5.83337 3.5 6.35837 3.5 7.00004V12.25C3.5 12.8917 4.025 13.4167 4.66667 13.4167H8.55167C9.205 13.4167 9.71833 12.8917 9.71833 12.25Z"
                    fill="currentColor"></path>
                </g>
                <defs>
                  <clipPath id="clip0_1061_37525">
                    <rect width="28" height="28" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
            </Box>
            <Box>
              <Menu>
                {({ isOpen: isOpenMenu }) => (
                  <>
                    <ButtonGroup
                      marginLeft={'5px'}
                      borderRadius={999}
                      display={'flex'}
                      alignItems="center"
                      position="relative"
                      cursor={'pointer'}
                      isAttached
                      variant="outline"
                      bgColor={'#172033'}>
                      <Button
                        as={MenuButton}
                        color={colors.light1}
                        height="30px"
                        background="#313131"
                        border="none"
                        borderRadius={999}
                        _hover={{ bgColor: '#313131', borderRadius: 999 }}
                        _active={{ bgColor: '#313131', borderRadius: 999 }}
                        fontWeight={500}
                        padding="0 12px"
                        fontFamily={'sans-serif'}>
                        <Box display="flex" alignItems={'center'} flexDirection="row" borderRadius={999}>
                          <svg width="20" height="20" transform="none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M12.14 6.13978L9.34997 3.35978C9.14997 3.16978 8.83997 3.16978 8.63997 3.35978L5.84997 6.13978C5.52997 6.44978 5.75997 6.98978 6.19997 6.98978L7.99997 6.98978L7.99997 12.9998C7.99997 13.5498 8.44997 13.9998 8.99997 13.9998C9.54997 13.9998 9.99997 13.5498 9.99997 12.9998L9.99997 6.98978L11.79 6.98978C12.24 6.98978 12.46 6.44978 12.14 6.13978ZM15.35 20.6498L18.14 17.8698C18.46 17.5598 18.23 17.0198 17.79 17.0198L16 17.0198L16 10.9998C16 10.4498 15.55 9.99979 15 9.99979C14.45 9.99979 14 10.4498 14 10.9998L14 17.0098L12.21 17.0098C11.76 17.0098 11.54 17.5498 11.86 17.8598L14.65 20.6398C14.84 20.8398 15.16 20.8398 15.35 20.6498Z"
                              fill="currentColor"></path>
                          </svg>
                          <Text marginLeft={'10px'} marginRight="5px">
                            {selected?.title}
                          </Text>
                        </Box>
                      </Button>
                    </ButtonGroup>
                    <MenuList zIndex={1000} bgColor={'#313131'} borderColor="rgb(30 41 59)" border={'none'} fontFamily="Work Sans">
                      {options1?.map((f) => (
                        <MenuItem
                          onClick={handleSelectedFilterBy(f)}
                          _hover={{ bgColor: colors.primary }}
                          _focus={{ backgroundColor: 'transparent' }}
                          color={colors.white}
                          key={f.id}>
                          {f.title}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </>
                )}
              </Menu>
            </Box>
          </Box>
          <Box marginTop={windowDimensions.width > 680 ? 0 : '20px'}>
            <InputGroup display={'flex'} alignItems="center">
              <InputRightElement marginTop={'5px'} marginRight="10px">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.1931 5.58187C16.525 7.91369 16.525 11.6943 14.1931 14.0261C11.8613 16.358 8.08069 16.358 5.74887 14.0261C3.41704 11.6943 3.41704 7.91369 5.74887 5.58187C8.08069 3.25005 11.8613 3.25005 14.1931 5.58187"
                      stroke="#A9A9A9"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"></path>
                    <path d="M14.1499 14.06L19.9999 19.99" stroke="#A9A9A9" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </svg>
              </InputRightElement>
            </InputGroup>
            <Input
              padding="14px 12px"
              background={'#1c1c1c'}
              width="100%"
              minW={'280px'}
              minH={'35px'}
              borderRadius="999px"
              border={'none'}
              _focus={{ border: 'none' }}
              placeholder="Search by token name or address"
              fontSize={'1.2rem'}
              color="#fff"
              fontFamily={'Work Sans'}
            />
          </Box>
        </Box>
      </Box>

      <TabPanels>
        <TabPanel >{renderCoin()}</TabPanel>;
      </TabPanels>

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

export default FilterCoinList;
