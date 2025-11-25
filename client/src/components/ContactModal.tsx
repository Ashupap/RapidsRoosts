import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, Send, CheckCircle, Loader2, MessageCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setTimeout(() => {
      onOpenChange(false);
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-0 shadow-2xl" data-testid="dialog-contact">
        <div className="bg-gradient-to-br from-primary via-primary to-emerald-700 p-6 text-white">
          <DialogHeader className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <DialogTitle className="font-heading text-2xl text-white" data-testid="text-contact-title">
                  Let's Plan Your Adventure
                </DialogTitle>
                <DialogDescription className="text-white/80 mt-1" data-testid="text-contact-description">
                  Get in touch and we'll respond within 24 hours
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex gap-4 mt-5">
            <a
              href="tel:+919483940400"
              className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors backdrop-blur-sm"
              data-testid="link-phone"
            >
              <Phone className="h-4 w-4" />
              +91 94839 40400
            </a>
            <a
              href="mailto:info@rapidsroosts.com"
              className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors backdrop-blur-sm"
              data-testid="link-email"
            >
              <Mail className="h-4 w-4" />
              Email Us
            </a>
          </div>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-10"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
                  <div className="relative p-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full">
                    <CheckCircle className="h-12 w-12 text-white" />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 text-center"
                >
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2" data-testid="text-success-title">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground" data-testid="text-success-message">
                    We'll get back to you shortly with exciting adventure options!
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">Your Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-11 border-2 focus:border-primary transition-colors"
                      data-testid="input-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="h-11 border-2 focus:border-primary transition-colors"
                      data-testid="input-phone"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-11 border-2 focus:border-primary transition-colors"
                    data-testid="input-email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">Your Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your adventure plans - group size, preferred dates, activities you're interested in..."
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="border-2 focus:border-primary transition-colors resize-none"
                    data-testid="input-message"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 shadow-lg shadow-primary/25"
                    disabled={isSubmitting}
                    data-testid="button-submit-contact"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                  <a href="tel:+919483940400">
                    <Button
                      type="button"
                      size="lg"
                      variant="outline"
                      className="h-12 px-6 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold"
                      data-testid="button-call-modal"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Call
                    </Button>
                  </a>
                </div>

                <p className="text-xs text-muted-foreground text-center pt-2 flex items-center justify-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  We respond to all inquiries within 24 hours
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
