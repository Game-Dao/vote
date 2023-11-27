'use client'
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Loader2 } from "lucide-react"
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createProposal } from '../request';
import { IntendType } from './const';
import useSWRMutation from 'swr/mutation';
import { useAccount } from 'india-hd-utils';
import { toast } from 'react-hot-toast';
import { useSWRConfig } from "swr"


// Define the schema using Zod
const FormSchema = z.object({
  intend: z.string(),
  tokenAmount: z.string().min(0, 'Token amount must be greater than or equal to 0').optional(),
  title: z.string().min(1, 'Vote title is required'),
  reason: z.string().min(1, 'Vote content is required'),
  votedAddress: z.string().min(1, 'Vote address is required'),
});

// Define the types for the form
type FormValues = z.infer<typeof FormSchema>;

const CreateVote = ({ className }: { className?: string }) => {
  const { mutate } = useSWRConfig()
  const [voteType, setVoteType] = useState<string>('');
  const { wallet } = useAccount()
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      intend: '1',
      tokenAmount: undefined,
      title: '',
      reason: '',
      votedAddress: '',
    },
  });


  const { trigger, isMutating } = useSWRMutation('createProposal', (_, data: any) => createProposal(data.arg));

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      // @ts-ignore
      await trigger(data)
      await mutate('/api/proposal')
      toast.success('Successfully Create Vote')
      form.reset();
    } catch (error: any) {
      toast.error(error.message || 'Failed to Create Vote')
    }
  };

  return (
    <div className={className}>
      <div className="space-y-2 mb-4">
        <h2 className="text-2xl font-bold">Create A New Vote</h2>
        <p className="text-zinc-500 dark:text-zinc-400">
          Enter your proposal details and submit to create a new vote. Remember, only top 5 NFT holders can create
          votes.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Vote Type Field */}
          <FormField
            control={form.control}
            name="intend"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vote Type</FormLabel>
                <Select
                  onValueChange={field.onChange} value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your vote type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={IntendType.INTEGRATE_GAME.value}>{IntendType.INTEGRATE_GAME.label}</SelectItem>
                    <SelectItem value={IntendType.REMOVE_GAME.value}>{IntendType.REMOVE_GAME.label}</SelectItem>
                    <SelectItem value={IntendType.WITHDRAW.value}>{IntendType.WITHDRAW.label}</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* Conditional Token Amount Field */}
          {voteType === IntendType.WITHDRAW.value && (
            <FormField
              control={form.control}
              name="tokenAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Token Amount</FormLabel>
                  <FormControl>
                    <Input {...field} className="form-input" placeholder="Enter your token amount" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Vote Title Field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vote Title</FormLabel>
                <FormControl>
                  <Input {...field} className="form-input" placeholder="Enter vote title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Vote Content Field */}
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vote Content</FormLabel>
                <FormControl>
                  <Textarea {...field} className="form-textarea" placeholder="Enter your vote content" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Vote Address Field */}
          <FormField
            control={form.control}
            name="votedAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vote Address</FormLabel>
                <FormControl>
                  <Input {...field} className="form-input" placeholder="Enter the vote address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={!wallet || isMutating}>
            {isMutating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {wallet ? 'Create Vote' : 'Please connect your wallet first'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateVote;
