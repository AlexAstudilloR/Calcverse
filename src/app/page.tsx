import Link from "next/link";
import { ArrowRight, Calculator, Home as HomeIcon, HeartPulse, GraduationCap, DollarSign, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Money", icon: DollarSign, color: "text-green-500", href: "/category/money" },
  { name: "Health", icon: HeartPulse, color: "text-rose-500", href: "/category/health" },
  { name: "School", icon: GraduationCap, color: "text-blue-500", href: "/category/school" },
  { name: "Home", icon: HomeIcon, color: "text-orange-500", href: "/category/home" },
];

const featuredCalculators = [
  {
    title: "Loan Calculator",
    description: "Calculate your monthly payments, total interest, and payoff timeline.",
    icon: DollarSign,
    href: "/calculators/loan-calculator",
    category: "Money",
  },
  {
    title: "BMI Calculator",
    description: "Check your Body Mass Index and understand your health category.",
    icon: HeartPulse,
    href: "/calculators/bmi-calculator",
    category: "Health",
  },
  {
    title: "GPA Calculator",
    description: "Easily compute your college or high school GPA.",
    icon: GraduationCap,
    href: "/calculators/gpa-calculator",
    category: "School",
  },
  {
    title: "Pregnancy Due Date",
    description: "Estimate your baby's due date and track your pregnancy weeks.",
    icon: Calendar,
    href: "/calculators/pregnancy-due-date",
    category: "Life",
  },
  {
    title: "Paint Calculator",
    description: "Find out exactly how many gallons of paint you need for your room.",
    icon: HomeIcon,
    href: "/calculators/paint-calculator",
    category: "Home",
  },
  {
    title: "Compound Interest",
    description: "See how your money can grow over time with the power of compounding.",
    icon: DollarSign,
    href: "/calculators/compound-interest",
    category: "Money",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background flex justify-center">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Over 50+ tools added recently
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl text-balance">
            The calculator hub for <span className="text-muted-foreground">real life.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl text-balance">
            Smart, fast, and easy-to-use calculators for money, home, health, school and everyday decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-8">
            <Button size="lg" className="rounded-full px-8 h-14 text-base" asChild>
              <Link href="#explore">
                Explore Calculators <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base bg-background" asChild>
              <Link href="/category/money">
                Popular Tools
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Ad Space Placeholder - Under Hero */}
      <div className="w-full max-w-screen-xl mx-auto py-8 px-4 flex justify-center">
        <div className="w-full max-w-[728px] h-[90px] bg-muted border border-border/50 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
          Advertisement
        </div>
      </div>

      {/* Categories */}
      <section className="w-full py-16 flex justify-center" id="explore">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Browse by Category</h2>
            <p className="text-muted-foreground mt-4">Find exactly what you need.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.name} href={category.href} className="group block">
                  <Card className="h-full transition-all hover:shadow-md hover:border-primary/50 group-hover:-translate-y-1">
                    <CardContent className="flex flex-col items-center justify-center p-6 text-center space-y-4">
                      <div className={`p-3 rounded-full bg-muted group-hover:bg-background transition-colors ${category.color}`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <span className="font-semibold">{category.name}</span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Calculators */}
      <section className="w-full py-16 bg-muted/30 flex justify-center border-y border-border/50">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Trending Tools</h2>
              <p className="text-muted-foreground mt-2">Our most popular calculators this week.</p>
            </div>
            <Button variant="ghost" className="hidden sm:flex" asChild>
              <Link href="/calculators">View all <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCalculators.map((calc) => {
              const Icon = calc.icon;
              return (
                <Link key={calc.title} href={calc.href} className="block group">
                  <Card className="h-full transition-all hover:shadow-md hover:border-primary/30 flex flex-col">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                          {calc.category}
                        </span>
                        <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">{calc.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <CardDescription className="text-sm">
                        {calc.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
          <div className="mt-8 flex justify-center sm:hidden">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/calculators">View all tools</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Signals & FAQ SEO Placeholder */}
      <section className="w-full py-24 flex justify-center">
        <div className="container px-4 md:px-6 max-w-3xl text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Why users trust Calcverse</h2>
            <p className="text-muted-foreground text-lg">
              We build fast, accurate, and ad-respectful tools to help you make better decisions. No sign-ups required.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 pt-8 border-t border-border/50">
            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-4xl font-bold text-primary">100%</h3>
              <p className="text-sm font-medium text-muted-foreground">Free to use</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-4xl font-bold text-primary">0</h3>
              <p className="text-sm font-medium text-muted-foreground">Data tracked</p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-4xl font-bold text-primary">50+</h3>
              <p className="text-sm font-medium text-muted-foreground">Calculators</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
