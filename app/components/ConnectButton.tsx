'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { connectWalletForURL, useAccount } from 'india-hd-utils'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import toast from 'react-hot-toast'


export const JWT_TOKEN_KEY = 'jwtToken'
export const Token = "Token"
export const NODE_ID_NAME = 'networkId'

function ConnectButton() {
  const { wallet, logout } = useAccount()
  if (!wallet) {
    return (
      <Button onClick={connectWalletForURL} className="text-[#bd1e59] dark:text-white border-[#bd1e59] dark:border-white" variant="ghost">
        Connect Wallet
      </Button>
    )
  }
  return <>
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>{wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => window.open(process.env.NEXT_PUBLIC_WALLET_URL)}>Go To Wallet</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={async () => {
            await logout()
            toast.success('Logout Successfully')
          }}>Logout</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  </>
}

export default ConnectButton
