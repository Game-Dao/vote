/**
 * v0 by Vercel.
 * @see https://v0.dev/t/BgT0p8dcMgk
 */
import { CardTitle, CardHeader, CardDescription, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import useTop5NFTOwnerStatus from "@/lib/useTop5NFTOwnerStatus";
import { status2Label } from "./const";
import { useAccount } from "india-hd-utils";
import useSWRMutation from "swr/mutation";
import { revokeVote, vote } from "../request";

interface ProposalItemProps {
  title: string
  id: string 
  description: string
  status: string;
  type: string;
  initiator: string
  onClick?: () => void
}

interface VoteParams {
  type: 'approve' | 'reject', reason: string
}

export default function ProposalItem({ title, description, initiator, status, type,id }: ProposalItemProps) {
  const { isInTop5 } = useTop5NFTOwnerStatus()
  const isHiddenBtn = !isInTop5 || String(status) !== status2Label['1']
  const { wallet } = useAccount()

  const handleVote = (params: VoteParams) => {
    vote(id,params.type === 'approve' ? true: false,params.reason || 'test')
  }

  const { trigger: startVote } = useSWRMutation('/api/vote', (_, data:{arg: VoteParams}) => handleVote(data.arg))

  const { trigger: startRevoke } = useSWRMutation('/api/vote', () => revokeVote({agree: true,reason: 'test',voteId: Number(id)}))

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0 space-y-4">
        <div>
          <div>Description</div>
          <CardDescription>{description}</CardDescription>
        </div>
        <div>
          <label>Status</label>
          <CardDescription>{status}</CardDescription>
        </div>
        <div>
          <label>Type</label>
          <CardDescription>{type}</CardDescription>
        </div>
        <div>
          <label>Initiator</label>
          <CardDescription className="break-words">{initiator}</CardDescription>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isHiddenBtn && <div className="flex items-center space-x-4">
          <Button onClick={() => startVote({ type: 'approve', reason: '' })} className="bg-green-500 text-white" variant="default">
            Approve
          </Button>
          <Button onClick={() => startVote({ type: 'reject', reason: '' })} className="bg-red-500 text-white" variant="destructive">
            Reject
          </Button>
          {
            initiator === wallet.address &&
            <Button onClick={() => startRevoke()} className="bg-gray-500 text-white" variant="destructive">
              Revoke
            </Button>
          }
        </div>}
      </CardFooter>
    </Card>
  )
}

