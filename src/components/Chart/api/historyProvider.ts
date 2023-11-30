import axios from 'axios';

// const CRYPTO_API_2 = 'https://min-api.cryptocompare.com';
const CRYPTO_API_2 =
  'https://app.geckoterminal.com/api/p1/candlesticks/163234085/2347289?resolution=15&from_timestamp=1701087931&to_timestamp=1701384031&for_update=false&count_back=329&currency=usd&is_inverted=false';
const history = {};

export default {
  history,
  getBars: function (symbolInfo: any, resolution: any, from: number, to: number, first: boolean, param: any, limit?: number) {
    const split_symbol = symbolInfo.name.split(/[:/]/);
    const url = resolution.includes('D') ? '/data/histoday' : resolution >= 60 ? '/data/histohour' : '/data/histominute';
    const qs = {
      e: split_symbol[0],
      fsym: split_symbol[1],
      tsym: split_symbol[2],
      toTs: to ? to : '',
      limit: limit ? limit : 2000,
    };

    return axios.get(CRYPTO_API_2 + url).then((response) => {
      if (response.data.data && response.data.data === 'Error') {
        return [];
      }
      if (response.data.data.length > 0) {
        const bars = response.data.data.map((el) => {
          return {
            time: new Date(el.dt).getTime(),
            low: el.l,
            high: el.h,
            open: el.o,
            close: el.c,
            volume: el.v,
          };
        });
        if (first) {
          const lastBar = bars[bars.length - 1];
          history[symbolInfo.name] = { lastBar };
        }
        return bars;
      } else {
        return [];
      }
    });
  },
};
