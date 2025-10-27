// app/components/FlowChart.tsx
'use client'; // Required for App Router

import React, { useState, useCallback } from 'react';
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Controls,
  Background,
  // 💡 Import the necessary types: Node, Edge, Connection, NodeChange, EdgeChange
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange,
} from '@xyflow/react';

// 🎨 Import the CSS stylesheet
import '@xyflow/react/dist/style.css';

// 1. Define the type for the data object inside a Node
// ⚠️ This is important if you use custom data properties in your nodes
type FlowNodeData = {
  label: string;
};

// 2. Use the imported types for initial states
const initialNodes: Node<FlowNodeData>[] = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Start Node' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'Process Node' } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', label: 'to the process' },
];

// 3. Define the functional component with React.FC or as a standard function
const FlowChart: React.FC = () => {
  // 4. State hooks are typed by passing the type to useState
  const [nodes, setNodes] = useState<Node<FlowNodeData>[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  // 5. Callback functions are typed using the types for changes and connections
  const onNodesChange = useCallback(
    // changes is an array of NodeChange
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const onEdgesChange = useCallback(
    // changes is an array of EdgeChange
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    // params can be a Connection or an Edge
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  return (
    // 📐 The parent must have defined dimensions (width and height)
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView // Zooms/Pans to fit all elements
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowChart;

