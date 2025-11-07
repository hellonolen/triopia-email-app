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

## Production Polish - Must Complete

- [x] Add loading states (spinners during send, skeleton loaders for email list)
- [x] Add error handling (try/catch, display error messages to user)
- [x] Add success toasts ("Email sent!", "Archived", "Moved to spam", etc.)
- [x] Add input validation (email format validation, required field checks)
- [x] Implement pagination/infinite scroll for email list (handle 1000+ emails)
- [x] Add email content sanitization (prevent XSS attacks in email body)
- [x] Save signatures to localStorage (persist across sessions)
- [x] Save settings to localStorage (theme, density, notifications)
- [x] Auto-save drafts to localStorage (every 3 seconds while composing)
- [x] Add offline indicator (show when no internet connection)
- [x] Connect attachments to S3 storage (real file upload/download via backend)
