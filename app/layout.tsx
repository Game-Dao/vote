import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { description, title } from '@/const'
import Header from './header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title,
  description: description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-[100vh] flex flex-col`}>
        <Header />
        <main className='flex-1 lg:px-6 py-12 space-y-8'>
          {children}
        </main>
        <footer className="flex items-center justify-center py-6 w-full shrink-0 px-4 md:px-6 border-t">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">© 2023 DAO Voting. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}
