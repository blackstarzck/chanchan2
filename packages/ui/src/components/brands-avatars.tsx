import * as React from "react";

import { cn } from "../lib/cn";
import { Avatar, AvatarFallback, AvatarImage, type AvatarProps } from "./avatar";

export const brandAvatarNames = [
  "preline",
  "twitter",
  "dribbble",
  "figma",
  "apple",
  "facebook",
  "instagram",
  "slack",
  "bootstrap-5",
  "mailchimp",
  "capsule",
  "dropbox",
  "guideline",
  "airbnb",
  "prosperops",
  "astro",
  "angular",
  "react",
  "tailwind",
  "notion",
  "excel",
  "word",
  "github",
  "sentry",
  "zapier",
  "gitlab",
  "paypal",
  "spotify",
  "behance",
  "shopify",
  "google",
  "gmail",
  "google-calendar",
  "google-maps",
  "google-shopping",
  "google-podcasts",
  "google-pay",
  "google-assistant",
  "google-analytics",
  "google-ads",
  "google-keep",
  "htmlstream",
  "mail",
  "yandex",
  "openai",
  "claude"
] as const;

export type BrandAvatarName = (typeof brandAvatarNames)[number];
export type BrandMarkSize = "sm" | "default" | "lg";
export type BrandMarkShape = "rounded" | "circle";

type BrandMeta = {
  color: string;
  foreground: string;
  initials: string;
  label: string;
};

const brandMeta: Record<BrandAvatarName, BrandMeta> = {
  airbnb: { color: "#ff385c", foreground: "#ffffff", initials: "A", label: "Airbnb" },
  angular: { color: "#dd0031", foreground: "#ffffff", initials: "A", label: "Angular" },
  apple: { color: "#111827", foreground: "#ffffff", initials: "A", label: "Apple" },
  astro: { color: "#ff5d01", foreground: "#ffffff", initials: "A", label: "Astro" },
  behance: { color: "#1769ff", foreground: "#ffffff", initials: "Be", label: "Behance" },
  "bootstrap-5": { color: "#7952b3", foreground: "#ffffff", initials: "B", label: "Bootstrap 5" },
  capsule: { color: "#111827", foreground: "#ffffff", initials: "C", label: "Capsule" },
  claude: { color: "#d97757", foreground: "#ffffff", initials: "Cl", label: "Claude" },
  dribbble: { color: "#ea4c89", foreground: "#ffffff", initials: "D", label: "Dribbble" },
  dropbox: { color: "#0061ff", foreground: "#ffffff", initials: "D", label: "Dropbox" },
  excel: { color: "#217346", foreground: "#ffffff", initials: "X", label: "Excel" },
  facebook: { color: "#1877f2", foreground: "#ffffff", initials: "f", label: "Facebook" },
  figma: { color: "#0acf83", foreground: "#111827", initials: "F", label: "Figma" },
  github: { color: "#111827", foreground: "#ffffff", initials: "GH", label: "GitHub" },
  gitlab: { color: "#fc6d26", foreground: "#ffffff", initials: "GL", label: "GitLab" },
  gmail: { color: "#ea4335", foreground: "#ffffff", initials: "G", label: "Gmail" },
  google: { color: "#4285f4", foreground: "#ffffff", initials: "G", label: "Google" },
  "google-ads": { color: "#fbbc04", foreground: "#111827", initials: "Ad", label: "Google Ads" },
  "google-analytics": { color: "#f9ab00", foreground: "#111827", initials: "Ga", label: "Google Analytics" },
  "google-assistant": { color: "#4285f4", foreground: "#ffffff", initials: "As", label: "Google Assistant" },
  "google-calendar": { color: "#1a73e8", foreground: "#ffffff", initials: "31", label: "Google Calendar" },
  "google-keep": { color: "#fbbc04", foreground: "#111827", initials: "K", label: "Google Keep" },
  "google-maps": { color: "#34a853", foreground: "#ffffff", initials: "M", label: "Google Maps" },
  "google-pay": { color: "#4285f4", foreground: "#ffffff", initials: "G", label: "Google Pay" },
  "google-podcasts": { color: "#8e24aa", foreground: "#ffffff", initials: "P", label: "Google Podcasts" },
  "google-shopping": { color: "#4285f4", foreground: "#ffffff", initials: "S", label: "Google Shopping" },
  guideline: { color: "#0f766e", foreground: "#ffffff", initials: "G", label: "Guideline" },
  htmlstream: { color: "#2563eb", foreground: "#ffffff", initials: "HS", label: "HTMLStream" },
  instagram: { color: "#e1306c", foreground: "#ffffff", initials: "Ig", label: "Instagram" },
  mail: { color: "#64748b", foreground: "#ffffff", initials: "M", label: "Mail" },
  mailchimp: { color: "#ffe01b", foreground: "#111827", initials: "M", label: "Mailchimp" },
  notion: { color: "#111827", foreground: "#ffffff", initials: "N", label: "Notion" },
  openai: { color: "#111827", foreground: "#ffffff", initials: "AI", label: "OpenAI" },
  paypal: { color: "#003087", foreground: "#ffffff", initials: "P", label: "PayPal" },
  preline: { color: "#2563eb", foreground: "#ffffff", initials: "P", label: "Preline" },
  prosperops: { color: "#16a34a", foreground: "#ffffff", initials: "P", label: "ProsperOps" },
  react: { color: "#61dafb", foreground: "#0f172a", initials: "R", label: "React" },
  sentry: { color: "#362d59", foreground: "#ffffff", initials: "S", label: "Sentry" },
  shopify: { color: "#95bf47", foreground: "#111827", initials: "S", label: "Shopify" },
  slack: { color: "#4a154b", foreground: "#ffffff", initials: "S", label: "Slack" },
  spotify: { color: "#1db954", foreground: "#111827", initials: "S", label: "Spotify" },
  tailwind: { color: "#38bdf8", foreground: "#0f172a", initials: "Tw", label: "Tailwind" },
  twitter: { color: "#1da1f2", foreground: "#ffffff", initials: "X", label: "Twitter" },
  word: { color: "#2b579a", foreground: "#ffffff", initials: "W", label: "Word" },
  yandex: { color: "#fc3f1d", foreground: "#ffffff", initials: "Y", label: "Yandex" },
  zapier: { color: "#ff4a00", foreground: "#ffffff", initials: "Z", label: "Zapier" }
};

