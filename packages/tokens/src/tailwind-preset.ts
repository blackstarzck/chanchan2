export const tailwindPreset = {
  theme: {
    extend: {
      colors: {
        background: "var(--cc-background)",
        foreground: "var(--cc-foreground)",
        card: "var(--cc-card)",
        "card-foreground": "var(--cc-card-foreground)",
        popover: "var(--cc-popover)",
        "popover-foreground": "var(--cc-popover-foreground)",
        secondary: "var(--cc-secondary)",
        "secondary-foreground": "var(--cc-secondary-foreground)",
        muted: "var(--cc-muted)",
        "muted-foreground": "var(--cc-muted-foreground)",
        accent: "var(--cc-accent)",
        "accent-foreground": "var(--cc-accent-foreground)",
        border: "var(--cc-border)",
        input: "var(--cc-input)",
        ring: "var(--cc-ring)",
        primary: "var(--cc-primary)",
        "primary-foreground": "var(--cc-primary-foreground)",
        "primary-soft": "var(--cc-primary-soft)",
        "primary-soft-foreground": "var(--cc-primary-soft-foreground)",
        destructive: "var(--cc-destructive)",
        "destructive-foreground": "var(--cc-destructive-foreground)",
        success: "var(--cc-success)",
        "success-foreground": "var(--cc-success-foreground)",
        brand: "var(--cc-brand)"
      },
      borderRadius: {
        xs: "var(--cc-radius-xs)",
        sm: "var(--cc-radius-sm)",
        md: "var(--cc-radius-md)",
        lg: "var(--cc-radius-lg)",
        xl: "var(--cc-radius-xl)",
        full: "var(--cc-radius-full)"
      }
    }
  }
};

export default tailwindPreset;
