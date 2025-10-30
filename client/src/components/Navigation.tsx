import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, Phone, Mail } from "lucide-react";
import logo from "@assets/logo_1761304770834.jpg";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/activities", label: "Our Activities" },
  { href: "/accommodations", label: "Accommodations" },
  { href: "/booking", label: "Book Now" },
  { href: "/status", label: "Check Status" },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  // Detect scroll for styling changes
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClasses = (href: string) => {
    const isActive = location === href;
    const baseClasses = "text-sm font-medium transition-all duration-300 relative";
    const textShadow = !scrolled ? "drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" : "";
    
    return `${baseClasses} ${textShadow} ${
      isActive
        ? scrolled ? "text-primary" : "text-white font-bold"
        : scrolled 
          ? "text-foreground/70 hover:text-primary"
          : "text-white hover:text-white"
    }`;
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-border/40"
          : ""
      }`}
      style={scrolled ? {} : { backgroundColor: 'transparent' }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 cursor-pointer group"
              data-testid="link-logo"
            >
              <div className="relative">
                <img
                  src={logo}
                  alt="Rapids & Roosts Dandeli"
                  className="h-12 w-12 rounded-full object-cover shadow-md ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />
              </div>
              <div>
                <h1 className={`font-heading text-lg md:text-xl font-bold tracking-wide transition-colors duration-300 ${
                  scrolled 
                    ? "text-foreground group-hover:text-primary" 
                    : "text-white group-hover:text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                }`}>
                  Rapids & Roosts
                </h1>
                <p className={`text-[10px] md:text-xs uppercase tracking-wider transition-colors duration-300 ${
                  scrolled 
                    ? "text-muted-foreground" 
                    : "text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                }`}>
                  Adventure Tourism
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={link.href}>
                  <span className={linkClasses(link.href)} data-testid={`link-nav-${link.label.toLowerCase().replace(/ /g, '-')}`}>
                    {link.label}
                    {location === link.href && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Contact Info & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Desktop Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`hidden xl:flex items-center gap-6 text-sm transition-colors duration-300 ${
                scrolled 
                  ? "text-foreground" 
                  : "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              }`}
            >
              <a
                href="tel:+919483940400"
                className="flex items-center gap-2 hover:text-primary transition-colors duration-300 group"
                data-testid="link-phone-header"
              >
                <Phone className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span>+91 94839 40400</span>
              </a>
              <a
                href="mailto:info@rapidsroosts.com"
                className="flex items-center gap-2 hover:text-primary transition-colors duration-300 group"
                data-testid="link-email-header"
              >
                <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                <span>info@rapidsroosts.com</span>
              </a>
            </motion.div>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  className={`transition-all duration-300 ${
                    scrolled 
                      ? "hover:bg-primary/10 hover:border-primary border-border" 
                      : "bg-white/10 border-white/30 text-white hover:bg-white/20 hover:border-white/50"
                  }`}
                  data-testid="button-menu"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <nav className="flex flex-col gap-6 mt-8">
                  {/* Logo in Mobile Menu */}
                  <div className="flex items-center gap-3 pb-6 border-b">
                    <img
                      src={logo}
                      alt="Rapids & Roosts Dandeli"
                      className="h-12 w-12 rounded-full object-cover shadow-md"
                    />
                    <div>
                      <h2 className="font-heading text-lg font-bold">Rapids & Roosts</h2>
                      <p className="text-xs text-muted-foreground">Adventure Tourism</p>
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                      <motion.span
                        onClick={() => setMobileMenuOpen(false)}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`block py-2 text-lg font-medium cursor-pointer transition-colors ${
                          location === link.href
                            ? "text-primary"
                            : "text-foreground hover:text-primary"
                        }`}
                        data-testid={`link-mobile-${link.label.toLowerCase().replace(/ /g, '-')}`}
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  ))}

                  {/* Mobile Contact Info */}
                  <div className="flex flex-col gap-4 pt-6 border-t">
                    <a
                      href="tel:+919483940400"
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      <span>+91 94839 40400</span>
                    </a>
                    <a
                      href="mailto:info@rapidsroosts.com"
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      <span>info@rapidsroosts.com</span>
                    </a>
                  </div>

                  {/* Mobile CTA */}
                  <Link href="/booking">
                    <Button
                      className="w-full mt-4"
                      size="lg"
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid="button-book-mobile"
                    >
                      Book Your Adventure
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
