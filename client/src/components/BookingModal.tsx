import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  User,
  Calendar,
  Activity,
  CheckCircle2,
  Waves,
  Binoculars,
  Mountain,
  Ship,
  Package,
  Info,
  Mail,
  Phone,
  Users,
} from "lucide-react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format, differenceInDays } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const STEPS = [
  { id: 1, title: "Contact Info", icon: User, description: "Tell us about you" },
  { id: 2, title: "Trip Details", icon: Calendar, description: "Plan your adventure" },
  { id: 3, title: "Review", icon: CheckCircle2, description: "Confirm and submit" },
];

const ACTIVITIES = [
  {
    value: "rafting",
    label: "White Water Rafting",
    icon: Waves,
    description: "Experience the thrill of rapids",
    color: "text-teal-rapids",
  },
  {
    value: "safari",
    label: "Jungle Safari",
    icon: Binoculars,
    description: "Spot wildlife in their habitat",
    color: "text-jungle-canopy",
  },
  {
    value: "trekking",
    label: "Forest Trekking",
    icon: Mountain,
    description: "Explore pristine trails",
    color: "text-ember-trail",
  },
  {
    value: "kayaking",
    label: "Kayaking Adventure",
    icon: Ship,
    description: "Paddle through serene waters",
    color: "text-teal-rapids",
  },
  {
    value: "package",
    label: "Complete Package",
    icon: Package,
    description: "All activities included",
    color: "text-jungle-canopy",
  },
];

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: Partial<InsertBooking>;
}

