import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import type { AbiDex, AbiToken, AbiUni } from '../contracts/types';
import { useWeb3 } from './useWeb3';
import dexAbi from '../contracts/abi/abiDex.json';
import uniAbi from '../contracts/abi/abiUni.json';
import tokenAbi from '../contracts/abi/abiToken.json';

export const useContract = () => {
  const { provider } = useWeb3();

  const [dex, setDex] = useState<AbiDex>();
  const [uni, setUni] = useState<AbiUni>();
  const [token, setToken] = useState<AbiToken>();

  useEffect(() => {
    if (!!provider) {
      const logic = async () => {
        const signer = await provider.getSigner();

        /**
         * Xác nhận người kí
         */
        const dx = new ethers.Contract(dexAbi.address, dexAbi.abi, signer);
        const dexSigned = (await dx.connect(signer)) as AbiDex;
        setDex(dexSigned);

        const un = new ethers.Contract(uniAbi.address, uniAbi.abi, signer);
        const uniSigned = (await un.connect(signer)) as AbiUni;
        setUni(uniSigned);

        const tk = new ethers.Contract(tokenAbi.address, tokenAbi.abi, signer);
        const tkSigned = (await tk.connect(signer)) as AbiToken;
        setToken(tkSigned);
      };

      logic();
    }
  }, [provider]);

  return { dex, uni, token };
};
