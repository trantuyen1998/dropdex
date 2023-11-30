import { FC, useEffect } from 'react';
import getDataFeed from './api/datafeed';

interface IProp {
  symbol: string;
  contractAddress?: string;
  pairAddress?: string;
}
const TraddingViewChart: FC<IProp> = ({ symbol, contractAddress, pairAddress }) => {
  const datafeed = getDataFeed({ symbol: symbol.replace('-', ''), contractAddress, pairAddress });
  useEffect(() => {
    const widgetOptions = {
      symbol: `Bitfinex:${symbol.replace('-', '/')}`,
      datafeed: datafeed,
      interval: '1d',
      container_id: 'tv_chart_container',
      library_path: '/libs/charting_library/',
      timezone: 'Asia/Bangkok',
      locale: 'en',
      disabled_features: ['header_symbol_search', 'use_localstorage_for_settings'],
      charts_storage_url: 'https://saveload.tradingview.com',
      charts_storage_api_version: '1.1',
      client_id: 'cryptoweb_tradingview',
      user_id: 'public_user_id',
      fullscreen: false,
      autosize: true,
      debug: false,
      favorites: {
        intervals: ['60'],
      },
      custom_css_url: '../themed.css',
      theme: 'dark',
      overrides: {
        'mainSeriesProperties.showCountdown': true,
        'paneProperties.background': '#1c1c1c',
        'paneProperties.backgroundType': 'solid',
        'paneProperties.vertGridProperties.color': '#363c4e',
        'paneProperties.horzGridProperties.color': '#363c4e',
        'symbolWatermarkProperties.transparency': 90,
        'scalesProperties.textColor': '#AAA',
        'mainSeriesProperties.candleStyle.wickUpColor': '#336854',
        'mainSeriesProperties.candleStyle.wickDownColor': '#7f323f',
        'mainSeriesProperties.barStyle.upColor': '#26a69a',
        'mainSeriesProperties.barStyle.downColor': '#ef5350',
      },
    };
    const tvWidget = new (window as any).TradingView.widget(widgetOptions);
    tvWidget.onChartReady(() => {
      console.log('Chart has loaded!');
    });
    return () => {
      tvWidget.remove();
    };
  }, [symbol]);

  // eslint-disable-next-line
  return <div id="tv_chart_container" style={{ height: '100%', width: '100%' }}></div>;
};
export default TraddingViewChart;
