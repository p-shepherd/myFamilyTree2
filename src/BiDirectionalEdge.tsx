import React from "react"; // Import React from react library
import {
  getBezierPath,
  BaseEdge,
  useStore,
  EdgeProps,
  ReactFlowState
} from "reactflow";

export type GetSpecialPathParams = {
  // Define GetSpecialPathParams type
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
};

export const getSpecialPath = (
  // Define getSpecialPath function
  { sourceX, sourceY, targetX, targetY }: GetSpecialPathParams, // Destructure sourceX, sourceY, targetX, and targetY from GetSpecialPathParams object
  offset: number // Define offset parameter
) => {
  const centerX = (sourceX + targetX) / 2; // Calculate centerX
  const centerY = (sourceY + targetY) / 2; // Calculate centerY

  return `M ${sourceX} ${sourceY} Q ${centerX} ${
    centerY + offset
  } ${targetX} ${targetY}`; // Return path string
};

export default function CustomEdge({
  // Define CustomEdge component with props
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  isBidirectional
}: EdgeProps & { isBidirectional: boolean }) {
  const edgePathParams = {
    // Define edgePathParams object
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  };

  let path = ""; // Define path variable

  if (isBidirectional) {
    // If isBidirectional is true
    path = getSpecialPath(edgePathParams, sourceX < targetX ? 25 : -25); // Set path to special path
  } else {
    // If isBidirectional is false
    [path] = getBezierPath(edgePathParams); // Set path to bezier path
  }

  return <BaseEdge path={path} markerEnd={markerEnd} />; // Render BaseEdge component with path and markerEnd props
}
