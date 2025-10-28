import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, User, Calendar, Activity, CheckCircle2 } from "lucide-react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useSEO } from "@/lib/seo";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

const STEPS = [
  { id: 1, title: "Personal Details", icon: User },
  { id: 2, title: "Trip Details", icon: Calendar },
  { id: 3, title: "Additional Info", icon: Activity },
  { id: 4, title: "Review & Submit", icon: CheckCircle2 },
];

const ACTIVITIES = [
  { value: "rafting", label: "White Water Rafting" },
  { value: "safari", label: "Jungle Safari" },
  { value: "trekking", label: "Forest Trekking" },
  { value: "kayaking", label: "Kayaking Adventure" },
  { value: "package", label: "Complete Adventure Package" },
];

export default function Booking() {
  useSEO({
    title: 'Book Your Adventure - Dandeli Activity Booking',
    description: 'Book your adventure tour in Dandeli. Choose from white water rafting, jungle safaris, forest trekking, and kayaking. Instant confirmation with secure online booking.',
    keywords: 'book Dandeli tour, Dandeli booking, rafting booking Dandeli, safari booking Karnataka, adventure booking Western Ghats',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Get pre-filled data from sessionStorage (from hero form)
  const getDefaultValues = () => {
    const heroData = sessionStorage.getItem("heroBookingData");
    if (heroData) {
      try {
        const parsed = JSON.parse(heroData);
        sessionStorage.removeItem("heroBookingData"); // Clear after reading
        return {
          customerName: "",
          customerEmail: "",
          customerPhone: "",
          activityType: parsed.activityType || "",
          checkInDate: parsed.checkInDate || "",
          checkOutDate: parsed.checkOutDate || "",
          numberOfGuests: parsed.numberOfGuests || 1,
          specialRequests: "",
        };
      } catch {
        // If parsing fails, return default values
      }
    }
    return {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      activityType: "",
      checkInDate: "",
      checkOutDate: "",
      numberOfGuests: 1,
      specialRequests: "",
    };
  };

  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: getDefaultValues(),
  });

  const createBookingMutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      return apiRequest<{ bookingId: string }>("POST", "/api/bookings", data);
    },
    onSuccess: (data) => {
      setLocation(`/acknowledgement?bookingId=${data.bookingId}`);
    },
    onError: (error: Error) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertBooking) => {
    createBookingMutation.mutate(data);
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof InsertBooking)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["customerName", "customerEmail", "customerPhone"];
        break;
      case 2:
        fieldsToValidate = ["activityType", "checkInDate", "checkOutDate", "numberOfGuests"];
        break;
      case 3:
        fieldsToValidate = [];
        break;
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid && currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const progress = (currentStep / STEPS.length) * 100;
  const formValues = form.watch();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header with Progress */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="mb-4">
            <Progress value={progress} className="h-2" data-testid="progress-booking" />
          </div>
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div
                  key={step.id}
                  className={`flex items-center ${index < STEPS.length - 1 ? "flex-1" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : isCompleted
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="hidden sm:block">
                      <div
                        className={`text-sm font-medium ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {step.title}
                      </div>
                    </div>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className="hidden md:block flex-1 h-0.5 bg-border mx-4" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  {/* Step 1: Personal Details */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="font-heading text-2xl">Personal Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <FormField
                            control={form.control}
                            name="customerName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name *</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="John Doe"
                                    {...field}
                                    data-testid="input-customer-name"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="customerEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address *</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="john@example.com"
                                    {...field}
                                    data-testid="input-customer-email"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="customerPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number *</FormLabel>
                                <FormControl>
                                  <Input
                                    type="tel"
                                    placeholder="+91 9876543210"
                                    {...field}
                                    data-testid="input-customer-phone"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Step 2: Trip Details */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="font-heading text-2xl">Trip Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <FormField
                            control={form.control}
                            name="activityType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Select Activity *</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-activity-type">
                                      <SelectValue placeholder="Choose your adventure" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {ACTIVITIES.map((activity) => (
                                      <SelectItem key={activity.value} value={activity.value}>
                                        {activity.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="grid sm:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="checkInDate"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Check-in Date *</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="date"
                                      {...field}
                                      onChange={(e) => {
                                        // Ensure value is in ISO format (YYYY-MM-DD)
                                        const value = e.target.value;
                                        if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
                                          field.onChange(value);
                                        } else if (!value) {
                                          field.onChange(value);
                                        }
                                      }}
                                      min={new Date().toISOString().split("T")[0]}
                                      data-testid="input-check-in-date"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="checkOutDate"
                              render={({ field }) => {
                                const checkInDate = form.watch("checkInDate");
                                const minDate = checkInDate || new Date().toISOString().split("T")[0];
                                return (
                                  <FormItem>
                                    <FormLabel>Check-out Date *</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="date"
                                        {...field}
                                        onChange={(e) => {
                                          // Ensure value is in ISO format (YYYY-MM-DD)
                                          const value = e.target.value;
                                          if (value && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
                                            field.onChange(value);
                                          } else if (!value) {
                                            field.onChange(value);
                                          }
                                        }}
                                        min={minDate}
                                        data-testid="input-check-out-date"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                );
                              }}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name="numberOfGuests"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of Guests *</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    min="1"
                                    max="20"
                                    {...field}
                                    value={field.value}
                                    onChange={(e) => field.onChange(Number(e.target.value) || 1)}
                                    data-testid="input-number-of-guests"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Step 3: Additional Info */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="font-heading text-2xl">Additional Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <FormField
                            control={form.control}
                            name="specialRequests"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Special Requests (Optional)</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Any dietary restrictions, accessibility needs, or special requests..."
                                    className="min-h-[150px]"
                                    {...field}
                                    data-testid="textarea-special-requests"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Step 4: Review */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card>
                        <CardHeader>
                          <CardTitle className="font-heading text-2xl">Review Your Booking</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <div>
                            <h3 className="font-heading font-semibold mb-3">Personal Details</h3>
                            <div className="space-y-2 text-sm">
                              <p><span className="text-muted-foreground">Name:</span> {formValues.customerName}</p>
                              <p><span className="text-muted-foreground">Email:</span> {formValues.customerEmail}</p>
                              <p><span className="text-muted-foreground">Phone:</span> {formValues.customerPhone}</p>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-heading font-semibold mb-3">Trip Details</h3>
                            <div className="space-y-2 text-sm">
                              <p><span className="text-muted-foreground">Activity:</span> {ACTIVITIES.find(a => a.value === formValues.activityType)?.label}</p>
                              <p><span className="text-muted-foreground">Check-in:</span> {formValues.checkInDate}</p>
                              <p><span className="text-muted-foreground">Check-out:</span> {formValues.checkOutDate}</p>
                              <p><span className="text-muted-foreground">Guests:</span> {formValues.numberOfGuests}</p>
                            </div>
                          </div>
                          {formValues.specialRequests && (
                            <div>
                              <h3 className="font-heading font-semibold mb-3">Special Requests</h3>
                              <p className="text-sm text-muted-foreground">{formValues.specialRequests}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-6">
                  {currentStep > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      data-testid="button-previous-step"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                  )}
                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="ml-auto"
                      data-testid="button-next-step"
                    >
                      Next
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="ml-auto"
                      disabled={createBookingMutation.isPending}
                      data-testid="button-submit-booking"
                    >
                      {createBookingMutation.isPending ? "Submitting..." : "Submit Booking"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="font-heading text-xl">Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formValues.customerName && (
                    <div>
                      <p className="text-sm text-muted-foreground">Guest Name</p>
                      <p className="font-medium">{formValues.customerName}</p>
                    </div>
                  )}
                  {formValues.activityType && (
                    <div>
                      <p className="text-sm text-muted-foreground">Activity</p>
                      <p className="font-medium">
                        {ACTIVITIES.find(a => a.value === formValues.activityType)?.label}
                      </p>
                    </div>
                  )}
                  {formValues.checkInDate && (
                    <div>
                      <p className="text-sm text-muted-foreground">Dates</p>
                      <p className="font-medium">
                        {formValues.checkInDate} to {formValues.checkOutDate || "—"}
                      </p>
                    </div>
                  )}
                  {formValues.numberOfGuests > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground">Guests</p>
                      <p className="font-medium">{formValues.numberOfGuests} {formValues.numberOfGuests === 1 ? "Guest" : "Guests"}</p>
                    </div>
                  )}
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">Status</p>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse-slow" />
                      <p className="text-sm font-medium">Draft</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
