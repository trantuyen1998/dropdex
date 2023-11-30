import { useState } from 'react';

export const useGlobal = () => {
  const [pair, setPair] = useState({
    to: '',
    from: '',
  });

  const onHandlePair = (value: string) => {
    console.log(`value`, value);
    const newValue = value.replace(/\s/g, '');
    const newP = newValue.split('/');
    setPair({
      from: newP[0],
      to: newP[1],
    });
  };
  return {
    pair,
    onHandlePair,
  };
};
