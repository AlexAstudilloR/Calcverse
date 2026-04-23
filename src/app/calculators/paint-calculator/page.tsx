import { Metadata } from "next";
import { PaintCalculator } from "./calculator";

export const metadata: Metadata = {
  title: "Paint Calculator | Calcverse",
  description: "Find out exactly how many gallons of paint you need for your room with our free paint calculator.",
};

export default function Page() {
  return <PaintCalculator />;
}
