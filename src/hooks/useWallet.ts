import { NETWORK, APP_NETWORK } from 'constants/networks';
import Web3Modal from 'web3modal';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { handleMetamaskError, toHex } from 'utils/helper';
import { checkMetamaskInstalled } from 'utils/wallet';
import { useDisclosure } from '@chakra-ui/react';

const providerOptions = {};
const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

const useWallet = () => {
  const [provider, setProvider] = useState<any>();
  const [library, setLibrary] = useState<any>();
  const [account, setAccount] = useState<string>('');
  const [signature, setSignature] = useState('');
  const [errors, setErrors] = useState('');
  const [chainId, setChainId] = useState<string | number>();
  const [network, setNetwork] = useState<number>();
  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState('');
  const [verified, setVerified] = useState<boolean>();
  const { onClose } = useDisclosure();

  const checkChain = (chain?: string) => {
    const currentChainId = chain || window.ethereum.chainId;
    const appChainId = NETWORK[APP_NETWORK].chainId;

    return currentChainId === appChainId;
  };

  const switchNetwork = async () => {
    try {
      const appChainId = NETWORK[APP_NETWORK].chainId;
      console.log('appChainId', toHex(appChainId));
      await library.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: toHex(appChainId) }],
      });
    } catch (switchError) {
      if ((switchError as any).code === 4902) {
        try {
          await library.provider.request({
            method: 'wallet_addEthereumChain',
            params: [{ ...NETWORK[APP_NETWORK] }],
          });
        } catch (error: any) {
          setErrors(error);
        }
      }
    }
  };

  const connectWallet = async () => {
    console.log('Logger connect wallet');
    try {
      if (!checkMetamaskInstalled()) throw 'Please install Metamask!';
      const providerConnect = await web3Modal.connect();
      const libProvider = new ethers.providers.Web3Provider(providerConnect);
      const accounts = await libProvider.listAccounts();
      const networkConnect = await libProvider.getNetwork();
      console.log('networkConnect', networkConnect);
      setProvider(libProvider);
      setLibrary(libProvider);
      if (accounts) setAccount(accounts[0]);
      setChainId(networkConnect.chainId);
      //   onClose();
    } catch (error: any) {
      setErrors(error);
      handleMetamaskError(error);
      throw new Error(error);
    }
  };
  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signal = await library.provider.request({
        method: 'personal_sign',
        params: [message, account],
      });
      setSignedMessage(message);
      setSignature(signal);
    } catch (error: any) {
      setErrors(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: 'personal_ecRecover',
        params: [signedMessage, signature],
      });
      if (verify === account?.toLowerCase()) setVerified(true);
    } catch (error: any) {
      setErrors(error);
    }
  };

  const refreshState = () => {
    setAccount('');
    setChainId('');
    setNetwork(0);
    setMessage('');
    setSignature('');
    setVerified(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    if ((provider as any)?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log('accountsChanged', accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log('disconnect', errors);
        disconnect();
      };

      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      provider.on('disconnect', handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged);
          provider.removeListener('chainChanged', handleChainChanged);
          provider.removeListener('disconnect', handleDisconnect);
        }
      };
    }
  }, [provider]);
  return {
    connectWallet,
    account,
    disconnect,
  };
};

export default useWallet;
