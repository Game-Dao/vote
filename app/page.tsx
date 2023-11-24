'use client'
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/4PCIXsovsbW
 */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CreateVote from "./(Sections)/CreateVote"
import Proposals from "./(Sections)/Proposals"
import Top5Holder from "./(Sections)/Top5Holder"
import useSWR from "swr"
import { getTop5Holder } from "./request"

const getSortNftData = (data: {[k:string]:number}) => {
  if(!data) return []
  return Object.keys(data).map(key => {
    return {
      address: key,
      count: data[key]
    }
  }).sort((a,b) => b.count - a.count)
}

export default function Component() {
  const {data: nftTop5} = useSWR('/api/nft/top5', getTop5Holder)
  
  const sortedDataForTop5 = getSortNftData(nftTop5)

  
  return (
    <div className="px-12">
      <section className="grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-6">
          <Top5Holder data={sortedDataForTop5}/>
          <Proposals />
        </div>
        <div className="space-y-8">
          <CreateVote/>
        </div>
      </section>
    </div>
  )
}

