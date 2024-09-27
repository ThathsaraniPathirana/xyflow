import { MouseEvent, useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  Node,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  ReactFlowProvider,
} from '@xyflow/react';

const onNodeDrag = (_: MouseEvent, node: Node, nodes: Node[]) => console.log('drag', node, nodes);
const onNodeDragStop = (_: MouseEvent, node: Node, nodes: Node[]) => console.log('drag stop', node, nodes);
const onNodeClick = (_: MouseEvent, node: Node) => console.log('click', node);
const onEdgeClick = (_: MouseEvent, edge: Edge) => console.log('click', edge);

const initialNodes: Node[] = [
  {
    id: "top",
    type: "group",
    data: { label: null },
    position: { x: 0, y: 0 },
    style: {
      width: 190,
      height: 160,
    },
  },
  {
    id: "A",
    type: "group",
    data: { label: null },
    position: { x: 10, y: 10 },
    style: {
      width: 170,
      height: 140,
    },
    parentId: "top",
    expandParent: true,
  },
  {
    id: "B",
    type: "input",
    data: { label: "child node 1" },
    position: { x: 10, y: 10 },
    parentId: "A",
    expandParent: true,
  },
  {
    id: "C",
    data: { label: "child node 2" },
    position: { x: 10, y: 90 },
    parentId: "A",
    expandParent: true,
  },
];

const initialEdges: Edge[] = [];

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((connection: Connection) => setEdges((eds) => addEdge(connection, eds)), [setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      onEdgeClick={onEdgeClick}
      onConnect={onConnect}
      onNodeDrag={onNodeDrag}
      onNodeDragStop={onNodeDragStop}
      className="react-flow-basic-example"
      onlyRenderVisibleElements={false}
      fitView
      nodeOrigin={[0, 0]}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
};

export default () => (
  <ReactFlowProvider>
    <Flow />
  </ReactFlowProvider>
);
