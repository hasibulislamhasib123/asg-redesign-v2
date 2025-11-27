import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { getAssetPath } from "@/lib/utils";
import AddToCartButton from './components/AddToCartButton';

// Pages
import Home from "./pages/Home";
import SeriesPage from "./pages/Series";
import BundlesPage from "./pages/Bundles";
import BookDetails from "./pages/BookDetails"; // New import: BookDetails page component for individual book display

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/series" component={SeriesPage} />
      <Route path="/bundles" component={BundlesPage} />
      <Route path="/book/:id" component={BookDetails} /> {/* New Route: Dynamic book detail page with ID parameter */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable={true}>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <WouterRouter base={base}>
              <Router />
            </WouterRouter>
          </TooltipProvider>
        </CartProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
export default App;