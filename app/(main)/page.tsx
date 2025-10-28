import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="p-1">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Agentic Graph
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-center">
        Build sophisticated AI agents with large language models with open
        source software.
      </p>
      <Separator />
    </main>
  );
}
