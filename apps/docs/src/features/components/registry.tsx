export type ComponentCategory =
  | "General"
  | "Forms"
  | "Navigation"
  | "Overlay"
  | "Data Display"
  | "Feedback"
  | "Charts"
  | "Foundations";

export type ComponentCatalogItem = {
  category: ComponentCategory;
  name: string;
  slug: string;
  status: "stable" | "beta";
  summary: string;
};

export const componentCategories: ComponentCategory[] = [
  "General",
  "Forms",
  "Navigation",
  "Overlay",
  "Data Display",
  "Feedback",
  "Charts",
  "Foundations"
];

export const componentCatalog: ComponentCatalogItem[] = [
  {
    category: "Navigation",
    name: "Accordion",
    slug: "accordion",
    status: "stable",
    summary: "Progressive disclosure list for FAQs, settings groups, and dense help."
  },
  {
    category: "Feedback",
    name: "Alerts",
    slug: "alert",
    status: "stable",
    summary: "Inline status messaging for workflow updates and validation feedback."
  },
  {
    category: "General",
    name: "Avatar",
    slug: "avatar",
    status: "stable",
    summary: "Profile image primitive with a fallback for initials and presence."
  },
  {
    category: "General",
    name: "Badge/Tags",
    slug: "badge",
    status: "stable",
    summary: "Compact status chips for counts, labels, and inline emphasis."
  },
  {
    category: "General",
    name: "Blockquotes",
    slug: "blockquote",
    status: "stable",
    summary: "Editorial quote block for testimonials, callouts, and cited statements."
  },
  {
    category: "General",
    name: "Buttons",
    slug: "button",
    status: "stable",
    summary: "Primary actions, quiet actions, and high-emphasis calls to action."
  },
  {
    category: "General",
    name: "Button Group",
    slug: "button-group",
    status: "stable",
    summary: "Grouped action cluster for attached controls and compact command sets."
  },
  {
    category: "General",
    name: "Button Icons",
    slug: "button-icons",
    status: "stable",
    summary: "Icon-only actions for toolbars, compact controls, and dense command surfaces."
  },
  {
    category: "General",
    name: "Card",
    slug: "card",
    status: "stable",
    summary: "Structured content surface for summaries, actions, and grouped metadata."
  },
  {
    category: "Data Display",
    name: "Chat Bubbles",
    slug: "chat-bubbles",
    status: "beta",
    summary: "Conversation message surfaces for chat, activity, and comment examples."
  },
  {
    category: "Data Display",
    name: "Slider/Carousel",
    slug: "carousel",
    status: "stable",
    summary: "Scrollable slide viewport for grouped feature cards and visual sequences."
  },
  {
    category: "Forms",
    name: "Datepicker",
    slug: "date-picker",
    status: "stable",
    summary: "Calendar-backed date field for scheduling, due dates, and ranges."
  },
  {
    category: "Data Display",
    name: "Devices",
    slug: "devices",
    status: "beta",
    summary: "Device mockup surfaces for responsive layout and product preview examples."
  },
  {
    category: "Data Display",
    name: "Lists",
    slug: "lists",
    status: "beta",
    summary: "List patterns for compact content groups and repeated information blocks."
  },
  {
    category: "Data Display",
    name: "List Group",
    slug: "list-group",
    status: "stable",
    summary: "Selectable stacked rows for inboxes, settings lists, and compact navigation."
  },
  {
    category: "Data Display",
    name: "Legend Indicator",
    slug: "legend-indicator",
    status: "stable",
    summary: "Dots and pills for chart legends, status keys, and semantic markers."
  },
  {
    category: "Feedback",
    name: "Progress",
    slug: "progress",
    status: "stable",
    summary: "Deterministic progress meter for uploads, publish flows, and steps."
  },
  {
    category: "Forms",
    name: "Ratings",
    slug: "rating",
    status: "stable",
    summary: "Star-based score input for feedback, review flows, and lightweight grading."
  },
  {
    category: "General",
    name: "Skeleton",
    slug: "skeleton",
    status: "stable",
    summary: "Loading placeholder blocks for pending content and progressive hydration."
  },
  {
    category: "Feedback",
    name: "Spinners (Loaders)",
    slug: "spinner",
    status: "stable",
    summary: "Compact busy indicator for loading states and inline async operations."
  },
  {
    category: "Foundations",
    name: "Styled Icons",
    slug: "styled-icons",
    status: "beta",
    summary: "Prepared icon treatments for component examples and visual language."
  },
  {
    category: "Data Display",
    name: "Timeline",
    slug: "timeline",
    status: "stable",
    summary: "Ordered activity log for releases, reviews, and multi-step workflows."
  },
  {
    category: "Navigation",
    name: "Tree View",
    slug: "tree-view",
    status: "beta",
    summary: "Hierarchical navigation pattern for nested files, pages, and categories."
  },
  {
    category: "Navigation",
    name: "Header/Navbar",
    slug: "navbar",
    status: "stable",
    summary: "Top-level navigation shell for app sections, actions, and branding."
  },
  {
    category: "Navigation",
    name: "Navs/Tabs",
    slug: "tabs",
    status: "stable",
    summary: "Section switcher for dense documents, local navigation, and contextual settings."
  },
  {
    category: "Navigation",
    name: "Sidebar",
    slug: "sidebar",
    status: "beta",
    summary: "Composable left rail for docs navigation and product sections."
  },
  {
    category: "Navigation",
    name: "Breadcrumb",
    slug: "breadcrumb",
    status: "stable",
    summary: "Path indicator for nested docs and information architecture depth."
  },
  {
    category: "Navigation",
    name: "Pagination",
    slug: "pagination",
    status: "stable",
    summary: "Paged navigation for long lists, audits, and searchable indexes."
  },
  {
    category: "Navigation",
    name: "Stepper",
    slug: "stepper",
    status: "beta",
    summary: "Step-by-step progress pattern for onboarding, checkout, and setup flows."
  },
  {
    category: "Forms",
    name: "Input",
    slug: "input",
    status: "stable",
    summary: "Single-line text entry for compact forms and editor toolbars."
  },
  {
    category: "Forms",
    name: "Input Group",
    slug: "input-group",
    status: "stable",
    summary: "Input shell with leading and trailing addons for units, domains, and quick actions."
  },
  {
    category: "Forms",
    name: "File Input",
    slug: "file-input",
    status: "stable",
    summary: "Native file picker with styled shell and selected file summaries."
  },
  {
    category: "Forms",
    name: "Checkbox",
    slug: "checkbox",
    status: "stable",
    summary: "Boolean choice control for compact settings and task selection."
  },
  {
    category: "Forms",
    name: "Radio",
    slug: "radio-group",
    status: "stable",
    summary: "Single-choice selector for visible options with clear comparison."
  },
  {
    category: "Forms",
    name: "Switch",
    slug: "switch",
    status: "stable",
    summary: "Immediate on/off control for preferences and system toggles."
  },
  {
    category: "Forms",
    name: "Advanced Select",
    slug: "select",
    status: "stable",
    summary: "Radix-based choice picker for searchable and enumerated options."
  },
  {
    category: "Forms",
    name: "Input Number",
    slug: "number-field",
    status: "stable",
    summary: "Step-aware numeric input with increment and decrement controls."
  },
  {
    category: "Forms",
    name: "Strong Password",
    slug: "password-field",
    status: "stable",
    summary: "Password input with visibility toggle and optional strength feedback."
  },
  {
    category: "Forms",
    name: "PIN Input",
    slug: "pin-input",
    status: "stable",
    summary: "Segmented verification code input for OTP and secure confirmation flows."
  },
  {
    category: "Forms",
    name: "Drag and Drop File Uploads",
    slug: "dropzone",
    status: "stable",
    summary: "Drag-and-drop upload target with browse affordance and selected file list."
  },
  {
    category: "Feedback",
    name: "File Uploading Progress",
    slug: "upload-list",
    status: "stable",
    summary: "Progress-aware upload items with status badges and completion feedback."
  },
  {
    category: "Forms",
    name: "Range Slider",
    slug: "slider",
    status: "stable",
    summary: "Continuous range control for thresholds, opacity, and other scalar values."
  },
  {
    category: "Forms",
    name: "WYSIWYG Editor",
    slug: "rich-text-toolbar",
    status: "stable",
    summary: "Composable formatting toolbar and editable surface for rich text entry."
  },
  {
    category: "Overlay",
    name: "Dropdowns",
    slug: "dropdown-menu",
    status: "stable",
    summary: "Action menu with items, labels, separators, and selectable rows."
  },
  {
    category: "Overlay",
    name: "Modal",
    slug: "dialog",
    status: "stable",
    summary: "Modal surface for confirm flows, blockers, and structured tasks."
  },
  {
    category: "Overlay",
    name: "Offcanvas (Drawer)",
    slug: "sheet",
    status: "stable",
    summary: "Side panel overlay for settings, editors, and longer contextual tasks."
  },
  {
    category: "Overlay",
    name: "Tooltips",
    slug: "tooltip",
    status: "stable",
    summary: "Compact hint layer for controls, tokens, and feature descriptions."
  },
  {
    category: "Overlay",
    name: "Popover",
    slug: "popover",
    status: "stable",
    summary: "Anchored floating panel for settings, metadata, and lightweight actions."
  },
  {
    category: "Data Display",
    name: "Table",
    slug: "table",
    status: "stable",
    summary: "Semantic data grid shell for lists, audits, and release snapshots."
  },
  {
    category: "Charts",
    name: "Line Chart",
    slug: "line-chart",
    status: "beta",
    summary: "Trend visualization pattern for time series and metric movement."
  },
  {
    category: "Charts",
    name: "Bar Chart",
    slug: "bar-chart",
    status: "beta",
    summary: "Categorical comparison chart pattern for dashboards and reports."
  },
  {
    category: "Charts",
    name: "Circles (Pie chart)",
    slug: "pie-chart",
    status: "beta",
    summary: "Circular proportion chart pattern for compact distribution summaries."
  },
  {
    category: "Charts",
    name: "Doughnut Chart",
    slug: "doughnut-chart",
    status: "beta",
    summary: "Ring chart pattern for progress-like and proportional data displays."
  },
  {
    category: "Charts",
    name: "Half Circle Chart",
    slug: "half-circle-chart",
    status: "beta",
    summary: "Semi-circular chart pattern for gauge-style summaries."
  },
  {
    category: "Foundations",
    name: "Shadows",
    slug: "shadows",
    status: "beta",
    summary: "Elevation reference for component surfaces and layered UI examples."
  },
  {
    category: "Foundations",
    name: "Blur",
    slug: "blur",
    status: "beta",
    summary: "Backdrop and blur reference for glass surfaces and overlays."
  },
  {
    category: "Foundations",
    name: "Icon Collection (Lucide)",
    slug: "icon-collection-lucide",
    status: "beta",
    summary: "Lucide icon inventory used by component examples and package UI surfaces."
  },
  {
    category: "Foundations",
    name: "Custom Icons",
    slug: "custom-icons",
    status: "beta",
    summary: "Project-specific icon set used beside the base Lucide collection."
  },
  {
    category: "General",
    name: "Brands & Avatars",
    slug: "brands-avatars",
    status: "stable",
    summary: "Overlapping avatar stack and brand identity assets for compact presence clusters."
  },
  {
    category: "Foundations",
    name: "Illustration",
    slug: "illustration",
    status: "beta",
    summary: "Illustration assets used by empty states, onboarding, and docs examples."
  },
  {
    category: "Foundations",
    name: "Flags",
    slug: "flags",
    status: "beta",
    summary: "Flag asset collection for locale, country, and region examples."
  },
  {
    category: "Foundations",
    name: "Credits",
    slug: "credits",
    status: "beta",
    summary: "Source and attribution page from the Figma component file."
  }
];

export const componentCatalogBySlug = Object.fromEntries(
  componentCatalog.map((item) => [item.slug, item] as const)
);
