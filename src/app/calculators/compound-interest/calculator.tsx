"use client";

import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("5000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const [contribution, setContribution] = useState("200");
  const [result, setResult] = useState<{ futureValue: number; totalContributions: number; totalInterest: number } | null>(null);

  const calculate = () => {
    const P = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseFloat(years) || 0;
    const PMT = parseFloat(contribution) || 0;
    const n = 12; // Compounded monthly

    if (t <= 0) return;

    let futureValue = P * Math.pow(1 + r/n, n*t);
    
    if (r > 0) {
      futureValue += PMT * ((Math.pow(1 + r/n, n*t) - 1) / (r/n));
    } else {
      futureValue += PMT * n * t;
    }

    const totalContributions = P + (PMT * n * t);
    const totalInterest = futureValue - totalContributions;

    setResult({ futureValue, totalContributions, totalInterest });
  };

  useEffect(() => {
    calculate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto max-w-screen-md px-4 py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Compound Interest Calculator</h1>
        <p className="text-xl text-muted-foreground">
          See how your money can grow over time with the power of compounding.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Investment Details</CardTitle>
            <CardDescription>Enter your starting amount and regular contributions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Initial Investment ($)</label>
              <Input type="number" min="0" max="1000000000" value={principal} onChange={(e) => e.target.value.length <= 10 && setPrincipal(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Monthly Contribution ($)</label>
              <Input type="number" min="0" max="10000000" value={contribution} onChange={(e) => e.target.value.length <= 8 && setContribution(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Estimated Interest Rate (%)</label>
              <Input type="number" min="0" max="100" step="0.1" value={rate} onChange={(e) => e.target.value.length <= 5 && setRate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Years to Grow</label>
              <Input type="number" min="0" max="100" value={years} onChange={(e) => e.target.value.length <= 3 && setYears(e.target.value)} />
            </div>
            <Button className="w-full mt-4" onClick={calculate}>
              Calculate Growth
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground border-primary">
          <CardHeader>
            <CardTitle className="text-primary-foreground">Results</CardTitle>
            <CardDescription className="text-primary-foreground/80">Your estimated future wealth.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {result ? (
              <>
                <div className="space-y-1">
                  <p className="text-sm text-primary-foreground/80">Future Balance</p>
                  <p className="text-4xl font-bold">${result.futureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div className="space-y-1 pt-4 border-t border-primary-foreground/20">
                  <p className="text-sm text-primary-foreground/80">Total Interest Earned</p>
                  <p className="text-2xl font-semibold text-green-300">
                    +${result.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div className="space-y-1 pt-4 border-t border-primary-foreground/20">
                  <p className="text-sm text-primary-foreground/80">Total Principal (Your Contributions)</p>
                  <p className="text-xl font-medium">
                    ${result.totalContributions.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-primary-foreground/60 space-y-4">
                <TrendingUp className="h-12 w-12 opacity-50" />
                <p>Enter details to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
