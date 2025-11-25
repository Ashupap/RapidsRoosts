import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ContactModalProvider } from "@/context/ContactModalContext";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/home";
import About from "@/pages/about";
import Activities from "@/pages/activities";
import Accommodations from "@/pages/accommodations";
import Rafting from "@/pages/rafting";
import Safari from "@/pages/safari";
import Kayaking from "@/pages/kayaking";
import Trekking from "@/pages/trekking";
import DandeliGuide from "@/pages/dandeli-guide";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/activities" component={Activities} />
        <Route path="/accommodations" component={Accommodations} />
        <Route path="/rafting" component={Rafting} />
        <Route path="/safari" component={Safari} />
        <Route path="/kayaking" component={Kayaking} />
        <Route path="/trekking" component={Trekking} />
        <Route path="/dandeli-guide" component={DandeliGuide} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ContactModalProvider>
          <Toaster />
          <Router />
        </ContactModalProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
