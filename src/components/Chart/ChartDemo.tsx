import { FC, useEffect } from 'react';

interface IProp {}
const ChartDemo: FC<IProp> = () => {
  useEffect(() => {
    const widgetOptions = {
      autosize: true,
      symbol: 'BYBIT:BTCUSDT',
      interval: '1',
      timezone: 'Asia/Ho_Chi_Minh',
      library_path: '/libs/charting_library/',
      theme: 'dark',
      style: '1',
      locale: 'en',
      toolbar_bg: '#f1f3f6',
      enable_publishing: false,
      withdateranges: true,
      range: '1D',
      hide_side_toolbar: false,
      custom_css_url: 'theme.css',
      allow_symbol_change: true,
      studies: ['Volume@tv-basicstudies', 'MAVolumeWeighted@tv-basicstudies'],
      container_id: 'tradingview_531c2',
      overrides: {
        'mainSeriesProperties.showCountdown': true,
        'paneProperties.background': '#1c1c1c',
        'paneProperties.backgroundType': 'solid',
        'paneProperties.vertGridProperties.color': '#1c1c1c',
        'paneProperties.horzGridProperties.color': '#1c1c1c',
        'symbolWatermarkProperties.transparency': 90,
        'scalesProperties.textColor': '#AAA',
        'mainSeriesProperties.candleStyle.wickUpColor': '#336854',
        'mainSeriesProperties.candleStyle.wickDownColor': '#7f323f',
        'mainSeriesProperties.barStyle.upColor': '#26a69a',
        'mainSeriesProperties.barStyle.downColor': '#ef5350',
      },
    };
    const tvWidget = new (window as any).TradingView.widget(widgetOptions);
    return () => {
      tvWidget.remove();
    };
  }, []);

  return <div id="tradingview_531c2" style={{ height: '100%', width: '100%' }}></div>;
};
export default ChartDemo;
