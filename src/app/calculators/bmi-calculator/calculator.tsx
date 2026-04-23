"use client";

import { useState, useEffect } from "react";
import { Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function BmiCalculator() {
  const [unit, setUnit] = useState<"us" | "metric">("us");
  const [heightFt, setHeightFt] = useState("5");
  const [heightIn, setHeightIn] = useState("9");
  const [heightCm, setHeightCm] = useState("175");
  const [weightLbs, setWeightLbs] = useState("160");
  const [weightKg, setWeightKg] = useState("70");
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);

  const calculate = () => {
    let bmi = 0;
    if (unit === "us") {
      const hFt = parseFloat(heightFt) || 0;
      const hIn = parseFloat(heightIn) || 0;
      const wLbs = parseFloat(weightLbs) || 0;
      const totalInches = (hFt * 12) + hIn;
      if (totalInches <= 0 || wLbs <= 0) return;
      bmi = 703 * (wLbs / (totalInches * totalInches));
    } else {
      const hCm = parseFloat(heightCm) || 0;
      const wKg = parseFloat(weightKg) || 0;
      if (hCm <= 0 || wKg <= 0) return;
      const hM = hCm / 100;
      bmi = wKg / (hM * hM);
    }

    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal weight";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";

    setResult({ bmi, category });
  };

  useEffect(() => {
    calculate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto max-w-screen-md px-4 py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">BMI Calculator</h1>
        <p className="text-xl text-muted-foreground">
          Check your Body Mass Index and understand your health category.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Details</CardTitle>
            <CardDescription>Enter your height and weight.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex bg-muted p-1 rounded-md">
              <button 
                className={`flex-1 text-sm py-1.5 rounded-sm font-medium transition-colors ${unit === "us" ? "bg-background shadow-sm" : "text-muted-foreground hover:bg-muted-foreground/10"}`}
                onClick={() => { setUnit("us"); setResult(null); calculate(); }}
              >
                US Units
              </button>
              <button 
                className={`flex-1 text-sm py-1.5 rounded-sm font-medium transition-colors ${unit === "metric" ? "bg-background shadow-sm" : "text-muted-foreground hover:bg-muted-foreground/10"}`}
                onClick={() => { setUnit("metric"); setResult(null); calculate(); }}
              >
                Metric Units
              </button>
            </div>

            {unit === "us" ? (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Height (ft)</label>
                    <Input type="number" min="0" max="10" value={heightFt} onChange={(e) => e.target.value.length <= 2 && setHeightFt(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Height (in)</label>
                    <Input type="number" min="0" max="11" value={heightIn} onChange={(e) => e.target.value.length <= 2 && setHeightIn(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Weight (lbs)</label>
                  <Input type="number" min="0" max="1500" value={weightLbs} onChange={(e) => e.target.value.length <= 4 && setWeightLbs(e.target.value)} />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Height (cm)</label>
                  <Input type="number" min="0" max="300" value={heightCm} onChange={(e) => e.target.value.length <= 3 && setHeightCm(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Weight (kg)</label>
                  <Input type="number" min="0" max="700" value={weightKg} onChange={(e) => e.target.value.length <= 3 && setWeightKg(e.target.value)} />
                </div>
              </>
            )}
            <Button className="w-full mt-4" onClick={calculate}>
              Calculate BMI
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground border-primary">
          <CardHeader>
            <CardTitle className="text-primary-foreground">Results</CardTitle>
            <CardDescription className="text-primary-foreground/80">Your BMI indicator.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {result ? (
              <>
                <div className="space-y-1">
                  <p className="text-sm text-primary-foreground/80">Your BMI</p>
                  <p className="text-5xl font-bold">{result.bmi.toFixed(1)}</p>
                </div>
                <div className="space-y-1 pt-4 border-t border-primary-foreground/20">
                  <p className="text-sm text-primary-foreground/80">Category</p>
                  <p className="text-2xl font-semibold">{result.category}</p>
                </div>
                <div className="space-y-1 pt-4 border-t border-primary-foreground/20 text-sm text-primary-foreground/80">
                  <p>A healthy BMI range is between 18.5 and 24.9.</p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-primary-foreground/60 space-y-4">
                <Activity className="h-12 w-12 opacity-50" />
                <p>Enter details to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* SEO Content Section */}
      <article className="prose prose-slate dark:prose-invert mt-16 max-w-none">
        <h2>What is BMI?</h2>
        <p>
          Body Mass Index (BMI) is a person's weight in kilograms divided by the square of height in meters.
          It is an inexpensive and easy screening method for weight category—underweight, healthy weight, overweight, and obesity.
        </p>
      </article>
    </div>
  );
}
