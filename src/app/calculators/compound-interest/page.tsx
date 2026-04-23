import { Metadata } from "next";
import { CompoundInterestCalculator } from "./calculator";

export const metadata: Metadata = {
  title: "Compound Interest Calculator | Calcverse",
  description: "See how your money can grow over time with the power of compounding with our free calculator.",
};

export default function Page() {
  return <CompoundInterestCalculator />;
}
