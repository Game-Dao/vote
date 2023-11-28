'use client'
import { useAccount } from 'india-hd-utils';
import { useEffect, useState } from 'react';
import useSWR, { Fetcher } from 'swr';

// Custom hook that wraps useSWR
export function useSWRWithToken<Data, Error>(key: any, fetcher: Fetcher<Data, string>, options?: any) {
  const { wallet } = useAccount();
  const token = typeof window !== 'undefined' && localStorage.getItem('token');
  const [swrKey, setSwrKey] = useState(null);

  useEffect(() => {
    // 检查钱包和令牌是否存在
    if (!wallet || !token) {
      setSwrKey(null);
      return;
    }

    // 将 key 数组转换为字符串
    const keyString = JSON.stringify(key);

    // 更新 swrKey
    // @ts-ignore
    setSwrKey(keyString);
  }, [wallet, token, JSON.stringify(key)]); // 使用 JSON.stringify(key) 作为依赖项

  return useSWR<Data, Error>(swrKey ? JSON.parse(swrKey) : null, fetcher, options);
}
