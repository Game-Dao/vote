'use client'
import { Button } from '@/components/ui/button'
import { connectWalletForURL } from 'wd-game-login'
import React, { useEffect } from 'react'

export const JWT_TOKEN_KEY = 'jwtToken'
export const Token = "Token"
export const NODE_ID_NAME = 'networkId'

function ConnectButton() {
  const updateWalletInfo = async () => {
    
  }
  useEffect(() => {
    (async function () {
      const { deCrypto, getDecryptoKey } = await import('wd-game-login')
      // 看一下url中是否有ekey信息，如果有，存入到localStorage里，用于下次登录
      let token = localStorage.getItem(Token)
      if (window?.location.search.indexOf('eKey') > -1) {
        // 存到localStorage
        const eKey = window.location.search.split('eKey=')[1].split('&')[0]
        const jwtToken = window.location.search.split('jwtToken=')[1].split('&')[0]
        const nodeId = window.location.search.split('nodeId=')[1].split('&')[0]
        token = await deCrypto(decodeURIComponent(eKey), 'andytest123456auth') as string
        const _jwtToken = await deCrypto(decodeURIComponent(jwtToken), 'andytest123456auth') as string
        const _nodeId = await deCrypto(decodeURIComponent(nodeId), 'andytest123456auth') as string
        localStorage.setItem(Token, token)
        localStorage.setItem(JWT_TOKEN_KEY, _jwtToken)
        localStorage.setItem(NODE_ID_NAME, _nodeId)

        // 如果有查询参数，去掉所有的query
        if (window.location.search) {
          const cleanURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
          window.history.replaceState({}, document.title, cleanURL);
        }
      }
      if (token) {
        updateWalletInfo()
      }
    })()
    // initialNetworkId()
  }, [])

  return (
    <Button onClick={connectWalletForURL} className="text-[#bd1e59] dark:text-white border-[#bd1e59] dark:border-white" variant="ghost">
      Connect Wallet
    </Button>
  )
}

export default ConnectButton
