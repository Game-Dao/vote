/**
 * v0 by Vercel.
 * @see https://v0.dev/t/4PCIXsovsbW
 */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Component() {
  return (
      <div className="px-12">
        <section className="grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Vote on Proposals</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Choose a proposal from the list below and cast your vote. Only the top 5 NFT holders are eligible to vote.
            </p>
            <div className="flex flex-col space-y-2">
              <Button className="border-[#bd1e59] text-[#bd1e59] dark:text-white dark:border-white" variant="outline">
                Proposal 1
              </Button>
              <Button className="border-[#bd1e59] text-[#bd1e59] dark:text-white dark:border-white" variant="outline">
                Proposal 2
              </Button>
              <Button className="border-[#bd1e59] text-[#bd1e59] dark:text-white dark:border-white" variant="outline">
                Proposal 3
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Create a New Vote</h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Enter your proposal details and submit to create a new vote. Remember, only top 5 NFT holders can create
              votes.
            </p>
            <form className="flex flex-col space-y-2">
              <Input
                className="rounded-md border border-zinc-200 bg-white px-4 py-2 dark:border-zinc-800 dark:bg-zinc-950"
                placeholder="Title"
                type="text"
              />
              <textarea
                className="rounded-md border border-zinc-200 bg-white px-4 py-2 h-20 dark:border-zinc-800 dark:bg-zinc-950"
                placeholder="Description"
              />
              <Button className="bg-[#bd1e59] text-white dark:text-white" type="submit" variant="secondary">
                Submit
              </Button>
            </form>
          </div>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Top 5 NFT Holders</h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            The following are the top 5 NFT holders who are eligible to vote and create new votes.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <img
              alt="NFT Holder 1"
              className="aspect-content rounded-lg object-cover"
              height="200"
              src="/placeholder.svg"
              width="200"
            />
            <img
              alt="NFT Holder 2"
              className="aspect-content rounded-lg object-cover"
              height="200"
              src="/placeholder.svg"
              width="200"
            />
            <img
              alt="NFT Holder 3"
              className="aspect-content rounded-lg object-cover"
              height="200"
              src="/placeholder.svg"
              width="200"
            />
            <img
              alt="NFT Holder 4"
              className="aspect-content rounded-lg object-cover"
              height="200"
              src="/placeholder.svg"
              width="200"
            />
            <img
              alt="NFT Holder 5"
              className="aspect-content rounded-lg object-cover"
              height="200"
              src="/placeholder.svg"
              width="200"
            />
          </div>
        </section>
      </div>
  )
}

