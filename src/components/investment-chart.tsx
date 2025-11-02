"use client";

import * as React from "react";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { InvestmentData } from "@/components/wealth-calculator";
import { Card } from "./ui/card";

interface InvestmentChartProps {
  data: InvestmentData[];
}

const formatCurrency = (value: number) => {
  if (Math.abs(value) >= 1e6) {
    return `$${(value / 1e6).toFixed(1)}M`;
  }
  if (Math.abs(value) >= 1e3) {
    return `$${(value / 1e3).toFixed(0)}K`;
  }
  return `$${value.toFixed(0)}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <Card className="p-4 bg-background/80 backdrop-blur-sm border-white/10">
        <p className="label font-bold">{`Year ${label}`}</p>
        <p className="intro text-primary">{`Projected Value: ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(payload[0].value)}`}</p>
        <p className="intro text-muted-foreground">{`Total Investment: ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(payload[1].value)}`}</p>
      </Card>
    );
  }
  return null;
};


export function InvestmentChart({ data }: InvestmentChartProps) {
  return (
    <div className="h-80 w-full mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
          <XAxis 
            dataKey="year" 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            tickFormatter={formatCurrency}
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            tickLine={{ stroke: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}/>
          <Legend wrapperStyle={{fontSize: "14px"}}/>
          <Line
            type="monotone"
            dataKey="projectedValue"
            name="Projected Value"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 8, strokeWidth: 2, fill: 'hsl(var(--primary))' }}
          />
           <Line
            type="monotone"
            dataKey="totalInvestment"
            name="Total Investment"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
