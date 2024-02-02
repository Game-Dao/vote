'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useAccount } from 'india-hd-utils'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import toast from 'react-hot-toast'
import { ShieldCheck } from 'lucide-react'
import useTop5NFTOwnerStatus from '@/lib/useTop5NFTOwnerStatus'


export const JWT_TOKEN_KEY = 'jwtToken'
export const Token = "Token"
export const NODE_ID_NAME = 'networkId'

function ConnectButton() {
  const { wallet, logout,connectWallet } = useAccount()
  const { isInTop5 } = useTop5NFTOwnerStatus()
  console.log('isInTop5', isInTop5)

  if (!wallet) {
    return (
      <Button onClick={() => connectWallet()} className="text-[#bd1e59] dark:text-white border-[#bd1e59] dark:border-white" variant="ghost">
        Connect Wallet
      </Button>
    )
  }

  return <>
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>{isInTop5 && <ShieldCheck className='mr-2 text-green-400' />} {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</MenubarTrigger>
        <MenubarContent>
          {isInTop5 &&
            <div className={`p-2 text-orange-400 font-semibold ${isInTop5 ? 'animate-blink' : ''}`}>
              The top5 NFT owner
            </div>}
          <MenubarSeparator />
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
