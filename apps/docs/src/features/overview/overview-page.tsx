import {
  ApiOutlined,
  AppstoreOutlined,
  ArrowRightOutlined,
  BgColorsOutlined,
  CheckCircleFilled,
  DeploymentUnitOutlined,
  LayoutOutlined,
  ProfileOutlined
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  List,
  Progress,
  Row,
  Space,
  Statistic,
  Steps,
  Tag,
  Typography,
  theme
} from "antd";
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
  const stableCount = componentCatalog.filter((component) => component.status === "stable").length;
  const betaCount = componentCatalog.length - stableCount;
  const docsEntryCount = docsCatalogGroups.reduce((count, group) => count + group.items.length, 0);
  const routeSummary = componentCategories.map((category) =>
    buildCategorySummary(
      category,
      componentCatalog.filter((component) => component.category === category),
      componentCatalog.length
    )
  );

  return (
    <div className="docs-page-shell">
      <Row gutter={[24, 24]}>
        <Col xs={24} xl={15}>
          <Card
            className="docs-overview-hero"
            styles={{ body: { padding: 32 } }}
            style={{
              background: `linear-gradient(135deg, ${token.colorPrimaryBg} 0%, ${token.colorBgContainer} 58%, ${token.colorFillSecondary} 100%)`,
              borderColor: token.colorBorderSecondary
            }}
          >
            <Space direction="vertical" size={24} style={{ width: "100%" }}>
              <Space wrap size={[8, 8]}>
                <Tag color="blue">Docs IA refresh</Tag>
                <Tag color="geekblue">Ant Design composition</Tag>
                <Tag color={betaCount > 0 ? "gold" : "green"}>
                  {betaCount > 0 ? `${betaCount} beta components` : "All stable"}
                </Tag>
              </Space>

              <div>
                <Typography.Title level={1} style={{ marginBottom: 12 }}>
                  Chanchan2 docs redrawn around Ant Design components.
                </Typography.Title>
                <Typography.Paragraph
                  type="secondary"
                  style={{ fontSize: token.fontSizeLG, marginBottom: 0, maxWidth: 760 }}
                >
                  The landing experience now behaves like a documentation hub instead of a single
                  hero canvas. Existing routes and catalog structure stay intact, but the first
                  screen is reorganized with cards, metrics, and entry points that feel closer to
                  Ant Design&apos;s information architecture.
                </Typography.Paragraph>
              </div>

              <Space wrap size={[12, 12]}>
                <Button type="primary" size="large" onClick={() => navigate("/components")}>
                  Browse components
                </Button>
                <Button size="large" onClick={() => navigate("/foundations")}>
                  Open foundations
                </Button>
                <Button type="link" size="large" onClick={() => navigate("/patterns")}>
                  Review patterns
                </Button>
              </Space>

              <Row gutter={[16, 16]}>
                <Col xs={12} md={6}>
                  <Card size="small">
                    <Statistic title="Indexed components" value={componentCatalog.length} />
                  </Card>
                </Col>
                <Col xs={12} md={6}>
                  <Card size="small">
                    <Statistic title="Docs routes" value={docsEntryCount} />
                  </Card>
                </Col>
                <Col xs={12} md={6}>
                  <Card size="small">
                    <Statistic title="Stable" value={stableCount} />
                  </Card>
                </Col>
                <Col xs={12} md={6}>
                  <Card size="small">
                    <Statistic title="Grouped categories" value={componentCategories.length} />
                  </Card>
                </Col>
              </Row>
            </Space>
          </Card>
        </Col>

        <Col xs={24} xl={9}>
          <Space direction="vertical" size={24} style={{ width: "100%" }}>
            <Card title="Current rollout" extra={<Tag color="processing">Step 1</Tag>}>
              <Steps
                current={1}
                direction="vertical"
                items={[
                  {
                    description:
                      "The overview entry screen and the global docs shell were rebuilt with AntD primitives.",
                    title: "Navigation shell"
                  },
                  {
                    description:
                      "Component counts, route density, and rollout status are visible on the first screen.",
                    title: "Catalog visibility"
                  },
                  {
                    description:
                      "Detail pages and variation navigation continue to use the existing route structure.",
                    title: "Detail routes"
                  }
                ]}
                size="small"
              />
            </Card>

            <Card title="What changed" extra={<Tag color="green">Ready for review</Tag>}>
              <List
                dataSource={[
                  "The top-level shell now uses AntD Layout, Menu, Drawer, Segmented, and Switch components.",
                  "The root overview route was reframed as a dashboard-style doc landing with Card, Statistic, Steps, and Progress.",
                  "Existing docs theme tokens are now wired into ConfigProvider so AntD components follow the active docs theme."
                ]}
                renderItem={(item) => (
                  <List.Item style={{ alignItems: "flex-start" }}>
                    <Space align="start">
                      <CheckCircleFilled style={{ color: token.colorSuccess }} />
                      <Typography.Text>{item}</Typography.Text>
                    </Space>
                  </List.Item>
                )}
              />
            </Card>
          </Space>
        </Col>
      </Row>

      <Divider />

      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <div>
          <Typography.Title level={3} style={{ marginBottom: 8 }}>
            Navigate the system
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            The documentation flow has been split back into functional areas. Each area includes a
            direct entry action so the first page works as a real navigation surface.
          </Typography.Paragraph>
        </div>

        <Row gutter={[16, 16]}>
          {docsRoutes.map((route) => (
            <Col key={route.label} xs={24} md={12} xl={6}>
              <Card
                hoverable
                className="docs-route-card"
                actions={[
                  <Button
                    key={`${route.label}-open`}
                    type="link"
                    icon={<ArrowRightOutlined />}
                    iconPosition="end"
                    onClick={() => navigate(route.to)}
                  >
                    Open
                  </Button>
                ]}
              >
                <Space direction="vertical" size={14}>
                  <Tag color="default" bordered={false} style={{ width: "fit-content" }}>
                    {route.icon}
                  </Tag>
                  <Typography.Title level={4} style={{ margin: 0 }}>
                    {route.label}
                  </Typography.Title>
                  <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                    {route.description}
                  </Typography.Paragraph>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Space>

      <Divider />

      <Card title="Catalog coverage" extra={<Tag color="blue">{componentCatalog.length} components indexed</Tag>}>
        <Row gutter={[16, 16]}>
          {routeSummary.map((summary) => (
            <Col key={summary.category} xs={24} md={12} xl={8}>
              <Card size="small" className="docs-category-card">
                <Space direction="vertical" size={14} style={{ width: "100%" }}>
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
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      <Divider />

      <Card title="Docs blueprint" extra={<Tag icon={<ProfileOutlined />}>Info architecture</Tag>}>
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <List
              dataSource={docsCatalogGroups}
              renderItem={(group) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<AppstoreOutlined style={{ color: token.colorPrimary }} />}
                    title={
                      <Space wrap size={[8, 8]}>
                        <Typography.Text strong>{group.label}</Typography.Text>
                        <Tag>{group.items.length}</Tag>
                      </Space>
                    }
                    description={`${group.items.length} docs entries are mapped into the current navigation tree.`}
                  />
                </List.Item>
              )}
            />
          </Col>

          <Col xs={24} lg={12}>
            <Card size="small" bordered={false} style={{ background: token.colorFillSecondary }}>
              <Space direction="vertical" size={12}>
                <Typography.Title level={5} style={{ margin: 0 }}>
                  Why this layout
                </Typography.Title>
                <Typography.Paragraph style={{ marginBottom: 0 }}>
                  The first screen should do more than introduce the brand. It should let people
                  understand scope, status, and where to go next in one pass, so the overview now
                  combines project framing, metrics, section entry points, and catalog density in a
                  single layout.
                </Typography.Paragraph>
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>
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
