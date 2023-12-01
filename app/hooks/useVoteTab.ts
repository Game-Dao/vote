// import { usePathname, useRouter, useSearchParams } from 'next/navigation'
// import  { useEffect } from 'react'


// function useVoteTab() {
//   const searchParams = useSearchParams()
//   const router = useRouter()
//   const pathName = usePathname();

//   useEffect(() => {
//     if(!searchParams.get('tab')) {
//       // 用原生的方法去set tab
//       const searchParams = new URLSearchParams(window.location.search)
//       searchParams.set('tab', '1')
//       router.replace(`${pathName}?${searchParams.toString()}`)
//     }
//   },[])

//   const handleTabChange = (tab: string) => {
//     // 用原生的方法去set tab
//     const searchParams = new URLSearchParams(window.location.search)
//     searchParams.set('tab', tab)
//     router.replace(`${pathName}?${searchParams.toString()}`)
//   }
//   return {
//     handleTabChange,
//     tab: searchParams.get('tab')
//   }
// }

// export default useVoteTab


import { useState, useEffect } from 'react';

function useVoteTab(): { handleTabChange: (newTab: string) => void; tab: string } {
  // 初始状态设置为 '1'，然后在客户端中从 localStorage 加载真实值
  const [tab, setTab] = useState<string>('1');

  useEffect(() => {
    // 检查是否在浏览器环境中
    if (typeof window !== 'undefined') {
      const storedTab = localStorage.getItem('tab') || '1';
      setTab(storedTab);
    }
  }, []);

  useEffect(() => {
    // 同样检查是否在浏览器环境中
    if (typeof window !== 'undefined') {
      localStorage.setItem('tab', tab);
    }
  }, [tab]);

  const handleTabChange = (newTab: string) => {
    setTab(newTab);
  };

  return {
    handleTabChange,
    tab,
  };
}

export default useVoteTab;
