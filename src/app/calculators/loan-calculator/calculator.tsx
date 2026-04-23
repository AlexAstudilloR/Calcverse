"use client";

import { useState, useEffect } from "react";
import { Calculator } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LoanCalculator() {
  const [amount, setAmount] = useState("10000");
  const [rate, setRate] = useState("5");
  const [years, setYears] = useState("5");
  const [result, setResult] = useState<{ monthly: number; totalInterest: number; totalPaid: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(amount);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(years) * 12;

    if (isNaN(p) || isNaN(r) || isNaN(n) || p <= 0 || r <= 0 || n <= 0) {
      return;
    }

    const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaid = monthly * n;
    const totalInterest = totalPaid - p;

    setResult({ monthly, totalInterest, totalPaid });
  };
  
  // Calculate initially on load
  useEffect(() => {
    calculate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto max-w-screen-md px-4 py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Loan Calculator</h1>
        <p className="text-xl text-muted-foreground">
          Calculate your monthly payments, total interest, and payoff timeline.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
            <CardDescription>Enter your loan information below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Loan Amount ($)</label>
              <Input
                type="number"
                min="0"
                max="1000000000"
                value={amount}
                onChange={(e) => e.target.value.length <= 10 && setAmount(e.target.value)}
                placeholder="10000"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Interest Rate (%)</label>
              <Input
                type="number"
                min="0"
                max="100"
                value={rate}
                onChange={(e) => e.target.value.length <= 5 && setRate(e.target.value)}
                placeholder="5"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Loan Term (Years)</label>
              <Input
                type="number"
                min="0"
                max="100"
                value={years}
                onChange={(e) => e.target.value.length <= 3 && setYears(e.target.value)}
                placeholder="5"
              />
            </div>
            <Button className="w-full mt-4" onClick={calculate}>
              Calculate
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground border-primary">
          <CardHeader>
            <CardTitle className="text-primary-foreground">Results</CardTitle>
            <CardDescription className="text-primary-foreground/80">Your estimated payment plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {result ? (
              <>
                <div className="space-y-1">
                  <p className="text-sm text-primary-foreground/80">Monthly Payment</p>
                  <p className="text-4xl font-bold">${result.monthly.toFixed(2)}</p>
                </div>
                <div className="space-y-1 pt-4 border-t border-primary-foreground/20">
                  <p className="text-sm text-primary-foreground/80">Total Interest</p>
                  <p className="text-2xl font-semibold">${result.totalInterest.toFixed(2)}</p>
                </div>
                <div className="space-y-1 pt-4 border-t border-primary-foreground/20">
                  <p className="text-sm text-primary-foreground/80">Total Paid</p>
                  <p className="text-2xl font-semibold">${result.totalPaid.toFixed(2)}</p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-primary-foreground/60 space-y-4">
                <Calculator className="h-12 w-12 opacity-50" />
                <p>Enter details to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* SEO Content Section */}
      <article className="prose prose-slate dark:prose-invert mt-16 max-w-none">
        <h2>How to use the Loan Calculator</h2>
        <p>
          Our free loan calculator helps you estimate your monthly payments for any type of fixed-rate loan. 
          Whether you are looking at a personal loan, auto loan, or mortgage, simply input your loan amount, 
          annual interest rate, and the term in years.
        </p>
        <h3>Understanding the Results</h3>
        <ul>
          <li><strong>Monthly Payment:</strong> The exact amount you will need to pay each month to pay off the loan in the specified time.</li>
          <li><strong>Total Interest:</strong> The total cost of borrowing the money. A lower interest rate or shorter term reduces this number.</li>
          <li><strong>Total Paid:</strong> The sum of your principal (loan amount) and all the interest you will pay over the life of the loan.</li>
        </ul>
      </article>
    </div>
  );
}
