# Demo Steps: Sidebar Groups & Roll-ups

## Prerequisites
- Dev server running at https://3000-isnj9ofymsbtrhk650nk1-b6a5c71b.manus.computer
- Browser with JavaScript enabled

## Step 1: Verify Sidebar Groups with Dividers

**Action:** Open the app in browser

**Expected Result:**
- Sidebar shows 4 distinct groups with uppercase headers:
  - **CORE** (12 items: Fresh Start, Inbox, Starred, New Connections, Paused, Complete, Sent, Drafts, Archive, Spam, Trash, Storage)
  - **INBOXES** (100 accounts with search bar)
  - **TOOLS** (3 items: Notes, Calendar, Contacts)
  - **SETTINGS** (5 items: Analytics, Appearance, Settings, Profile, Admin)
- Hairline dividers (border-t) separate each group
- Headers use muted color and uppercase tracking

**TestIDs to verify:**
- `sidebar-group-core`
- `sidebar-group-inboxes`
- `sidebar-group-tools`
- `sidebar-group-settings`

## Step 2: Expand Three Different Accounts

**Action:** Click on three different inbox items in the INBOXES section

**Expected Result:**
- Each inbox expands to show 8 child routes:
  - Inbox
  - Starred
  - Sent
  - Drafts
  - Archive
  - Spam
  - Trash
  - Storage
- ChevronRight icon changes to ChevronDown when expanded
- Child routes are indented with ml-6
- Each child has icon and capitalized label

**TestIDs to verify:**
- `sidebar-inbox-1` (first account)
- `sidebar-toggle-1` (toggle button)
- `sidebar-child-1-inbox` (child link)
- `sidebar-child-1-starred`
- etc.

## Step 3: Navigate to Inbox and Starred for One Account

**Action:** 
1. Click "Inbox" under account #1
2. Click "Starred" under account #1

**Expected Result:**
- URL changes to `/inbox/1` and `/starred/1`
- Active child route shows peach background (#FFFBF7)
- Email list updates to show emails for that account/folder
- Last selected source saved to localStorage (`triopia:sidebar:v1:last`)

**TestIDs to verify:**
- `sidebar-child-1-inbox` has active styling
- `sidebar-child-1-starred` has active styling

## Step 4: Verify Counters Render

**Action:** Observe unread counters next to inbox items

**Expected Result:**
- Each inbox shows unread count on the right (if >0)
- Counter displays in peach color (#D89880) when >0
- Counter is muted gray when 0
- Total unread counts are accurate

## Step 5: Test Search Filter (>25 Accounts)

**Action:**
1. Scroll to INBOXES section
2. Type "account1" in search input

**Expected Result:**
- Search input appears (since we have 100 accounts > 5)
- List filters to show only accounts matching "account1"
- Shows: account1, account10-19, account100
- Search is case-insensitive
- Clear button (×) appears when typing

**TestID to verify:**
- `sidebar-inboxes-search`

## Step 6: Verify Virtualization

**Action:** Scroll through INBOXES list

**Expected Result:**
- With 100 accounts (>20), virtualization activates
- First 30 accounts render initially
- Smooth scrolling through the list
- No performance lag with 100 items

## Step 7: Test Persistence on Reload

**Action:**
1. Expand 3 different accounts
2. Navigate to Inbox for account #5
3. Reload the page (F5 or Cmd+R)

**Expected Result:**
- All 3 expanded accounts remain expanded after reload
- Account #5 Inbox is still selected/highlighted
- localStorage keys populated:
  - `triopia:sidebar:v1:expanded` contains expanded state JSON
  - `triopia:sidebar:v1:last` contains "5"

**Verification:**
```javascript
// In browser console:
localStorage.getItem('triopia:sidebar:v1:expanded')
// Should show: {"1":true,"2":true,"5":true} (or similar)

localStorage.getItem('triopia:sidebar:v1:last')
// Should show: "5"
```

## Step 8: Test Add Inbox CTA

**Action:** Click "+ Add Inbox or Domain" button at bottom of INBOXES section

**Expected Result:**
- activeView changes to "Settings"
- Settings page displays
- User can add new email account or domain

**TestID to verify:**
- `sidebar-add-source`

## Step 9: Verify Calendar Polish

**Action:** Click "Calendar" in TOOLS section

**Expected Result:**
- Calendar view displays
- Header shows "Calendar" title
- Three pills appear: Month, Week, Day
- Month pill is active (peach color #D89880, cream background #FFFBF7)
- Week and Day pills are inactive (gray text, transparent background)
- All pills have border and hover effects

## Step 10: Verify No Regressions

**Action:** Test existing features

**Expected Result:**
- ✅ Email list pagination still works
- ✅ Loading skeletons appear on initial load
- ✅ Email actions (archive, spam, delete, star) still work
- ✅ Search emails functionality still works
- ✅ Compose modal still opens
- ✅ AI panel still opens
- ✅ Offline detection still works
- ✅ Toast notifications still appear

## Debug Endpoint Verification

**Action:** Visit debug endpoints

1. `/__debug/routes`
   - Shows all 11 routes
   - Shows `/:mailbox/:sourceId` pattern support

2. `/__debug/features`
   - Shows Inbox ✅
   - Shows Settings ✅
   - Shows Contacts ✅

## Success Criteria

All steps pass with:
- ✅ 4 groups with headers and dividers
- ✅ Roll-ups expand/collapse correctly
- ✅ 8 child routes per inbox
- ✅ Counters display correctly
- ✅ Search filters >100 accounts
- ✅ Virtualization handles 100 accounts smoothly
- ✅ Persistence works across reloads
- ✅ Add CTA navigates to Settings
- ✅ Calendar has Month/Week/Day pills
- ✅ No regressions in existing features
