import { APP_NAME } from "@/const";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-8 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {APP_NAME}
            </h1>
          </div>
          
          <nav className="flex items-center gap-6">
            <a 
              href="/inbox" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Inbox
            </a>
            <a 
              href="/calendar" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Calendar
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
