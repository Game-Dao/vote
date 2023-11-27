'use client'
import React, { useState } from 'react'
import useSWR from 'swr'
import { ProposalType, getProposal } from '../request'
import ProposalItem from './ProposalItem'
import { reverseIntendType, status2Label } from './const'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSWRWithToken } from '@/lib/useSWRWithToken'

const defaultTabSelection: ProposalType = '1'
function Proposals() {
  const [currentTab, setCurrentTab] = useState<ProposalType>(defaultTabSelection); // State to track current tab
  const { data: proposals } = useSWRWithToken(['proposal', currentTab], () => getProposal(currentTab), {refreshInterval: 2000});

  return (
    <div className='space-y-4'>
      <Tabs defaultValue={currentTab} className="w-[400px]" onValueChange={(v: string) => setCurrentTab(v as ProposalType)}>
        <TabsList>
          <TabsTrigger value="1">All</TabsTrigger>
          <TabsTrigger value="2">My Votes</TabsTrigger>
          <TabsTrigger value="3">My Initiatives</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-2 gap-4">
        {proposals?.map(item => (
          <ProposalItem
            key={item.voteId}
            title={item.title}
            description={item.reason}
            type={status2Label[item.status]}
            status={reverseIntendType[item.intend]}
            initiator={item.voteAddress}
          />
        ))}
      </div>
    </div>
  )
}

export default Proposals
