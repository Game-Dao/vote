import { useAccount } from 'india-hd-utils';
import { useEffect, useState } from 'react';
import useSWR, { Fetcher } from 'swr';

// Custom hook that wraps useSWR
export function useSWRWithToken<Data, Error>(key: any, fetcher: Fetcher<Data, string>, options?: any) {
  const { wallet } = useAccount()
  const token = localStorage.getItem('token');
  const [swrKey, setSwrKey] = useState(token ? key : null);

  useEffect(() => {
    if (wallet) {
      setSwrKey(token ? key : null);
    } else {
      setSwrKey(null);
    }
  }, [wallet])

  return useSWR<Data, Error>(swrKey, fetcher, options);
}
