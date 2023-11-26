import { useToast } from '@chakra-ui/react';
import { AbiToken, AbiUni } from 'contracts/types';
import { BigNumber, ethers } from 'ethers';
import { useContract } from 'hooks/useContract';
import { useWeb3 } from 'hooks/useWeb3';
import { useEffect, useState } from 'react';
import abiToken from '../../../contracts/abi/abiToken.json';
import abiUni from '../../../contracts/abi/abiUni.json';

export const useSwapDex = () => {
  const { address, connected } = useWeb3();
  const { dex, uni, token: tok } = useContract();
  const toast = useToast();

  const [uniBalance, setUniBalance] = useState<BigNumber>(BigNumber.from('0'));
  const [tokBalance, setTokBalance] = useState<BigNumber>(BigNumber.from('0'));

  const [fromAmt, setFromAmt] = useState<string>('0');
  const [toAmt, setToAmt] = useState<string>('0');

  const [fromAddress, setFromAddress] = useState<string>(abiToken.address);
  const [toAddress, setToAddress] = useState<string>(abiUni.address);

  const [swapDisabled, setSwapDisabled] = useState<boolean>(false);

  const updateUniBalance = async () => {
    const uniBalanceOf = await (uni as AbiUni).balanceOf(address);
    setUniBalance(uniBalanceOf);
  };

  useEffect(() => {
    if (!!uni && !!address) {
      updateUniBalance();
    }
  }, [uni, address]);

  const updateTokBalance = async () => {
    const tokBalanceOf = await (tok as AbiToken).balanceOf(address);
    setTokBalance(tokBalanceOf);
  };

  useEffect(() => {
    if (!!uni && !!address) {
      updateTokBalance();
    }
  }, [uni, address]);

  useEffect(() => {
    if (!!dex) {
      const logic = async () => {
        const amt = fromAmt === '' ? '0' : fromAmt;
        const value = ethers.utils.parseEther(amt);
        try {
          const tokenEstimate = await dex.estimateTokenAmount(value, fromAddress, toAddress);

          setToAmt(ethers.utils.formatEther(tokenEstimate));
        } catch (error) {
          alert('not enough liquidity');
        }
      };

      logic();
    }
  }, [fromAmt]);

  const handlePairChange = () => {
    const from = fromAddress;
    const to = toAddress;
    setFromAddress(to);
    setToAddress(from);
    setToAmt('');
    setFromAmt('');
  };

  const swapToken = async () => {
    try {
      const _ = ethers.utils.parseEther(fromAmt);
    } catch (error) {
      alert('please input a valid amount');
      return;
    }

    const amt = ethers.utils.parseEther(fromAmt);

    if (!!dex) {
      if (fromAddress === (tok as AbiToken).address) {
        const approveTx = await (tok as AbiToken).approve(dex.address, amt);
        toast({
          title: 'tx sent to Polygon',
          description: `hash: ${approveTx.hash}. please wait for tx to be mined before swap.`,
        });
        setSwapDisabled(true);
        await approveTx.wait();
        setSwapDisabled(false);
      } else {
        const approveTx = await (uni as AbiUni).approve(dex.address, amt);
        setSwapDisabled(true);
        toast({
          title: 'tx sent to Polygon',
          description: `hash: ${approveTx.hash}. please wait for tx to be mined before swap.`,
        });
        await approveTx.wait();
        setSwapDisabled(false);
      }

      const tx = await dex.swap(amt, fromAddress, toAddress);
      toast({
        title: 'tx sent to Polygon',
        description: `hash: ${tx.hash}.`,
      });
      await tx.wait();
      updateTokBalance();
      updateUniBalance();
    }
  };

  return {
    uniBalance,
    tokBalance,
    toAmt,
    fromAmt,
    swapDisabled,
    connected,
    address,
    swapToken,
  };
};
