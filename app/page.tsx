/**
 * v0 by Vercel.
 * @see https://v0.dev/t/UfCSnT2tAOz
 */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { description, title } from "@/const"

export default function Component() {
  return (
    <section className="py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-4 px-4 md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">{title}</h2>
          <p className="max-w-[600px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
            {description}
          </p>
        </div>
        <div className="space-y-4">
          <Button className="w-full animate-pulse" variant="outline">
            Wallet Connected
          </Button>
          <Button className="w-full" variant="outline">
            Create Vote
          </Button>
        </div>
        <div className="w-full max-w-sm mt-4">
          <form className="flex space-x-2">
            <Input className="max-w-lg flex-1" placeholder="Enter vote ID" type="text" />
            <Button className=" text-white" type="submit">
              Vote
            </Button>
          </form>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
            Enter the Vote ID and click &apos;Vote&apos; to participate.
          </p>
        </div>
        <div className="w-full max-w-sm mt-4">
          <h3 className="text-2xl font-semibold mb-2">Vote List</h3>
          <ul className="space-y-2">
            <li className="bg-white shadow rounded-lg p-4 dark:bg-gray-800">
              <h4 className="font-medium">Vote ID: 123</h4>
              <p className="text-sm text-gray-500">Vote description...</p>
            </li>
            <li className="bg-white shadow rounded-lg p-4 dark:bg-gray-800">
              <h4 className="font-medium">Vote ID: 456</h4>
              <p className="text-sm text-gray-500">Vote description...</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
