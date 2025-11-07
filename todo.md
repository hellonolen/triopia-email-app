# TRIOPIA Production Priorities

## PHASE 1: Core Email Functionality

### Reply & Forward
- [x] Reply functionality
- [x] Reply All functionality
- [ ] Forward with attachments (make functional)
- [ ] Forward to multiple recipients

### Attachments
- [ ] File upload functionality (connect to backend)
- [ ] Drag and drop file upload
- [ ] Multiple file attachments
- [ ] Attachment preview
- [ ] Download attachments
- [ ] Remove attachments before sending

### Rich Text Editor
- [IN PROGRESS] Bold, Italic, Underline formatting
- [ ] Font size selector
- [ ] Font family selector
- [ ] Text color picker
- [ ] Background color picker
- [ ] Bulleted lists
- [ ] Numbered lists
- [ ] Insert link
- [ ] Insert image
- [ ] Emoji picker

### Email Search
- [ ] Search input in header
- [ ] Search by sender
- [ ] Search by subject
- [ ] Search by content
- [ ] Search by date range
- [ ] Search filters (unread, starred, has attachment)
- [ ] Search results highlighting

### Bulk Actions
- [x] Select individual emails (state prepared)
- [ ] Select all emails checkbox
- [ ] Bulk mark as read
- [ ] Bulk mark as unread
- [ ] Bulk delete
- [ ] Bulk archive
- [ ] Bulk add tag
- [ ] Bulk move to folder

### Mark as Read/Unread
- [x] Toggle read status function (implemented)
- [ ] Mark as read button in email detail
- [ ] Mark as unread button in email list
- [ ] Auto-mark as read when opening email
- [ ] Keyboard shortcut (u for unread)

---

## PHASE 2: Email Management Features

### Drafts
- [ ] Auto-save drafts every 30 seconds
- [ ] Drafts folder view
- [ ] Resume editing draft
- [ ] Delete draft
- [ ] Draft indicator in compose mode

### Schedule Send
- [ ] Schedule send button in compose
- [ ] Date/time picker
- [ ] Scheduled emails list
- [ ] Edit scheduled email
- [ ] Cancel scheduled send

### Undo Send
- [ ] 5-second undo window after sending
- [ ] Undo notification toast
- [ ] Cancel send button
- [ ] Configurable undo delay (5s, 10s, 30s)

### Snooze
- [ ] Snooze button in email detail
- [ ] Snooze time picker (Later today, Tomorrow, Next week, Custom)
- [ ] Snoozed emails folder
- [ ] Unsnooze functionality
- [ ] Snooze notification when email returns

### Filters & Rules
- [ ] Create filter UI
- [ ] Filter conditions (from, to, subject, has words)
- [ ] Filter actions (archive, delete, mark as read, add label, forward)
- [ ] Edit filter
- [ ] Delete filter
- [ ] Apply filter to existing emails

### Archive & Spam (Make Functional)
- [ ] Archive button moves email to Archive folder
- [ ] Archive folder view
- [ ] Unarchive functionality
- [ ] Spam button moves email to Spam folder
- [ ] Spam folder view
- [ ] Mark as not spam
- [ ] Auto-delete spam after 30 days

---

## PHASE 3: Tag & Contact Management

### Tag Management
- [ ] Create new tag UI (modal or slide-out)
- [ ] Tag name input
- [ ] Tag color picker (TRIOPIA palette)
- [ ] Edit tag (rename, change color)
- [ ] Delete tag
- [ ] Tag library/management page
- [ ] Apply tag to email (dropdown selector)
- [ ] Remove tag from email
- [ ] Filter emails by tag
- [ ] Tag auto-complete in search

### Contact Management
- [ ] Contacts database schema
- [ ] Contacts list view
- [ ] Contact detail page
- [ ] Add new contact
- [ ] Edit contact
- [ ] Delete contact
- [ ] Import contacts from CSV
- [ ] Export contacts to CSV
- [ ] Contact groups/lists
- [ ] Contact search
- [ ] Merge duplicate contacts
- [ ] Contact profile pictures

---

## PHASE 4: Settings & Customization

### Email Signatures
- [ ] Signature editor with rich text
- [ ] Create new signature
- [ ] Edit existing signature
- [ ] Delete signature
- [ ] Set default signature
- [ ] Signature per email account
- [ ] Insert signature manually

