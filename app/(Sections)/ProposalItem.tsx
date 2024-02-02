import React from 'react';
import { CardTitle, CardHeader, CardDescription, CardContent, CardFooter, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useTop5NFTOwnerStatus from "@/lib/useTop5NFTOwnerStatus";
import { divideByTenPowEighteen, divideHugeNumberBy1e18, getReverseIntendType, status2Label } from "./const";
import { useAccount } from "india-hd-utils";
import useSWRMutation from "swr/mutation";
import { revokeVote, vote } from "../request";
import AlertDialogComponent from '../components/AlertDialog';
import toast from 'react-hot-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ProposalItemProps {
  title: string;
  id: string | number;
  description: string;
  status: string;
  // type: string;
  initiator: string;
  voteAddress: string;
  onClick?: () => void;
  voteHistory: Record<string, number>
  onVoteSuccess: () => void;
  intend: string
}

interface VoteParams {
  type: 'approve' | 'reject';
  reason: string;
}

const status2Info: { [k: number]: { text: string, color: string } } = {
  1: { text: 'Approve', color: 'green' },
  2: { text: 'Reject', color: 'red' },
  3: { text: 'Revoke', color: 'gray' },
}

export default function ProposalItem({ onVoteSuccess, title, description, initiator, status, intend, id, voteAddress, voteHistory }: ProposalItemProps) {
  const { isInTop5 } = useTop5NFTOwnerStatus();
  const isHiddenBtn = !isInTop5 || String(status) !== status2Label['1'];
  const { wallet } = useAccount();

  const handleVote = async (params: VoteParams) => {
    const res = await vote(id, params.type === 'approve', params.reason || 'test');
    return res
  };

  const { trigger: startVote, isMutating: isMutatingForVote } = useSWRMutation('/api/vote', (_, data: { arg: VoteParams }) => handleVote(data.arg));

  const { trigger: startRevoke, isMutating: isMutatingForRevoke } = useSWRMutation('/api/vote', () => revokeVote({ agree: true, reason: 'test', voteId: Number(id) }));

  const CardFooterRender = (voteHistory: Record<string, number>) => {
    const _status = voteHistory[wallet.address] && status2Info[voteHistory[wallet.address]]?.text || ''
    const _color = voteHistory[wallet.address] && status2Info[voteHistory[wallet.address]]?.color || ''
    if (_status) {
      return (
        <div className='flex gap-2 items-center'>
          <label>My Vote:</label>
          <CardDescription style={{ color: _color, fontWeight: 'bold' }}>{_status}</CardDescription>
        </div>
      )
    }
    return (
      <>
        {!isHiddenBtn && (
          <div className="flex items-center space-x-3">
            <AlertDialogComponent isLoading={isMutatingForVote} title='Approve Vote' onConfirm={async () => {
              try {
                await startVote({ type: 'approve', reason: 'test' })
                toast.success('Successfully Approve')
                onVoteSuccess()
              } catch (error: any) {
                toast.error(error?.message as string || 'Approve Failed')
              }
            }} description="Please confirm you want to approve, after approve, can not change" >
              <Button size='sm' variant="outline">
                Approve
              </Button>
            </AlertDialogComponent>

            <AlertDialogComponent isLoading={isMutatingForVote} title='Reject Vote' onConfirm={async () => {
              try {
                await startVote({ type: 'reject', reason: 'test' })
                toast.success('Successfully Reject')
                onVoteSuccess()
              } catch (error: any) {
                toast.error(error?.message as string || 'Reject Failed')
              }
            }} description="Please confirm you want to reject, after reject, can not change" >
              <Button size='sm' variant="destructive">
                Reject
              </Button>
            </AlertDialogComponent>
          </div>
        )}
      </>
    )
  }

  console.log(voteHistory)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="truncate">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0 md:space-y-4 text-sm">
        <div className='flex gap-2'>
          <label>Description:</label>
          <CardDescription className="truncate">{description}</CardDescription>
        </div>
        <div className='flex gap-2'>
          <label>Status:</label>
          {/* <CardDescription>{status}</CardDescription> */}
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <CardDescription>
                  <span className='text-blue-700 underline cursor-pointer font-semibold'>
                    {status}
                  </span>
                  <span className='ml-2 font-semibold'>{Object.keys(voteHistory || []).length}/5</span>
                </CardDescription>
              </TooltipTrigger>
              <TooltipContent>
                {
                  Object?.keys(voteHistory || []).map((address: string) => {
                    return (
                      <div key={address}>
                        <span className='text-blue-700 underline cursor-pointer'>
                          {`${address.slice(0, 8)}...${address.slice(-6)}`}
                        </span>
                        <span className='ml-2 font-semibold' style={{ color: status2Info[voteHistory[address]]?.color }}>{status2Info[voteHistory[address]]?.text}</span>
                      </div>
                    )
                  })
                }
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className='flex gap-2'>
          <label>Type:</label>
          <CardDescription>{getReverseIntendType(intend)}</CardDescription>
        </div>
        {Number(intend) >=3 && <div className='flex gap-2'>
          <label>Amount:</label>
          {/* @ts-ignore */}
          <CardDescription>{divideByTenPowEighteen(intend)}</CardDescription>
        </div>}
        <div className='flex gap-2'>
          <label>Initiator:</label>
          <CardDescription className="break-words truncate">{initiator}</CardDescription>
        </div>
        <div className='flex gap-2'>
          <label>Address:</label>
          <CardDescription className="break-words truncate">{voteAddress}</CardDescription>
        </div>
      </CardContent>
      <CardFooter className="flex items-center space-x-4">
        {CardFooterRender(voteHistory)}
        {initiator === wallet.address && status !== 'Revoke' &&
          <AlertDialogComponent isLoading={isMutatingForRevoke} title='Revoke Vote' onConfirm={async () => {
            try {
              await startRevoke()
              toast.success('Successfully Revoked')
              onVoteSuccess()
            } catch (error: any) {
              toast.error(error?.message as string || 'Revoked Failed')
            }
          }} description="Please confirm you want to revoked, after revoked, can not change" >
            <Button size='sm' variant="secondary">
              Revoke
            </Button>
          </AlertDialogComponent>}
      </CardFooter>
    </Card>
  );
}
