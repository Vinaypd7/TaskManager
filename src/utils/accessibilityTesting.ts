/**
 * Accessibility Testing Guide for TaskManager
 *
 * This guide covers testing accessibility features with screen readers
 * and other assistive technologies
 */

/**
 * TESTING WITH VoiceOver (iOS)
 *
 * VoiceOver is Apple's screen reader for iOS devices
 *
 * 1. Enable VoiceOver:
 *    - Go to Settings > Accessibility > VoiceOver
 *    - Toggle VoiceOver ON
 *
 * 2. Basic Navigation:
 *    - Single tap: Select an element
 *    - Two-finger Z gesture or swipe right: Go back
 *    - Two-finger Z gesture or swipe left: Go forward
 *    - Swipe up then down (Z gesture): Activate selected element
 *    - Swipe up with 2 fingers: Read all (starts continuous reading)
 *    - Swipe down with 2 fingers: Stop reading
 *
 * 3. Testing TaskManager with VoiceOver:
 *    - Navigate through task list items
 *    - Verify each task announces: title, completion status, and date
 *    - Test "Mark as complete/incomplete" button announces state change
 *    - Test delete button gives appropriate warning
 *    - Verify form fields have proper labels and hints
 *    - Check pagination controls announce page numbers clearly
 *    - Test profile screen switches and toggles work with VoiceOver
 */

/**
 * TESTING WITH TalkBack (Android)
 *
 * TalkBack is Google's screen reader for Android devices
 *
 * 1. Enable TalkBack:
 *    - Go to Settings > Accessibility > TalkBack
 *    - Toggle TalkBack ON
 *    - Note: You'll need to use gestures to interact
 *
 * 2. Basic Navigation:
 *    - Single tap: Focus on element
 *    - Single tap while TalkBack is on: Hear element description
 *    - Swipe right: Move to next element
 *    - Swipe left: Move to previous element
 *    - Swipe down then right: Activate element
 *    - Swipe up then right: Go back
 *    - Two-finger swipe right: Scroll right
 *    - Two-finger swipe left: Scroll left
 *
 * 3. Testing TaskManager with TalkBack:
 *    - Navigate with right/left swipes
 *    - Verify all interactive elements are announced with their role
 *    - Test button actions with down-right swipe
 *    - Verify error messages are announced as alerts
 *    - Check that form fields are properly grouped
 *    - Verify search functionality works smoothly
 *    - Test list scrolling with two-finger gestures
 */

/**
 * TESTING WITH Web Screen Readers (Windows/Mac)
 *
 * Test in web browser using NVDA (Windows) or JAWS (Windows/Mac)
 *
 * 1. NVDA (Free, Windows):
 *    - Download from: https://www.nvaccess.org/download/
 *    - Start NVDA with Ctrl+Alt+N
 *    - Use Tab to navigate forward
 *    - Shift+Tab to navigate backward
 *    - Arrow keys to navigate within elements
 *    - Enter to activate buttons
 *    - Alt+Down to open dropdowns
 *
 * 2. JAWS (Commercial, Windows/Mac):
 *    - Use similar keyboard navigation
 *    - Virtual PC cursor mode: Browse page content
 *    - Forms mode: Fill out forms
 *
 * 3. VoiceOver (Built-in, Mac):
 *    - Enable: System Preferences > Accessibility > VoiceOver
 *    - Use VO+U to show rotor (navigator)
 *    - VO is typically Caps Lock or Ctrl+Option
 */

/**
 * KEY ACCESSIBILITY FEATURES TO TEST
 */

