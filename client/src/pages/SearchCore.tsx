// Search Core - Global search
import { useState } from 'react';

export default function SearchCore() {
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Global Search</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search emails, contacts, notes..."
          className="w-full p-4 border border-border rounded-lg text-lg"
        />
        <div className="mt-8">
          {query ? (
            <p className="text-muted-foreground">Searching for "{query}"...</p>
          ) : (
            <p className="text-muted-foreground">Enter a search query to find emails, contacts, and more</p>
          )}
        </div>
      </div>
    </div>
  );
}
