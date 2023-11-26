import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { APP_NETWORK, NETWORK } from 'constants/networks';

const providerOptions = {};
export const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

export const checkMetamaskInstalled = () => Boolean(window.ethereum && window.ethereum.isMetaMask);

export const getSigner = async () => {
  if (!window.ethereum) throw 'Please install Metamask!';
  const provider = await web3Modal.connect();
  const web3Provider = new ethers.providers.Web3Provider(provider);
  const signer = web3Provider.getSigner();
  return signer;
};

export const connectWallet = async () => {
  if (!window.ethereum) throw 'Please install Metamask!';
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  if (accounts.length && accounts[0]) return (accounts[0] as string).toLowerCase();
  return '';
};

export const getWalletAddress = () => {
  if (window.ethereum) return (window.ethereum?.selectedAddress?.toLowerCase() as string) || '';
  return '';
};

export const checkChain = (chain?: string) => {
  const chainId = chain || window.ethereum.chainId;
  const appChainId = NETWORK[APP_NETWORK].chainId;
  return chainId === appChainId;
};

export const switchChain = async () => {
  try {
    const appChainId = NETWORK[APP_NETWORK].chainId;
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: appChainId }],
    });
  } catch (error) {
    if ((error as { code: number })?.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{ ...NETWORK[APP_NETWORK] }],
        });
      } catch (addError) {
        // eslint-disable-next-line
        console.error(addError);
      }
    }
  }
};
