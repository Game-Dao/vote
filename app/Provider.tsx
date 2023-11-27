'use client'
import React from 'react'
import { AccountProvider } from 'india-hd-utils'
import { getWallet } from './request'
import { Toaster } from 'react-hot-toast'
import { Toaster as ShadcnToaster } from "@/components/ui/toaster"



function Provider({ children }: { children: React.ReactNode }) {
  return (
    <AccountProvider
      getWallet={getWallet}
      onLogout={() => {
        localStorage.clear()
      }}
    >
      <>
        {children}
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <ShadcnToaster />
      </>
    </AccountProvider>
  )
}

export default Provider
