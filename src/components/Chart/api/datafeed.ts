import historyProvider from './historyProvider';

const supportedResolutions = ['D'];

const config = {
  supported_resolutions: supportedResolutions,
};

const getDataFeed = (arg: any) => {
  const dataFeed = {
    onReady: (cb: (config: any) => void) => {
      setTimeout(() => cb(config), 0);
    },
    searchSymbols: () => {
      console.log('====Search Symbols running');
    },
    resolveSymbol: (symbolName: string, onSymbolResolvedCallback: (params: any) => void, onResolveErrorCallback: any) => {
      const split_data = symbolName.split(/[:/]/);
      console.log('split_data', split_data);
      const symbol_stub = {
        name: symbolName,
        description: split_data[1] + '/' + split_data[2],
        type: 'crypto',
        session: '24x7',
        timezone: 'UTC',
        ticker: symbolName,
        exchange: '',
        minmov: 1,
        pricescale: 100000000,
        has_intraday: true,
        intraday_multipliers: supportedResolutions,
        supported_resolution: supportedResolutions,
        volume_precision: 8,
        data_status: 'streaming',
      };
      if (split_data[2].match(/USD|EUR|JPY|AUD|GBP|KRW|CNY/)) {
        symbol_stub.pricescale = 100;
      }
      setTimeout(function () {
        onSymbolResolvedCallback(symbol_stub);
      }, 0);
    },
    getBars: function (symbolInfo: any, resolution: any, periodParams: any, onHistoryCallback: (params: any, options: any) => void, onErrorCallback: (err: any) => void) {
      const { from, to, firstDataRequest } = periodParams;
      historyProvider
        .getBars(symbolInfo, resolution, from, to, firstDataRequest, arg)
        .then((bars) => {
          if (bars.length) {
            onHistoryCallback(bars, { noData: false });
          } else {
            onHistoryCallback(bars, { noData: true });
          }
        })
        .catch((err) => {
          console.log({ err });
          onErrorCallback(err);
        });
    },
    subscribeBars: (symbolInfo: any, resolution: any, onRealtimeCallback: any, subscribeUID: string, onResetCacheNeededCallback: any) => {
      console.log('=====subscribeBars runnning');
    },
    unsubscribeBars: (subscriberUID: string) => {
      console.log('=====unsubscribeBars running');
    },
  };
  return dataFeed;
};
export default getDataFeed;
