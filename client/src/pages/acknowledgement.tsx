import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Mail, Search, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Acknowledgement() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  // Get booking ID from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const bookingId = urlParams.get("bookingId");

  useEffect(() => {
    if (!bookingId) {
      navigate("/");
    }
  }, [bookingId, navigate]);

  const copyBookingId = () => {
    if (bookingId) {
      navigator.clipboard.writeText(bookingId);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Booking ID copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!bookingId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Water Ripple Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-chart-2"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1,
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-chart-3"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: 2,
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          <Card className="shadow-2xl">
            <CardHeader className="text-center pb-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                className="flex justify-center mb-4"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                  <div className="relative bg-primary/10 p-6 rounded-full">
                    <CheckCircle2 className="h-16 w-16 text-primary" />
                  </div>
                </div>
              </motion.div>
              <CardTitle className="font-heading text-3xl sm:text-4xl mb-2">
                Booking Received!
              </CardTitle>
              <p className="text-muted-foreground">
                Thank you for choosing Rapids Roosts Dandeli
              </p>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Booking ID Display */}
              <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground font-medium">Your Booking ID</span>
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Badge variant="secondary" className="animate-pulse-slow">
                      Pending Confirmation
                    </Badge>
                  </motion.div>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="flex-1 font-mono text-2xl sm:text-3xl font-bold text-foreground tracking-wider bg-background rounded-md px-4 py-3"
                    data-testid="text-booking-id"
                  >
                    {bookingId}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyBookingId}
                    data-testid="button-copy-booking-id"
                    className="shrink-0"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Save this ID to check your booking status anytime
                </p>
              </div>

              {/* Information Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-3 p-4 bg-card rounded-lg border border-card-border"
                >
                  <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-sm mb-1">Email Confirmation</h3>
                    <p className="text-xs text-muted-foreground">
                      A confirmation email has been sent to your registered email address
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-3 p-4 bg-card rounded-lg border border-card-border"
                >
                  <div className="p-2 bg-chart-2/10 rounded-lg shrink-0">
                    <Search className="h-5 w-5 text-chart-2" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-sm mb-1">Track Status</h3>
                    <p className="text-xs text-muted-foreground">
                      Use your Booking ID to check confirmation status anytime
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* What's Next */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h3 className="font-heading font-semibold text-lg mb-3">What happens next?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Our team will review your booking details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>You'll receive a confirmation email within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Check your booking status using the ID above</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link href="/status" className="flex-1">
                  <Button
                    variant="default"
                    className="w-full"
                    data-testid="button-check-status"
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Check Booking Status
                  </Button>
                </Link>
                <Link href="/" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full"
                    data-testid="button-back-home"
                  >
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
