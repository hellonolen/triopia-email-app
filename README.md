# TRIOPIA - Premium Email Platform

**Version:** 1.0.0-beta  
**Last Updated:** November 7, 2025  
**Status:** Active Development → Production Preparation

---

## Overview

TRIOPIA is a fully agentic email platform that integrates intelligent automation throughout the entire email experience. Unlike traditional email clients with AI as an add-on, TRIOPIA embeds intelligence into every interaction while maintaining a clean, minimal, professional interface.

---

## Brand Identity

**Colors:**
- Primary: Peach (#D89880)
- Background: Cream (#FFFBF7)
- Text: Dark Gray (#2A2A2A)
- Muted: Light Gray (#999)
- Borders: Light Beige (#F0EBE6)

**Design Philosophy:**
- Ultra-minimal, no clutter
- No shaded backgrounds on buttons
- No decorative icons or emoji
- Clean typography (Inter font, weights 200-400)
- Breathable spacing
- Professional executive aesthetic

**Branding Rules:**
- NEVER mention "AI" in user-facing text
- Use "TRIOPIA" or neutral terms (Email Summary, Quick Replies, Contact Information)
- All features powered by intelligence but branded as TRIOPIA capabilities

---

## Current Architecture

### Frontend
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS 4 + Custom inline styles
- **Icons:** lucide-react (consistent icon kit)
- **Routing:** Wouter (client-side)
- **State:** React useState/useEffect (no external state management)

### Backend
- **API:** tRPC
- **Database:** PostgreSQL (via Drizzle ORM)
- **Authentication:** OAuth integration
- **Features:** db, server, user

### File Structure
```
client/
  src/
    pages/
      EmailInterface.tsx (main email UI - 2000+ lines)
    components/
      ui/ (shadcn/ui components)
    lib/
      trpc.ts
server/
  routers/
    notes.ts
    contacts.ts
    calendar.ts
shared/
  const.ts
```

---

## Implemented Features

### Core Email Interface ✅

**Sidebar Navigation (20 routes):**
1. Fresh Start
2. Inbox (active)
3. Starred
4. New Connections
5. Paused
6. Complete
7. Sent
8. Drafts
9. Archive
10. Spam
11. Trash
12. Storage
13. Notes
14. Calendar
15. Contacts
16. Analytics
17. Appearance
18. Settings
19. Profile
20. Admin Dashboard

**Multi-Inbox Rollup:**
- 5 email accounts displayed
- Unread count per account
- Color-coded accounts
- Collapsible inbox list

**Email List View:**
- 3 emails displayed (mock data)
- Sender name + email
- Subject + preview
- Timestamp
- Unread indicator (bold text)
- Star indicator
- Tag badges (color-coded)
- 7 action icons per email (Reply, Forward, Archive, Spam, Delete, Pin, Star)
- Click to view email in right panel

**Email Detail View (Right Panel):**
- Email subject (large heading)
- Sender info with avatar
- Timestamp
- Storage icon (save to Dropbox/Mega/OneDrive)
- Printer icon (print/PDF options)
- Email body content
- Email Summary card (key points + action items)
- Contact Information card (extracted from email)
- Quick Replies (3 suggested responses)
- Reply/Reply All/Forward buttons
- Archive/Spam/Delete/Pin/Star buttons

**Right Panel Modes:**
- Email view (default)
- Compose mode
- AI Assistant mode
- Notes mode

**Icon Tab Bar (Top Right):**
- Mail icon (Compose)
- Bot icon (AI Assistant)
- FileText icon (Notes)
- A- / A / A+ (font size controls)

### Intelligent Features ✅

**Email Summary:**
- Displays key points from email
- Extracts action items
- Shows at top of email detail view
- No "AI" branding - called "Email Summary"

**Quick Replies:**
- 3 context-aware suggested responses
- Click to insert into reply
- Configurable via `quickReplies` array
- No "AI" branding - called "Quick Replies"

**Contact Extraction:**
- Automatically extracts contact info from email
- Displays name, email, company
- "Save to Contacts" button
- No "AI" branding - called "Contact Information"

**Auto-Tagging:**
- 7 default tags: Urgent, Meeting, Receipt, Invoice, Newsletter, Personal, Work
- Tags use TRIOPIA brand colors (peach/cream/brown palette)
- Displayed as colored badges in email list
- Tag state stored in `tags` array (configurable)

**Email Signatures:**
- 3 pre-configured signatures (Work, Personal, Formal)
- Dropdown selector in reply mode
- Stored in `emailSignatures` array

**Email Templates:**
- 4 pre-built templates (Meeting Request, Follow Up, Introduction, Thank You)
- "Use Template" button in compose mode
- Stored in `emailTemplates` array

### Compose & Reply ✅

**Compose Mode:**
- To field
- CC/BCC toggle button
- Subject field
- Message body (textarea)
- Attachment button (file picker)
- Formatting toolbar placeholder
- Send / Discard buttons (text-only, no backgrounds)
- Template selector

**Reply Mode:**
- Inline reply below email content
- Shows full email thread above
- Reply / Reply All functionality
- Recipient line
- Message textarea (spacious, no cramped box)
- Signature selector
- Send / Discard buttons

**Storage Panel (Slide-out):**
- Dropbox option
- Mega option
- OneDrive option

**Print Panel (Slide-out):**
- Print to Printer
- Download as PDF
- Save PDF to Storage

### UI Controls ✅

**Font Size Controls:**
- A- (decrease)
- A (reset)
- A+ (increase)
- Positioned next to Notes icon

**Email Counts:**
- "2 UNREAD · 3 TOTAL" display in inbox header
- Dynamic calculation from email data

**View Density:**
- State prepared: compact / default / comfortable
- Not yet implemented in UI

---

## Configuration & State Management

### Dynamic Arrays (No Hardcoding)

**Tags:**
```typescript
const [tags, setTags] = useState([
  { id: 1, name: 'Urgent', color: '#D89880' },
  { id: 2, name: 'Meeting', color: '#C17A63' },
  // ... 7 total tags
]);
```

**Quick Replies:**
```typescript
const quickReplies = [
  "Thanks for reaching out! I'd be happy to schedule a call...",
  "I appreciate the warm welcome!...",
  "This sounds exciting!..."
];
```

**Email Signatures:**
```typescript
const emailSignatures = [
  { id: 1, name: 'Work', content: '...' },
  { id: 2, name: 'Personal', content: '...' },
  { id: 3, name: 'Formal', content: '...' }
];
```

**Email Templates:**
```typescript
const emailTemplates = [
  { id: 1, name: 'Meeting Request', subject: '...', body: '...' },
  // ... 4 total templates
];
```

All features use state arrays that can be easily modified, extended, or connected to backend APIs.

---

## Known Issues

1. **TypeScript Compilation Errors:**
   - tsc crashes with memory allocation errors
   - Does not affect runtime functionality
   - Vite dev server works correctly

2. **Mock Data:**
   - Currently using hardcoded mock emails
   - Need to connect to real email APIs (Gmail, Outlook, etc.)

3. **Incomplete Features:**
   - Search not implemented
   - Bulk actions not implemented
   - Mark as read/unread partially implemented
   - Drafts auto-save not implemented
   - Schedule send not implemented
   - Undo send not implemented
   - Snooze not implemented
   - Filters/rules not implemented

---

## Next Steps (Production Roadmap)

### Phase 1: Core Functionality
- [ ] Fix TypeScript compilation errors
- [ ] Implement email search
- [ ] Implement bulk email actions
- [ ] Complete mark as read/unread
- [ ] Add rich text editor for compose
- [ ] Make attachments fully functional
- [ ] Implement drafts auto-save

### Phase 2: Advanced Features
- [ ] Schedule send
- [ ] Undo send (5-second window)
- [ ] Snooze emails
- [ ] Email filters and rules
- [ ] Tag management UI (create/edit/delete)
- [ ] Contact management system
- [ ] Calendar integration

### Phase 3: Backend Integration
- [ ] Connect to Gmail API
- [ ] Connect to Outlook API
- [ ] Real authentication system
- [ ] Database schema for emails
- [ ] Database schema for contacts
- [ ] Database schema for tags
- [ ] Real-time email sync

### Phase 4: Polish & Launch
- [ ] Error boundaries
- [ ] Loading states
- [ ] Empty states
- [ ] Keyboard shortcuts (complete set)
- [ ] Accessibility improvements
- [ ] Performance optimization
- [ ] Production deployment

---

## Development Commands

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Database operations
pnpm db:push    # Push schema changes
pnpm db:studio  # Open database UI
```

---

## GitHub Repository

**URL:** https://github.com/hellonolen/triopia-email-app  
**Visibility:** Public  
**Last Push:** November 7, 2025

---

## Notes for Developers

1. **No Hardcoding:** All features use state arrays and configuration objects. Easy to extend without touching component logic.

2. **Brand Consistency:** Never use "AI" in user-facing text. All intelligent features are branded as TRIOPIA capabilities.

3. **Design System:** No shaded backgrounds on buttons. Use text-only buttons with hover effects. Keep spacing minimal and professional.

4. **Icon Kit:** Only use lucide-react icons. No decorative icons or emoji.

5. **State Management:** Currently using React useState. Consider moving to Zustand or Redux if state becomes complex.

6. **File Size:** EmailInterface.tsx is 2000+ lines. Consider splitting into smaller components for maintainability.

---

**End of README**