export default function BookingModal({ open, onOpenChange, defaultValues }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const prevOpenRef = useRef(open);

  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      activities: [],
      checkInDate: "",
      checkOutDate: "",
      numberOfGuests: 1,
      specialRequests: "",
    },
  });

  // Sync form values only when modal transitions from closed to open
  useEffect(() => {
    if (open && !prevOpenRef.current && defaultValues) {
      form.reset({
        customerName: defaultValues.customerName || "",
        customerEmail: defaultValues.customerEmail || "",
        customerPhone: defaultValues.customerPhone || "",
        activities: defaultValues.activities || [],
        checkInDate: defaultValues.checkInDate || "",
        checkOutDate: defaultValues.checkOutDate || "",
        numberOfGuests: defaultValues.numberOfGuests || 1,
        specialRequests: defaultValues.specialRequests || "",
      });
      // Reset to step 1 when modal opens
      setCurrentStep(1);
    }
    prevOpenRef.current = open;
  }, [open, defaultValues, form]);

  const createBookingMutation = useMutation({
    mutationFn: async (data: InsertBooking) => {
      return apiRequest<{ bookingId: string }>("POST", "/api/bookings", data);
    },
    onSuccess: (data) => {
      onOpenChange(false);
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
        fieldsToValidate = ["activities", "checkInDate", "checkOutDate", "numberOfGuests"];
        break;
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid && currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const progressPercentage = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  const selectedActivities = form.watch("activities") || [];
  const checkInDate = form.watch("checkInDate");
  const checkOutDate = form.watch("checkOutDate");
  const numberOfGuests = form.watch("numberOfGuests");

  const calculateNights = () => {
    if (checkInDate && checkOutDate) {
      return differenceInDays(new Date(checkOutDate), new Date(checkInDate));
    }
    return 0;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-jungle-canopy">
            Book Your Adventure
          </DialogTitle>
          <DialogDescription>
            Complete your booking in {STEPS.length} simple steps
          </DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  "flex flex-col items-center flex-1 relative",
                  index < STEPS.length - 1 && "after:content-[''] after:absolute after:top-5 after:left-[60%] after:w-full after:h-0.5 after:bg-gray-200"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative z-10",
                    currentStep >= step.id
                      ? "bg-teal-rapids border-teal-rapids text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  )}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 font-medium",
                    currentStep >= step.id ? "text-jungle-canopy" : "text-gray-400"
                  )}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Form Steps */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <User className="w-5 h-5 text-teal-rapids" />
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                  </div>

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
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address *
                        </FormLabel>
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
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone Number *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+91 98765 43210"
                            {...field}
                            data-testid="input-customer-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-teal-rapids" />
                    <h3 className="text-lg font-semibold">Plan Your Adventure</h3>
                  </div>

                  {/* Activities Selection */}
                  <FormField
                    control={form.control}
                    name="activities"
                    render={() => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">
                          Select Activities *
                        </FormLabel>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                          {ACTIVITIES.map((activity) => {
                            const Icon = activity.icon;
                            const isSelected = selectedActivities.includes(activity.value);
                            return (
                              <FormField
                                key={activity.value}
                                control={form.control}
                                name="activities"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <label
                                        className={cn(
                                          "flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200",
                                          isSelected
                                            ? "border-teal-rapids bg-teal-rapids/5 shadow-md"
                                            : "border-gray-200 hover:border-teal-rapids/50 hover:bg-gray-50"
                                        )}
                                        data-testid={`checkbox-activity-${activity.value}`}
                                      >
                                        <Checkbox
                                          checked={field.value?.includes(activity.value)}
                                          onCheckedChange={(checked) => {
                                            const current = field.value || [];
                                            if (checked) {
                                              field.onChange([...current, activity.value]);
                                            } else {
                                              field.onChange(
                                                current.filter((val) => val !== activity.value)
                                              );
                                            }
                                          }}
                                          className="mt-0.5"
                                        />
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2">
                                            <Icon className={cn("w-5 h-5", activity.color)} />
                                            <span className="font-semibold">
                                              {activity.label}
                                            </span>
                                          </div>
                                          <p className="text-sm text-gray-600 mt-1">
                                            {activity.description}
                                          </p>
                                        </div>
                                      </label>
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            );
                          })}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Date Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="checkInDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Check-in Date *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                  data-testid="button-check-in-date"
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) =>
                                  field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                                }
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="checkOutDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Check-out Date *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                  data-testid="button-check-out-date"
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) =>
                                  field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                                }
                                disabled={(date) =>
                                  date < (checkInDate ? new Date(checkInDate) : new Date())
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Number of Guests */}
                  <FormField
                    control={form.control}
                    name="numberOfGuests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Number of Guests *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                            data-testid="input-number-of-guests"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Special Requests */}
                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Requests (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any dietary requirements, accessibility needs, or special occasions..."
                            className="min-h-[100px]"
                            {...field}
                            data-testid="textarea-special-requests"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Customization Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-900">
                      <p className="font-semibold mb-1">Activity Customization</p>
                      <p>
                        Your selected activities serve as initial preferences. You can customize
                        and finalize your activity schedule after check-in based on availability
                        and your preferences.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review & Submit */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-teal-rapids" />
                    <h3 className="text-lg font-semibold">Review Your Booking</h3>
                  </div>

                  <div className="bg-gradient-to-br from-teal-rapids/5 to-jungle-canopy/5 rounded-lg p-6 space-y-4">
                    {/* Contact Info */}
                    <div>
                      <h4 className="font-semibold text-jungle-canopy mb-2">Contact Information</h4>
                      <div className="space-y-1 text-sm">
                        <p><strong>Name:</strong> {form.getValues("customerName")}</p>
                        <p><strong>Email:</strong> {form.getValues("customerEmail")}</p>
                        <p><strong>Phone:</strong> {form.getValues("customerPhone")}</p>
                      </div>
                    </div>

                    {/* Trip Details */}
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-jungle-canopy mb-2">Trip Details</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Selected Activities:</strong>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {selectedActivities.map((activityValue) => {
                              const activity = ACTIVITIES.find((a) => a.value === activityValue);
                              return activity ? (
                                <Badge key={activityValue} className="bg-teal-rapids">
                                  {activity.label}
                                </Badge>
                              ) : null;
                            })}
                          </div>
                        </div>
                        <p>
                          <strong>Dates:</strong>{" "}
                          {checkInDate && checkOutDate
                            ? `${format(new Date(checkInDate), "MMM dd")} - ${format(
                                new Date(checkOutDate),
                                "MMM dd, yyyy"
                              )} (${calculateNights()} night${calculateNights() !== 1 ? "s" : ""})`
                            : "Not selected"}
                        </p>
                        <p><strong>Guests:</strong> {numberOfGuests}</p>
                      </div>
                    </div>

                    {/* Special Requests */}
                    {form.getValues("specialRequests") && (
                      <div className="border-t pt-4">
                        <h4 className="font-semibold text-jungle-canopy mb-2">Special Requests</h4>
                        <p className="text-sm">{form.getValues("specialRequests")}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                data-testid="button-previous-step"
                className="text-gray-700"
              >
                <ChevronLeft className="w-4 h-4 mr-2 text-gray-700" />
                Previous
              </Button>

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-teal-rapids hover:bg-teal-rapids/90 text-white"
                  data-testid="button-next-step"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2 text-white" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-jungle-canopy hover:bg-jungle-canopy/90 text-white"
                  disabled={createBookingMutation.isPending}
                  data-testid="button-submit-booking"
                >
                  {createBookingMutation.isPending ? "Submitting..." : "Confirm Booking"}
                  <CheckCircle2 className="w-4 h-4 ml-2 text-white" />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
