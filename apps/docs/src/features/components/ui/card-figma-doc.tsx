import { ArrowRight, Check, HardDrive } from "lucide-react";

import { createDemoCode, DemoSurface } from "../component-doc-helpers";
import type { ComponentDoc, VariationDoc, VariationNavGroup } from "../component-doc-types";
import { componentCatalogBySlug } from "../registry";

const figmaCardAssets = {
  buttonLinkImage: "/figma/card/button-link-image.png",
  groupCenter: "/figma/card/group-center.png",
  groupLeft: "/figma/card/group-left.png",
  groupRight: "/figma/card/group-right.png",
  horizontalImage: "/figma/card/horizontal-image.png",
  imageInsideBody: "/figma/card/image-inside-body.png",
  imageVariant: "/figma/card/image-variant.png",
  mailchimpDetail1: "/figma/card/mailchimp-detail-1.png",
  mailchimpDetail2: "/figma/card/mailchimp-detail-2.png",
  mailchimpLogo: "/figma/card/mailchimp-logo.png",
  mainComponentImage: "/figma/card/main-component-image.png",
  overlayImage: "/figma/card/overlay-image.png",
  shopifyPart1: "/figma/card/shopify-part-1.png",
  shopifyPart2: "/figma/card/shopify-part-2.png",
  shopifyPart3: "/figma/card/shopify-part-3.png",
  gitlabPart1: "/figma/card/gitlab-part-1.png",
  gitlabPart2: "/figma/card/gitlab-part-2.png",
  gitlabPart3: "/figma/card/gitlab-part-3.png",
  gitlabPart4: "/figma/card/gitlab-part-4.png"
} as const;

const figmaCardBodyCopy =
  "Some quick example text to build on the card title and make up the bulk of the card's content.";
const figmaCardMeta = "Last updated 5 mins ago";
const figmaCaseStudyLinkClass =
  "inline-flex w-fit flex-col gap-0.5 text-[12px] font-medium leading-4 tracking-[0.06px] text-[#2563eb]";
const figmaGhostLinkClass =
  "inline-flex items-center gap-2 text-[14px] font-medium leading-5 tracking-[0.07px] text-[#2563eb]";
const figmaPrimaryButtonClass =
  "inline-flex items-center justify-center rounded-[8px] bg-[#2563eb] px-4 py-3 text-[14px] font-medium leading-5 tracking-[0.07px] text-white";

const figmaAgencyItems = [
  {
    body:
      "With the aim of optimizing customer interactions and boosting brand loyalty, the team at Preline leveraged Mailchimp's powerful tools and expertise to deliver exceptional results.",
    gradient: false,
    logo: "mailchimp" as const,
    radius: "rounded-l-[12px]",
    stat: "43%",
    title: "Enhancement in Customer Engagement"
  },
  {
    body:
      "In collaboration with Shopify, Preline embarked on a mission to revolutionize the e-commerce experience for a fictitious fashion brand, 'StyleAura'.",
    gradient: true,
    logo: "shopify" as const,
    radius: "",
    stat: "20%",
    title: "Rise in E-commerce"
  },
  {
    body:
      "With the goal of accelerating project delivery and enhancing collaboration among development teams, Preline leveraged GitLab's comprehensive suite of tools and Preline's expertise in digital product development.",
    gradient: false,
    logo: "gitlab" as const,
    radius: "rounded-r-[12px]",
    stat: "12%",
    title: "Streamlining Development"
  }
] as const;

function FigmaCaseStudyLink() {
  return (
    <button type="button" className={figmaCaseStudyLinkClass}>
      <span>Case study</span>
      <span className="h-[2px] w-full bg-[#2563eb]" />
    </button>
  );
}

function FigmaCardLink({ label = "Card link" }: { label?: string }) {
  return (
    <button type="button" className={figmaGhostLinkClass}>
      <span>{label}</span>
      <ArrowRight className="size-3.5 stroke-[2.2]" />
    </button>
  );
}

function FigmaPrimaryButton({ label = "Go somewhere" }: { label?: string }) {
  return (
    <button type="button" className={figmaPrimaryButtonClass}>
      {label}
    </button>
  );
}

function FigmaMailchimpLogo() {
  return (
    <div className="flex size-8 items-center justify-center rounded-full bg-[#ffd21f] text-[14px] font-black lowercase text-[#111827]">
      m
    </div>
  );
}

function FigmaShopifyLogo() {
  return (
    <div className="relative size-8">
      <img alt="" className="absolute inset-[0.27%_6.25%_0.25%_6.27%]" src={figmaCardAssets.shopifyPart1} />
      <img alt="" className="absolute inset-[12%_6.25%_0.25%_63.01%]" src={figmaCardAssets.shopifyPart2} />
      <img alt="" className="absolute inset-[34.33%_47.43%_15.2%_19.69%]" src={figmaCardAssets.shopifyPart3} />
    </div>
  );
}

function FigmaGitlabLogo() {
  return (
    <div className="relative size-8">
      <img alt="" className="absolute inset-[0.02%_0.13%_0.02%_0.12%]" src={figmaCardAssets.gitlabPart1} />
      <img alt="" className="absolute inset-y-[39.19%] left-[0.12%] right-1/2 bottom-[13.87%]" src={figmaCardAssets.gitlabPart4} />
      <img alt="" className="absolute bottom-[13.84%] left-1/2 right-[0.12%] top-[39.21%]" src={figmaCardAssets.gitlabPart2} />
      <img alt="" className="absolute inset-[71.22%_30.99%_0_31.01%]" src={figmaCardAssets.gitlabPart3} />
    </div>
  );
}

function FigmaAgencyLogo({ logo }: { logo: (typeof figmaAgencyItems)[number]["logo"] }) {
  if (logo === "mailchimp") return <FigmaMailchimpLogo />;
  if (logo === "shopify") return <FigmaShopifyLogo />;
  return <FigmaGitlabLogo />;
}

