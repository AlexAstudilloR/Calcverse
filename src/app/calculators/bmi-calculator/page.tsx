import { Metadata } from "next";
import { BmiCalculator } from "./calculator";

export const metadata: Metadata = {
  title: "BMI Calculator | Calcverse",
  description: "Check your Body Mass Index (BMI) and understand your health category with our free BMI calculator.",
};

export default function Page() {
  return <BmiCalculator />;
}
