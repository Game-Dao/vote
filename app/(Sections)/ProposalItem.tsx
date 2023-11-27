/**
 * v0 by Vercel.
 * @see https://v0.dev/t/BgT0p8dcMgk
 */
import { CardTitle, CardHeader, CardDescription, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import useTop5NFTOwnerStatus from "@/lib/useTop5NFTOwnerStatus";
import { status2Label } from "./const";

interface ProposalItemProps {
  title: string
  description: string
  status: string;
  type: string;
  initiator: string
  onClick?: () => void
}
export default function ProposalItem({ title, description, initiator, status, type, onClick }: ProposalItemProps) {
  const {isInTop5} = useTop5NFTOwnerStatus()
  console.log({isInTop5,status})
  const isHiddenBtn = !isInTop5 || String(status) !== status2Label['1']
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
          <Button className="bg-green-500 text-white" variant="default">
            Approve
          </Button>
          <Button className="bg-red-500 text-white" variant="destructive">
            Reject
          </Button>
        </div>}
      </CardFooter>
    </Card>
  )
}

