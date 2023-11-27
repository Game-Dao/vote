/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DvaS3UiVriI
 */
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"

export default function Top5Holder({data}: {data:{count: number,address: string}[]}) {
  return (
    <section className="w-full">
      <h2 className="text-2xl font-bold">Top 5 NFT Holders</h2>
      <p className="text-zinc-500 dark:text-zinc-400 my-4">
        The following are the top 5 NFT holders who are eligible to vote and create new votes.
      </p>
      <div className="container flex justify-center items-center gap-4 lg:gap-10 px-0">
        <div className="flex w-full justify-start items-center gap-6">
          {/* 持有者 1 到 5 的循环 */}
          {data.map((holder,idx) => (
            <div key={holder.address} className="flex gap-4 items-center">
              <Avatar className="w-10 h-10 border">
                <AvatarImage alt={`@holder${idx}`} src="/placeholder-user.jpg" />
                <AvatarFallback className="text-sm">{`No.${idx+1}`}</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5 text-sm">
                <h3 className="font-semibold">{`${holder.address.slice(0,6)}...${holder.address.slice(-4)}`}</h3>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">{holder.count} NFTs</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

