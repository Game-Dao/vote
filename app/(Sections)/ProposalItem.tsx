import React from 'react';
import { CardTitle, CardHeader, CardDescription, CardContent, CardFooter, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useTop5NFTOwnerStatus from "@/lib/useTop5NFTOwnerStatus";
import { status2Label } from "./const";
import { useAccount } from "india-hd-utils";
import useSWRMutation from "swr/mutation";
import { revokeVote, vote } from "../request";

interface ProposalItemProps {
  title: string;
  id: string | number;
  description: string;
  status: string;
  type: string;
  initiator: string;
  voteAddress: string;
  onClick?: () => void;
}

interface VoteParams {
  type: 'approve' | 'reject';
  reason: string;
}

export default function ProposalItem({ title, description, initiator, status, type, id, voteAddress }: ProposalItemProps) {
  const { isInTop5 } = useTop5NFTOwnerStatus();
  const isHiddenBtn = !isInTop5 || String(status) !== status2Label['1'];
  const { wallet } = useAccount();

  const handleVote = (params: VoteParams) => {
    vote(id, params.type === 'approve', params.reason || 'test');
  };

  const { trigger: startVote } = useSWRMutation('/api/vote', (_, data: { arg: VoteParams }) => handleVote(data.arg));

  const { trigger: startRevoke } = useSWRMutation('/api/vote', () => revokeVote({ agree: true, reason: 'test', voteId: Number(id) }));

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
          <CardDescription>{status}</CardDescription>
        </div>
        <div className='flex gap-2'>
          <label>Type:</label>
          <CardDescription>{type}</CardDescription>
        </div>
        <div className='flex gap-2'>
          <label>Initiator:</label>
          <CardDescription className="break-words truncate">{initiator}</CardDescription>
        </div>
        <div className='flex gap-2'>
          <label>Address:</label>
          <CardDescription className="break-words truncate">{voteAddress}</CardDescription>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between space-x-2">
        {!isHiddenBtn && (
          <div className="flex items-center space-x-3">
            <Button size='sm' onClick={() => startVote({ type: 'approve', reason: '' })} className="bg-green-500 text-white" variant="default">
              Approve
            </Button>
            <Button size='sm' onClick={() => startVote({ type: 'reject', reason: '' })} className="bg-red-500 text-white" variant="destructive">
              Reject
            </Button>
            {initiator === wallet.address && (
              <Button size='sm' onClick={() => startRevoke()} className="bg-gray-500 text-white" variant="destructive">
                Revoke
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
