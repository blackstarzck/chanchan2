import { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";

import { ThemeRoot, TooltipProvider } from "@blackstarzck/ui";
import { App as AntdApp, ConfigProvider } from "antd";

import { AppRouter } from "./app/router";
import { buildDocsAntdTheme } from "./features/theme/antd-theme";
import { DocsThemeProvider, useDocsTheme } from "./features/theme/docs-theme";

function ThemedApp() {
  const { activeTheme, themeStyle } = useDocsTheme();
  const antdTheme = useMemo(() => buildDocsAntdTheme(activeTheme), [activeTheme]);

  return (
    <ConfigProvider theme={antdTheme}>
      <AntdApp>
        <ThemeRoot
          theme={activeTheme}
          style={themeStyle}
          className="min-h-screen bg-background text-foreground"
          data-docs-shell-root=""
          data-docs-theme={activeTheme}
        >
          <TooltipProvider>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </TooltipProvider>
        </ThemeRoot>
      </AntdApp>
    </ConfigProvider>
  );
}

export default function App() {
  return (
    <DocsThemeProvider>
      <ThemedApp />
    </DocsThemeProvider>
  );
}
