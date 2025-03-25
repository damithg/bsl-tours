import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import TourPackages from "@/pages/TourPackages";
import PackageDetail from "@/pages/PackageDetail";
import Destinations from "@/pages/Destinations";
import DestinationMap from "@/pages/DestinationMap";
import TravelPlanner from "@/pages/TravelPlanner";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

function Router() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/packages" component={TourPackages} />
        <Route path="/packages/:id" component={PackageDetail} />
        <Route path="/destinations" component={Destinations} />
        <Route path="/destination-map" component={DestinationMap} />
        <Route path="/travel-planner" component={TravelPlanner} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <ThemeSwitcher />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
