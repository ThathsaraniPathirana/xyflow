import NestedDragHandleNode from './NestedDragHandleNode';

export default {
  flowProps: {
    fitView: true,
    nodeTypes: {
      NestedDragHandleNode,
    },
    nodeDragThreshold: 0,
    nodes: [
      {
        id: 'parent',
        data: { label: 'parent' },
        position: { x: 0, y: 200 },
        style: {
          width: 200,
          height: 150,
        },
        expandParent: true
      },
      {
        id: "child",
        type: "group",
        data: { label: null },
        position: { x: 0, y: 200 },
        style: {
          width: 160,
          height: 120,
        },
        parentId: "parent",
        expandParent: true,
      },
      {
        id: "grandchild",
        type: "input",
        data: { label: "grandchild node 1" },
        position: { x: 0, y: 200 },
        parentId: "child",
        expandParent: true,
      },
    ],
    edges: [
      {
        id: '1-2',
        type: 'default',
        source: 'Node-1',
        target: 'Node-2',
        label: 'edge',
      },
      {
        id: '1-3',
        type: 'default',
        source: 'Node-1',
        target: 'Node-3',
        label: 'edge',
      },
    ],
  },
} satisfies FlowConfig;
