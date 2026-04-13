import { useMemo, useState } from "react";

import { getThemeTokens, themeCatalog, themeNames, type ThemeName } from "@blackstarzck/tokens";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Checkbox,
  DatePicker,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Dropzone,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  FileInput,
  Input,
  LegendDot,
  LegendPill,
  ListGroup,
  ListGroupDescription,
  ListGroupItem,
  ListGroupTitle,
  Navbar,
  NavbarActions,
  NavbarBrand,
  NavbarContent,
  NavbarLink,
  NumberField,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PasswordField,
  PinInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Rating,
  RichTextEditor,
  RichTextToolbar,
  RichTextToolbarButton,
  RichTextToolbarGroup,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarList,
  SidebarSection,
  SidebarSectionTitle,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  ThemeRoot,
  Timeline,
  TimelineContent,
  TimelineDescription,
  TimelineIndicator,
  TimelineItem,
  TimelineLine,
  TimelineRail,
  TimelineTime,
  TimelineTitle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  UploadList
} from "@blackstarzck/ui";

const sampleSwatches = [
  "background",
  "foreground",
  "primary",
  "primarySoft",
  "accent",
  "secondary",
  "border",
  "success",
  "destructive"
] as const;

const uploadItems = [
  { id: "1", name: "tokens-default.json", progress: 100, status: "completed" as const, sizeLabel: "18 KB" },
  { id: "2", name: "ui-bundle.tgz", progress: 72, status: "uploading" as const, sizeLabel: "1.8 MB" },
  { id: "3", name: "docs-artifacts.zip", progress: 24, status: "queued" as const, sizeLabel: "Queued" }
];

