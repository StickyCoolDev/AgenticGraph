"use client";
import { Handle, Position } from "@xyflow/react";
import { IconRobot } from "@tabler/icons-react";
import { LLMProviders } from "@/app/constants/ai";

export interface LLMNodeProps {
  llmProvider: LLMProviders;
  model: string;
}

const LLMNode = () => {
  return (
    <div className="border w-30 flex-col border-gray-300 p-2.5 rounded-lg bg-white">
      <Handle type="target" position={Position.Left} />
      <div>
        <h3>LLM</h3>
        <div className="bg-gray-50 p-1 rounded-sm border">
          <IconRobot />
        </div>
        <Handle type="source" position={Position.Right} />
      </div>
    </div>
  );
};

export default LLMNode;
