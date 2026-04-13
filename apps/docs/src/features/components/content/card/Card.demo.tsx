import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle
} from "@blackstarzck/ui";

import { createDemoCode } from "../../component-doc-helpers";
import type { ComponentExampleDoc, VariationNavGroup } from "../../component-doc-types";

const cardAssets = {
  groupCenter: "/figma/card/group-center.png",
  groupLeft: "/figma/card/group-left.png",
  groupRight: "/figma/card/group-right.png",
  horizontalImage: "/figma/card/horizontal-image.png",
  imageInsideBody: "/figma/card/image-inside-body.png",
  mainComponentImage: "/figma/card/main-component-image.png",
  overlayImage: "/figma/card/overlay-image.png"
} as const;

const cardBodyCopy =
  "Some quick example text to build on the card title and make up the bulk of the card's content.";
const footerMeta = "Last updated 5 mins ago";

const groupedCards = [
  {
    body: "Mailchimp keeps lifecycle campaigns, audience growth, and CRM sync in one reusable card shell.",
    image: cardAssets.groupLeft,
    title: "Audience growth"
  },
  {
    body: "Shopify focuses on merchandising and conversion details without changing the outer card anatomy.",
    image: cardAssets.groupCenter,
    title: "Storefront conversion"
  },
  {
    body: "GitLab emphasizes delivery metrics while preserving the same grouped border treatment.",
    image: cardAssets.groupRight,
    title: "Release operations"
  }
] as const;

function CardActionLink({ label = "Card link" }: { label?: string }) {
  return (
    <Button
      variant="link"
      tone="blue"
      trailing={<ArrowRight className="size-4" />}
    >
      {label}
    </Button>
  );
}

