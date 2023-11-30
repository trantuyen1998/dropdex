import axios from 'axios';

const CRYPTO_API_2 = 'https://min-api.cryptocompare.com';
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

    return axios
      .get(CRYPTO_API_2 + url, {
        params: qs,
      })
      .then((response) => {
        if (response.data.Response && response.data.Response === 'Error') {
          return [];
        }
        if (response.data.Data.length > 0) {
          const bars = response.data.Data.map((el) => {
            return {
              time: el.time * 1000,
              low: el.low,
              high: el.high,
              open: el.open,
              close: el.close,
              volume: el.volumefrom,
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
