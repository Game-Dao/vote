'use client'
import React, { useState } from 'react'
import { ProposalType, getProposal } from '../request'
import ProposalItem from './ProposalItem'
import { intervalTime, reverseIntendType, status2Label } from './const'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSWRWithToken } from '@/lib/useSWRWithToken'
import { useAccount } from 'india-hd-utils'
import { ScrollArea } from "@/components/ui/scroll-area"
import useVoteTab from '../hooks/useVoteTab'
import Link from 'next/link'

function Proposals() {
  const { wallet } = useAccount()
  const { handleTabChange, tab } = useVoteTab()
  const { data: proposals, mutate } = useSWRWithToken(['/api/proposal', tab], () => getProposal(tab as ProposalType || '1', wallet?.address), { refreshInterval: intervalTime });
  if (!wallet) {
    return (
      <div className="flex flex-col  justify-center h-[300px]">
        <div className="text-2xl font-bold">Please connect your wallet and then see the Votes</div>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <Tabs defaultValue={tab || '1'} className="w-[400px]" onValueChange={(v: string) => { handleTabChange(v) }}>
        <TabsList>
          <TabsTrigger value="1"><Link href="/?tab=1">All</Link></TabsTrigger>
          <TabsTrigger value="2">
            <Link href="/?tab=2">My Votes</Link>
          </TabsTrigger>
          <TabsTrigger value="3">
            <Link href="/?tab=3">My Initiatives</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <ScrollArea className="h-[790px] rounded-md border p-4">
        <div className="grid grid-cols-1 gap-4 custom-lg:grid-cols-2">
          {proposals?.map((item, idx: number) => (
            <ProposalItem
              id={item.voteId}
              key={String(item.voteId) + idx}
              title={item.title}
              description={item.reason}
              type={reverseIntendType[item.intend]}
              status={status2Label[item.status]}
              initiator={item.voteAddress}
              voteAddress={item.voteAddress}
              voteHistory={item.voteHistory}
              onVoteSuccess={() => {
                mutate()
              }
              }
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default Proposals
