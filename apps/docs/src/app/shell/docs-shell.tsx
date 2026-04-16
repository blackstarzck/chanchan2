import {
  AppstoreOutlined,
  BgColorsOutlined,
  MenuOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Grid, Layout, Space } from "antd";
import { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

const primaryNavigation = [
  { icon: <ReadOutlined />, label: "Overview", to: "/overview" },
  { icon: <BgColorsOutlined />, label: "Foundations", to: "/foundations" },
  { icon: <AppstoreOutlined />, label: "Components", to: "/components" },
  { icon: <MenuOutlined rotate={90} />, label: "Patterns", to: "/patterns" }
] as const;

export function DocsShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const screens = Grid.useBreakpoint();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDesktop = screens.md ?? false;
  const selectedNavKey = useMemo(
    () =>
      primaryNavigation.find(
        (item) =>
          location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)
      )?.to ?? "/overview",
    [location.pathname]
  );

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <Layout className="docs-app-layout">
      <Layout.Header className="docs-shell-header">
        <div className="docs-shell-header-inner">
          <div className="docs-shell-brand">
            <img
              src="/horizontal-logo.png"
              alt="Chanchan2 UI"
              width={212}
              height={49}
              style={{ display: "block", height: "auto", width: "min(212px, 100%)" }}
            />
          </div>

          {isDesktop ? (
            <nav className="docs-shell-nav" aria-label="Primary">
              <Space size={8} wrap>
                {primaryNavigation.map((item) => {
                  const isActive = selectedNavKey === item.to;

                  return (
                    <NavLink key={item.to} to={item.to}>
                      <Button
                        type={isActive ? "primary" : "text"}
                        icon={item.icon}
                      >
                        {item.label}
                      </Button>
                    </NavLink>
                  );
                })}
              </Space>
            </nav>
          ) : null}

          {!isDesktop ? (
            <Button
              className="docs-shell-mobile-trigger"
              aria-label="Open docs navigation"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuOpen(true)}
            />
          ) : null}
        </div>
      </Layout.Header>

      <Layout.Content className="docs-shell-content">
        <Outlet />
      </Layout.Content>

      <Drawer
        title="Docs navigation"
        placement="right"
        open={!isDesktop && mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Space direction="vertical" size={12} style={{ width: "100%" }}>
          {primaryNavigation.map((item) => {
            const isActive = selectedNavKey === item.to;

            return (
              <Button
                key={item.to}
                block
                type={isActive ? "primary" : "default"}
                icon={item.icon}
                onClick={() => navigate(item.to)}
              >
                {item.label}
              </Button>
            );
          })}
        </Space>
      </Drawer>
    </Layout>
  );
}
