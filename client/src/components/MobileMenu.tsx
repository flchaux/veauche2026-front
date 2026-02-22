import { X, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface MobileMenuProps {
  currentPage?: string;
}

export default function MobileMenu({ currentPage }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const menuItems = [
    { label: "Qui sommes-nous", href: "/#qui-sommes-nous" },
    { label: "Nos priorités", href: "/#priorites" },
    { label: "Notre programme", href: "/mesures" },
    { label: "L'équipe", href: "/equipe" },
  ];

  return (
    <>
      {/* Bouton hamburger - visible uniquement sur mobile */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-white shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Menu"
      >
        <Menu className="h-6 w-6 text-primary" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Menu slide-in depuis la droite */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header du menu */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <img src="/icon.png" alt="Logo" className="h-10 w-10" />
              <span className="text-lg font-bold text-foreground">
                Veauche mérite mieux
              </span>
            </div>
            <button
              onClick={closeMenu}
              className="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Fermer le menu"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-2 px-4">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={closeMenu}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      currentPage === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Button en bas */}
          <div className="p-6 border-t bg-gray-50">
            <Button
              className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-6 text-base"
              asChild
            >
              <a href="/#votre-avis" onClick={closeMenu}>
                Posez une question
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
