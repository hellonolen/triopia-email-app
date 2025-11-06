import { useEffect } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  action: () => void;
  description: string;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[], enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      for (const shortcut of shortcuts) {
        const keyMatches = event.key.toLowerCase() === shortcut.key.toLowerCase();
        const ctrlMatches = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const shiftMatches = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const altMatches = shortcut.alt ? event.altKey : !event.altKey;

        if (keyMatches && ctrlMatches && shiftMatches && altMatches) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled]);
}

export const KEYBOARD_SHORTCUTS = {
  // Email actions
  ARCHIVE: { key: 'e', description: 'Archive email' },
  REPLY: { key: 'r', description: 'Reply to email' },
  FORWARD: { key: 'f', description: 'Forward email' },
  STAR: { key: 's', description: 'Star/unstar email' },
  DELETE: { key: '#', description: 'Delete email' },
  MARK_UNREAD: { key: 'u', shift: true, description: 'Mark as unread' },
  
  // Navigation
  NEXT_EMAIL: { key: 'j', description: 'Next email' },
  PREV_EMAIL: { key: 'k', description: 'Previous email' },
  SELECT_EMAIL: { key: 'x', description: 'Select email' },
  
  // Compose
  COMPOSE: { key: 'c', description: 'Compose new email' },
  
  // Search
  SEARCH: { key: '/', description: 'Focus search' },
  COMMAND_BAR: { key: 'k', ctrl: true, description: 'Open command bar' },
  
  // Help
  HELP: { key: '?', description: 'Show keyboard shortcuts' },
};