function PreviewWidth({ children, className = "max-w-[371px]" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

function BasicCardDemo() {
  return (
    <PreviewWidth>
      <Card title="Card title">
        <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">
          {cardBodyCopy}
        </p>
      </Card>
    </PreviewWidth>
  );
}

function MainAnatomyCardDemo() {
  return (
    <PreviewWidth className="max-w-[570px]">
      <Card
        header="Card header title"
        cover={
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={cardAssets.mainComponentImage}
          />
        }
        title="Card title"
        subtitle="CARD SUBTITLE"
        footer={footerMeta}
        actions={
          <>
            <Button>Go somewhere</Button>
            <CardActionLink />
          </>
        }
      >
        <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">
          {cardBodyCopy}
        </p>
      </Card>
    </PreviewWidth>
  );
}

function HeaderExtraCardDemo() {
  return (
    <PreviewWidth>
      <Card
        header={<span className="text-sm font-medium text-muted-foreground">Featured</span>}
        extra={<CardActionLink label="More" />}
        title="Card title"
        subtitle="CARD SUBTITLE"
      >
        <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">
          {cardBodyCopy}
        </p>
      </Card>
    </PreviewWidth>
  );
}

function CenteredCardDemo() {
  return (
    <PreviewWidth>
      <Card
        align="center"
        title="Card title"
        actions={<CardActionLink />}
      >
        <p className="max-w-[260px] text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">
          With supporting text below as a natural lead-in to additional content.
        </p>
      </Card>
    </PreviewWidth>
  );
}

function ImageInsideBodyCardDemo() {
  return (
    <PreviewWidth>
      <Card title="Card title" subtitle="CARD SUBTITLE" footer={footerMeta}>
        <img
          alt=""
          className="h-[200px] w-full rounded-[12px] object-cover"
          src={cardAssets.imageInsideBody}
        />
        <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">
          {cardBodyCopy}
        </p>
      </Card>
    </PreviewWidth>
  );
}

function GroupedCardsDemo() {
  return (
    <div className="grid max-w-[1128px] grid-cols-1 gap-4 md:grid-cols-3 md:gap-0">
      {groupedCards.map((item, index) => (
        <Card
          key={item.title}
          className={[
            "shadow-none",
            index > 0 ? "md:-ml-px" : "",
            index === 0 ? "md:rounded-r-none" : "",
            index === 1 ? "md:rounded-none" : "",
            index === groupedCards.length - 1 ? "md:rounded-l-none" : ""
          ]
            .filter(Boolean)
            .join(" ")}
          cover={
            <img
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              src={item.image}
            />
          }
          title={item.title}
          subtitle="CASE STUDY"
          footer={footerMeta}
          actions={<CardActionLink />}
        >
          <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">
            {item.body}
          </p>
        </Card>
      ))}
    </div>
  );
}

function HorizontalCardDemo() {
  return (
    <PreviewWidth className="max-w-[576px]">
      <Card className="flex flex-col md:flex-row">
        <img
          alt=""
          className="h-[200px] w-full object-cover md:h-auto md:w-[200px]"
          src={cardAssets.horizontalImage}
        />
        <div className="flex flex-1 flex-col justify-between">
          <CardContent className="gap-[14px]">
            <CardTitle>Card title</CardTitle>
            <p className="max-w-[259px] text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">
              {cardBodyCopy}
            </p>
          </CardContent>
          <CardFooter className="border-t-0 bg-transparent pt-0">{footerMeta}</CardFooter>
        </div>
      </Card>
    </PreviewWidth>
  );
}

function OverlayCardDemo() {
  return (
    <PreviewWidth className="max-w-[576px]">
      <Card className="relative border-none bg-slate-950 text-white">
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          src={cardAssets.overlayImage}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
        <CardContent className="relative min-h-[340px] justify-end gap-3">
          <div className="space-y-1">
            <CardTitle className="text-white">Card title</CardTitle>
            <CardDescription className="text-slate-200">CARD SUBTITLE</CardDescription>
          </div>
          <p className="max-w-[360px] text-[16px] font-medium leading-6 tracking-[0.08px] text-slate-100">
            {cardBodyCopy}
          </p>
          <p className="text-sm font-medium tracking-[0.07px] text-slate-200">{footerMeta}</p>
        </CardContent>
      </Card>
    </PreviewWidth>
  );
}

export const cardExampleGroups: VariationNavGroup[] = [
  {
    label: "Structured props",
    items: [
      { id: "card-basic", label: "Basic" },
      { id: "card-main-anatomy", label: "Main anatomy" },
      { id: "card-header-extra", label: "Header + extra" },
      { id: "card-centered", label: "Centered content" },
      { id: "card-image-inside-body", label: "Image inside body" }
    ]
  },
  {
    label: "Pattern compositions",
    items: [{ id: "card-grouped", label: "Grouped cards" }]
  },
  {
    label: "Frame exceptions",
    items: [
      { id: "card-horizontal", label: "Horizontal" },
      { id: "card-overlay", label: "Overlay" }
    ]
  }
];

export const cardExamples: ComponentExampleDoc[] = [
  {
    id: "card-basic",
    title: "Basic",
    description: "Minimal body-only card using the structured runtime props.",
    controlSummary: "title + body",
    layout: "start",
    component: <BasicCardDemo />,
    code: createDemoCode({
      demoName: "BasicCardDemo",
      imports: ["Card"],
      body: `
<Card title="Card title">
  <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">
    ${cardBodyCopy}
  </p>
</Card>`
    })
  },
  {
    id: "card-main-anatomy",
    title: "Main anatomy",
    description: "Header, cover, title, subtitle, actions, and footer all driven by the new runtime API.",
    controlSummary: "header + cover + title + subtitle + actions + footer",
    layout: "start",
    component: <MainAnatomyCardDemo />,
    code: createDemoCode({
      demoName: "MainAnatomyCardDemo",
      extraImports: ['import { ArrowRight } from "lucide-react"'],
      imports: ["Button", "Card"],
      body: `
<Card
  header="Card header title"
  cover={
    <img
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
      src="${cardAssets.mainComponentImage}"
    />
  }
  title="Card title"
  subtitle="CARD SUBTITLE"
  footer="${footerMeta}"
  actions={
    <>
      <Button>Go somewhere</Button>
      <Button variant="link" tone="blue" trailing={<ArrowRight className="size-4" />}>
        Card link
      </Button>
    </>
  }
>
  <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">
    ${cardBodyCopy}
  </p>
</Card>`
    })
  },
  {
    id: "card-header-extra",
    title: "Header + extra",
    description: "Header slot plus a trailing header action to keep docs code close to AntD usage.",
    controlSummary: "header + extra + title + subtitle",
    layout: "start",
    component: <HeaderExtraCardDemo />,
    code: createDemoCode({
      demoName: "HeaderExtraCardDemo",
      extraImports: ['import { ArrowRight } from "lucide-react"'],
      imports: ["Button", "Card"],
      body: `
<Card
  header={<span className="text-sm font-medium text-muted-foreground">Featured</span>}
  extra={
    <Button variant="link" tone="blue" trailing={<ArrowRight className="size-4" />}>
      More
    </Button>
  }
  title="Card title"
  subtitle="CARD SUBTITLE"
>
  <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">
    ${cardBodyCopy}
  </p>
</Card>`
    })
  },
  {
    id: "card-centered",
    title: "Centered content",
    description: "Centered-body instance mapped into a small layout prop instead of a separate component.",
    controlSummary: "align=center + title + actions",
    layout: "start",
    component: <CenteredCardDemo />,
    code: createDemoCode({
      demoName: "CenteredCardDemo",
      extraImports: ['import { ArrowRight } from "lucide-react"'],
      imports: ["Button", "Card"],
      body: `
<Card
  align="center"
  title="Card title"
  actions={
    <Button variant="link" tone="blue" trailing={<ArrowRight className="size-4" />}>
      Card link
    </Button>
  }
>
  <p className="max-w-[260px] text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">
    With supporting text below as a natural lead-in to additional content.
  </p>
</Card>`
    })
  },
  {
    id: "card-image-inside-body",
    title: "Image inside body",
    description: "Media moved into body content while keeping the shell props and footer prop intact.",
    controlSummary: "title + subtitle + body image + footer",
    layout: "start",
    component: <ImageInsideBodyCardDemo />,
    code: createDemoCode({
      demoName: "ImageInsideBodyCardDemo",
      imports: ["Card"],
      body: `
<Card title="Card title" subtitle="CARD SUBTITLE" footer="${footerMeta}">
  <img
    alt=""
    className="h-[200px] w-full rounded-[12px] object-cover"
    src="${cardAssets.imageInsideBody}"
  />
  <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">
    ${cardBodyCopy}
  </p>
</Card>`
    })
  },
  {
    id: "card-grouped",
    title: "Grouped cards",
    description: "Three adjacent cards share borders without promoting grouped layout into the root API.",
    controlSummary: "mapped data + grouped border treatment",
    layout: "start",
    component: <GroupedCardsDemo />,
    code: createDemoCode({
      demoName: "GroupedCardsDemo",
      extraImports: ['import { ArrowRight } from "lucide-react"'],
      imports: ["Button", "Card"],
      setup: `
const cards = [
  {
    title: "Audience growth",
    image: "${cardAssets.groupLeft}",
    body: "Mailchimp keeps lifecycle campaigns, audience growth, and CRM sync in one reusable card shell."
  },
  {
    title: "Storefront conversion",
    image: "${cardAssets.groupCenter}",
    body: "Shopify focuses on merchandising and conversion details without changing the outer card anatomy."
  },
  {
    title: "Release operations",
    image: "${cardAssets.groupRight}",
    body: "GitLab emphasizes delivery metrics while preserving the same grouped border treatment."
  }
]
      `,
      body: `
<div className="grid max-w-[1128px] grid-cols-1 gap-4 md:grid-cols-3 md:gap-0">
  {cards.map((item, index) => (
    <Card
      key={item.title}
      className={[
        "shadow-none",
        index > 0 ? "md:-ml-px" : "",
        index === 0 ? "md:rounded-r-none" : "",
        index === 1 ? "md:rounded-none" : "",
        index === cards.length - 1 ? "md:rounded-l-none" : ""
      ].filter(Boolean).join(" ")}
      cover={
        <img alt="" className="absolute inset-0 h-full w-full object-cover" src={item.image} />
      }
      title={item.title}
      subtitle="CASE STUDY"
      footer="${footerMeta}"
      actions={
        <Button variant="link" tone="blue" trailing={<ArrowRight className="size-4" />}>
          Card link
        </Button>
      }
    >
      <p className="text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">
        {item.body}
      </p>
    </Card>
  ))}
</div>`
    })
  },
  {
    id: "card-horizontal",
    title: "Horizontal",
    description: "Frame exception implemented with explicit composition instead of stretching the root API.",
    controlSummary: "manual composition + horizontal media rail",
    layout: "start",
    component: <HorizontalCardDemo />,
    code: createDemoCode({
      demoName: "HorizontalCardDemo",
      imports: ["Card", "CardContent", "CardFooter", "CardTitle"],
      body: `
<Card className="flex flex-col md:flex-row">
  <img
    alt=""
    className="h-[200px] w-full object-cover md:h-auto md:w-[200px]"
    src="${cardAssets.horizontalImage}"
  />
  <div className="flex flex-1 flex-col justify-between">
    <CardContent className="gap-[14px]">
      <CardTitle>Card title</CardTitle>
      <p className="max-w-[259px] text-[16px] font-medium leading-6 tracking-[0.08px] text-muted-foreground">
        ${cardBodyCopy}
      </p>
    </CardContent>
    <CardFooter className="border-t-0 bg-transparent pt-0">${footerMeta}</CardFooter>
  </div>
</Card>`
    })
  },
  {
    id: "card-overlay",
    title: "Overlay",
    description: "Frame exception with image and content layered manually for the marketing-style showcase card.",
    controlSummary: "manual composition + overlay image + gradient scrim",
    layout: "start",
    component: <OverlayCardDemo />,
    code: createDemoCode({
      demoName: "OverlayCardDemo",
      imports: ["Card", "CardContent", "CardDescription", "CardTitle"],
      body: `
<Card className="relative border-none bg-slate-950 text-white">
  <img
    alt=""
    className="absolute inset-0 h-full w-full object-cover"
    src="${cardAssets.overlayImage}"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent" />
  <CardContent className="relative min-h-[340px] justify-end gap-3">
    <div className="space-y-1">
      <CardTitle className="text-white">Card title</CardTitle>
      <CardDescription className="text-slate-200">CARD SUBTITLE</CardDescription>
    </div>
    <p className="max-w-[360px] text-[16px] font-medium leading-6 tracking-[0.08px] text-slate-100">
      ${cardBodyCopy}
    </p>
    <p className="text-sm font-medium tracking-[0.07px] text-slate-200">${footerMeta}</p>
  </CardContent>
</Card>`
    })
  }
];
