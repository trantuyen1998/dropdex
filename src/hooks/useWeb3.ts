import Web3Modal from 'web3modal';
import { useState, useEffect } from 'react';
import { providers } from 'ethers';
import { handleMetamaskError } from 'utils/helper';

export const useWeb3 = () => {
  const [web3Modal, setWeb3Modal] = useState<null | Web3Modal>(null);
  const [address, setAddress] = useState('');
  const [connected, setConnected] = useState(false);
  const [provider, setProvider] = useState<any>(null);

  useEffect(() => {
    const providerOptions = {};

    const newWeb3Modal = new Web3Modal({
      cacheProvider: true,
      network: 'testnet',
      providerOptions,
    });

    setWeb3Modal(newWeb3Modal);
  }, []);

  useEffect(() => {
    if (web3Modal?.cachedProvider) {
      setConnected(true);

      const getAddress = async () => {
        const providerWeb3 = await web3Modal.connect();
        const ethersProvider = new providers.Web3Provider(providerWeb3);
        const userAddress = await ethersProvider.getSigner().getAddress();
        setAddress(userAddress);
        setProvider(ethersProvider);
      };

      getAddress();
    }
  }, [web3Modal]);

  const connectWallet = async () => {
    try {
      if (!!web3Modal) {
        const providerWeb3 = await web3Modal.connect();
        const ethersProvider = new providers.Web3Provider(providerWeb3);
        const userAddress = await ethersProvider.getSigner().getAddress();
        setAddress(userAddress);
        setProvider(ethersProvider);
      }

      setConnected(true);
    } catch (error) {
      handleMetamaskError(error);
    }
  };

  const disconnect = async () => {
    if (!!web3Modal) {
      await web3Modal.clearCachedProvider();
    }

    setConnected(false);
    setAddress('');
  };

  return {
    address,
    web3Modal,
    provider,
    connected,
    connectWallet,
    disconnect,
    setWeb3Modal,
  };
};
