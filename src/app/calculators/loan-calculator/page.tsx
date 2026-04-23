import { Metadata } from "next";
import { LoanCalculator } from "./calculator";

export const metadata: Metadata = {
  title: "Loan Calculator | Calcverse",
  description: "Calculate your monthly loan payments, total interest, and payoff timeline with our free loan calculator.",
};

export default function Page() {
  return <LoanCalculator />;
}