### Theme & Appearance
- [ ] Light/Dark theme toggle
- [ ] Custom theme colors
- [ ] Font size preferences
- [ ] Display density (compact/default/comfortable)
- [ ] Sidebar width preferences
- [ ] Email list width preferences

### Notifications
- [ ] Desktop notifications for new emails
- [ ] Sound notifications
- [ ] Notification preferences per folder
- [ ] Notification preview settings
- [ ] Do not disturb mode

### Keyboard Shortcuts
- [x] c - Compose (implemented)
- [x] r - Reply (implemented)
- [ ] a - Reply All
- [ ] f - Forward
- [ ] e - Archive
- [ ] # - Delete
- [ ] s - Star
- [ ] u - Mark as unread
- [ ] / - Search
- [ ] j/k - Navigate emails
- [ ] Enter - Open email
- [ ] Esc - Close/Cancel
- [ ] Cmd+Enter - Send
- [ ] Keyboard shortcuts help modal

### Display Density
- [x] State prepared (compact/default/comfortable)
- [ ] Compact view (single line per email)
- [ ] Default view (two lines per email)
- [ ] Comfortable view (more spacing, larger preview)
- [ ] Toggle button in header

---

## PHASE 5: Advanced Features

### Calendar Integration
- [ ] Calendar view (month/week/day)
- [ ] Create event from email
- [ ] Event reminders
- [ ] Sync with Google Calendar
- [ ] Sync with Outlook Calendar

### Meeting Scheduler
- [ ] Propose meeting times
- [ ] Check availability
- [ ] Send calendar invite
- [ ] RSVP to invites
- [ ] Meeting link generation (Zoom, Meet, Teams)

### Voice-to-Text
- [ ] Voice recording button in compose
- [ ] Audio transcription
- [ ] Voice command support
- [ ] Multiple language support

---

## PHASE 6: Backend & Infrastructure

### Error Handling
- [ ] Error boundaries for all components
- [ ] Graceful error messages
- [ ] Retry logic for failed requests
- [ ] Offline mode support

### Authentication
- [ ] Real OAuth implementation
- [ ] Multi-account support
- [ ] Account switching
- [ ] Logout functionality
- [ ] Session management

### Database Integration
- [ ] Emails table schema
- [ ] Contacts table schema
- [ ] Tags table schema
- [ ] Filters table schema
- [ ] User preferences table schema
- [ ] Email sync from APIs
- [ ] Real-time updates

### Email API Integration
- [ ] Gmail API connection
- [ ] Outlook API connection
- [ ] IMAP/SMTP support
- [ ] Email sending functionality
- [ ] Email receiving functionality
- [ ] Attachment upload/download

---

## PHASE 7: Polish & Testing

### Loading States
- [ ] Email list loading skeleton
- [ ] Email detail loading skeleton
- [ ] Search loading indicator
- [ ] Send email loading state

### Empty States
- [ ] Empty inbox message
- [ ] Empty search results
- [ ] Empty folder messages
- [ ] No contacts message

### Performance
- [ ] Virtual scrolling for long email lists
- [ ] Lazy loading images
- [ ] Code splitting
- [ ] Bundle size optimization

### Accessibility
- [ ] ARIA labels
- [ ] Keyboard navigation
- [ ] Screen reader support
- [ ] Focus management
- [ ] Color contrast compliance

---

## Progress Tracking

**Total Features:** 150+  
**Completed:** 15  
**In Progress:** 5  
**Remaining:** 130+

**Completion:** ~10%

## URGENT FIXES

- [x] Redesign reply/reply all/forward UX - compose box should appear at TOP with email history below (not at bottom)

- [x] Move signature management to Settings page (remove from reply interface)
- [x] Add signature on/off toggle in Settings
- [x] Create signature editor in Settings (create/edit/delete signatures)
- [ ] Auto-append signature when sending (not visible during composition)

- [x] Make Archive button functional - move email to Archive folder and remove from current view
- [x] Make Spam button functional - move email to Spam folder and remove from current view
- [x] Add Unarchive button in Archive view to restore emails to Inbox
- [x] Add Not Spam button in Spam view to restore emails to Inbox

