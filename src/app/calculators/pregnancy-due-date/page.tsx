import { Metadata } from "next";
import { PregnancyCalculator } from "./calculator";

export const metadata: Metadata = {
  title: "Pregnancy Due Date Calculator | Calcverse",
  description: "Estimate your baby's due date and track your pregnancy weeks based on your Last Menstrual Period (LMP).",
};

export default function Page() {
  return <PregnancyCalculator />;
}
