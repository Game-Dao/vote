import { createRequest } from "india-hd-utils";
import { toast } from "react-toastify";


const request = createRequest({
  baseURL: process.env.NEXT_PUBLIC_SERVICE_URL!,
  tokenName: 'token',
  encryptBlackList: [],
  publickKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  toast: (text, status) => toast[status](text)
})

export const getWallet = async () => {
  const { data } = await request<any>('/blockchain/wallet', 'GET')
  return data
}

interface Proposal {
  action: number;
  blockNum: number;
  createTime: string;
  intend: number;
  networkId: number;
  originatorAddress: string;
  reason: string;
  status: number;
  title: string;
  txHash: string;
  updateTime: string;
  voteAddress: string;
  voteId: number;
  votedAddress: string;
}

export type ProposalType = '1' | '2' |'3';
export const getProposal = async (type: ProposalType,address: string) => {
  const { data } = await request<any>('/vote/voteList', 'POST', {type, address});
  return data as Proposal[];
}

export const vote = async (voteId: string | number ,isAgree: boolean,reason: string) => {
  const { data } = await request<any>('/vote/vote', 'POST', {agree: isAgree, reason, voteId});
  return data;
}

export const createProposal = async(body: any) => {
  const {data} = await request<any>('/vote/createVote', 'POST', {...body});
  return data;
}

export const getTop5Holder = async() => {
  const {data} = await request<any>('/vote/top5NftHolder', 'GET');
  return data;
}

interface RevokeBody {
  agree: boolean;
  reason: string;
  voteId: number;
}
export const revokeVote = async(body: RevokeBody) => {
  const {data} = await request<any>('/vote/cancelVote', 'POST', body);
  return data;
}

