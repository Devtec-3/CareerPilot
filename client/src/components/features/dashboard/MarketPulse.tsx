import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Globe, Briefcase } from "lucide-react";

const data = [
  { name: 'Jan', us: 95000, uk: 65000, ng: 25000 },
  { name: 'Feb', us: 98000, uk: 66000, ng: 26000 },
  { name: 'Mar', us: 102000, uk: 68000, ng: 28000 },
  { name: 'Apr', us: 105000, uk: 70000, ng: 30000 },
  { name: 'May', us: 108000, uk: 71000, ng: 32000 },
  { name: 'Jun', us: 112000, uk: 73000, ng: 35000 },
];

export function MarketPulse() {
  return (
    <Card className="col-span-1 md:col-span-2 glass border-border/50 shadow-xl shadow-black/20">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-display">Market Pulse</CardTitle>
          <CardDescription>Frontend Developer Salary Trends (Annual)</CardDescription>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 gap-1">
            <Globe className="w-3 h-3" /> Global
          </Badge>
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 gap-1">
            <TrendingUp className="w-3 h-3" /> +12% YoY
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorUs" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorUk" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
              itemStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Area 
              type="monotone" 
              dataKey="us" 
              stroke="hsl(var(--primary))" 
              fillOpacity={1} 
              fill="url(#colorUs)" 
              strokeWidth={2}
              name="USA"
            />
            <Area 
              type="monotone" 
              dataKey="uk" 
              stroke="hsl(var(--accent))" 
              fillOpacity={1} 
              fill="url(#colorUk)" 
              strokeWidth={2}
              name="UK"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export function StatCard({ title, value, subtext, icon: Icon, trend, trendValue }: any) {
  return (
    <Card className="glass border-border/50 shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-display">{value}</div>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          {trend === 'up' ? (
            <TrendingUp className="h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-500" />
          )}
          <span className={trend === 'up' ? "text-green-500" : "text-red-500"}>
            {trendValue}
          </span>
          {subtext}
        </p>
      </CardContent>
    </Card>
  );
}
