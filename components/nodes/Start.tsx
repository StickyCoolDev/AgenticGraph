"use client";
import { Handle, Position } from "@xyflow/react";
import { IconPlayerPlay } from "@tabler/icons-react";

const StartNode = () => {
  return (
    <div className="border w-30 flex-col border-gray-300 p-2.5 rounded-lg">
      <div>
        <h3>Start</h3>
        <div className="bg-gray-50 p-1 rounded-sm">
          <IconPlayerPlay />
        </div>
        <Handle type="source" position={Position.Right} />
      </div>
    </div>
  );
};

export default StartNode;
