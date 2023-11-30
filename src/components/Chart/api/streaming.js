import historyProvider from './historyProvider';
const _subs = [];

function createChannelString(symbolInfo) {
  var channel = symbolInfo.name.split(/[:/]/);
  const exchange = channel[0] === 'GDAX' ? 'Coinbase' : channel[0];
  const to = channel[2];
  const from = channel[1];
  // subscribe to the CryptoCompare trade channel for the pair and exchange
  return `0~${exchange}~${from}~${to}`;
}

export default {
  subscribeBars: function (symbolInfo, resolution, updateCb, uid, resetCache) {
    const channelString = createChannelString(symbolInfo);
    const newSub = {
      channelString,
      uid,
      resolution,
      symbolInfo,
      lastBar: historyProvider.history[symbolInfo.name].lastBar,
      listener: updateCb,
    };
    _subs.push(newSub);
  },
  unsubscribeBars: function (uid) {
    var subIndex = _subs.findIndex((e) => e.uid === uid);
    if (subIndex === -1) {
      return;
    }
    _subs.splice(subIndex, 1);
  },
};


