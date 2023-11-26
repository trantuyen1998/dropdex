import axios from 'axios';

// const CRYPTO_API_4 = 'http://103.127.207.232:8080/v1/charts/';
const CRYPTO_API_4 = 'https://api.h2e.finance/v1/charts/';
const history = {};

export default {
  history,
  getBars: function (symbolInfo: any, resolution: any, from: number, to: number, first: boolean, param: any, limit?: number) {
    const qs = {
      bars: 321,
      from: from,
      to: to,
      quoteAsset: param.contractAddress,
      interval: '1d',
    };
    console.log('CRYPTO_API_4 + param.pairAddress', CRYPTO_API_4 + param.pairAddress);
    return axios
      .get(CRYPTO_API_4 + param.pairAddress, {
        params: qs,
      })
      .then((response) => {
        if (!response.data) {
          return [];
        }
        // if (response.data.Data.length > 0) {
        //   const bars = response.data.Data.map((el) => {
        //     return {
        //       time: el.time * 1000,
        //       low: el.low,
        //       high: el.high,
        //       open: el.open,
        //       close: el.close,
        //       volume: el.volumefrom,
        //     };
        //   });
        //   console.log({ bars });
        //   if (first) {
        //     const lastBar = bars[bars.length - 1];
        //     history[symbolInfo.name] = { lastBar };
        //   }
        //   return bars;
        // } else {
        //   return [];
        // }
        if (response.data.length > 0) {
          const bars = response.data.map((el: any) => {
            return {
              time: el.time,
              low: el.low,
              high: el.high,
              open: el.open,
              close: el.close,
              volume: el.volume,
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
