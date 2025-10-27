import { IconFolderCode } from "@tabler/icons-react"
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>No Agents Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any agents yet. Get started by creating
          your first agent.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Create New Agent</Button>
          <Button variant="outline">Import Agent</Button>
          <br/>
          <Button variant="outline">
            Check Marketplace?
          </Button >
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          Learn More <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  )
}

