import {
  ApiOutlined,
  AppstoreOutlined,
  ArrowRightOutlined,
  BgColorsOutlined,
  CheckOutlined,
  CopyOutlined,
  DeploymentUnitOutlined,
  GithubOutlined,
  LayoutOutlined,
  ProfileOutlined
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Progress,
  Row,
  Space,
  Tag,
  Typography,
  theme
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { docsCatalogGroups } from "../catalog/docs-page-registry";
import {
  componentCatalog,
  componentCategories,
  type ComponentCatalogItem
} from "../components/registry";

const docsRoutes = [
  {
    description: "Review release tokens, typography, and layout rules before diving into examples.",
    icon: <BgColorsOutlined />,
    label: "Foundations",
    to: "/foundations"
  },
  {
    description: "Browse previews, detailed API notes, and variation-level component docs.",
    icon: <ApiOutlined />,
    label: "Components",
    to: "/components"
  },
  {
    description: "Inspect repeatable combinations and interaction patterns used in real screens.",
    icon: <DeploymentUnitOutlined />,
    label: "Patterns",
    to: "/patterns"
  },
  {
    description: "Organize template and content guidance as page-level documentation entries.",
    icon: <LayoutOutlined />,
    label: "Catalog",
    to: "/templates/cms"
  }
] as const;

export function OverviewPage() {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const routeSummary = componentCategories.map((category) =>
    buildCategorySummary(
      category,
      componentCatalog.filter((component) => component.category === category),
      componentCatalog.length
    )
  );

  return (
    <div className="docs-page-shell">
      <section>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={8}>
            <Card
              title={
                <Space>
                  <ApiOutlined />
                  Install UI package
                </Space>
              }
              className="docs-route-card"
            >
              <Space orientation="vertical" size={14} style={{ width: "100%" }}>
                <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                  Use this package for visible React components such as buttons, cards, forms, and navigation.
                </Typography.Paragraph>
                <CommandBlock
                  command="npm install @blackstarzck/ui @blackstarzck/tokens react react-dom"
                  label="UI package npm install command"
                />
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card
              title={
                <Space>
                  <BgColorsOutlined />
                  Install tokens package
                </Space>
              }
              className="docs-route-card"
            >
              <Space orientation="vertical" size={14} style={{ width: "100%" }}>
                <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                  Use this package for shared colors, radius values, theme names, and design-system metadata.
                </Typography.Paragraph>
                <CommandBlock command="npm install @blackstarzck/tokens" label="Tokens package npm install command" />
              </Space>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card
              title={
                <Space>
                  <GithubOutlined />
                  Git repository
                </Space>
              }
              className="docs-route-card"
            >
              <Space orientation="vertical" size={14} style={{ width: "100%" }}>
                <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                  Review the full source, package READMEs, and workspace history in the GitHub repository.
                </Typography.Paragraph>
                <Typography.Link href="https://github.com/blackstarzck/chanchan2.git" target="_blank">
                  https://github.com/blackstarzck/chanchan2.git
                </Typography.Link>
                <CommandBlock
                  command="git clone https://github.com/blackstarzck/chanchan2.git"
                  label="Git clone command"
                />
              </Space>
            </Card>
          </Col>
        </Row>
      </section>

      <section className="docs-catalog-coverage" aria-labelledby="catalog-coverage-title">
        <div className="docs-catalog-coverage-header">
          <Typography.Title id="catalog-coverage-title" level={3}>
            Catalog coverage
          </Typography.Title>
          <Tag color="blue">{componentCatalog.length} components indexed</Tag>
        </div>

        <Row gutter={[16, 16]}>
          {routeSummary.map((summary) => (
            <Col key={summary.category} xs={24} md={12} xl={8}>
              <Card className="docs-category-card" styles={{ body: { padding: 24 } }}>
                <div className="docs-category-summary">
                  <Space align="baseline" style={{ justifyContent: "space-between", width: "100%" }}>
                    <Typography.Title level={5} style={{ margin: 0 }}>
                      {summary.category}
                    </Typography.Title>
                    <Typography.Text type="secondary">{summary.count} items</Typography.Text>
                  </Space>

                  <Progress percent={summary.coverage} size="small" showInfo={false} />

                  <Space wrap size={[8, 8]}>
                    <Tag color="success">Stable {summary.stableCount}</Tag>
                    {summary.betaCount > 0 ? <Tag color="gold">Beta {summary.betaCount}</Tag> : null}
                  </Space>

                  <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                    {summary.previewText}
                  </Typography.Paragraph>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className="docs-blueprint" aria-labelledby="docs-blueprint-title">
        <div className="docs-blueprint-header">
          <Typography.Title id="docs-blueprint-title" level={3}>
            Docs blueprint
          </Typography.Title>
          <Tag icon={<ProfileOutlined />}>Info architecture</Tag>
        </div>

        <Row gutter={[32, 32]}>
          <Col xs={24} lg={12}>
            <Space orientation="vertical" size={12} style={{ width: "100%" }}>
              {docsCatalogGroups.map((group) => (
                <div className="docs-blueprint-row" key={group.label}>
                  <AppstoreOutlined style={{ color: token.colorPrimary }} />
                  <div>
                    <Space wrap size={[8, 8]}>
                      <Typography.Text strong>{group.label}</Typography.Text>
                      <Tag>{group.items.length}</Tag>
                    </Space>
                    <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                      {group.items.length} docs entries are mapped into the current navigation tree.
                    </Typography.Paragraph>
                  </div>
                </div>
              ))}
            </Space>
          </Col>
        </Row>
      </section>
    </div>
  );
}

function CommandBlock({ command, label }: { command: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copyCommand = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="docs-command-block">
      <code>{command}</code>
      <button
        type="button"
        className="docs-command-copy"
        aria-label={`Copy ${label}`}
        onClick={copyCommand}
      >
        {copied ? <CheckOutlined aria-hidden="true" /> : <CopyOutlined aria-hidden="true" />}
      </button>
    </div>
  );
}

function buildCategorySummary(
  category: string,
  items: ComponentCatalogItem[],
  totalCount: number
) {
  const stableCount = items.filter((item) => item.status === "stable").length;
  const betaCount = items.length - stableCount;
  const coverage = totalCount > 0 ? Math.max(6, Math.round((items.length / totalCount) * 100)) : 0;
  const previewText = items
    .slice(0, 3)
    .map((item) => item.name)
    .join(" / ");

  return {
    betaCount,
    category,
    count: items.length,
    coverage,
    previewText,
    stableCount
  };
}
