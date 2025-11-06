import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface KeyboardShortcutsHelpProps {
  onClose: () => void;
}

export default function KeyboardShortcutsHelp({ onClose }: KeyboardShortcutsHelpProps) {
  const shortcuts = [
    {
      category: 'Email Actions',
      items: [
        { keys: ['E'], description: 'Archive email' },
        { keys: ['R'], description: 'Reply to email' },
        { keys: ['F'], description: 'Forward email' },
        { keys: ['S'], description: 'Star/unstar email' },
        { keys: ['#'], description: 'Delete email' },
        { keys: ['Shift', 'U'], description: 'Mark as unread' },
      ],
    },
    {
      category: 'Navigation',
      items: [
        { keys: ['J'], description: 'Next email' },
        { keys: ['K'], description: 'Previous email' },
        { keys: ['X'], description: 'Select email' },
        { keys: ['Enter'], description: 'Open selected email' },
      ],
    },
    {
      category: 'Compose & Search',
      items: [
        { keys: ['C'], description: 'Compose new email' },
        { keys: ['/'], description: 'Focus search' },
        { keys: ['Cmd/Ctrl', 'K'], description: 'Open command bar' },
      ],
    },
    {
      category: 'General',
      items: [
        { keys: ['?'], description: 'Show this help' },
        { keys: ['Esc'], description: 'Close dialogs' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-card rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Keyboard Shortcuts</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {shortcuts.map((section) => (
              <div key={section.category}>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                  {section.category}
                </h3>
                <div className="space-y-3">
                  {section.items.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{shortcut.description}</span>
                      <div className="flex gap-1">
                        {shortcut.keys.map((key, keyIndex) => (
                          <kbd
                            key={keyIndex}
                            className="px-2 py-1 bg-muted border border-border rounded text-xs font-mono font-semibold"
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/30">
          <p className="text-sm text-muted-foreground text-center">
            Press <kbd className="px-2 py-1 bg-card border border-border rounded text-xs font-mono font-semibold">?</kbd> anytime to show this help
          </p>
        </div>
      </div>
    </div>
  );
}