export const ACCESSIBILITY_TEST_CHECKLIST = {
  SCREEN_READER_SUPPORT: [
    "All interactive elements have accessibilityLabel",
    "All buttons announce their purpose clearly",
    "Form fields have associated labels",
    "Error messages are announced as alerts",
    "Status changes are announced to screen readers",
    "Images have descriptive alt text",
    'List items announce their position (e.g., "item 1 of 5")',
    "Links and buttons are distinguishable",
  ],

  KEYBOARD_NAVIGATION: [
    "All interactive elements are reachable via keyboard",
    "Tab order is logical and predictable",
    "Keyboard focus is always visible",
    "No keyboard traps (can always escape)",
    "Enter key activates buttons",
    "Space key operates checkboxes/toggles",
    "Arrow keys work in lists and menus",
  ],

  COLOR_AND_CONTRAST: [
    "Text has minimum 4.5:1 contrast ratio (AA)",
    "Large text has minimum 3:1 contrast ratio",
    "Color is not the only way to convey information",
    "Focus indicators are visible",
    "Links are distinguished from regular text",
  ],

  LAYOUT_AND_TEXT: [
    "Text is resizable without loss of functionality",
    "Font size is at least 12px",
    "Line spacing is at least 1.5x the font size",
    "Character spacing can be adjusted",
    "No horizontal scrolling needed for most content",
    "Touch targets are at least 44x44 pixels",
  ],

  FORMS: [
    "All form fields have labels",
    "Required fields are marked",
    "Error messages are specific and helpful",
    "Error messages are near their field",
    "Form labels remain visible when focused",
    "Autocomplete suggestions are announced",
  ],

  VISUAL_DESIGN: [
    "Animations can be disabled (respect prefers-reduced-motion)",
    "Flashing content does not exceed 3 times per second",
    "Important information is not conveyed by color alone",
    "Text alternatives provided for images",
    "Icons have text labels or aria-labels",
  ],
};

/**
 * COMMON SCREEN READER INTERACTIONS
 */

export const SCREEN_READER_TEST_SCENARIOS = {
  TASK_LIST: {
    description: "Testing task list navigation and announcement",
    steps: [
      "Enable screen reader",
      "Navigate to Tasks screen",
      'Screen reader should announce: "Tasks, heading 1"',
      "Tab/navigate to first task",
      "Screen reader should announce task title, completion status, and date",
      "Tab/navigate to completion button",
      'Screen reader should announce "Mark as complete/incomplete button"',
      "Press Enter/double-tap to toggle",
      "Screen reader should announce new status",
    ],
  },

  FORM_SUBMISSION: {
    description: "Testing form accessibility and submission",
    steps: [
      "Enable screen reader",
      "Navigate to Add Task button",
      "Screen reader should announce button purpose",
      "Press Enter/double-tap to open form",
      "Tab to title field",
      'Screen reader should announce "Title, text field, required"',
      "Enter task title",
      "Tab to description field",
      'Screen reader should announce "Description, text field, required"',
      "Enter task description",
      "Tab to submit button",
      'Screen reader should announce "Add Task, button"',
      "Press Enter/double-tap to submit",
      "Screen reader should announce success or error",
    ],
  },

  ERROR_HANDLING: {
    description: "Testing error announcement and recovery",
    steps: [
      "Enable screen reader",
      "Try to submit form without entering required fields",
      "Screen reader should announce error as alert",
      "Error message should be read immediately",
      "Error message should be associated with the field",
      "User should be able to fix error and resubmit",
    ],
  },

  PAGINATION: {
    description: "Testing pagination controls",
    steps: [
      "Enable screen reader",
      "Navigate to pagination controls",
      "Screen reader should announce current page",
      'Tab to "Previous" button',
      "Screen reader should announce button is disabled on first page",
      'Tab to "Next" button',
      "Press Enter to go to next page",
      "Screen reader should announce new page number",
    ],
  },

  PROFILE_SETTINGS: {
    description: "Testing settings and preferences",
    steps: [
      "Enable screen reader",
      "Navigate to Profile screen",
      "Screen reader should announce user information",
      "Tab to language selection buttons",
      "Screen reader should announce current language selection",
      "Tab to dark mode toggle",
      'Screen reader should announce toggle state ("on" or "off")',
      "Press Enter to toggle",
      "Screen reader should announce new state",
    ],
  },
};

/**
 * COMMON ACCESSIBILITY ISSUES AND FIXES
 */

