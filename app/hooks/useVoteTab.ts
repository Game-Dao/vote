import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import  { useEffect } from 'react'


function useVoteTab() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathName = usePathname();

  useEffect(() => {
    if(!searchParams.get('tab')) {
      // 用原生的方法去set tab
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.set('tab', '1')
      router.replace(`${pathName}?${searchParams.toString()}`)
    }
  },[])

  const handleTabChange = (tab: string) => {
    // 用原生的方法去set tab
    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set('tab', tab)
    router.replace(`${pathName}?${searchParams.toString()}`)
  }
  return {
    handleTabChange,
    tab: searchParams.get('tab')
  }
}

export default useVoteTab
