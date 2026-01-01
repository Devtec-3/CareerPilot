import { AppLayout } from "@/components/layout/AppLayout";
import { useCallback, useState } from 'react';
import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState, BackgroundVariant, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, PlayCircle, Book, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Roadmap Data for different careers
const roadmapData: Record<string, { nodes: Node[], edges: Edge[] }> = {
  frontend: {
    nodes: [
      { id: 'fe-1', position: { x: 250, y: 0 }, data: { label: 'Frontend Developer' }, type: 'input', style: { background: 'hsl(var(--primary))', color: 'white', border: 'none', width: 180, fontWeight: 'bold' } },
      { id: 'fe-2', position: { x: 100, y: 100 }, data: { label: 'HTML & CSS' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
      { id: 'fe-3', position: { x: 400, y: 100 }, data: { label: 'JavaScript' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
      { id: 'fe-4', position: { x: 250, y: 200 }, data: { label: 'React' }, style: { background: 'hsl(var(--accent))', color: 'white', border: 'none' } },
      { id: 'fe-5', position: { x: 100, y: 300 }, data: { label: 'State Mgmt' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
      { id: 'fe-6', position: { x: 400, y: 300 }, data: { label: 'Tailwind CSS' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
      { id: 'fe-7', position: { x: 250, y: 400 }, data: { label: 'Next.js' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
    ],
    edges: [
      { id: 'e-fe-1-2', source: 'fe-1', target: 'fe-2', animated: true },
      { id: 'e-fe-1-3', source: 'fe-1', target: 'fe-3', animated: true },
      { id: 'e-fe-2-4', source: 'fe-2', target: 'fe-4', animated: true },
      { id: 'e-fe-3-4', source: 'fe-3', target: 'fe-4', animated: true },
      { id: 'e-fe-4-5', source: 'fe-4', target: 'fe-5' },
      { id: 'e-fe-4-6', source: 'fe-4', target: 'fe-6' },
      { id: 'e-fe-4-7', source: 'fe-4', target: 'fe-7' },
    ]
  },
  backend: {
    nodes: [
      { id: 'be-1', position: { x: 250, y: 0 }, data: { label: 'Backend Developer' }, type: 'input', style: { background: 'hsl(var(--primary))', color: 'white', border: 'none', width: 180, fontWeight: 'bold' } },
      { id: 'be-2', position: { x: 100, y: 100 }, data: { label: 'Node.js / Python' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
      { id: 'be-3', position: { x: 400, y: 100 }, data: { label: 'Databases (SQL)' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
      { id: 'be-4', position: { x: 250, y: 200 }, data: { label: 'REST APIs' }, style: { background: 'hsl(var(--accent))', color: 'white', border: 'none' } },
      { id: 'be-5', position: { x: 100, y: 300 }, data: { label: 'Docker & K8s' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
      { id: 'be-6', position: { x: 400, y: 300 }, data: { label: 'Authentication' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
      { id: 'be-7', position: { x: 250, y: 400 }, data: { label: 'Microservices' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
    ],
    edges: [
      { id: 'e-be-1-2', source: 'be-1', target: 'be-2', animated: true },
      { id: 'e-be-1-3', source: 'be-1', target: 'be-3', animated: true },
      { id: 'e-be-2-4', source: 'be-2', target: 'be-4', animated: true },
      { id: 'e-be-3-4', source: 'be-3', target: 'be-4', animated: true },
      { id: 'e-be-4-5', source: 'be-4', target: 'be-5' },
      { id: 'e-be-4-6', source: 'be-4', target: 'be-6' },
      { id: 'e-be-4-7', source: 'be-4', target: 'be-7' },
    ]
  },
  fullstack: {
    nodes: [
      { id: 'fs-1', position: { x: 250, y: 0 }, data: { label: 'Fullstack Engineer' }, type: 'input', style: { background: 'hsl(var(--primary))', color: 'white', border: 'none', width: 180, fontWeight: 'bold' } },
      { id: 'fs-2', position: { x: 100, y: 100 }, data: { label: 'Frontend Core' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
      { id: 'fs-3', position: { x: 400, y: 100 }, data: { label: 'Backend Core' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
      { id: 'fs-4', position: { x: 250, y: 200 }, data: { label: 'Fullstack Projects' }, style: { background: 'hsl(var(--accent))', color: 'white', border: 'none' } },
      { id: 'fs-5', position: { x: 250, y: 300 }, data: { label: 'Cloud Deployment' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
    ],
    edges: [
      { id: 'e-fs-1-2', source: 'fs-1', target: 'fs-2', animated: true },
      { id: 'e-fs-1-3', source: 'fs-1', target: 'fs-3', animated: true },
      { id: 'e-fs-2-4', source: 'fs-2', target: 'fs-4', animated: true },
      { id: 'e-fs-3-4', source: 'fs-3', target: 'fs-4', animated: true },
      { id: 'e-fs-4-5', source: 'fs-4', target: 'fs-5' },
    ]
  },
  datascience: {
    nodes: [
      { id: 'ds-1', position: { x: 250, y: 0 }, data: { label: 'Data Scientist' }, type: 'input', style: { background: 'hsl(var(--primary))', color: 'white', border: 'none', width: 180, fontWeight: 'bold' } },
      { id: 'ds-2', position: { x: 100, y: 100 }, data: { label: 'Python & SQL' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
      { id: 'ds-3', position: { x: 400, y: 100 }, data: { label: 'Statistics' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
      { id: 'ds-4', position: { x: 250, y: 200 }, data: { label: 'Machine Learning' }, style: { background: 'hsl(var(--accent))', color: 'white', border: 'none' } },
      { id: 'ds-5', position: { x: 100, y: 300 }, data: { label: 'Deep Learning' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
      { id: 'ds-6', position: { x: 400, y: 300 }, data: { label: 'Big Data' }, style: { background: 'hsl(var(--card))', color: 'white', borderColor: 'hsl(var(--border))' } },
    ],
    edges: [
      { id: 'e-ds-1-2', source: 'ds-1', target: 'ds-2', animated: true },
      { id: 'e-ds-1-3', source: 'ds-1', target: 'ds-3', animated: true },
      { id: 'e-ds-2-4', source: 'ds-2', target: 'ds-4', animated: true },
      { id: 'e-ds-3-4', source: 'ds-3', target: 'ds-4', animated: true },
      { id: 'e-ds-4-5', source: 'ds-4', target: 'ds-5' },
      { id: 'e-ds-4-6', source: 'ds-4', target: 'ds-6' },
    ]
  }
};

export default function RoadmapPage() {
  const [activeCareer, setActiveCareer] = useState('frontend');
  const [nodes, setNodes, onNodesChange] = useNodesState(roadmapData[activeCareer].nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(roadmapData[activeCareer].edges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const switchCareer = (careerId: string) => {
    setActiveCareer(careerId);
    setNodes(roadmapData[careerId].nodes);
    setEdges(roadmapData[careerId].edges);
    setSelectedNode(null);
  };

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-display font-bold text-white tracking-tight">Interactive Roadmap</h1>
          <p className="text-muted-foreground">
            Explore roadmaps for various tech careers and track your learning path.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {Object.keys(roadmapData).map((career) => (
            <Button 
              key={career}
              variant={activeCareer === career ? "default" : "outline"}
              size="sm"
              onClick={() => switchCareer(career)}
              className={cn(
                "capitalize transition-all",
                activeCareer === career ? "bg-primary shadow-lg shadow-primary/20" : "glass"
              )}
            >
              {career}
            </Button>
          ))}
        </div>
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
