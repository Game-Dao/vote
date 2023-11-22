import { createRequest } from "india-hd-utils";
import { toast } from "react-toastify";

const request = createRequest({
  baseURL: process.env.NEXT_PUBLIC_SERVICE_URL,
  tokenName: 'token',
  encryptBlackList: [],
  publickKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
  toast: (text, status) => toast[status](text)
})

export const getWallet = async () => {
  const { data } = await request('/blockchain/wallet', 'GET')
  return data
}

export const getProposal = async () => {
  const { data } = await request('/wallet/vote/voteList', 'GET');
  return data;
}

export const vote = async (voteId,isAgree,reason) => {
  const { data } = await request('/wallet/vote/vote', 'POST', {agree: isAgree, reason, voteId});
  return data;
}

export const createProposal = async() => {
  const {data} = await request('/wallet/vote/createVote', 'POST',{});
  return data;
}
