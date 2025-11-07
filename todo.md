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
