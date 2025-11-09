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
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import { IconArrowsMaximize } from "@tabler/icons-react";

const initialNodes = [
  {
    id: "n1",
    position: {
      x: 0,
      y: 0,
    },
    sourcePosition: Position.Right,
    data: {
      label: "AI",
    },
  },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Tool" } },
];
const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

type NodeChangeT = NodeChange<{
  id: string;
  position: { x: number; y: number };
  data: { label: string };
}>;
type EdgeChangeT = EdgeChange<{ id: string; source: string; target: string }>;

export default function Page() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

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
      style={{ width: "95vw", height: "95vh" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <MiniMap nodeStrokeWidth={3} zoomable pannable />
        <Controls />
        <Panel position="top-right">
          <Button onClick={toogleFullscreen}>
            <IconArrowsMaximize />
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  );
}
