import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="p-1">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Agentic Graph<sup className="">Beta</sup>
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-center">
        Build sophisticated AI agents with large language models with open
        source software.
      </p>
      <Separator />

      <br />
      <h2 className="scroll-m-20 text-center text-3xl font-extrabold tracking-tight text-balance">
        How does this work?
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-center">
        This software is built on top of <b>LangChain</b> and <b>LangGraph</b>{" "}
        and also has support vendor specific support.
      </p>
    </main>
  );
}
