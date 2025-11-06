import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TextSizeProvider } from "./contexts/TextSizeContext";
import EmailApp from "./components/EmailApp";
import UnifiedInbox from "./pages/UnifiedInbox";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={EmailApp} />
      <Route path={"/inbox"} component={UnifiedInbox} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TextSizeProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </TextSizeProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
