import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle2, Clock, XCircle, Calendar, Users, Activity, Mail, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Booking } from "@shared/schema";
import { useSEO } from "@/lib/seo";

const STATUS_CONFIG = {
  pending: {
    icon: Clock,
    color: "text-chart-4",
    bg: "bg-chart-4/10",
    border: "border-chart-4/20",
    label: "Pending Confirmation",
    animation: "animate-pulse-slow",
  },
  confirmed: {
    icon: CheckCircle2,
    color: "text-chart-3",
    bg: "bg-chart-3/10",
    border: "border-chart-3/20",
    label: "Confirmed",
    animation: "animate-shimmer",
  },
  rejected: {
    icon: XCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
    label: "Rejected",
    animation: "animate-shake",
  },
};

export default function Status() {
  useSEO({
    title: 'Check Booking Status - Track Your Dandeli Adventure Booking',
    description: 'Check your Dandeli adventure booking status. Track your rafting, safari, trekking, or kayaking reservation using your booking ID. Get instant updates on confirmation status.',
    keywords: 'check booking status Dandeli, track booking, booking confirmation Dandeli, adventure booking status, reservation status',
  });

  const [bookingId, setBookingId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: booking, isLoading, error } = useQuery<Booking>({
    queryKey: ["/api/bookings", searchQuery],
    enabled: !!searchQuery,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingId.trim()) {
      setSearchQuery(bookingId.trim());
    }
  };

  const statusConfig = booking?.status ? STATUS_CONFIG[booking.status as keyof typeof STATUS_CONFIG] : null;
  const StatusIcon = statusConfig?.icon;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Parallax Background Layers */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='%232F5D62' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          }}
          animate={{
            backgroundPosition: ["0px 0px", "60px 60px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Track Your Booking
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter your Booking ID to check the status of your adventure reservation
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-xl mb-8">
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Enter your Booking ID (e.g., RRD-XXXXXX)"
                      value={bookingId}
                      onChange={(e) => setBookingId(e.target.value)}
                      className="text-lg h-12"
                      data-testid="input-search-booking-id"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Your Booking ID was sent to your email after booking
                    </p>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={!bookingId.trim() || isLoading}
                    data-testid="button-search-status"
                  >
                    <Search className="mr-2 h-5 w-5" />
                    {isLoading ? "Searching..." : "Search"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-destructive/50 bg-destructive/5">
                  <CardContent className="p-6 text-center">
                    <XCircle className="h-12 w-12 text-destructive mx-auto mb-3" />
                    <h3 className="font-heading text-lg font-semibold mb-2">Booking Not Found</h3>
                    <p className="text-sm text-muted-foreground">
                      We couldn't find a booking with ID "{searchQuery}". Please check the ID and try again.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {booking && statusConfig && StatusIcon && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Card className={`shadow-2xl border-2 ${statusConfig.border}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <CardTitle className="font-heading text-2xl">Booking Details</CardTitle>
                      <motion.div
                        className={statusConfig.animation}
                        data-testid={`badge-status-${booking.status}`}
                      >
                        <Badge
                          className={`${statusConfig.bg} ${statusConfig.color} border ${statusConfig.border} px-4 py-2 text-sm font-semibold`}
                        >
                          <StatusIcon className="mr-2 h-4 w-4" />
                          {statusConfig.label}
                        </Badge>
                      </motion.div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Booking ID */}
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-xs text-muted-foreground mb-1">Booking ID</p>
                      <p className="font-mono text-xl font-bold" data-testid="text-booking-details-id">
                        {booking.bookingId}
                      </p>
                    </div>

                    {/* Customer Information */}
                    <div>
                      <h3 className="font-heading font-semibold text-lg mb-4">Customer Information</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Guest Name</p>
                            <p className="font-medium" data-testid="text-customer-name">{booking.customerName}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-chart-2/10 rounded-lg shrink-0">
                            <Mail className="h-5 w-5 text-chart-2" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-muted-foreground">Email</p>
                            <p className="font-medium truncate" data-testid="text-customer-email">{booking.customerEmail}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-chart-3/10 rounded-lg shrink-0">
                            <Phone className="h-5 w-5 text-chart-3" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Phone</p>
                            <p className="font-medium" data-testid="text-customer-phone">{booking.customerPhone}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-chart-4/10 rounded-lg shrink-0">
                            <Users className="h-5 w-5 text-chart-4" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Number of Guests</p>
                            <p className="font-medium" data-testid="text-number-of-guests">{booking.numberOfGuests}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Trip Details */}
                    <div>
                      <h3 className="font-heading font-semibold text-lg mb-4">Trip Details</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                            <Activity className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Activity Type</p>
                            <p className="font-medium capitalize" data-testid="text-activity-type">{booking.activityType}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-chart-2/10 rounded-lg shrink-0">
                            <Calendar className="h-5 w-5 text-chart-2" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Check-in Date</p>
                            <p className="font-medium" data-testid="text-check-in-date">{booking.checkInDate}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 sm:col-span-2">
                          <div className="p-2 bg-chart-3/10 rounded-lg shrink-0">
                            <Calendar className="h-5 w-5 text-chart-3" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Check-out Date</p>
                            <p className="font-medium" data-testid="text-check-out-date">{booking.checkOutDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Special Requests */}
                    {booking.specialRequests && (
                      <div>
                        <h3 className="font-heading font-semibold text-lg mb-3">Special Requests</h3>
                        <div className="bg-muted/50 rounded-lg p-4">
                          <p className="text-sm text-muted-foreground">{booking.specialRequests}</p>
                        </div>
                      </div>
                    )}

                    {/* Status-specific Messages */}
                    {booking.status === "pending" && (
                      <div className="bg-chart-4/5 border border-chart-4/20 rounded-lg p-4">
                        <p className="text-sm">
                          <strong>Your booking is under review.</strong> Our team will confirm your reservation within 24 hours. You'll receive an email notification once it's confirmed.
                        </p>
                      </div>
                    )}
                    {booking.status === "confirmed" && (
                      <div className="bg-chart-3/5 border border-chart-3/20 rounded-lg p-4">
                        <p className="text-sm">
                          <strong>Your booking is confirmed!</strong> Get ready for an amazing adventure at Rapids Roosts Dandeli. A detailed confirmation email has been sent to your registered email address.
                        </p>
                      </div>
                    )}
                    {booking.status === "rejected" && (
                      <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                        <p className="text-sm">
                          <strong>We're sorry, but your booking couldn't be confirmed.</strong> Please contact us for more information or to make an alternative booking.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
