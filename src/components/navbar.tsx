import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"
import { Search, Calculator } from "lucide-react"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Calculator className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Calcverse</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/category/money" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Money</Link>
            <Link href="/category/health" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Health</Link>
            <Link href="/category/school" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">School</Link>
            <Link href="/category/home" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Home</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden md:flex relative items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground hover:bg-accent transition-colors">
            <Search className="h-4 w-4" />
            <span>Search calculators...</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 ml-4">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
