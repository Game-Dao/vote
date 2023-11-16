import { Button } from '@/components/ui/button'
import React from 'react'

function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center">
          <svg
            className=" h-6 w-6 text-[#bd1e59] dark:text-white"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m9 12 2 2 4-4" />
            <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" />
            <path d="M22 19H2" />
          </svg>
          <h1 className="ml-2 text-2xl font-semibold text-[#bd1e59] dark:text-white">DAO Voting</h1>
        </div>
        <Button className="text-[#bd1e59] dark:text-white border-[#bd1e59] dark:border-white" variant="ghost">
          Connect Wallet
        </Button>
      </header>
  )
}

export default Header
