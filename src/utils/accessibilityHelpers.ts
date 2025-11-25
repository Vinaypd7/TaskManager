/**
 * Accessibility Helpers
 * Utilities to ensure components are properly configured for screen readers
 * and accessibility tools like VoiceOver (iOS), TalkBack (Android), and NVDA/JAWS (Web)
 */

/**
 * Validates that a component has proper accessibility attributes
 * @param componentName - Name of the component being validated
 * @param hasAccessibilityLabel - Whether component has accessibility label
 * @param hasAccessibilityHint - Whether component has accessibility hint
 * @returns Object with validation result and recommendations
 */
export const validateComponentAccessibility = (
  componentName: string,
  hasAccessibilityLabel: boolean,
  hasAccessibilityHint?: boolean,
) => {
  const issues: string[] = [];

  if (!hasAccessibilityLabel) {
    issues.push(`${componentName}: Missing accessibilityLabel`);
  }

  if (hasAccessibilityHint === false) {
    issues.push(
      `${componentName}: Missing accessibilityHint for better context`,
    );
  }

  return {
    isAccessible: issues.length === 0,
    issues,
  };
};

/**
 * Generate accessible label for button based on state
 * @param baseLabel - The base label text
 * @param isDisabled - Whether the button is disabled
 * @param isSelected - Whether the button is selected
 * @returns Formatted accessibility label
 */
export const getButtonAccessibilityLabel = (
  baseLabel: string,
  isDisabled: boolean = false,
  isSelected: boolean = false,
): string => {
  let label = baseLabel;

  if (isSelected) {
    label += ", selected";
  }

  if (isDisabled) {
    label += ", disabled";
  }

  return label;
};

/**
 * Generate accessible hint for form fields
 * @param fieldType - Type of field (text, email, password, etc.)
 * @param isRequired - Whether field is required
 * @param hasError - Whether field has validation error
 * @returns Formatted accessibility hint
 */
export const getFormFieldAccessibilityHint = (
  fieldType: string,
  isRequired: boolean = false,
  hasError: boolean = false,
): string => {
  let hint = `Enter ${fieldType}`;

  if (isRequired) {
    hint += ". This field is required";
  }

  if (hasError) {
    hint += ". This field has an error";
  }

  return hint;
};

/**
 * Generate accessible announcement for status changes
 * @param action - The action performed
 * @param status - The new status
 * @param itemName - Optional name of the item affected
 * @returns Formatted announcement text
 */
export const generateAccessibilityAnnouncement = (
  action: string,
  status: string,
  itemName?: string,
): string => {
  let announcement = `${action}. ${status}`;

  if (itemName) {
    announcement = `${action} ${itemName}. ${status}`;
  }

  return announcement;
};

/**
 * Check if element should be marked as hidden from accessibility tree
 * @param isDecorativeOnly - Whether element is decorative
 * @param isRedundant - Whether element duplicates information
 * @returns Whether element should be hidden
 */
export const shouldHideFromAccessibility = (
  isDecorativeOnly: boolean = false,
  isRedundant: boolean = false,
): boolean => {
  return isDecorativeOnly || isRedundant;
};

/**
 * Generate semantic heading hierarchy levels
 * @param level - Heading level (1-6)
 * @returns Accessibility role appropriate for heading
 */
export const getHeadingAccessibilityRole = (
  level: 1 | 2 | 3 | 4 | 5 | 6,
): string => {
  const roles: Record<number, string> = {
    1: "header",
    2: "header",
    3: "header",
    4: "header",
    5: "header",
    6: "header",
  };

  return roles[level] || "header";
};

/**
 * Generate accessible list item announcement
 * @param itemName - Name of the list item
 * @param itemIndex - Current item index (1-based)
 * @param totalItems - Total number of items
 * @param status - Optional status of the item
 * @returns Formatted announcement
 */
export const generateListItemAnnouncement = (
  itemName: string,
  itemIndex: number,
  totalItems: number,
  status?: string,
): string => {
  let announcement = `${itemName}, item ${itemIndex} of ${totalItems}`;

  if (status) {
    announcement += `, ${status}`;
  }

  return announcement;
};

/**
 * Best practices constants for accessibility
 */
export const ACCESSIBILITY_BEST_PRACTICES = {
  MIN_TOUCH_TARGET_SIZE: 44, // Minimum touch target size in pixels (iOS/Android standard)
  MIN_COLOR_CONTRAST_RATIO: 4.5, // Minimum contrast ratio for AA compliance (WCAG 2.1)
  MIN_FONT_SIZE: 12, // Minimum readable font size
  RECOMMENDED_LINE_HEIGHT_MULTIPLIER: 1.5, // Recommended line height for readability
};

/**
 * Common accessibility roles
 */
export const ACCESSIBILITY_ROLES = {
  BUTTON: "button",
  LINK: "link",
  TOGGLE_BUTTON: "togglebutton",
  TEXT: "text",
  HEADER: "header",
  SEARCH: "search",
  GROUP: "group",
  LIST: "list",
  LIST_ITEM: "listitem",
  ALERT: "alert",
  SWITCH: "switch",
  IMAGE: "image",
} as const;

/**
 * Common accessibility live regions
 */
export const ACCESSIBILITY_LIVE_REGIONS = {
  POLITE: "polite",
  ASSERTIVE: "assertive",
  OFF: "off",
} as const;
