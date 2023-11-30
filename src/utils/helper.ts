import { toast } from 'react-toastify';

export const truncateAddress = (address) => {
  if (!address) return 'No Account';
  const match = address.match(/^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const toHex = (num) => {
  const val = Number(num);
  return '0x' + val.toString(16);
};

export const formatPriceApicompare = (value: string | number) => {
  return value?.toString()?.replace(/\s/g, '') || 0;
};

export const formatVolApiCompare = (value: string | number) => {
  const splitData = value?.toString().split('$')[1];
  if (!splitData) return value;
  const data = splitData?.split('.')[0] || splitData;
  if (data.length <= 3) return parseInt(data.replace(/,/g, ''));
  else if (data.length <= 7 && data.length > 3) return (parseInt(data.replace(/,/g, '')) / 1000).toFixed(1) + 'K';
  else if (data.length > 7) return (parseInt(data.replace(/,/g, '')) / 1000000).toFixed(1) + 'M';
};

export const borderColorMap = (name: string, dex?: string) => {
  const _name = name.replace(' ', '');
  const borders = {
    TerraClassic: '#268CDB',
    Osmosis: '#8B5CF6',
    Juno: '#F0827D',
    'Terra2.0': '#268CDB',
    Near: '#00C5A2',
    TerraFloki: '#FEE700',
  };

  if (dex == 'TerraFloki') return borders.TerraFloki;
  return borders[_name] ? borders[_name] : borders.TerraClassic;
};

export const getTitle = (name: string) => {
  const _name = name.replace(' ', '');
  const titles = {
    TerraClassic: '#FACC15',
    Osmosis: '#C084FC',
    Juno: '#F87171',
    'Terra2.0': '#FB923C',
    Near: '#fff',
  };

  return titles[_name] ? titles[_name] : titles.TerraClassic;
};

export const getTitleDex = (name: string) => {
  const _name = name.replace(' ', '');
  const titles = {
    Osmosis: {
      bg: '#E9D5FF',
      color: '#0F172A',
    },
    RefFinance: {
      bg: '#00C6A2',
      color: '#0F172A',
    },
    Astroport: {
      bg: '#268CDB',
      color: '#DBEAFE',
    },
    JunoSwap: {
      bg: '#000',
      color: '#FBCFE8',
    },
    Terraswap: {
      bg: '#0322BB',
      color: '#DBEAFE',
    },
    Loop: {
      bg: '#BF21AA',
      color: '#FCE7F3',
    },
  };

  return titles[_name] ? titles[_name] : titles.Osmosis;
};

export const getDex = (name: string) => {
  const _name = name.replace(' ', '');
  const dexs = {
    Osmosis: 'https://coinhall.org/assets/chain_logos/osmo.svg',
    RefFinance: 'https://coinhall.org/dex/ref.png',
    Astroport: 'https://coinhall.org/dex/astroport.svg',
    JunoSwap: 'https://coinhall.org/dex/junoswap.svg',
    Terraswap: 'https://coinhall.org/dex/terraswap.svg',
    Loop: 'https://coinhall.org/dex/loop.png',
    TerraFloki: 'https://terrafloki.io/tfloki_dex_logo.svg',
  };

  return dexs[_name] ? dexs[_name] : dexs.Osmosis;
};

export const parseRoute = (chain: string) => {
  if (chain == 'Terra 2.0') {
    return 'terra';
  }
  return chain.replace(' ', '-').toString().toLowerCase();
};

export const formatPrice = (price: number | string) => {
  const _price = +price / 1000000;
  const format = _price.toString().slice(0, 6);
  return +format;
};

export const trunceHash = (hash: string) => {
  const firstDigit = hash.match(/\d/)?.index ?? 5;
  const prefix = hash.slice(firstDigit, firstDigit + 5);
  const suffix = hash.slice(-firstDigit - 1);
  return prefix + '...' + suffix;
};

export const formateDateTx = (date: string) => {
  if (!date) return '';
  const options = {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  } as any;

  const _date = new Date(date);
  const result = _date.toLocaleDateString('en-US', options).toString();
  return result;
};

export const getLongShort = (offerAsset: string, returnAsset: string) => {
  if (!offerAsset) return 'Buy';
  if (!returnAsset) return 'Sell';
  return offerAsset.length > returnAsset.length ? 'Sell' : 'Buy';
};

export const handleMetamaskError = (error: any) => {
  let message = '';

  switch (error.code) {
    case -32002: {
      message = 'Already processing request in Metamask. Please handle this before next action';
      break;
    }

    default:
      return;
  }

  toast.error(`<div>{message}</div>`, {
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
  });
};

export const formatPrice24h = (price: string) => {
  const f = price.toString().split('.');
  if (f.length > 0) return f[0] + '.' + f[1].slice(0, 2);

  return price;
};
