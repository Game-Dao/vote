'use client'
import React, { useState } from 'react'
import { ProposalType, getProposal } from '../request'
import ProposalItem from './ProposalItem'
import { intervalTime, reverseIntendType, status2Label } from './const'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSWRWithToken } from '@/lib/useSWRWithToken'
import { useAccount } from 'india-hd-utils'
import { ScrollArea } from "@/components/ui/scroll-area"

const defaultTabSelection: ProposalType = '1'
function Proposals() {
  const [currentTab, setCurrentTab] = useState<ProposalType>(defaultTabSelection); // State to track current tab
  const { data: proposals } = useSWRWithToken('/api/proposal', () => getProposal(currentTab), { refreshInterval: intervalTime });
  const { wallet } = useAccount()

  if (!wallet) {
    return (
      <div className="flex flex-col  justify-center h-[300px]">
        <div className="text-2xl font-bold">Please connect your wallet and then see the Votes</div>
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <Tabs defaultValue={currentTab} className="w-[400px]" onValueChange={(v: string) => setCurrentTab(v as ProposalType)}>
        <TabsList>
          <TabsTrigger value="1">All</TabsTrigger>
          <TabsTrigger value="2">My Votes</TabsTrigger>
          <TabsTrigger value="3">My Initiatives</TabsTrigger>
        </TabsList>
      </Tabs>
      <ScrollArea className="h-[790px] rounded-md border p-4">
        <div className="grid grid-cols-2 gap-4">
        {proposals?.map(item => (
          <ProposalItem
            key={item.voteId}
            title={item.title}
            description={item.reason}
            type={reverseIntendType[item.intend]}
            status={status2Label[item.status]}
            initiator={item.voteAddress}
          />
        ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default Proposals
