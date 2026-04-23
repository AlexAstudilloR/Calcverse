import Link from "next/link";
import { DollarSign, HeartPulse, GraduationCap, Home, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "All Calculators | Calcverse",
  description: "Browse our complete directory of free, easy-to-use calculators for everyday decisions.",
};

const allCalculators = [
  { slug: "loan-calculator", title: "Loan Calculator", category: "money", desc: "Calculate your monthly payments, total interest, and payoff timeline.", icon: DollarSign },
  { slug: "compound-interest", title: "Compound Interest", category: "money", desc: "See how your money can grow over time with the power of compounding.", icon: DollarSign },
  { slug: "bmi-calculator", title: "BMI Calculator", category: "health", desc: "Check your Body Mass Index and understand your health category.", icon: HeartPulse },
  { slug: "gpa-calculator", title: "GPA Calculator", category: "school", desc: "Easily compute your college or high school GPA.", icon: GraduationCap },
  { slug: "pregnancy-due-date", title: "Pregnancy Due Date", category: "life", desc: "Estimate your baby's due date and track your pregnancy weeks.", icon: Calendar },
  { slug: "paint-calculator", title: "Paint Calculator", category: "home", desc: "Find out exactly how many gallons of paint you need for your room.", icon: Home },
];

export default function AllCalculatorsPage() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-12">
      <div className="mb-8 space-y-4 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">All Calculators</h1>
        <p className="text-xl text-muted-foreground">
          Browse our complete directory of free, easy-to-use tools.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCalculators.map((calc) => {
          const Icon = calc.icon;
          return (
            <Link key={calc.slug} href={`/calculators/${calc.slug}`} className="block group">
              <Card className="h-full transition-all hover:shadow-md hover:border-primary/30 flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
                      {calc.category}
                    </span>
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">{calc.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-sm">
                    {calc.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
