import { AppLayout } from "@/components/layout/AppLayout";
import { useCallback, useState } from 'react';
import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState, BackgroundVariant, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, PlayCircle, Book } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Initial Nodes Data
const initialNodes: Node[] = [
  { id: '1', position: { x: 250, y: 0 }, data: { label: 'Frontend Developer' }, type: 'input', style: { background: 'hsl(var(--primary))', color: 'white', border: 'none', width: 180, fontWeight: 'bold' } },
  { id: '2', position: { x: 100, y: 100 }, data: { label: 'HTML & CSS' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
  { id: '3', position: { x: 400, y: 100 }, data: { label: 'JavaScript' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
  { id: '4', position: { x: 250, y: 200 }, data: { label: 'React' }, style: { background: 'hsl(var(--accent))', color: 'white', border: 'none' } },
  { id: '5', position: { x: 100, y: 300 }, data: { label: 'State Mgmt' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
  { id: '6', position: { x: 400, y: 300 }, data: { label: 'Tailwind CSS' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
  { id: '7', position: { x: 250, y: 400 }, data: { label: 'Next.js' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: 'hsl(var(--muted-foreground))' } },
  { id: 'e1-3', source: '1', target: '3', animated: true, style: { stroke: 'hsl(var(--muted-foreground))' } },
  { id: 'e2-4', source: '2', target: '4', animated: true, style: { stroke: 'hsl(var(--primary))' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: 'hsl(var(--primary))' } },
  { id: 'e4-5', source: '4', target: '5', style: { stroke: 'hsl(var(--muted-foreground))' } },
  { id: 'e4-6', source: '4', target: '6', style: { stroke: 'hsl(var(--muted-foreground))' } },
  { id: 'e4-7', source: '4', target: '7', style: { stroke: 'hsl(var(--muted-foreground))' } },
];

export default function RoadmapPage() {
  const [nodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  return (
    <AppLayout>
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-display font-bold text-white tracking-tight">Interactive Roadmap</h1>
        <p className="text-muted-foreground">
          Click on nodes to unlock resources and track your learning path.
        </p>
      </div>

      <div className="flex h-[700px] border border-border/50 rounded-xl overflow-hidden glass shadow-2xl relative">
        <div className="flex-1 h-full relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            fitView
            className="bg-background/50"
          >
            <Controls className="bg-card border-border fill-foreground" />
            <MiniMap className="bg-card border-border" maskColor="rgba(0,0,0,0.5)" />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} color="hsl(var(--muted-foreground))" className="opacity-20" />
          </ReactFlow>
        </div>

        {/* Sidebar Info Panel */}
        <div className={cn(
          "w-80 border-l border-border/50 bg-card/80 backdrop-blur-xl p-6 transition-all duration-300 transform absolute right-0 top-0 bottom-0 z-10",
          selectedNode ? "translate-x-0" : "translate-x-full"
        )}>
           {selectedNode ? (
            <div className="space-y-6 h-full flex flex-col">
              <div>
                <Badge className="mb-2 bg-primary/20 text-primary border-primary/20">Learning Module</Badge>
                <h2 className="text-2xl font-bold font-display text-white">{selectedNode.data.label as string}</h2>
                <p className="text-muted-foreground text-sm mt-2">
                  Essential skills and concepts for mastering {selectedNode.data.label as string} in 2024.
                </p>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto">
                <Card className="bg-card/50 border-border">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <PlayCircle className="w-4 h-4 text-red-500" /> Video Tutorials
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2 space-y-2">
                    <div className="text-sm text-muted-foreground hover:text-white cursor-pointer flex justify-between">
                      <span>Crash Course 2024</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                    <div className="text-sm text-muted-foreground hover:text-white cursor-pointer flex justify-between">
                      <span>Advanced Patterns</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Book className="w-4 h-4 text-blue-500" /> Documentation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-2 space-y-2">
                    <div className="text-sm text-muted-foreground hover:text-white cursor-pointer flex justify-between">
                      <span>Official Docs</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                    <div className="text-sm text-muted-foreground hover:text-white cursor-pointer flex justify-between">
                      <span>Best Practices</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button className="w-full" onClick={() => setSelectedNode(null)}>Close Panel</Button>
            </div>
          ) : null}
        </div>
      </div>
    </AppLayout>
  );
}
