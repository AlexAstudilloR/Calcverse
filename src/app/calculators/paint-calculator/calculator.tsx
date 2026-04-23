"use client";

import { useState, useEffect } from "react";
import { PaintRoller } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function PaintCalculator() {
  const [length, setLength] = useState("12");
  const [width, setWidth] = useState("12");
  const [height, setHeight] = useState("8");
  const [doors, setDoors] = useState("1");
  const [windows, setWindows] = useState("2");
  const [coats, setCoats] = useState("2");
  const [result, setResult] = useState<{ gallons: number; sqft: number } | null>(null);

  const calculate = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const d = parseFloat(doors) || 0;
    const win = parseFloat(windows) || 0;
    const c = parseFloat(coats) || 1;

    if (l <= 0 || w <= 0 || h <= 0) return;

    // Total wall area
    let totalArea = 2 * (l * h) + 2 * (w * h);

    // Subtract doors (avg 21 sq ft) and windows (avg 15 sq ft)
    totalArea -= (d * 21) + (win * 15);

    // Ensure non-negative
    if (totalArea < 0) totalArea = 0;

    // Total area for all coats
    const totalAreaWithCoats = totalArea * c;

    // 1 Gallon covers approx 400 sq ft
    const gallons = Math.ceil((totalAreaWithCoats / 400) * 10) / 10; // Round to 1 decimal

    setResult({ gallons: gallons > 0 ? gallons : 0, sqft: totalArea });
  };

  useEffect(() => {
    calculate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto max-w-screen-md px-4 py-12">
      <div className="mb-8 space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Paint Calculator</h1>
        <p className="text-xl text-muted-foreground">
          Find out exactly how many gallons of paint you need for your room.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Room Dimensions</CardTitle>
            <CardDescription>Enter the measurements in feet.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Room Length (ft)</label>
                <Input type="number" min="0" max="1000" value={length} onChange={(e) => e.target.value.length <= 4 && setLength(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Room Width (ft)</label>
                <Input type="number" min="0" max="1000" value={width} onChange={(e) => e.target.value.length <= 4 && setWidth(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Wall Height (ft)</label>
              <Input type="number" min="0" max="100" value={height} onChange={(e) => e.target.value.length <= 3 && setHeight(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Doors</label>
                <Input type="number" min="0" max="100" value={doors} onChange={(e) => e.target.value.length <= 3 && setDoors(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Windows</label>
                <Input type="number" min="0" max="100" value={windows} onChange={(e) => e.target.value.length <= 3 && setWindows(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Coats</label>
              <Input type="number" min="0" max="10" value={coats} onChange={(e) => e.target.value.length <= 2 && setCoats(e.target.value)} />
            </div>
            <Button className="w-full mt-4" onClick={calculate}>
              Calculate Paint Needed
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground border-primary">
          <CardHeader>
            <CardTitle className="text-primary-foreground">Results</CardTitle>
            <CardDescription className="text-primary-foreground/80">Estimated paint required.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {result ? (
              <>
                <div className="space-y-1">
                  <p className="text-sm text-primary-foreground/80">Paint Needed (Gallons)</p>
                  <p className="text-5xl font-bold">{Math.ceil(result.gallons)} <span className="text-2xl font-medium opacity-80">gal</span></p>
                  <p className="text-xs text-primary-foreground/60">Exact: {result.gallons} gallons</p>
                </div>
                <div className="space-y-1 pt-4 border-t border-primary-foreground/20">
                  <p className="text-sm text-primary-foreground/80">Paintable Area</p>
                  <p className="text-2xl font-semibold">{result.sqft} sq ft</p>
                </div>
                <div className="space-y-1 pt-4 border-t border-primary-foreground/20 text-sm text-primary-foreground/80">
                  <p>Assuming 1 gallon covers 400 sq ft. It's always best to buy a little extra for touch-ups!</p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-primary-foreground/60 space-y-4">
                <PaintRoller className="h-12 w-12 opacity-50" />
                <p>Enter dimensions to see results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