## File Attachments
- [x] Add attachment button to compose interface
- [x] Add attachment button to reply/forward interface
- [x] File picker for selecting files to upload
- [x] Show attachment list with file names and sizes in compose area
- [x] Remove attachment button for each file
- [x] Display attachments in received emails with download buttons
- [x] Support multiple file types (documents, images, PDFs, etc.)

## Email Search
- [x] Make search bar functional in top toolbar
- [x] Real-time search across subject, sender, email content
- [x] Filter buttons: unread, starred, has attachments
- [x] Clear search button
- [ ] Highlight matching text in search results (optional enhancement)

## UI Fixes
- [x] Remove bulky filter buttons (Unread, Starred, Has Attachments) from toolbar
- [x] Add small paperclip icon next to sender name in email list when email has attachments
- [x] Add star icon next to date in email list (top right) for quick star/unstar toggle
- [x] Keep star icon in both places: next to date AND in bottom icon tray

## Toolbar Icon Fixes
- [x] Make search box smaller and more compact to match icon family
- [x] Ensure all toolbar icons are same size (consistent 16px)
- [x] Ensure all icons have same stroke weight (1.5)
- [x] Ensure consistent spacing between icons
- [x] Make compose email icon (envelope) functional - opens compose mode
- [x] Make all toolbar icons functional with clear actions (Check = mark all read, Zap = quick actions)
- [x] Visual design consistency - icons look like same family

---

## PRODUCTION PREPARATION (URGENT)

- [x] Verify all core workflows (email send/receive, search, AI, notes, calendar, contacts)
- [x] Make entire site mobile responsive (sidebar, email list, detail, right panel)
- [x] Add API Keys settings panel in Settings page (SendGrid + OpenAI input fields)

## AUTO-REPORTER SYSTEM

- [x] Create /__debug/report endpoint (JSON combining routes, features, config, tests)
- [x] Create scripts/debug/report.mjs (fetches and formats build status)
- [x] Wire npm scripts (report:once, report:loop)
- [x] Test auto-posting to chat

## DELTA SPRINT - VERIFY & FLIP GREEN

- [x] Create feature detectors (client/src/debug/featureDetectors.ts)
- [x] Add error handling with retry to list fetch
- [x] Add success toasts for archive/star/delete actions
- [x] Add pagination with URL sync and localStorage
- [x] Add XSS sanitization with DOMPurify
- [x] Add offline banner and disable actions when offline
- [x] Update /__debug/features to use detectors (computed, not static)
- [x] Test all features and create proof bundle

## INVESTOR DEMO PREP (URGENT - Tomorrow)

### Phase 2: Polish & Test
- [x] Verify sidebar navigation (groups, roll-ups, search, 100 accounts)
- [x] Verify email actions (archive, star, delete, toasts)
- [x] Verify pagination (10/25/50, URL sync, localStorage)
- [x] Verify offline detection (banner, disabled actions)
- [x] Verify mobile responsiveness (hamburger, sliding panels)
- [x] Verify AI panel (chat, triage, quick replies)
- [x] Verify Notes CRUD operations
- [x] Verify Calendar integration
- [x] Verify Contacts management
- [x] Verify Settings (API keys, appearance, font size)
- [x] Create comprehensive test report

### Phase 3: Publish Prep
- [x] Create production-ready checkpoint
- [x] Document publish instructions (domain, secrets, publish button)
- [x] Verify all secrets are configured
- [x] Test preview URL before publishing

### Phase 1: Authentication (After Publish)
- [ ] Add user authentication system (webdev_add_feature)
- [ ] Add admin role assignment
- [ ] Add multi-tenant support for email connections
- [ ] Test login/signup flow

### Phase 4: Email Integration
- [ ] Create email connection UI (Gmail/Outlook/IMAP buttons)
- [ ] Wire backend routes to frontend
- [ ] Test with real email account
- [ ] Add connection status indicators

### Phase 5: Onboarding
- [ ] Create welcome screen for new users
- [ ] Add email connection wizard
- [ ] Add feature tour/tooltips
- [ ] Test complete user journey

### Phase 6: Final Verification
- [ ] End-to-end test all flows
- [ ] Check mobile experience
- [ ] Verify performance with real data
- [ ] Create demo script for investors

## INBOXES UI FIXES (Pre-Demo)

