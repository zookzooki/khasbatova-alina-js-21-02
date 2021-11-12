import { EffectCallback, useEffect } from 'react';

const useOnceOnMount = (callback: EffectCallback) => {
  useEffect(callback, []);
};

export default useOnceOnMount;
