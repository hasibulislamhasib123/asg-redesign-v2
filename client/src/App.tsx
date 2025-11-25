import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { getAssetPath } from "@/lib/utils";

// Pages
import Home from "./pages/Home";
import SeriesPage from "./pages/Series";
import BundlesPage from "./pages/Bundles";
import BookDetails from "./pages/BookDetails"; // <--- new import

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/series" component={SeriesPage} />
      <Route path="/bundles" component={BundlesPage} />
      <Route path="/book/:id" component={BookDetails} />
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
        <TooltipProvider>
          <Toaster />
          <WouterRouter base={base}>
            <Router />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;