export default function App() {
  const [theme, setTheme] = useState<ThemeName>("default");
  const [plan, setPlan] = useState("starter");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [marketingOptIn, setMarketingOptIn] = useState(true);
  const [channel, setChannel] = useState("email");
  const [menuDensity, setMenuDensity] = useState("comfortable");
  const [seatCount, setSeatCount] = useState(24);
  const [launchDate, setLaunchDate] = useState("2026-04-18");
  const [sliderValue, setSliderValue] = useState([68]);
  const [pin, setPin] = useState("2408");
  const [rating, setRating] = useState(4);
  const [password, setPassword] = useState("LaunchPass!2026");
  const tokens = useMemo(() => getThemeTokens(theme), [theme]);
  const themeInfo = themeCatalog[theme];

  return (
    <ThemeRoot theme={theme} className="min-h-screen">
      <TooltipProvider>
        <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-6 py-8 lg:px-10">
          <Navbar>
            <NavbarBrand>
              <img
                src="/full-logo.png"
                alt="Chanchan2 UI"
                width={95}
                height={76}
                className="block h-[76px] w-[95px]"
              />
            </NavbarBrand>
            <NavbarContent className="justify-center">
              <NavbarLink active href="#overview">
                Overview
              </NavbarLink>
              <NavbarLink href="#forms">Forms</NavbarLink>
              <NavbarLink href="#navigation">Navigation</NavbarLink>
              <NavbarLink href="#composite">Composite Controls</NavbarLink>
            </NavbarContent>
            <NavbarActions>
              <Badge variant="outline">{themeInfo.label}</Badge>
              <Button size="sm">Publish Preview</Button>
            </NavbarActions>
          </Navbar>

          <section
            id="overview"
            className="grid gap-6 rounded-[calc(var(--cc-radius-xl)+6px)] border border-border bg-card p-8 shadow-sm lg:grid-cols-[1.25fr_0.75fr]"
          >
            <div className="space-y-5">
              <Badge variant="outline" className="w-fit">
                roadmap implementation completed
              </Badge>
              <div className="space-y-3">
                <h2 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
                  The Figma pages are now translated into token-driven React primitives.
                </h2>
                <p className="max-w-3xl text-base text-muted-foreground sm:text-lg">
                  This docs app shows the library pieces you can publish as npm packages: form
                  controls, overlays, navigation, utilities, and the first composite controls built
                  on top of the same semantic tokens.
                </p>
              </div>
            </div>

            <div className="grid gap-4 rounded-xl border border-border bg-secondary/40 p-5">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current theme</p>
                <h3 className="mt-2 text-2xl font-semibold">{themeInfo.label}</h3>
                <p className="text-sm text-muted-foreground">
                  Family: {themeInfo.family} / Mode: {themeInfo.mode}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Token values below are generated from the token package rather than hard coded in
                the components.
              </p>
            </div>
          </section>

          <section className="grid gap-4 rounded-[calc(var(--cc-radius-xl)+6px)] border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {themeNames.map((themeName) => (
                <Button
                  key={themeName}
                  variant={themeName === theme ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme(themeName)}
                >
                  {themeCatalog[themeName].label}
                </Button>
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
            <Card>
              <CardHeader>
                <CardTitle>Theme Snapshot</CardTitle>
                <CardDescription>
                  Semantic colors currently active in the selected token theme.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {sampleSwatches.map((tokenName) => (
                  <div
                    key={tokenName}
                    className="grid grid-cols-[72px_1fr_auto] items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3"
                  >
                    <div
                      className="h-11 rounded-md border border-border"
                      style={{ backgroundColor: tokens.colors[tokenName] }}
                    />
                    <div>
                      <p className="text-sm font-medium">{tokenName}</p>
                      <p className="text-xs text-muted-foreground">{tokens.colors[tokenName]}</p>
                    </div>
                    <Badge variant="outline">semantic</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card id="navigation">
              <CardHeader>
                <CardTitle>Navigation Primitives</CardTitle>
                <CardDescription>
                  Sidebar, list group, and breadcrumb patterns translated from the Figma navigation
                  pages.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5">
                <Sidebar className="max-w-none">
                  <SidebarHeader>
                    <p className="text-sm font-medium text-muted-foreground">Workspace</p>
                    <h3 className="text-lg font-semibold">Release Control</h3>
                  </SidebarHeader>
                  <SidebarContent>
                    <SidebarSection>
                      <SidebarSectionTitle>Foundation</SidebarSectionTitle>
                      <SidebarList>
                        <SidebarItem active>Overview</SidebarItem>
                        <SidebarItem>Tokens</SidebarItem>
                        <SidebarItem>Components</SidebarItem>
                      </SidebarList>
                    </SidebarSection>
                    <SidebarSection>
                      <SidebarSectionTitle>Lists</SidebarSectionTitle>
                      <ListGroup>
                        <ListGroupItem active>
                          <div>
                            <ListGroupTitle>Registry setup</ListGroupTitle>
                            <ListGroupDescription>Namespace and metadata</ListGroupDescription>
                          </div>
                          <Badge variant="secondary">Live</Badge>
                        </ListGroupItem>
                        <ListGroupItem>
                          <div>
                            <ListGroupTitle>Release automation</ListGroupTitle>
                            <ListGroupDescription>Changesets and npm publish</ListGroupDescription>
                          </div>
                        </ListGroupItem>
                      </ListGroup>
                    </SidebarSection>
                  </SidebarContent>
                  <SidebarFooter>
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#">System</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Packages</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </SidebarFooter>
                </Sidebar>
              </CardContent>
            </Card>
          </section>

          <section id="forms" className="grid gap-6 xl:grid-cols-[1fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Form Foundations</CardTitle>
                <CardDescription>
                  Input, select, checkbox, radio, switch, textarea, and number primitives.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3 md:grid-cols-2">
                  <Input defaultValue="design-system@blackstarzck.dev" />
                  <Select value={plan} onValueChange={setPlan}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select package tier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Textarea defaultValue="This package now includes the base primitives needed to keep translating your Figma component pages into reusable code." />

                <div className="grid gap-4 md:grid-cols-2">
                  <NumberField value={seatCount} onValueChange={setSeatCount} min={1} max={300} />
                  <DatePicker
                    label="Release date"
                    description="Native date input wrapped with semantic tokens."
                    value={launchDate}
                    onChange={(event) => setLaunchDate(event.target.value)}
                  />
                </div>

                <div className="grid gap-6 rounded-xl border border-border bg-secondary/30 p-5 md:grid-cols-2">
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 text-sm">
                      <Checkbox
                        checked={marketingOptIn}
                        onCheckedChange={(value) => setMarketingOptIn(Boolean(value))}
                      />
                      <span>Include design changelog in release note</span>
                    </label>
                    <label className="flex items-center gap-3 text-sm">
                      <Switch
                        checked={notificationsEnabled}
                        onCheckedChange={setNotificationsEnabled}
                      />
                      <span>Enable publish notifications</span>
                    </label>
                  </div>

                  <RadioGroup value={channel} onValueChange={setChannel} className="gap-4">
                    <label className="flex items-center gap-3 text-sm">
                      <RadioGroupItem value="email" />
                      <span>Email</span>
                    </label>
                    <label className="flex items-center gap-3 text-sm">
                      <RadioGroupItem value="slack" />
                      <span>Slack</span>
                    </label>
                    <label className="flex items-center gap-3 text-sm">
                      <RadioGroupItem value="dashboard" />
                      <span>Dashboard only</span>
                    </label>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Composite Inputs</CardTitle>
                <CardDescription>
                  Password, pin entry, slider, and file flows layered on top of the primitives.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5">
                <PasswordField
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter a strong password"
                />

                <div className="grid gap-2">
                  <p className="text-sm font-medium">PIN Input</p>
                  <PinInput value={pin} onValueChange={setPin} length={6} />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Release readiness</span>
                    <span className="text-muted-foreground">{sliderValue[0]}%</span>
                  </div>
                  <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
                </div>

                <FileInput
                  label="Attach release package"
                  description="Useful for manual smoke test builds before publish."
                />

                <Dropzone title="Drop artifacts here" description="Supports drag and drop uploads for build outputs." />
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Overlays And Menus</CardTitle>
                <CardDescription>
                  Dialog, sheet, dropdown menu, popover, and tooltip surfaces.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Open dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Publish package changes?</DialogTitle>
                      <DialogDescription>
                        Review the generated changeset before pushing a release to npm.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="rounded-lg border border-border bg-secondary/40 p-4 text-sm text-muted-foreground">
                      Tokens, UI components, and docs are versioned independently.
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Review release</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="soft">Open sheet</Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>Theme configuration</SheetTitle>
                      <SheetDescription>
                        Use sheets for inspectors, side panels, and settings surfaces.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-3 py-4">
                      <Input value={themeInfo.label} readOnly />
                      <Textarea
                        readOnly
                        value="This surface is ready to host future token and component configuration tooling."
                      />
                    </div>
                    <SheetFooter>
                      <Button variant="outline">Close</Button>
                      <Button>Save theme</Button>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="secondary">Open popover</Button>
                  </PopoverTrigger>
                  <PopoverContent className="space-y-3">
                    <div className="space-y-1">
                      <p className="font-medium">Quick token note</p>
                      <p className="text-sm text-muted-foreground">
                        Popovers are useful for compact editors and inline controls.
                      </p>
                    </div>
                    <Input value={tokens.colors.primary} readOnly />
                  </PopoverContent>
                </Popover>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Open menu</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      checked={marketingOptIn}
                      onCheckedChange={(value) => setMarketingOptIn(Boolean(value))}
                    >
                      Include design changelog
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Density</DropdownMenuLabel>
                    <DropdownMenuRadioGroup value={menuDensity} onValueChange={setMenuDensity}>
                      <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Release notes
                      <DropdownMenuShortcut>R</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>Tooltip styles are now in the package.</TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>

            <Card id="composite">
              <CardHeader>
                <CardTitle>Rich Text And Carousel</CardTitle>
                <CardDescription>
                  WYSIWYG toolbar primitives and a lightweight carousel pattern for page examples.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5">
                <div className="grid gap-3">
                  <RichTextToolbar>
                    <RichTextToolbarGroup>
                      <RichTextToolbarButton active>B</RichTextToolbarButton>
                      <RichTextToolbarButton>I</RichTextToolbarButton>
                      <RichTextToolbarButton>U</RichTextToolbarButton>
                    </RichTextToolbarGroup>
                    <RichTextToolbarGroup>
                      <RichTextToolbarButton>H1</RichTextToolbarButton>
                      <RichTextToolbarButton>Quote</RichTextToolbarButton>
                      <RichTextToolbarButton>Code</RichTextToolbarButton>
                    </RichTextToolbarGroup>
                  </RichTextToolbar>
                  <RichTextEditor>
                    Publish-ready docs page generated from token-backed primitives. This editor shell
                    can later be wired to a dedicated rich text engine.
                  </RichTextEditor>
                </div>

                <Carousel>
                  <CarouselContent>
                    {["Foundations", "Forms", "Overlays"].map((slideTitle) => (
                      <CarouselItem key={slideTitle}>
                        <div className="rounded-[calc(var(--cc-radius-xl)+4px)] border border-border bg-secondary/30 p-6">
                          <Badge variant="outline">slide</Badge>
                          <h3 className="mt-4 text-2xl font-semibold">{slideTitle}</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Use the carousel primitive for marketing strips, showcase cards, or docs
                            galleries based on the Figma slider page.
                          </p>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle>Feedback, Indicators, And Timeline</CardTitle>
                <CardDescription>
                  Alerts, tabs, spinner, rating, legend indicators, and timeline patterns.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5">
                <Alert>
                  <AlertTitle>Changeset recorded</AlertTitle>
                  <AlertDescription>
                    Your package can now move through versioning and publishing with a recorded
                    release note.
                  </AlertDescription>
                </Alert>

                <Alert variant="success">
                  <AlertTitle>Roadmap aligned</AlertTitle>
                  <AlertDescription>
                    Remaining Figma pages now have matching public components or composed API
                    surfaces in the package.
                  </AlertDescription>
                </Alert>

                <Tabs defaultValue="timeline" className="w-full">
                  <TabsList>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="accordion">Accordion</TabsTrigger>
                    <TabsTrigger value="signals">Signals</TabsTrigger>
                  </TabsList>
                  <TabsContent value="timeline">
                    <Timeline>
                      <TimelineItem>
                        <TimelineRail>
                          <TimelineIndicator />
                          <TimelineLine />
                        </TimelineRail>
                        <TimelineContent>
                          <TimelineTime>Step 1</TimelineTime>
                          <TimelineTitle>Sync tokens</TimelineTitle>
                          <TimelineDescription>
                            Update the token source and regenerate `theme.css` and TypeScript
                            exports.
                          </TimelineDescription>
                        </TimelineContent>
                      </TimelineItem>
                      <TimelineItem>
                        <TimelineRail>
                          <TimelineIndicator className="bg-success" />
                        </TimelineRail>
                        <TimelineContent>
                          <TimelineTime>Step 2</TimelineTime>
                          <TimelineTitle>Publish package</TimelineTitle>
                          <TimelineDescription>
                            Merge changesets to `main` and let the release workflow publish to npm.
                          </TimelineDescription>
                        </TimelineContent>
                      </TimelineItem>
                    </Timeline>
                  </TabsContent>
                  <TabsContent value="accordion">
                    <Accordion type="single" collapsible className="grid gap-3">
                      <AccordionItem value="tokens">
                        <AccordionTrigger>Token sync</AccordionTrigger>
                        <AccordionContent>
                          Update `token-source.json`, then run `npm run tokens:sync`.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="release">
                        <AccordionTrigger>Release flow</AccordionTrigger>
                        <AccordionContent>
                          Changesets prepares the version PR or publish step after merge.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </TabsContent>
                  <TabsContent value="signals">
                    <div className="flex flex-wrap items-center gap-4">
                      <LegendPill tone="default">Primary</LegendPill>
                      <LegendPill tone="success">Healthy</LegendPill>
                      <LegendPill tone="destructive">Blocked</LegendPill>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Spinner size="sm" tone="muted" />
                        Publishing artifacts
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <LegendDot tone="accent" />
                      <span className="text-sm text-muted-foreground">
                        Accent tone can be used for charts and transient states.
                      </span>
                    </div>
                    <div className="mt-4">
                      <p className="mb-2 text-sm font-medium">Package rating</p>
                      <Rating value={rating} onValueChange={setRating} />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Display And Upload Status</CardTitle>
                <CardDescription>
                  Avatar, progress, skeleton, table, and uploading progress patterns.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="flex flex-wrap items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80" />
                    <AvatarFallback>CC</AvatarFallback>
                  </Avatar>
                  <Avatar className="size-12">
                    <AvatarFallback>UI</AvatarFallback>
                  </Avatar>
                  <div className="min-w-64 flex-1 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Release progress</span>
                      <span className="text-muted-foreground">72%</span>
                    </div>
                    <Progress value={72} />
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <Skeleton className="h-20 rounded-xl" />
                  <Skeleton className="h-20 rounded-xl" />
                  <Skeleton className="h-20 rounded-xl" />
                </div>

                <UploadList items={uploadItems} />

                <Table>
                  <TableCaption>Current package roadmap snapshot</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Component</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Source</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Sidebar</TableCell>
                      <TableCell>Implemented</TableCell>
                      <TableCell>Figma navigations</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Dropzone</TableCell>
                      <TableCell>Implemented</TableCell>
                      <TableCell>Figma advanced forms</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Rich text toolbar</TableCell>
                      <TableCell>Implemented</TableCell>
                      <TableCell>Figma WYSIWYG page</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>
        </main>
      </TooltipProvider>
    </ThemeRoot>
  );
}
