import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {GlobalStyle} from '@/style';
import {RecoilRoot} from 'recoil';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeProvider} from 'styled-components';
import theme from './theme';

function QueryClientProviderMonitor({children}) {
  const prevQueryClientRef = useRef<QueryClient | null>(null);

  useEffect(() => {
    if (prevQueryClientRef.current !== queryClient) {
      prevQueryClientRef.current = queryClient;
    }
  }, []);

  return children;
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <QueryClientProviderMonitor>
          <RecoilRoot>
            <GlobalStyle>
              <App />
            </GlobalStyle>
          </RecoilRoot>
        </QueryClientProviderMonitor>
      </QueryClientProvider>
    </ThemeProvider>,
  </React.StrictMode>
)
