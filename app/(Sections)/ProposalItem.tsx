/**
 * v0 by Vercel.
 * @see https://v0.dev/t/BgT0p8dcMgk
 */
import { CardTitle, CardHeader, CardDescription, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface ProposalItemProps {
  title: string
  description: string
  status: string;
  type: string;
  initiator: string
  onClick?: () => void
}
export default function ProposalItem({ title, description,initiator, status, type, onClick }: ProposalItemProps) {
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
          <CardDescription>{initiator}</CardDescription>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {/* <Badge className="bg-green-500 text-white">Important</Badge> */}
        <div className="flex items-center space-x-4">
          {/* <Avatar>
            <AvatarImage alt="Avatar Image" src="/placeholder.svg?height=50&width=50" />
            <AvatarFallback>IC</AvatarFallback>
          </Avatar> */}
          <Button className="bg-green-500 text-white" variant="default">
            Approve
          </Button>
          <Button className="bg-red-500 text-white" variant="destructive">
            Reject
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