function FigmaAgencyDemoPreview() {
  return (
    <DemoSurface>
      <div className="grid max-w-[1128px] grid-cols-3 gap-0">
        {figmaAgencyItems.map((item, index) => (
          <div
            key={item.title}
            className={`flex min-h-[364px] flex-col border border-[#e5e7eb] ${item.radius}`}
            style={
              item.gradient
                ? {
                    backgroundImage:
                      "linear-gradient(180deg, rgba(255,255,255,0.2) 80%, rgba(191,219,254,0.2) 100%), linear-gradient(90deg, #ffffff 0%, #ffffff 100%)"
                  }
                : undefined
            }
          >
            <div className="flex flex-1 flex-col gap-5 px-6 py-6">
              <FigmaAgencyLogo logo={item.logo} />
              <p className="text-[48px] font-semibold leading-none tracking-[0.24px] text-[#1f2937]">
                {item.stat}
              </p>
              <div className="flex flex-col gap-1">
                <p className="text-[20px] font-semibold leading-none tracking-[0.1px] text-[#1f2937]">
                  {item.title}
                </p>
                <p className="text-[14px] font-medium leading-5 tracking-[0.07px] text-[#6b7280]">
                  {item.body}
                </p>
              </div>
            </div>
            <div className={`px-6 pb-6 ${index === 0 ? "pt-0" : ""}`}>
              <FigmaCaseStudyLink />
            </div>
          </div>
        ))}
      </div>
    </DemoSurface>
  );
}

function FigmaHeadingPreview() {
  return (
    <DemoSurface>
      <div className="max-w-[371px] overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <div className="bg-[#f8fafc] px-5 py-5 text-[14px] font-medium leading-5 tracking-[0.07px] text-[#6b7280]">
          Featured
        </div>
        <div className="flex flex-col gap-4 px-5 py-5">
          <div className="flex flex-col gap-1">
            <p className="text-[18px] font-bold leading-none tracking-[0.09px] text-[#1f2937]">
              Card title
            </p>
            <p className="text-[14px] font-semibold leading-5 tracking-[0.07px] text-[#6b7280]">
              CARD SUBTITLE
            </p>
          </div>
          <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-[#6b7280]">
            {figmaCardBodyCopy}
          </p>
          <div className="pt-5">
            <FigmaCardLink />
          </div>
        </div>
      </div>
    </DemoSurface>
  );
}

function FigmaScrollableBodyPreview() {
  return (
    <DemoSurface>
      <div className="max-w-[371px] overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <div className="relative flex flex-col gap-4 px-5 py-5">
          <p className="text-[18px] font-bold leading-none tracking-[0.09px] text-[#1f2937]">Card title</p>
          <div className="relative h-[248px] overflow-hidden pr-5">
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <p key={index} className="text-[16px] font-medium leading-6 tracking-[0.08px] text-[#6b7280]">
                  This is a longer card with supporting text below as a natural lead-in to additional content.
                </p>
              ))}
            </div>
            <div className="absolute right-0 top-0 flex h-full items-start p-1">
              <div className="h-[240px] w-1.5 rounded-full bg-[#d1d5db]" />
            </div>
          </div>
        </div>
      </div>
    </DemoSurface>
  );
}

