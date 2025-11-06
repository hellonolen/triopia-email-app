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
import ProfileCore from "./pages/ProfileCore";
import SettingsCore from "./pages/SettingsCore";
import LegalCore from "./pages/LegalCore";
import AppCore from "./pages/AppCore";
import BillingCore from "./pages/BillingCore";
import AdminCore from "./pages/AdminCore";
import SupportCore from "./pages/SupportCore";
import DeveloperCore from "./pages/DeveloperCore";
import StatusCore from "./pages/StatusCore";
import LogsCore from "./pages/LogsCore";
import FlagsCore from "./pages/FlagsCore";
import NotificationsCore from "./pages/NotificationsCore";
import SearchCore from "./pages/SearchCore";
import ActivityCore from "./pages/ActivityCore";
import OnboardingCore from "./pages/OnboardingCore";
import AssistantCore from "./pages/AssistantCore";
import Profile from "@/pages/Profile";
import AuthCallback from "./pages/AuthCallback";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={EmailApp} />
      <Route path={"/inbox"} component={UnifiedInbox} />
      <Route path={"/calendar"} component={Calendar} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
       <Route path="/contact" component={Contact} />
      {/* 12-Agent SaaS Core Routes */}
      <Route path="/app-core" component={AppCore} />
      <Route path="/profile-core" component={ProfileCore} />
      <Route path="/settings-core" component={SettingsCore} />
      <Route path="/billing-core" component={BillingCore} />
      <Route path="/admin-core" component={AdminCore} />
      <Route path="/support-core" component={SupportCore} />
      <Route path="/developer-core" component={DeveloperCore} />
      <Route path="/status-core" component={StatusCore} />
      <Route path="/logs-core" component={LogsCore} />
      <Route path="/flags-core" component={FlagsCore} />
      <Route path="/notifications-core" component={NotificationsCore} />
      <Route path="/search-core" component={SearchCore} />
      <Route path="/activity-core" component={ActivityCore} />
      <Route path="/legal-core" component={LegalCore} />
      <Route path="/onboarding-core" component={OnboardingCore} />
      <Route path="/assistant-core" component={AssistantCore} />
      <Route path="/profile" component={Profile} />
      <Route path={"/auth/gmail/callback"} component={AuthCallback} />
      <Route path={"/auth/outlook/callback"} component={AuthCallback} />
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
