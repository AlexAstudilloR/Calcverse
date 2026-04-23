"use client";

import { useState, useEffect } from "react";
import { Baby } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PregnancyCalculator() {
  const [lmpDate, setLmpDate] = useState("");
  const [result, setResult] = useState<{ dueDate: string; weeks: number; days: number } | null>(null);

  const calculate = () => {
    if (!lmpDate) return;

    const lmp = new Date(lmpDate);
    // Adjust for timezone offset
    lmp.setMinutes(lmp.getMinutes() + lmp.getTimezoneOffset());
    
    if (isNaN(lmp.getTime())) return;

    // Naegele's rule: Add 280 days to LMP
    const dueDateObj = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
    
    // Calculate current weeks and days
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = Math.max(0, today.getTime() - lmp.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;

    setResult({
      dueDate: dueDateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      weeks: Math.min(weeks, 42),
      days,
    });
  };

  useEffect(() => {
    // Set default to today - 8 weeks
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() - 56);
    setLmpDate(defaultDate.toISOString().split('T')[0]);
  }, []);

  return (
    <div className="container mx-auto max-w-screen-md px-4 py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Pregnancy Due Date Calculator</h1>
        <p className="text-xl text-muted-foreground">
          Estimate your baby's due date and track your pregnancy weeks based on your Last Menstrual Period (LMP).
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calculation Details</CardTitle>
            <CardDescription>Enter the first day of your last menstrual period.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First day of last period</label>
              <Input
                type="date"
                min="2020-01-01"
                max={new Date().toISOString().split('T')[0]}
                value={lmpDate}
                onChange={(e) => setLmpDate(e.target.value)}
              />
            </div>
            <Button className="w-full mt-4" onClick={calculate}>
              Calculate Due Date
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground border-primary">
          <CardHeader>
            <CardTitle className="text-primary-foreground">Results</CardTitle>
            <CardDescription className="text-primary-foreground/80">Your estimated timeline.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {result ? (
              <>
                <div className="space-y-1">
                  <p className="text-sm text-primary-foreground/80">Estimated Due Date</p>
                  <p className="text-3xl font-bold leading-tight">{result.dueDate}</p>
                </div>
                <div className="space-y-1 pt-4 border-t border-primary-foreground/20">
                  <p className="text-sm text-primary-foreground/80">Current Progress</p>
                  <p className="text-2xl font-semibold">
                    {result.weeks} weeks, {result.days} days
                  </p>
                </div>
                <div className="pt-2">
                  <div className="h-2 w-full bg-primary-foreground/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-foreground rounded-full" 
                      style={{ width: `${Math.min(100, (result.weeks / 40) * 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-primary-foreground/60 mt-2 text-right">
                    ~40 weeks total
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-primary-foreground/60 space-y-4">
                <Baby className="h-12 w-12 opacity-50" />
                <p>Enter date to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