function FigmaCmsDemoPreview() {
  return (
    <DemoSurface>
      <div className="max-w-[371px] overflow-hidden rounded-[8px] bg-[#f3f4f6]">
        <div className="flex flex-col gap-3 px-4 py-4">
          <p className="text-[14px] font-semibold leading-5 tracking-[0.07px] text-[#1f2937]">
            Connect to your mailboxes
          </p>
          <p className="text-[14px] font-medium leading-5 tracking-[0.07px] text-[#6b7280]">
            Connect to your favorite mailbox and receive updates to your inbox.
          </p>
          <div className="flex items-end justify-between gap-4">
            <FigmaCaseStudyLink />
            <div className="flex items-center gap-2">
              {[
                { label: "M", tone: "text-[#2563eb]" },
                { label: "G", tone: "text-[#ea4335]" },
                { label: "Y", tone: "text-[#7c3aed]" }
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex size-7 items-center justify-center rounded-[6px] bg-white text-[12px] font-semibold shadow-[0_1px_1px_rgba(0,0,0,0.05)] ${item.tone}`}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DemoSurface>
  );
}

function FigmaNavigationPreview() {
  return (
    <DemoSurface>
      <div className="max-w-[693px] overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex border-b border-[#e5e7eb] bg-white">
          <button
            type="button"
            className="border-b-2 border-[#2563eb] px-4 py-3 text-[14px] font-medium leading-5 tracking-[0.07px] text-[#2563eb]"
          >
            Profile
          </button>
          <button
            type="button"
            className="border-l border-[#e5e7eb] px-4 py-3 text-[14px] font-medium leading-5 tracking-[0.07px] text-[#6b7280]"
          >
            Teams
          </button>
          <button
            type="button"
            className="border-l border-[#e5e7eb] px-4 py-3 text-[14px] font-medium leading-5 tracking-[0.07px] text-[#6b7280]"
          >
            <span className="inline-flex items-center gap-2">
              <span>Projects</span>
              <span className="rounded-full bg-[#dbeafe] px-2 py-0.5 text-[12px] text-[#2563eb]">
                3
              </span>
            </span>
          </button>
          <button
            type="button"
            className="border-l border-[#e5e7eb] px-4 py-3 text-[14px] font-medium leading-5 tracking-[0.07px] text-[#6b7280] opacity-50"
          >
            Connections
          </button>
        </div>
        <div className="flex flex-col items-center gap-4 px-5 py-5 text-center">
          <p className="text-[18px] font-bold leading-none tracking-[0.09px] text-[#1f2937]">Card title</p>
          <p className="max-w-[640px] text-[16px] font-medium leading-6 tracking-[0.08px] text-[#6b7280]">
            With supporting text below as a natural lead-in to additional content.
          </p>
          <FigmaPrimaryButton />
        </div>
      </div>
    </DemoSurface>
  );
}

function FigmaMainComponentPreview() {
  return (
    <DemoSurface>
      <div className="max-w-[570px] overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <div className="border-b border-[#e5e7eb] bg-[#f8fafc] px-5 py-5">
          <p className="text-[18px] font-semibold leading-none tracking-[0.09px] text-[#1f2937]">
            Card header title
          </p>
        </div>
        <img alt="" className="h-[200px] w-full object-cover" src={figmaCardAssets.mainComponentImage} />
        <div className="flex flex-col gap-4 px-5 py-5">
          <div className="flex flex-col gap-1">
            <p className="text-[18px] font-bold leading-none tracking-[0.09px] text-[#1f2937]">
              Card title
            </p>
            <p className="text-[14px] font-semibold leading-5 tracking-[0.07px] text-[#6b7280]">
              CARD SUBTITLE
            </p>
          </div>
          <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-[#6b7280]">
            {figmaCardBodyCopy}
          </p>
          <div className="flex flex-wrap gap-[10px] pt-[10px]">
            <FigmaPrimaryButton />
            <FigmaCardLink />
          </div>
        </div>
        <div className="border-t border-[#e5e7eb] bg-[#f8fafc] px-5 py-5">
          <p className="text-[14px] font-medium leading-5 tracking-[0.07px] text-[#9ca3af]">
            {figmaCardMeta}
          </p>
        </div>
      </div>
    </DemoSurface>
  );
}

function FigmaFooterMetaPreview() {
  return (
    <DemoSurface>
      <div className="max-w-[371px] overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col gap-4 px-5 py-5">
          <div className="flex flex-col gap-1">
            <p className="text-[18px] font-bold leading-none tracking-[0.09px] text-[#1f2937]">
              Card title
            </p>
            <p className="text-[14px] font-semibold leading-5 tracking-[0.07px] text-[#6b7280]">
              CARD SUBTITLE
            </p>
          </div>
          <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-[#6b7280]">
            {figmaCardBodyCopy}
          </p>
          <div className="pt-5">
            <FigmaCardLink />
          </div>
        </div>
        <div className="bg-[#f8fafc] px-5 py-5">
          <p className="text-[14px] font-medium leading-5 tracking-[0.07px] text-[#9ca3af]">
            {figmaCardMeta}
          </p>
        </div>
      </div>
    </DemoSurface>
  );
}

function FigmaImagePreview() {
  return (
    <DemoSurface>
      <div className="max-w-[371px] overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <img alt="" className="h-[200px] w-full object-cover" src={figmaCardAssets.imageVariant} />
        <div className="flex flex-col gap-4 px-5 py-5">
          <p className="text-[18px] font-bold leading-none tracking-[0.09px] text-[#1f2937]">Card title</p>
          <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-[#6b7280]">
            {figmaCardBodyCopy}
          </p>
          <p className="text-[14px] font-medium leading-5 tracking-[0.07px] text-[#9ca3af]">
            {figmaCardMeta}
          </p>
        </div>
      </div>
    </DemoSurface>
  );
}

function FigmaImageInsideBodyPreview() {
  return (
    <DemoSurface>
      <div className="max-w-[371px] overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col gap-4 px-5 py-5">
          <img
            alt=""
            className="h-[200px] w-full rounded-[12px] object-cover"
            src={figmaCardAssets.imageInsideBody}
          />
          <div className="flex flex-col gap-1">
            <p className="text-[18px] font-bold leading-none tracking-[0.09px] text-[#1f2937]">
              Card title
            </p>
            <p className="text-[14px] font-semibold leading-5 tracking-[0.07px] text-[#6b7280]">
              CARD SUBTITLE
            </p>
          </div>
          <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-[#6b7280]">
            {figmaCardBodyCopy}
          </p>
          <p className="text-[14px] font-medium leading-5 tracking-[0.07px] text-[#9ca3af]">
            {figmaCardMeta}
          </p>
        </div>
      </div>
    </DemoSurface>
  );
}

function FigmaButtonAndLinkPreview() {
  return (
    <DemoSurface>
      <div className="max-w-[371px] overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <img alt="" className="h-[200px] w-full object-cover" src={figmaCardAssets.buttonLinkImage} />
        <div className="flex flex-col gap-4 px-5 py-5">
          <div className="flex flex-col gap-1">
            <p className="text-[18px] font-bold leading-none tracking-[0.09px] text-[#1f2937]">
              Card title
            </p>
            <p className="text-[14px] font-semibold leading-5 tracking-[0.07px] text-[#6b7280]">
              CARD SUBTITLE
            </p>
          </div>
          <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-[#6b7280]">
            {figmaCardBodyCopy}
          </p>
          <div className="flex flex-wrap gap-[10px] pt-[10px]">
            <FigmaPrimaryButton />
            <FigmaCardLink />
          </div>
        </div>
      </div>
    </DemoSurface>
  );
}

function FigmaGroupPreview() {
  return (
    <DemoSurface>
      <div className="grid max-w-[1128px] grid-cols-3 gap-0">
        {[
          { image: figmaCardAssets.groupLeft, radius: "rounded-l-[12px]" },
          { image: figmaCardAssets.groupCenter, radius: "" },
          { image: figmaCardAssets.groupRight, radius: "rounded-r-[12px]" }
        ].map((item) => (
          <div
            key={item.image}
            className={`overflow-hidden border border-[#e5e7eb] bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05)] ${item.radius}`}
          >
            <img alt="" className="h-[200px] w-full object-cover" src={item.image} />
            <div className="flex flex-col gap-4 px-5 py-5">
              <div className="flex flex-col gap-1">
                <p className="text-[18px] font-bold leading-none tracking-[0.09px] text-[#1f2937]">
                  Card title
                </p>
                <p className="text-[14px] font-semibold leading-5 tracking-[0.07px] text-[#6b7280]">
                  CARD SUBTITLE
                </p>
              </div>
              <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-[#6b7280]">
                {figmaCardBodyCopy}
              </p>
              <div className="pt-5">
                <FigmaCardLink />
              </div>
            </div>
            <div className="border-t border-[#e5e7eb] px-5 py-5">
              <p className="text-[14px] font-medium leading-5 tracking-[0.07px] text-[#9ca3af]">
                {figmaCardMeta}
              </p>
            </div>
          </div>
        ))}
      </div>
    </DemoSurface>
  );
}

function FigmaOverlayPreview() {
  return (
    <DemoSurface>
      <div className="relative max-w-[576px] overflow-hidden rounded-[12px] border border-[#e5e7eb] shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <img alt="" className="absolute inset-0 h-full w-full object-cover" src={figmaCardAssets.overlayImage} />
        <div className="relative flex flex-col gap-4 px-5 py-5">
          <div className="flex flex-col gap-[5px]">
            <p className="text-[18px] font-bold leading-none tracking-[0.09px] text-[#1f2937]">
              Card title
            </p>
            <p className="text-[14px] font-semibold leading-5 tracking-[0.07px] text-[#6b7280]">
              CARD SUBTITLE
            </p>
          </div>
          <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-[#6b7280]">
            {figmaCardBodyCopy}
          </p>
          <p className="text-[14px] font-semibold leading-5 tracking-[0.07px] text-[#6b7280]">
            {figmaCardMeta}
          </p>
        </div>
      </div>
    </DemoSurface>
  );
}

function FigmaHorizontalPreview() {
  return (
    <DemoSurface>
      <div className="flex max-w-[576px] overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <img alt="" className="h-auto w-[200px] object-cover" src={figmaCardAssets.horizontalImage} />
        <div className="flex flex-1 flex-col justify-between px-5 py-5">
          <div className="flex flex-col gap-[14px]">
            <p className="text-[18px] font-bold leading-none tracking-[0.09px] text-[#1f2937]">
              Card title
            </p>
            <p className="max-w-[259px] text-[16px] font-medium leading-6 tracking-[0.08px] text-[#6b7280]">
              {figmaCardBodyCopy}
            </p>
          </div>
          <p className="text-[14px] font-semibold leading-5 tracking-[0.07px] text-[#9ca3af]">
            {figmaCardMeta}
          </p>
        </div>
      </div>
    </DemoSurface>
  );
}

function FigmaAlertPreview() {
  return (
    <DemoSurface>
      <div className="max-w-[371px] overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <div className="px-5 py-5 text-[14px] font-medium leading-5 tracking-[0.07px] text-[#6b7280]">
          Featured
        </div>
        <div className="border-y border-[#e5e7eb] bg-[#f8fafc] px-4 py-4">
          <div className="flex items-start gap-5">
            <div className="flex size-9 items-center justify-center rounded-full border-[5px] border-[#d1d5db] bg-[#f3f4f6]">
              <Check className="size-5 text-[#1f2937]" />
            </div>
            <div className="flex flex-wrap items-start gap-2">
              <p className="text-[18px] font-semibold leading-none tracking-[0.09px] text-[#1f2937]">
                Attention needed!
              </p>
              <p className="pt-0.5 text-[16px] font-medium leading-6 tracking-[0.08px] text-[#6b7280]">
                This is an alert box.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[10px] px-5 py-5">
          <p className="text-[18px] font-bold leading-none tracking-[0.09px] text-[#1f2937]">
            Card title
          </p>
          <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-[#6b7280]">
            With supporting text below as a natural lead-in to additional content.
          </p>
          <FigmaCardLink />
        </div>
      </div>
    </DemoSurface>
  );
}

function FigmaCenteredPreview() {
  return (
    <DemoSurface>
      <div className="max-w-[371px] overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col items-center gap-4 px-5 py-5 text-center">
          <p className="text-[18px] font-bold leading-none tracking-[0.09px] text-[#1f2937]">
            Card title
          </p>
          <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-[#6b7280]">
            With supporting text below as a natural lead-in to additional content.
          </p>
          <FigmaCardLink />
        </div>
      </div>
    </DemoSurface>
  );
}

function FigmaEmptyStatePreview() {
  return (
    <DemoSurface>
      <div className="max-w-[371px] overflow-hidden rounded-[12px] border border-[#e5e7eb] bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex h-[220px] flex-col items-center justify-center gap-4 px-5 py-5">
          <HardDrive className="size-12 stroke-[1.5] text-[#475569]" />
          <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-[#6b7280]">
            No data to show
          </p>
        </div>
      </div>
    </DemoSurface>
  );
}

const figmaCardVariations: VariationDoc[] = [
  {
    id: "card-agency-demo",
    title: "Agency demo",
    description:
      "Three adjacent instances from the Figma page, with brand logos, large stats, full copy, and underlined case-study links.",
    controlSummary: "three contiguous instances, 24px padding, 48px stat, underlined link",
    code: createDemoCode({
      demoName: "CardAgencyDemo",
      imports: ["Button", "Card", "CardContent", "CardTitle"],
      setup: `
const caseStudies = [
  {
    title: "Enhancement in Customer Engagement",
    stat: "43%",
    body: "With the aim of optimizing customer interactions and boosting brand loyalty, the team at Preline leveraged Mailchimp's powerful tools and expertise to deliver exceptional results.",
    cardClassName: "min-h-[364px] rounded-none shadow-none first:rounded-l-xl",
    logoClassName:
      "flex size-8 items-center justify-center rounded-full bg-[#ffd21f] text-[14px] font-black lowercase text-[#111827]",
    logoLabel: "m"
  },
  {
    title: "Rise in E-commerce",
    stat: "20%",
    body: "In collaboration with Shopify, Preline embarked on a mission to revolutionize the e-commerce experience for a fictitious fashion brand, 'StyleAura'.",
    cardClassName: "min-h-[364px] -ml-px rounded-none shadow-none",
    cardStyle: {
      backgroundImage:
        "linear-gradient(180deg, rgba(255,255,255,0.2) 80%, rgba(191,219,254,0.2) 100%), linear-gradient(90deg, #ffffff 0%, #ffffff 100%)"
    },
    logoClassName:
      "flex size-8 items-center justify-center rounded-[10px] bg-[#95bf47] text-[18px] font-bold text-white",
    logoLabel: "S"
  },
  {
    title: "Streamlining Development",
    stat: "12%",
    body: "With the goal of accelerating project delivery and enhancing collaboration among development teams, Preline leveraged GitLab's comprehensive suite of tools and Preline's expertise in digital product development.",
    cardClassName: "min-h-[364px] -ml-px rounded-none shadow-none last:rounded-r-xl",
    logoClassName:
      "flex size-8 items-center justify-center rounded-[10px] bg-[#fc6d26] text-[18px] font-bold text-white",
    logoLabel: "G"
  }
]
      `,
      body: `
<div className="grid grid-cols-3 gap-0">
  {caseStudies.map((item) => (
    <Card key={item.title} className={item.cardClassName} style={item.cardStyle}>
      <CardContent className="flex flex-1 flex-col gap-5 px-6 py-6">
        <div className={item.logoClassName}>{item.logoLabel}</div>
        <p className="text-[48px] font-semibold leading-none tracking-[0.24px] text-[#1f2937]">
          {item.stat}
        </p>
        <div className="flex flex-col gap-1">
          <CardTitle className="text-[20px] font-semibold tracking-[0.1px]">
            {item.title}
          </CardTitle>
          <p className="text-[14px] font-medium leading-5 tracking-[0.07px] text-[#6b7280]">
            {item.body}
          </p>
        </div>
      </CardContent>
      <div className="px-6 pb-6">
        <Button className="w-fit px-0 text-[12px] tracking-[0.06px]" tone="blue" variant="link">
          <span className="border-b-2 border-current pb-0.5">Case study</span>
        </Button>
      </div>
    </Card>
  ))}
</div>`
    }),
    layout: "start",
    preview: <FigmaAgencyDemoPreview />
  },
  {
    id: "card-heading",
    title: "Heading",
    description: "Header slot plus body slot, matching the featured instance.",
    controlSummary: "header slot, 20px padding, body link",
    code: createDemoCode({
      demoName: "CardHeadingDemo",
      extraImports: ['import { ArrowRight } from "lucide-react"'],
      imports: ["Button", "Card", "CardContent", "CardDescription", "CardHeader", "CardTitle"],
      body: `
<Card className="max-w-[371px]">
  <CardHeader>
    <p className="text-[14px] font-medium leading-5 tracking-[0.07px] text-[#6b7280]">
      Featured
    </p>
  </CardHeader>
  <CardContent>
    <div className="space-y-1">
      <CardTitle>Card title</CardTitle>
      <CardDescription>CARD SUBTITLE</CardDescription>
    </div>
    <p className="text-base font-medium leading-6 tracking-[0.08px] text-muted-foreground">
      ${figmaCardBodyCopy}
    </p>
    <div className="pt-5">
      <Button tone="blue" trailing={<ArrowRight className="size-4" />} variant="link">
        Card link
      </Button>
    </div>
  </CardContent>
</Card>`
    }),
    layout: "start",
    preview: <FigmaHeadingPreview />
  },
  {
    id: "card-scrollable-body",
    title: "Scrollable body",
    description: "Fixed-height copy region with a visible scrollbar thumb drawn from the Figma node.",
    controlSummary: "body slot, 248px text window, custom scrollbar thumb",
    code: createDemoCode({
      demoName: "CardScrollableBodyDemo",
      imports: ["Card", "CardContent", "CardTitle"],
      setup: `
const paragraphs = Array.from({ length: 6 }, () =>
  "This is a longer card with supporting text below as a natural lead-in to additional content."
)
      `,
      body: `
<Card className="max-w-[371px]">
  <CardContent className="relative">
    <CardTitle>Card title</CardTitle>
    <div className="relative h-[248px] overflow-y-auto pr-5">
      <div className="space-y-3">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-base font-medium leading-6 tracking-[0.08px] text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="pointer-events-none absolute right-0 top-0 flex h-full items-start p-1">
        <div className="h-[240px] w-1.5 rounded-full bg-[#d1d5db]" />
      </div>
    </div>
  </CardContent>
</Card>`
    }),
    layout: "start",
    preview: <FigmaScrollableBodyPreview />
  },
  {
    id: "card-cms-demo",
    title: "CMS demo",
    description: "Compact 8px-radius card with surface background and footer utility row.",
    controlSummary: "8px radius, compact copy, provider tiles",
    code: createDemoCode({
      demoName: "CardCmsDemo",
      imports: ["Button", "Card", "CardContent"],
      setup: `
const providers = [
  { label: "M", textClassName: "text-[#2563eb]" },
  { label: "G", textClassName: "text-[#ea4335]" },
  { label: "Y", textClassName: "text-[#7c3aed]" }
]
      `,
      body: `
<Card className="max-w-[371px] rounded-lg border-none bg-[#f3f4f6] shadow-none">
  <CardContent className="gap-3 px-4 py-4">
    <p className="text-[14px] font-semibold leading-5 tracking-[0.07px] text-[#1f2937]">Connect to your mailboxes</p>
    <p className="text-[14px] font-medium leading-5 tracking-[0.07px] text-[#6b7280]">
      Connect to your favorite mailbox and receive updates to your inbox.
    </p>
    <div className="flex items-end justify-between gap-4">
      <Button className="w-fit px-0 text-[12px] tracking-[0.06px]" tone="blue" variant="link">
        <span className="border-b-2 border-current pb-0.5">Case study</span>
      </Button>
      <div className="flex items-center gap-2">
        {providers.map((provider) => (
          <div
            key={provider.label}
            className={\`flex size-7 items-center justify-center rounded-[6px] bg-white text-[12px] font-semibold shadow-[0_1px_1px_rgba(0,0,0,0.05)] \${provider.textClassName}\`}
          >
            {provider.label}
          </div>
        ))}
      </div>
    </div>
  </CardContent>
</Card>`
    }),
    layout: "start",
    preview: <FigmaCmsDemoPreview />
  },
  {
    id: "card-navigation",
    title: "Navigation",
    description: "Header tabs plus centered body content and primary CTA.",
    controlSummary: "header tabs, badge, centered body, primary button",
    code: createDemoCode({
      demoName: "CardNavigationDemo",
      imports: ["Badge", "Button", "Card", "CardContent", "CardHeader", "CardTitle", "Navs", "NavsLink"],
      setup: `
const tabs = [
  { href: "#profile", label: "Profile", active: true },
  { href: "#teams", label: "Teams" },
  { href: "#projects", label: "Projects", badge: "3", state: "hover" as const },
  { href: "#connections", label: "Connections", disabled: true }
]
      `,
      body: `
<Card className="max-w-[693px]">
  <CardHeader className="gap-0 bg-white p-0">
    <Navs className="w-full" fill="equal" variant="bordered">
      {tabs.map((tab) => (
        <NavsLink
          key={tab.href}
          active={tab.active}
          disabled={tab.disabled}
          href={tab.href}
          state={tab.state}
        >
          {tab.label}
          {tab.badge ? (
            <Badge size="sm" variant="accent">
              {tab.badge}
            </Badge>
          ) : null}
        </NavsLink>
      ))}
    </Navs>
  </CardHeader>
  <CardContent className="items-center text-center">
    <CardTitle>Card title</CardTitle>
    <p className="max-w-[640px] text-[16px] font-medium leading-6 tracking-[0.08px] text-[#6b7280]">
      With supporting text below as a natural lead-in to additional content.
    </p>
    <Button>Go somewhere</Button>
  </CardContent>
</Card>`
    }),
    layout: "start",
    preview: <FigmaNavigationPreview />
  },
  {
    id: "card-main-component",
    title: "Main component anatomy",
    description: "Full Main component with header, image, body, CTA group, and footer slots visible.",
    controlSummary: "header slot, image slot, body slot, footer slot",
    code: createDemoCode({
      demoName: "CardMainComponentDemo",
      extraImports: ['import { ArrowRight } from "lucide-react"'],
      imports: ["Button", "Card", "CardContent", "CardDescription", "CardFooter", "CardHeader", "CardImage", "CardTitle"],
      body: `
<Card className="max-w-[570px]">
  <CardHeader>
    <CardTitle className="font-semibold">Card header title</CardTitle>
  </CardHeader>
  <CardImage>
    <img
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
      src="${figmaCardAssets.mainComponentImage}"
    />
  </CardImage>
  <CardContent>
    <div className="space-y-1">
      <CardTitle>Card title</CardTitle>
      <CardDescription>CARD SUBTITLE</CardDescription>
    </div>
    <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">${figmaCardBodyCopy}</p>
    <div className="flex flex-wrap gap-[10px] pt-[10px]">
      <Button>Go somewhere</Button>
      <Button tone="blue" trailing={<ArrowRight className="size-4" />} variant="link">
        Card link
      </Button>
    </div>
  </CardContent>
  <CardFooter>${figmaCardMeta}</CardFooter>
</Card>`
    }),
    layout: "start",
    preview: <FigmaMainComponentPreview />
  },
  {
    id: "card-footer-meta",
    title: "Footer meta strip",
    description: "Body-only card with muted footer strip below the CTA link.",
    controlSummary: "body slot, footer strip, link button",
    code: createDemoCode({
      demoName: "CardFooterMetaDemo",
      extraImports: ['import { ArrowRight } from "lucide-react"'],
      imports: ["Button", "Card", "CardContent", "CardDescription", "CardFooter", "CardTitle"],
      body: `
<Card className="max-w-[371px]">
  <CardContent>
    <div className="space-y-1">
      <CardTitle>Card title</CardTitle>
      <CardDescription>CARD SUBTITLE</CardDescription>
    </div>
    <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">${figmaCardBodyCopy}</p>
    <div className="pt-5">
      <Button tone="blue" trailing={<ArrowRight className="size-4" />} variant="link">
        Card link
      </Button>
    </div>
  </CardContent>
  <CardFooter>${figmaCardMeta}</CardFooter>
</Card>`
    }),
    layout: "start",
    preview: <FigmaFooterMetaPreview />
  },
  {
    id: "card-image",
    title: "Image",
    description: "Image slot above the body content, followed by muted footer meta inside the body.",
    controlSummary: "image slot, body title, footer meta",
    code: createDemoCode({
      demoName: "CardImageDemo",
      imports: ["Card", "CardContent", "CardImage", "CardTitle"],
      body: `
<Card className="max-w-[371px]">
  <CardImage>
    <img
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
      src="${figmaCardAssets.imageVariant}"
    />
  </CardImage>
  <CardContent>
    <CardTitle>Card title</CardTitle>
    <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">${figmaCardBodyCopy}</p>
    <p className="text-[14px] font-medium leading-5 tracking-[0.07px] text-[#9ca3af]">${figmaCardMeta}</p>
  </CardContent>
</Card>`
    }),
    layout: "start",
    preview: <FigmaImagePreview />
  },
  {
    id: "card-image-inside-body",
    title: "Image inside body content",
    description: "Image moves into the body slot, keeping the outer shell padding intact.",
    controlSummary: "body slot image, 12px inner radius, muted meta",
    code: createDemoCode({
      demoName: "CardImageInsideBodyDemo",
      imports: ["Card", "CardContent", "CardDescription", "CardTitle"],
      body: `
<Card className="max-w-[371px]">
  <CardContent>
    <img alt="" className="h-[200px] w-full rounded-[12px] object-cover" src="${figmaCardAssets.imageInsideBody}" />
    <div className="space-y-1">
      <CardTitle>Card title</CardTitle>
      <CardDescription>CARD SUBTITLE</CardDescription>
    </div>
    <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">${figmaCardBodyCopy}</p>
    <p className="text-[14px] font-medium leading-5 tracking-[0.07px] text-[#9ca3af]">${figmaCardMeta}</p>
  </CardContent>
</Card>`
    }),
    layout: "start",
    preview: <FigmaImageInsideBodyPreview />
  },
  {
    id: "card-button-and-link",
    title: "Button and link",
    description: "Image-led instance with both primary button and inline link in the CTA group.",
    controlSummary: "image slot, button group, primary + link CTA",
    code: createDemoCode({
      demoName: "CardButtonAndLinkDemo",
      extraImports: ['import { ArrowRight } from "lucide-react"'],
      imports: ["Button", "Card", "CardContent", "CardDescription", "CardImage", "CardTitle"],
      body: `
<Card className="max-w-[371px]">
  <CardImage>
    <img
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
      src="${figmaCardAssets.buttonLinkImage}"
    />
  </CardImage>
  <CardContent>
    <div className="space-y-1">
      <CardTitle>Card title</CardTitle>
      <CardDescription>CARD SUBTITLE</CardDescription>
    </div>
    <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">${figmaCardBodyCopy}</p>
    <div className="flex flex-wrap gap-[10px] pt-[10px]">
      <Button>Go somewhere</Button>
      <Button tone="blue" trailing={<ArrowRight className="size-4" />} variant="link">
        Card link
      </Button>
    </div>
  </CardContent>
</Card>`
    }),
    layout: "start",
    preview: <FigmaButtonAndLinkPreview />
  },
  {
    id: "card-group",
    title: "Group",
    description: "Three contiguous image cards sharing edges, with outer radii only on the row ends.",
    controlSummary: "adjacent cards, shared borders, image slots, footer meta",
    code: createDemoCode({
      demoName: "CardGroupDemo",
      extraImports: ['import { ArrowRight } from "lucide-react"'],
      imports: ["Button", "Card", "CardContent", "CardDescription", "CardFooter", "CardImage", "CardTitle"],
      setup: `
const cards = [
  { image: "${figmaCardAssets.groupLeft}", className: "rounded-none shadow-none first:rounded-l-xl" },
  { image: "${figmaCardAssets.groupCenter}", className: "-ml-px rounded-none shadow-none" },
  { image: "${figmaCardAssets.groupRight}", className: "-ml-px rounded-none shadow-none last:rounded-r-xl" }
]
      `,
      body: `
<div className="grid grid-cols-3 gap-0">
  {cards.map((item) => (
    <Card key={item.image} className={item.className}>
      <CardImage>
        <img alt="" className="absolute inset-0 h-full w-full object-cover" src={item.image} />
      </CardImage>
      <CardContent>
        <div className="space-y-1">
          <CardTitle>Card title</CardTitle>
          <CardDescription>CARD SUBTITLE</CardDescription>
        </div>
        <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">${figmaCardBodyCopy}</p>
        <div className="pt-5">
          <Button tone="blue" trailing={<ArrowRight className="size-4" />} variant="link">
            Card link
          </Button>
        </div>
      </CardContent>
      <CardFooter>${figmaCardMeta}</CardFooter>
    </Card>
  ))}
</div>`
    }),
    layout: "start",
    preview: <FigmaGroupPreview />
  },
  {
    id: "card-overlay",
    title: "Overlay",
    description: "Frame-based exception from the page, with text drawn over a full-card image.",
    controlSummary: "frame exception, absolute image, overlayed body content",
    code: createDemoCode({
      demoName: "CardOverlayDemo",
      imports: ["Card", "CardContent", "CardDescription", "CardTitle"],
      body: `
<Card className="relative max-w-[576px]">
  <img alt="" className="absolute inset-0 h-full w-full object-cover" src="/figma/card/overlay-image.png" />
  <CardContent className="relative">
    <div className="space-y-[5px]">
      <CardTitle>Card title</CardTitle>
      <CardDescription>CARD SUBTITLE</CardDescription>
    </div>
    <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">${figmaCardBodyCopy}</p>
    <p className="text-[14px] font-semibold leading-5 tracking-[0.07px] text-[#6b7280]">${figmaCardMeta}</p>
  </CardContent>
</Card>`
    }),
    layout: "start",
    preview: <FigmaOverlayPreview />
  },
  {
    id: "card-horizontal",
    title: "Horizontal",
    description: "Frame-based horizontal layout with fixed 200px image rail and body/footer stack.",
    controlSummary: "frame exception, 200px media rail, split body",
    code: createDemoCode({
      demoName: "CardHorizontalDemo",
      imports: ["Card", "CardContent", "CardTitle"],
      body: `
<Card className="flex max-w-[576px] flex-row">
  <img alt="" className="h-auto w-[200px] object-cover" src="${figmaCardAssets.horizontalImage}" />
  <div className="flex flex-1 flex-col justify-between px-5 py-5">
    <CardContent className="gap-[14px] px-0 py-0">
      <CardTitle>Card title</CardTitle>
      <p className="max-w-[259px] text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">${figmaCardBodyCopy}</p>
    </CardContent>
    <p className="text-[14px] font-semibold leading-5 tracking-[0.07px] text-[#9ca3af]">${figmaCardMeta}</p>
  </div>
</Card>`
    }),
    layout: "start",
    preview: <FigmaHorizontalPreview />
  },
  {
    id: "card-alert",
    title: "Alert",
    description: "Header slot plus alert strip plus body content, kept as one stacked card surface.",
    controlSummary: "header label, inline alert strip, body copy",
    code: createDemoCode({
      demoName: "CardAlertDemo",
      extraImports: ['import { ArrowRight, Check } from "lucide-react"'],
      imports: ["Alert", "AlertDescription", "AlertTitle", "Button", "Card", "CardContent", "CardHeader", "CardTitle"],
      body: `
<Card className="max-w-[371px]">
  <CardHeader className="border-b-0 bg-white">
    <p className="text-[14px] font-medium leading-5 tracking-[0.07px] text-[#6b7280]">Featured</p>
  </CardHeader>
  <div className="border-y border-[#e5e7eb] bg-[#f8fafc] px-4 py-4">
    <Alert
      className="border-none bg-transparent px-0 py-0 shadow-none"
      lead={
        <div className="flex size-9 items-center justify-center rounded-full border-[5px] border-[#d1d5db] bg-[#f3f4f6]">
          <Check className="size-5 text-[#1f2937]" />
        </div>
      }
    >
      <AlertTitle>Attention needed!</AlertTitle>
      <AlertDescription>
        <p>This is an alert box.</p>
      </AlertDescription>
    </Alert>
  </div>
  <CardContent className="gap-[10px]">
    <CardTitle>Card title</CardTitle>
    <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">
      With supporting text below as a natural lead-in to additional content.
    </p>
    <Button tone="blue" trailing={<ArrowRight className="size-4" />} variant="link">
      Card link
    </Button>
  </CardContent>
</Card>`
    }),
    layout: "start",
    preview: <FigmaAlertPreview />
  },
  {
    id: "card-centered-body",
    title: "Centered body content",
    description: "Centered title, copy, and CTA link inside the body slot.",
    controlSummary: "centered body slot, centered copy, inline link",
    code: createDemoCode({
      demoName: "CardCenteredBodyDemo",
      extraImports: ['import { ArrowRight } from "lucide-react"'],
      imports: ["Button", "Card", "CardContent", "CardTitle"],
      body: `
<Card className="max-w-[371px]">
  <CardContent className="items-center text-center">
    <CardTitle>Card title</CardTitle>
    <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">
      With supporting text below as a natural lead-in to additional content.
    </p>
    <Button tone="blue" trailing={<ArrowRight className="size-4" />} variant="link">
      Card link
    </Button>
  </CardContent>
</Card>`
    }),
    layout: "start",
    preview: <FigmaCenteredPreview />
  },
  {
    id: "card-empty-state",
    title: "Empty state",
    description: "Minimal empty-state card with centered icon and label.",
    controlSummary: "220px body height, centered icon, empty label",
    code: createDemoCode({
      demoName: "CardEmptyStateDemo",
      extraImports: ['import { HardDrive } from "lucide-react"'],
      imports: ["Card", "CardContent"],
      body: `
<Card className="max-w-[371px]">
  <CardContent className="h-[220px] items-center justify-center text-center">
    <HardDrive className="size-12 stroke-[1.5] text-[#475569]" />
    <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">No data to show</p>
  </CardContent>
</Card>`
    }),
    layout: "start",
    preview: <FigmaEmptyStatePreview />
  }
];

const figmaCardVariationGroups: VariationNavGroup[] = [
  {
    label: "Main component",
    items: [
      {
        label: "_card",
        items: [{ id: "card-main-component", label: "Main component anatomy" }]
      }
    ]
  },
  {
    label: "Sample components",
    items: [
      { id: "card-agency-demo", label: "Agency demo" },
      { id: "card-heading", label: "Heading" },
      { id: "card-scrollable-body", label: "Scrollable body" },
      { id: "card-cms-demo", label: "CMS demo" },
      { id: "card-navigation", label: "Navigation" },
      { id: "card-footer-meta", label: "Footer meta strip" },
      { id: "card-image", label: "Image" },
      { id: "card-image-inside-body", label: "Image inside body content" },
      { id: "card-button-and-link", label: "Button and link" },
      { id: "card-group", label: "Group" },
      { id: "card-alert", label: "Alert" },
      { id: "card-centered-body", label: "Centered body content" },
      { id: "card-empty-state", label: "Empty state" }
    ]
  },
  {
    label: "Frame exceptions",
    items: [
      { id: "card-overlay", label: "Overlay" },
      { id: "card-horizontal", label: "Horizontal" }
    ]
  }
];

export const cardDocFigma: ComponentDoc = {
  ...componentCatalogBySlug.card,
  whenToUse: [
    "Use cards to group related metadata, actions, and summaries into one scannable surface.",
    "This docs pass rebuilds the Card detail page from per-node Figma extraction, preserving Main component slots, instance overrides, and frame-based exceptions separately."
  ],
  importCode: `import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
  Navs,
  NavsLink
} from "@blackstarzck/ui";
import { ArrowRight, Check, HardDrive } from "lucide-react";`,
  variationGroups: figmaCardVariationGroups,
  variations: figmaCardVariations,
  api: [
    {
      name: "children",
      type: "ReactNode",
      defaultValue: "required",
      description: "Compose CardHeader, CardContent, and CardFooter as needed."
    }
  ],
  tokens: [
    { name: "card", usage: "Primary surface background." },
    { name: "border", usage: "Card outline color." },
    { name: "muted", usage: "Header and footer slot background." }
  ],
  accessibility: [
    "Keep headings explicit so cards are understandable without relying on surrounding prose.",
    "Do not hide essential actions inside cards without keyboard-reachable focus states."
  ]
};

