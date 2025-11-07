import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TextSizeProvider } from "./contexts/TextSizeContext";
import EmailApp from "./components/EmailApp";
import UnifiedInbox from "./pages/UnifiedInbox";
import Calendar from "./pages/Calendar";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import AuthCallback from "./pages/AuthCallback";
import PremiumDemo from "./pages/PremiumDemo";
import EmailInterface from "./pages/EmailInterface";
import Landing from "./pages/Landing";
import DiorRefinedDemo from "./pages/DiorRefinedDemo";
import SuperhumanDemo from "./pages/SuperhumanDemo";
import EditorialDemo from "./pages/EditorialDemo";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      {/* Landing page */}
      <Route path="/" component={Landing} />
      
      {/* Main app route */}
      <Route path="/app" component={() => <EmailInterface view="inbox" />} />
      
      {/* CORE routes */}
      <Route path="/app/fresh-start" component={() => <EmailInterface view="fresh-start" />} />
      <Route path="/app/inbox" component={() => <EmailInterface view="inbox" />} />
      <Route path="/app/starred" component={() => <EmailInterface view="starred" />} />
      <Route path="/app/new-connections" component={() => <EmailInterface view="new-connections" />} />
      <Route path="/app/paused" component={() => <EmailInterface view="paused" />} />
      <Route path="/app/complete" component={() => <EmailInterface view="complete" />} />
      <Route path="/app/sent" component={() => <EmailInterface view="sent" />} />
      <Route path="/app/drafts" component={() => <EmailInterface view="drafts" />} />
      <Route path="/app/archive" component={() => <EmailInterface view="archive" />} />
      <Route path="/app/spam" component={() => <EmailInterface view="spam" />} />
      <Route path="/app/trash" component={() => <EmailInterface view="trash" />} />
      <Route path="/app/storage" component={() => <EmailInterface view="storage" />} />
      
      {/* TOOLS routes */}
      <Route path="/app/notes" component={() => <EmailInterface view="notes" />} />
      <Route path="/app/calendar" component={() => <EmailInterface view="calendar" />} />
      <Route path="/app/contacts" component={() => <EmailInterface view="contacts" />} />
      
      {/* SETTINGS routes */}
      <Route path="/app/analytics" component={() => <EmailInterface view="analytics" />} />
      <Route path="/app/appearance" component={() => <EmailInterface view="appearance" />} />
      <Route path="/app/settings" component={() => <EmailInterface view="settings" />} />
      <Route path="/app/profile" component={() => <EmailInterface view="profile" />} />
      <Route path="/app/admin" component={() => <EmailInterface view="admin" />} />
      
      {/* Legacy demo routes */}
      <Route path={"/premium-demo"} component={PremiumDemo} />
      <Route path={"/dior-demo"} component={DiorRefinedDemo} />
      <Route path={"/superhuman-demo"} component={SuperhumanDemo} />
      <Route path={"/editorial-demo"} component={EditorialDemo} />
      
      {/* Auth callbacks */}
      <Route path={"/auth/gmail/callback"} component={AuthCallback} />
      <Route path={"/auth/outlook/callback"} component={AuthCallback} />
      
      {/* Legal pages */}
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/contact"} component={Contact} />
      
      {/* 404 */}
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
