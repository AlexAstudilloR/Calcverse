import { Metadata } from "next";
import { GpaCalculator } from "./calculator";

export const metadata: Metadata = {
  title: "GPA Calculator | Calcverse",
  description: "Easily compute your college or high school GPA with our fast and free GPA calculator.",
};

export default function Page() {
  return <GpaCalculator />;
}
