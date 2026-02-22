import { Button } from "@/components/ui/button";

interface HeaderProps {
  currentPage?: string;
}

export function Header({ currentPage = "/" }: HeaderProps) {
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img src="/icon.png" alt="Veauche mérite mieux" className="h-10 w-10" />
          <span className="text-lg font-bold text-foreground hidden sm:inline">
            Veauche mérite mieux
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="/#qui-sommes-nous"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Qui sommes-nous
          </a>
          <a
            href="/#priorites"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Nos priorités
          </a>
          <a
            href="/mesures"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Notre programme
          </a>
          <a
            href="/equipe"
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            L'équipe
          </a>
        </nav>
        <Button asChild className="bg-primary hover:bg-primary/90 md:hidden">
          <a href="/mesures">Programme</a>
        </Button>
        <Button asChild className="bg-primary hover:bg-primary/90 hidden md:inline-flex">
          <a href="#vos-questions">Posez une question</a>
        </Button>
      </div>
    </header>
  );
}