export const ACCESSIBILITY_ISSUES_AND_FIXES = [
  {
    issue: "Missing accessibilityLabel on buttons",
    impact: "Screen reader users cannot understand button purpose",
    fix: "Add accessibilityLabel to all interactive elements",
    example: `<Button
      title="Delete"
      accessibilityLabel="Delete task"
      accessibilityHint="Remove this task permanently"
    />`,
  },
  {
    issue: "No distinction between interactive and decorative elements",
    impact:
      "Screen reader announces decorative elements, cluttering the interface",
    fix: "Use accessibilityElementsHidden={true} for decorative elements",
    example: `<View accessibilityElementsHidden={true}>
      Decorative icon
    </View>`,
  },
  {
    issue: "Error messages not announced as alerts",
    impact: "Screen reader users might not notice validation errors",
    fix: 'Use accessibilityRole="alert" on error messages',
    example: `<Text
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      {error.message}
    </Text>`,
  },
  {
    issue: "Form fields not associated with labels",
    impact: "Screen reader users cannot understand form purpose",
    fix: "Use clear labels and nativeID/testID for association",
    example: `<Label htmlFor="taskTitle">Task Title</Label>
    <TextInput
      id="taskTitle"
      accessible={true}
      accessibilityLabel="Task Title"
    />`,
  },
  {
    issue: "List items not announcing position",
    impact: "Screen reader users don't know position in list",
    fix: "Include position info in accessibilityLabel",
    example: `<TouchableOpacity
      accessibilityLabel={\`Task: \${title}, item \${index + 1} of \${total}\`}
    >`,
  },
  {
    issue: "Insufficient color contrast",
    impact: "Low vision users cannot read content",
    fix: "Use color combinations with at least 4.5:1 contrast ratio",
    recommendation: "Use tools like WebAIM Contrast Checker",
  },
  {
    issue: "Touch targets too small",
    impact: "Motor impaired users cannot easily tap buttons",
    fix: "Ensure minimum 44x44 pixel touch targets",
    example: `<View style={{ minHeight: 44, minWidth: 44 }}>
      <Button title="Tap me" />
    </View>`,
  },
];

/**
 * TESTING TOOLS AND RESOURCES
 */

export const TESTING_TOOLS = {
  SCREEN_READERS: [
    {
      name: "VoiceOver",
      platform: "iOS, macOS",
      cost: "Free (built-in)",
      url: "https://www.apple.com/accessibility/voiceover/",
    },
    {
      name: "TalkBack",
      platform: "Android",
      cost: "Free (built-in)",
      url: "https://support.google.com/accessibility/android/answer/6283677",
    },
    {
      name: "NVDA",
      platform: "Windows",
      cost: "Free",
      url: "https://www.nvaccess.org/",
    },
    {
      name: "JAWS",
      platform: "Windows, macOS",
      cost: "Commercial",
      url: "https://www.freedomscientific.com/products/software/jaws/",
    },
  ],

  TESTING_FRAMEWORKS: [
    {
      name: "@testing-library/react-native",
      purpose: "Test accessibility attributes in React Native",
      usage:
        "Test that components have accessibilityLabel, accessibilityRole, etc.",
    },
    {
      name: "axe DevTools",
      purpose: "Automated accessibility testing for web",
      usage: "Chrome/Firefox extension for scanning pages",
    },
    {
      name: "WAVE",
      purpose: "Web accessibility evaluation tool",
      usage: "Browser extension and web tool",
    },
  ],

  VALIDATION_TOOLS: [
    {
      name: "WebAIM Contrast Checker",
      purpose: "Check color contrast ratios",
      url: "https://webaim.org/resources/contrastchecker/",
    },
    {
      name: "Lighthouse",
      purpose: "Automated accessibility audit",
      usage: "Built into Chrome DevTools",
    },
    {
      name: "AccessibilityTree Inspector",
      purpose: "Inspect accessibility tree in mobile apps",
      usage: "Built into iOS/Android dev tools",
    },
  ],
};

/**
 * WCAG 2.1 LEVEL AA COMPLIANCE CHECKLIST
 * TaskManager targets WCAG 2.1 Level AA compliance
 */

export const WCAG_COMPLIANCE_CHECKLIST = {
  PERCEIVABLE: {
    "Text Alternatives": "All images have alt text",
    "Time-based Media": "No time-based media in this app",
    Adaptable: "Content can adapt to different sizes",
    Distinguishable: "Content is distinguishable from background",
  },

  OPERABLE: {
    "Keyboard Accessible": "All functionality available via keyboard",
    "Enough Time": "No timing constraints on tasks",
    Seizures: "No flashing content (< 3 times/second)",
    Navigable: "Clear navigation, good focus management",
  },

  UNDERSTANDABLE: {
    Readable: "Content is written clearly",
    Predictable: "Navigation is consistent and predictable",
    "Input Assistance": "Forms have labels, errors are specific",
  },

  ROBUST: {
    Compatible: "Code is compatible with assistive technologies",
  },
};

export default {
  ACCESSIBILITY_TEST_CHECKLIST,
  SCREEN_READER_TEST_SCENARIOS,
  ACCESSIBILITY_ISSUES_AND_FIXES,
  TESTING_TOOLS,
  WCAG_COMPLIANCE_CHECKLIST,
};
