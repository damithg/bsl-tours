import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import TourPackages from "@/pages/TourPackages";
import PackageDetail from "@/pages/PackageDetail";
import EnhancedPackageDetail from "@/pages/EnhancedPackageDetail";
import TourDetails from "@/pages/TourDetails";
import Destinations from "@/pages/Destinations";
import DestinationDetail from "@/pages/DestinationDetail";
import DestinationMap from "@/pages/DestinationMap";
import TravelPlanner from "@/pages/TravelPlanner";
import CustomTourRequest from "@/pages/CustomTourRequest";
import Experiences from "@/pages/Experiences";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import GalleryTest from "@/pages/GalleryTest";
import AsymmetricalGalleryTest from "@/pages/AsymmetricalGalleryTest";
import ApiGalleryTest from "@/pages/ApiGalleryTest";
import SigiriyaTemplate from "@/pages/SigiriyaTemplate";
import ColorPaletteTest from "@/pages/ColorPaletteTest";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { ColorPaletteProvider } from "./contexts/ColorPaletteContext";
import ScrollToTop from "@/components/ScrollToTop";

function Router() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        
        {/* Tour routes */}
        <Route path="/tours" component={TourPackages} />
        <Route path="/tours/:slug">
          {(params) => <TourDetails params={params} />}
        </Route>
        
        {/* Legacy routes (to be eventually removed) */}
        <Route path="/packages" component={TourPackages} />
        <Route path="/packages/:id" component={PackageDetail} />
        <Route path="/tour-packages" component={TourPackages} />
        <Route path="/tour-packages/:id" component={EnhancedPackageDetail} />
        
        {/* Slug-based route for tours (older structure) */}
        <Route path="/tour/:slug">
          {(params) => <TourDetails params={params} />}
        </Route>
        
        {/* Test page for development */}
        <Route path="/test-tour">
          {() => <TourDetails />}
        </Route>
        
        {/* This route can be removed as we're now using the new design for all tour details */}
        {/* <Route path="/tour-new/:slug">
          {(params) => <TourDetailsNew params={params} />}
        </Route> */}
        
        {/* Destination routes */}
        <Route path="/destinations" component={Destinations} />
        <Route path="/destination/:slug" component={DestinationDetail} />
        <Route path="/destination-map" component={DestinationMap} />
        <Route path="/travel-planner" component={TravelPlanner} />
        <Route path="/custom-tour-request">
          {(params) => <CustomTourRequest {...params} />}
        </Route>
        <Route path="/experiences" component={Experiences} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/gallery-test" component={GalleryTest} />
        <Route path="/asymmetrical-gallery" component={AsymmetricalGalleryTest} />
        <Route path="/api-gallery-test" component={ApiGalleryTest} />
        <Route path="/sigiriya-template" component={SigiriyaTemplate} />
        <Route path="/color-palette" component={ColorPaletteTest} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <ColorPaletteProvider>
          <ScrollToTop />
          <Router />
          {/* Removed ThemeSwitcher to see the beach theme directly */}
          <Toaster />
        </ColorPaletteProvider>
      </CurrencyProvider>
    </QueryClientProvider>
  );
}

export default App;
