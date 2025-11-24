"use client";
import { useState, useCallback, useRef, Ref } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MiniMap,
  Controls,
  NodeChange,
  EdgeChange,
  Position,
  Panel,
  Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import { IconArrowsMaximize } from "@tabler/icons-react";
import StartNode from "@/components/nodes/Start";
import LLMNode from "@/components/nodes/LLM";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const initialNodes = [
  {
    id: "n1",
    position: {
      x: 0,
      y: 0,
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    type: "startNode",
    data: {
      label: "AI",
    },
  },
  {
    id: "n2",
    position: {
      x: 100,
      y: 0,
    },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    type: "llmNode",
    data: {
      label: "Tool",
    },
  },
];

const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

const nodeType = {
  startNode: StartNode,
  llmNode: LLMNode,
};

type NodeChangeT = NodeChange<{
  id: string;
  position: { x: number; y: number };
  data: { label: string };
  sourcePosition: Position;
  targetPosition: Position;
}>;
type EdgeChangeT = EdgeChange<{ id: string; source: string; target: string }>;

export default function Page() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [nodeEditorSheetVisibility, setnodeEditorSheetVisibility] =
    useState(false);
  const onNodeClick = useCallback((_event: any, node: Node) => {
    alert(node.id);
  }, []);
  const onNodesChange = useCallback(
    (changes: NodeChangeT[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChangeT[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect = useCallback(
    (params: any) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const MainContainerRef: null | Ref<HTMLDivElement> = useRef(null);

  const toogleFullscreen = () => {
    const element: HTMLDivElement | null = MainContainerRef.current;
    if (element) {
      if (document.fullscreenElement !== element) {
        (element as HTMLDivElement).requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div
      ref={MainContainerRef as Ref<HTMLDivElement>}
      className="w-screen h-screen bg-white"
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeType}
        onNodeClick={onNodeClick}
        fitView
      >
        <MiniMap nodeStrokeWidth={3} zoomable pannable />
        <Controls />

        <Panel position="top-right">
          <Button onClick={toogleFullscreen} variant="outline">
            <IconArrowsMaximize />
          </Button>
        </Panel>

        <Panel position="center-right">
          <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </Panel>
      </ReactFlow>
    </div>
  );
}
