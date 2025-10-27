import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Phone, Mail } from "lucide-react";
import logo from "@assets/logo_1761304770834.jpg";

interface NavigationProps {
  transparent?: boolean;
  currentPath?: string;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/activities", label: "Our Activities" },
  { href: "/booking", label: "Book Now" },
  { href: "/status", label: "Check Status" },
];

export default function Navigation({ transparent = false, currentPath = "/" }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClasses = (href: string) => {
    const isActive = currentPath === href;
    const baseClasses = "text-sm font-medium transition-colors";
    
    if (transparent) {
      return `${baseClasses} ${isActive ? 'text-white' : 'text-white/80 hover:text-white'}`;
    }
    return `${baseClasses} ${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`;
  };

  return (
    <>
      {/* Desktop & Tablet Navigation */}
      <div className={`flex items-center justify-between ${transparent ? 'text-white' : 'text-foreground'}`}>
        <Link href="/">
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <img 
              src={logo} 
              alt="Rapids Roosts Dandeli" 
              className="h-14 w-14 rounded-full object-cover shadow-lg" 
            />
            <div>
              <h1 className={`font-heading text-xl md:text-2xl font-bold tracking-wider ${transparent ? 'text-white' : 'text-foreground'}`}>
                RAPIDS & ROOSTS
              </h1>
              <p className={`text-xs ${transparent ? 'text-white/70' : 'text-muted-foreground'}`}>
                Adventure Tourism
              </p>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={linkClasses(link.href)}>
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Contact Info & Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Desktop Contact Info */}
          <div className={`hidden xl:flex items-center gap-6 text-sm ${transparent ? 'text-white' : 'text-foreground'}`}>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+91 94839 40400</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@rapidsroosts.com</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button 
                variant={transparent ? "ghost" : "outline"} 
                size="icon"
                className={transparent ? "text-white hover:bg-white/10" : ""}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-8">
                {/* Logo in Mobile Menu */}
                <div className="flex items-center gap-3 pb-6 border-b">
                  <img 
                    src={logo} 
                    alt="Rapids Roosts Dandeli" 
                    className="h-12 w-12 rounded-full object-cover" 
                  />
                  <div>
                    <h2 className="font-heading text-lg font-bold">RAPIDS & ROOSTS</h2>
                    <p className="text-xs text-muted-foreground">Adventure Tourism</p>
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <span 
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-lg font-medium text-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}

                {/* Mobile Contact Info */}
                <div className="flex flex-col gap-4 pt-6 border-t">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>+91 94839 40400</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>info@rapidsroosts.com</span>
                  </div>
                </div>

                {/* Mobile CTA */}
                <Link href="/booking">
                  <Button 
                    className="w-full mt-4" 
                    size="lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Book Your Adventure
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
