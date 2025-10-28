import { motion } from "framer-motion";
import { Link } from "wouter";
import { MapPin, Mail, Phone, Heart } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaWhatsapp } from "react-icons/fa";
import logo from "@assets/logo_1761304770834.jpg";

export default function Footer() {
  const socialLinks = [
    { icon: FaFacebook, href: "https://facebook.com", label: "Facebook", color: "hover:text-[#1877F2]" },
    { icon: FaInstagram, href: "https://instagram.com", label: "Instagram", color: "hover:text-[#E4405F]" },
    { icon: FaTwitter, href: "https://twitter.com", label: "Twitter", color: "hover:text-[#1DA1F2]" },
    { icon: FaYoutube, href: "https://youtube.com", label: "YouTube", color: "hover:text-[#FF0000]" },
    { icon: FaWhatsapp, href: "https://wa.me/919483940400", label: "WhatsApp", color: "hover:text-[#25D366]" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Rapids & Roosts" className="h-12 w-12 rounded-full object-cover shadow-lg" />
              <h3 className="font-heading text-xl font-bold tracking-wide">Rapids & Roosts</h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Your gateway to unforgettable adventures in Karnataka's wilderness. Experience the thrill of Dandeli!
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: 5,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${social.color} hover:bg-white/20 border border-white/20 hover:border-white/40`}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-heading font-semibold mb-5 text-lg tracking-wide">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/", label: "Home" },
                { href: "/activities", label: "Our Activities" },
                { href: "/booking", label: "Book Adventure" },
                { href: "/status", label: "Track Booking" },
              ].map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <Link href={link.href} className="text-white/70 hover:text-primary transition-colors duration-300 inline-flex items-center gap-2 group" data-testid={`link-footer-${link.label.toLowerCase().replace(/ /g, '-')}`}>
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-heading font-semibold mb-5 text-lg tracking-wide">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex items-start gap-3 group"
              >
                <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-primary group-hover:scale-110 transition-transform duration-300" />
                <span className="text-white/70 group-hover:text-white transition-colors duration-300">
                  Dandeli, Karnataka<br />India - 581325
                </span>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.25 }}
                className="flex items-center gap-3 group"
              >
                <Mail className="h-5 w-5 shrink-0 text-primary group-hover:scale-110 transition-transform duration-300" />
                <a
                  href="mailto:info@rapidsroosts.com"
                  className="text-white/70 hover:text-primary transition-colors duration-300"
                  data-testid="link-email"
                >
                  info@rapidsroosts.com
                </a>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="flex items-center gap-3 group"
              >
                <Phone className="h-5 w-5 shrink-0 text-primary group-hover:scale-110 transition-transform duration-300" />
                <a
                  href="tel:+919483940400"
                  className="text-white/70 hover:text-primary transition-colors duration-300"
                  data-testid="link-phone"
                >
                  +91 94839 40400
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Adventures */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-heading font-semibold mb-5 text-lg tracking-wide">Adventures</h4>
            <ul className="space-y-3 text-sm">
              {[
                { href: "/rafting", label: "White Water Rafting" },
                { href: "/safari", label: "Jungle Safari" },
                { href: "/kayaking", label: "Kayaking" },
                { href: "/trekking", label: "Forest Trekking" },
              ].map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                >
                  <Link href={link.href} className="text-white/70 hover:text-primary transition-colors duration-300 inline-flex items-center gap-2 group" data-testid={`link-adventure-${link.label.toLowerCase().replace(/ /g, '-')}`}>
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"
        />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/60"
        >
          <p className="flex items-center gap-2">
            &copy; {new Date().getFullYear()} Rapids & Roosts Dandeli. Made with{" "}
            <Heart className="h-4 w-4 text-red-500 fill-current animate-pulse" /> in India
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors duration-300" data-testid="link-privacy">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors duration-300" data-testid="link-terms">
              Terms & Conditions
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
