export const APP_NETWORK = process.env.REACT_APP_NETWORK === 'mainnet' ? 'mainnet' : 'testnet';

export const NETWORK = {
  testnet: {
    chainId: '0x61',
    chainName: 'Testnet',
    rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/', 'http://data-seed-pre-0-s1.binance.org:80'],
  },
  mainnet: {
    chainId: '0x38',
    chainName: 'Mainnet',
    rpcUrls: ['https://bsc-dataseed1.ninicoin.io/', 'https://bsc-dataseed.binance.org/', 'https://bsc-dataseed1.defibit.io/', 'https://dataseed1.binance.org/'],
  },
};
