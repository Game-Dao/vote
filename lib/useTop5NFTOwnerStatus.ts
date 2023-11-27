import { useAccount } from "india-hd-utils"
import { useSWRWithToken } from "./useSWRWithToken"
import { getTop5Holder } from "@/app/request"

export default function useTop5NFTOwnerStatus() {
  const { wallet } = useAccount()
  const { data: top5NFT } = useSWRWithToken('/api/nft/top5', getTop5Holder)
  const isInTop5 = wallet?.address && top5NFT && top5NFT[wallet.address]
  return {
    isInTop5,
  }
}
