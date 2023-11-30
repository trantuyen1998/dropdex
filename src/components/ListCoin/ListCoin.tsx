import {
  Box,
  Button,
  Center,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Stack, Theme,
  useDisclosure,
  useTheme
} from '@chakra-ui/react';
import CoinCard from 'components/CardItem/CoinCard';
import DashboardSettings from 'components/DashboardSettings/DashboardSettings';
import { isEmpty } from 'lodash';
import { memo, useEffect, useState } from 'react';
import { Colors } from 'themes/colors';
import { FAKE_PAIRS } from 'utils/dummy/fake-pair';
import './styles.css';
import { ListCoinProps, PairType, Params } from './type';

function ListCoin({ onChangeFilter, isReset, loading, pairs }: ListCoinProps) {
  const theme = useTheme<Theme>();
  const colors = theme.colors as Colors;

  const { isOpen, onClose } = useDisclosure();

  const total = 10;
  const [pageCount, setPageCount] = useState(0);

  const [filterObj, setFilterObj] = useState<Params>({
    offset: 0,
    limit: 24,
  });

  useEffect(() => {
    if (isReset) {
      setFilterObj({ offset: 0, limit: filterObj.limit });
    }
  }, [isReset]);

  useEffect(() => {
    onChangeFilter?.(filterObj);
  }, [filterObj]);

  useEffect(() => {
    if (!isEmpty(pairs)) {
      const totalPages = Math.ceil(total / filterObj.limit);
      setPageCount(totalPages);
    }
  }, [filterObj.limit, pairs]);

  const handleChangeItemsPerPage = (val: number) => {
    setFilterObj((prev) => ({
      ...prev,
      limit: val,
      offset: 0,
    }));
  };

  const handlePageClick = (type: string) => () => {
    if (type === 'next') {
      setFilterObj((prev) => ({
        ...prev,
        offset: prev.offset + filterObj.limit,
      }));
    } else {
      setFilterObj((prev) => ({
        ...prev,
        offset: prev.offset - filterObj.limit,
      }));
    }
  };

  const nextButton = (
    <Button
      disabled={Math.ceil(filterObj.offset / filterObj.limit) + 1 === pageCount}
      bgColor="#0F0F0F66"
      onClick={handlePageClick('next')}
      borderRadius={'50%'}
      minHeight="36px"
      cursor={'pointer'}
      minWidth="36px"
      _hover={{
        bgColor: colors.primary,
        color: '#fff',
      }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#A9A9A9"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </Button>
  );


  const prevButton = (
    <Button
      disabled={Math.ceil(filterObj.offset / filterObj.limit) + 1 === 1}
      bgColor="#0F0F0F66"
      onClick={handlePageClick('prev')}
      borderRadius={'50%'}
      minHeight="36px"
      cursor={'pointer'}
      minWidth="36px"
      _hover={{
        bgColor: colors.primary,
        color: '#fff',
      }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#A9A9A9"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </Button>
  );

  const renderDashboardSettings = () => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered preserveScrollBarGap blockScrollOnMount={false}>
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent position="relative" maxW="40rem" bgColor={colors.bgPrimary} padding="24px">
          <DashboardSettings onChangeItemDisplay={handleChangeItemsPerPage} defaultValue={filterObj.limit} />
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
        </ModalContent>
      </Modal>
    );
  };

  return (
    <Box border={'1px solid rgb(80, 80, 80)'} borderRadius={'20px'} background={'rgb(28, 28, 28)'}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="1rem" gap={'18px'} padding="16px">
        {loading ? (
          <Center height="100vh">
            <Spinner color="#fff" size={'lg'} />
          </Center>
        ) : (
          <>
            {pairs.map((item, idx) => (
              <CoinCard key={idx.toString()} {...item} />
            ))}
          </>
        )}
      </SimpleGrid>

      <Box my="20px" display={'flex'} alignItems="center" justifyContent={'center'}>
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
          {prevButton}
          <Box bgColor="#182033" py="8px" px="12px" borderRadius={'50%'} color="#fff">
            1
          </Box>
          {nextButton}
        </Stack>
      </Box>
    </Box>
  );
}

export default memo(ListCoin);
