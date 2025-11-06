export default function Footer() {
  return (
    <footer className="border-t border-border bg-card px-6 py-4">
      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
        <div>
          © 2025 Email Business, LLC. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="/privacy" 
            className="hover:text-foreground transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a 
            href="/terms" 
            className="hover:text-foreground transition-colors duration-200"
          >
            Terms of Service
          </a>
          <a 
            href="/contact" 
            className="hover:text-foreground transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
