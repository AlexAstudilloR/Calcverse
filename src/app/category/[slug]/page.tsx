import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, DollarSign, HeartPulse, GraduationCap, Home, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const allCalculators = [
  { slug: "loan-calculator", title: "Loan Calculator", category: "money", desc: "Calculate your monthly payments, total interest, and payoff timeline.", icon: DollarSign },
  { slug: "compound-interest", title: "Compound Interest", category: "money", desc: "See how your money can grow over time with the power of compounding.", icon: DollarSign },
  { slug: "bmi-calculator", title: "BMI Calculator", category: "health", desc: "Check your Body Mass Index and understand your health category.", icon: HeartPulse },
  { slug: "gpa-calculator", title: "GPA Calculator", category: "school", desc: "Easily compute your college or high school GPA.", icon: GraduationCap },
  { slug: "pregnancy-due-date", title: "Pregnancy Due Date", category: "life", desc: "Estimate your baby's due date and track your pregnancy weeks.", icon: Calendar },
  { slug: "paint-calculator", title: "Paint Calculator", category: "home", desc: "Find out exactly how many gallons of paint you need for your room.", icon: Home },
];

const categoryInfo: Record<string, { title: string, desc: string }> = {
  money: { title: "Money Calculators", desc: "Smart tools for your personal finances, loans, and investments." },
  health: { title: "Health & Fitness", desc: "Track your body metrics and stay on top of your health goals." },
  school: { title: "School & Education", desc: "Calculators to help you manage your grades and studies." },
  home: { title: "Home & DIY", desc: "Tools to plan your home improvement projects accurately." },
  life: { title: "Everyday Life", desc: "Useful calculators for daily decisions and planning." },
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  if (!categoryInfo[slug]) {
    notFound();
  }

  const categoryCalculators = allCalculators.filter(c => c.category === slug);
  const info = categoryInfo[slug];

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-12">
      <div className="mb-8 space-y-4">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
        <h1 className="text-4xl font-bold tracking-tight capitalize">{info.title}</h1>
        <p className="text-xl text-muted-foreground">
          {info.desc}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryCalculators.length > 0 ? (
          categoryCalculators.map((calc) => {
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
          })
        ) : (
          <div className="col-span-full py-12 text-center border rounded-xl bg-muted/20">
            <p className="text-muted-foreground">No calculators found in this category yet. We are adding more soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const info = categoryInfo[slug];
  
  if (!info) return { title: "Category Not Found" };

  return {
    title: `${info.title} | Calcverse`,
    description: info.desc,
  };
}

// Generate static params for categories
export function generateStaticParams() {
  return Object.keys(categoryInfo).map((slug) => ({
    slug,
  }));
}
