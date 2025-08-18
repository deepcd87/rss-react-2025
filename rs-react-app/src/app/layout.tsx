import '../styles/globals.css';
import { QueryClientProviderWrapper } from '../components/QueryClientProvider/QueryClientProvider';
import { ThemeProvider } from '../context/ThemeProvider';
import { ThemeManager } from '../components/ThemeManager/ThemeManager';
import HeaderWrapper from '../components/Header/HeaderWrapper';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProviderWrapper>
          <ThemeProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
          </ThemeProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="appContainer">
      <ThemeManager />
      <HeaderWrapper />
      <main role="main">{children}</main>
    </div>
  );
}