const brandMarkSizeClasses: Record<BrandMarkSize, string> = {
  sm: "size-8 text-xs",
  default: "size-11 text-sm",
  lg: "size-14 text-base"
};

const brandMarkShapeClasses: Record<BrandMarkShape, string> = {
  circle: "rounded-full",
  rounded: "rounded-xl"
};

function normalizeBrandName(value: string): BrandAvatarName | null {
  return brandAvatarNames.includes(value as BrandAvatarName) ? (value as BrandAvatarName) : null;
}

export interface BrandMarkProps extends React.HTMLAttributes<HTMLDivElement> {
  brand?: BrandAvatarName | string;
  label?: React.ReactNode;
  markStyle?: React.CSSProperties;
  shape?: BrandMarkShape;
  showLabel?: boolean;
  size?: BrandMarkSize;
}

function BrandMark({
  brand = "preline",
  children,
  className,
  label,
  markStyle,
  shape = "rounded",
  showLabel = false,
  size = "default",
  style,
  ...props
}: BrandMarkProps) {
  const normalizedBrand = normalizeBrandName(brand);
  const meta = normalizedBrand ? brandMeta[normalizedBrand] : null;
  const resolvedLabel = label ?? meta?.label ?? brand;
  const mark = children ?? meta?.initials ?? String(brand).slice(0, 2).toUpperCase();

  return (
    <div className={cn("inline-grid place-items-center gap-2 text-center", className)} style={style} {...props}>
      <span
        aria-hidden={showLabel ? true : undefined}
        className={cn(
          "inline-flex items-center justify-center font-bold tracking-[-0.02em] shadow-sm ring-1 ring-black/5",
          brandMarkSizeClasses[size],
          brandMarkShapeClasses[shape]
        )}
        style={{
          backgroundColor: meta?.color ?? "#0f172a",
          color: meta?.foreground ?? "#ffffff",
          ...markStyle
        }}
      >
        {mark}
      </span>
      {showLabel ? <span className="text-xs font-medium text-muted-foreground">{resolvedLabel}</span> : null}
    </div>
  );
}

export interface BrandAvatarProps extends Omit<AvatarProps, "children"> {
  alt?: string;
  fallback?: React.ReactNode;
  name: string;
  src?: string;
}

function BrandAvatar({ alt, fallback, name, src, ...props }: BrandAvatarProps) {
  const initials = fallback ?? name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();

  return (
    <Avatar {...props}>
      {src ? <AvatarImage alt={alt ?? name} src={src} /> : null}
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}

function BrandAvatarGrid({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6", className)} {...props} />;
}

const BrandsAvatars = BrandAvatarGrid;

export { BrandAvatar, BrandAvatarGrid, BrandMark, BrandsAvatars };