- [x] Change INBOXES scrollbar color from gray to peach (#D89880)
- [x] Make INBOXES section collapsible (rolled up by default)
- [x] Add expand/collapse chevron icon for INBOXES group
- [x] Test collapse/expand interaction

## SIDEBAR ENHANCEMENTS (Pre-Demo)

- [x] Persist INBOXES collapse state to localStorage
- [x] Make TOOLS section collapsible with chevron icon
- [x] Make SETTINGS section collapsible with chevron icon
- [x] Add unread count badge to INBOXES header (e.g., "INBOXES (12)")
- [x] Test all collapse/expand interactions

## PRODUCTION BLOCKERS (CRITICAL)

### Fix 404 Errors
- [x] Audit all sidebar links (CORE, INBOXES, TOOLS, SETTINGS)
- [x] Fix broken routes in App.tsx
- [x] Test every single link to ensure no 404s

### Build Admin Section
- [ ] Create Admin page component
- [ ] Add API key management (OpenAI, SendGrid)
- [ ] Add admin role assignment interface
- [ ] Add system settings panel
- [ ] Wire admin route to sidebar

### Production Readiness
- [ ] Verify all routes work
- [ ] Verify admin section accessible
- [ ] Test API key save/load functionality
- [ ] Final smoke test before publish

## URGENT: REPLACE ALL GRAY TEXT WITH BLACK

- [x] Find all gray text colors (#999, #CCC, gray, etc.)
- [x] Replace sidebar group headers (CORE, INBOXES, TOOLS, SETTINGS) with black
- [x] Replace email list category headers with black
- [x] Replace any other gray text elements with black
- [x] Test readability of all text

## CATEGORY HEADERS STYLING

- [x] Make category headers bold (fontWeight: 600)
- [x] Increase category header size slightly (9px → 10px)
- [x] Apply to CORE, INBOXES, TOOLS, SETTINGS headers

## ADMIN DASHBOARD (COMPREHENSIVE)

### System Overview
- [ ] Total users count
- [ ] Total email accounts connected
- [ ] Total emails processed today/week/month
- [ ] Storage usage (GB used / GB total)
- [ ] System health indicators (API status, database, email sync)

### User Management
- [ ] User list table (name, email, role, joined date, last active)
- [ ] Assign/revoke admin roles
- [ ] View user activity logs
- [ ] Suspend/activate users

### API Keys Management
- [ ] OpenAI API key input and save
- [ ] SendGrid API key input and save
- [ ] Test API connection buttons
- [ ] Show API usage stats

### Email Accounts Overview
- [ ] List all connected email accounts across all users
- [ ] Show connection status (active/error)
- [ ] Show last sync time
- [ ] Force re-sync button

### Analytics Dashboard
- [ ] Email volume chart (sent/received over time)
- [ ] User engagement metrics
- [ ] Most active users
- [ ] Email response times

### System Settings
- [ ] Feature flags (enable/disable features)
- [ ] Rate limits configuration
- [ ] Email sync intervals
- [ ] Storage limits per user

### Logs & Monitoring
- [ ] Recent activity feed
- [ ] Error logs with timestamps
- [ ] Email sync status
- [ ] API call logs

## ADMIN DASHBOARD FULL-PAGE LAYOUT

- [x] Hide email list panel when activeView === 'Admin'
- [x] Hide right panel when activeView === 'Admin'
- [x] Make Admin dashboard take full width (no email panels visible)
- [x] Apply same logic to Notes, Calendar, Contacts, Settings views

## ADMIN PANEL NOT DISPLAYING (URGENT)

- [ ] Check browser console for JavaScript errors
- [ ] Verify activeView is set to 'Admin' when navigating to /admin
- [ ] Check if Admin view content is being rendered
- [ ] Fix any conditional logic preventing display
- [ ] Test /admin route shows full dashboard

## URL CLEANUP (URGENT)

- [x] Move email interface from root (/) to /app route
- [x] Create placeholder landing page at root /
- [x] Update all sidebar links to use /app prefix
- [x] Test triopia.com/ shows clean landing page
- [x] Test triopia.com/app shows email interface without query params

## USER FEEDBACK IMPLEMENTATION

- [x] Bold sender names for unread emails in email list
- [x] Unbold sender names after email is read
- [x] Increase default mobile font size
- [x] Make font size controls more prominent on mobile
- [ ] Test mobile experience with larger fonts
