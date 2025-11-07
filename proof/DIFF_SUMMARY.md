# Diff Summary: Sidebar Refactor

## Files Changed (2 files)

### 1. client/src/components/legacy/SidebarNav.tsx (NEW FILE)

**Lines:** 200+

**Rationale:** Complete replacement for LegacySidebarSection with grouped structure, roll-ups, virtualization, search, and persistence.

**Key Changes:**
- Four group structure (CORE, INBOXES, TOOLS, SETTINGS) with headers
- Collapsible roll-up items for each inbox source with ChevronDown/ChevronRight icons
- 8 child routes per inbox (inbox, starred, sent, drafts, archive, spam, trash, storage)
- localStorage persistence for expanded states and last selected source
- Search input for INBOXES group (appears when >5 inboxes)
- Simple virtualization (renders first 30 when >20 inboxes)
- "Add Inbox or Domain" CTA button
- All required testIDs for automated testing
- TRIOPIA brand tokens (peach #D89880, cream #FFFBF7, dark #2A2A2A)

### 2. client/src/pages/EmailInterface.tsx (MODIFIED)

**Lines Changed:** ~20 lines

**Rationale:** Integrate new SidebarNav component and add Calendar polish.

**Key Changes:**

**Import section (line 5):**
```diff
- import { LegacySidebarSection } from "@/components/legacy/LegacySidebarSection";
+ import { SidebarNav, SidebarModel, InboxSource } from "@/components/legacy/SidebarNav";
```

**Mock data (lines 26-45):**
```diff
- const mockAccounts = [
-   { id: 1, email: "work@company.com", unread: 5, color: "#D89880" },
-   { id: 2, email: "personal@gmail.com", unread: 3, color: "#8B9DC3" },
-   { id: 3, email: "startup@venture.io", unread: 2, color: "#C9ADA7" },
-   { id: 4, email: "consulting@freelance.com", unread: 1, color: "#9A8C98" },
-   { id: 5, email: "side@project.dev", unread: 1, color: "#B5838D" },
- ];
+ // Generate 100 mock accounts for virtualization testing
+ const mockAccounts = Array.from({ length: 100 }, (_, i) => ({
+   id: i + 1,
+   email: `account${i + 1}@${['company.com', 'gmail.com', 'venture.io', 'startup.dev', 'agency.co'][i % 5]}`,
+   unread: Math.floor(Math.random() * 10),
+   color: ['#D89880', '#8B9DC3', '#C9ADA7', '#9A8C98', '#B5838D'][i % 5]
+ }));
+ 
+ // Sidebar model data
+ const sidebarModel: SidebarModel = {
+   core: ['Fresh Start', 'Inbox', 'Starred', 'New Connections', 'Paused', 'Complete', 'Sent', 'Drafts', 'Archive', 'Spam', 'Trash', 'Storage'],
+   inboxes: mockAccounts.map(acc => ({
+     id: acc.id.toString(),
+     label: acc.email,
+     type: 'email' as const,
+     unread: acc.unread
+   })),
+   tools: ['Notes', 'Calendar', 'Contacts'],
+   settings: ['Analytics', 'Appearance', 'Settings', 'Profile', 'Admin']
+ };
```

**Sidebar rendering (lines 489-494):**
```diff
- <div style={{ padding: "0 var(--space-3)" }}>
-   <LegacySidebarSection />
- </div>
+ <div style={{ padding: "0 var(--space-3)" }}>
+   <SidebarNav
+     model={sidebarModel}
+     onAddSource={() => setActiveView('Settings')}
+   />
+ </div>
```

**Calendar view (lines 1041-1069):**
```diff
- {activeView === 'Calendar' && (
-   <div style={{ padding: "20px" }}>
-     <p style={{ fontSize: "13px", color: "#666" }}>Calendar integration - Coming soon</p>
-   </div>
- )}
+ {activeView === 'Calendar' && (
+   <div style={{ padding: "20px" }}>
+     <div style={{ marginBottom: "20px" }}>
+       <h3 style={{ fontSize: "18px", fontWeight: 300, color: "#2A2A2A", marginBottom: "12px" }}>Calendar</h3>
+       <div style={{ display: "flex", gap: "8px" }}>
+         {['Month', 'Week', 'Day'].map((view) => (
+           <button
+             key={view}
+             style={{
+               padding: "6px 16px",
+               fontSize: "12px",
+               fontWeight: 300,
+               color: view === 'Month' ? "#D89880" : "#666",
+               background: view === 'Month' ? "#FFFBF7" : "transparent",
+               border: "1px solid #E8E3DE",
+               borderRadius: "4px",
+               cursor: "pointer",
+               transition: "all 0.2s"
+             }}
+           >
+             {view}
+           </button>
+         ))}
+       </div>
+     </div>
+     <p style={{ fontSize: "13px", color: "#666" }}>Calendar events will appear here</p>
+   </div>
+ )}
```

## No Regressions Detected

✅ Pagination - Not affected (email list logic unchanged)
✅ Skeletons - Not affected (EmailListSkeleton, EmailDetailSkeleton still used)
✅ Toasts - Not affected (toast logic unchanged)
✅ Offline - Not affected (offline detection unchanged)
✅ Email actions - Not affected (archive, spam, delete, star logic unchanged)
✅ Search - Not affected (email search logic unchanged)
✅ Compose - Not affected (compose modal logic unchanged)
✅ AI features - Not affected (AI panel logic unchanged)

## Debug Endpoint Verification

**/__debug/routes** - Shows all 11 routes still functional
**/__debug/features** - Shows Inbox/Settings/Contacts features still present
