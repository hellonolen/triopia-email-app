# TRIOPIA Changelog

All notable changes to the TRIOPIA email platform are documented in this file.

---

## [Unreleased] - 2025-11-07

### Added
- README.md with comprehensive feature documentation
- CHANGELOG.md for tracking all changes
- Mark as read/unread functionality (in progress)
- Bulk email selection state management
- Dynamic email state management (moved from mockEmails to emails state)

### Changed
- Removed all "AI" branding from user-facing text
- "AI Summary" → "Email Summary"
- "AI Detected Contact" → "Contact Information"
- "Smart Reply" → "Quick Replies"
- Tag colors updated to TRIOPIA brand palette (peach/cream/brown)
- Quick replies moved to configurable array

### Fixed
- Reply All button added and functional
- Syntax errors in EmailInterface.tsx

---

## [1.0.0-beta] - 2025-11-07

### Added - Icon Tab System
- Icon-based tab bar at top of right panel
- Mail icon for Compose mode
- Bot icon for AI Assistant mode
- FileText icon for Notes mode
- A- / A / A+ font size controls
- Tab switching functionality

### Added - Intelligent Features
- Email Summary card with key points and action items
- Contact Information extraction from emails
- Quick Replies with 3 suggested responses
- Auto-tagging system with 7 default tags
- Email signature management (3 signatures)
- Email template system (4 templates)

### Added - Email Functionality
- Reply functionality with inline compose
- Reply All button
- Forward button
- Email thread history visible during reply
- CC/BCC toggle in compose mode
- Attachment button with file picker
- Storage panel (Dropbox, Mega, OneDrive)
- Print panel (Print, Download PDF, Save PDF)
- Email count display (UNREAD · TOTAL)

### Added - UI Components
- Storage icon next to email date
- Printer icon next to email date
- Signature selector in reply mode
- Template selector in compose mode
- Tag badges in email list
- Formatting toolbar placeholder

### Changed - Design Improvements
- Reply textarea made spacious and open (240px height)
- Removed cramped box feeling from compose areas
- Icon spacing reduced by 50% for tighter alignment
- All backgrounds changed to clean white
- Removed shaded backgrounds from buttons
- Send button changed to text-only (no background)

### Fixed
- Header overlap issue in email detail panel
- Reply box not appearing when clicking Reply button
- Scroll behavior for reply box
- JSX structure errors
- Icon imports

---

## [0.9.0] - 2025-11-06

### Added - Core Interface
- 20 sidebar navigation routes
- Multi-inbox rollup with 5 email accounts
- Email list view with 3 mock emails
- Email detail view in right panel
- Right panel mode switching (email/compose/ai/notes)
- 7 email action icons per email
- Email font size controls (A- A A+)

### Added - Backend Integration
- tRPC API setup
- Database schema (Drizzle ORM)
- Notes router
- Contacts router
- Calendar router
- OAuth authentication

### Added - UI Foundation
- Peach/cream color theme
- Inter font family
- Minimal professional design
- Responsive layout with resizable panels
- Hover effects and tooltips
- Keyboard shortcuts foundation

### Added - Mock Data
- 3 sample emails
- 5 sample email accounts
- Sample tags
- Sample signatures
- Sample templates

---

## [0.1.0] - 2025-11-06

### Added - Project Initialization
- React 19 + Vite setup
- Tailwind CSS 4 configuration
- shadcn/ui components
- lucide-react icons
- TypeScript configuration
- tRPC backend
- PostgreSQL database
- OAuth integration
- Project scaffolding with web-db-user features

### Added - Initial Files
- EmailInterface.tsx (main component)
- App.tsx (routing)
- Home.tsx (landing page)
- Database schema
- tRPC routers
- Environment configuration

---

## Version History Summary

| Version | Date | Description |
|---------|------|-------------|
| Unreleased | 2025-11-07 | Production preparation, branding fixes |
| 1.0.0-beta | 2025-11-07 | Full feature implementation |
| 0.9.0 | 2025-11-06 | Core interface complete |
| 0.1.0 | 2025-11-06 | Project initialization |

---

## Checkpoints (Version IDs)

| Checkpoint | Version ID | Description |
|------------|------------|-------------|
| Latest | f041271b | Tag colors fixed to TRIOPIA brand |
| Previous | 40ee9ead | AI features added (summary, quick replies, tags) |
| Previous | f46a9910 | AI-powered features (contact extraction, signatures, templates) |
| Previous | c5777292 | Compose mode enhanced with CC/BCC |
| Previous | 76b3b642 | Email count display added |
| Previous | 6a9f05a1 | Send button background removed |
| Previous | 840f8d6a | Right panel design improvements |
| Previous | ebdc81f9 | Gmail-style inline reply |
| Previous | b2453f7d | Reply textarea improved |
| Previous | cee3a8a7 | Icon tabs and Storage/Print features |
| Previous | e034a660 | Header overlap fixed |
| Previous | c18463c3 | Multi-purpose right panel |
| Previous | b9cacfdc | TASK 1 complete - all 20 sidebar routes |
| Initial | b9c6a562 | Project initialized |

---

**End of CHANGELOG**
