import { Box } from '@mantine/core';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { generateUrl } from '../functions/urls';
import {
  authContent,
  authGlowBottom,
  authGlowTop,
  authGrid,
  authScreen
} from '../pages/Auth/AuthLayout.css';
import { useServerApiState } from '../states/ServerApiState';

/**
 * Render content within a "splash screen" container.
 */
export default function SplashScreen({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [server, fetchServerApiState] = useServerApiState(
    useShallow((state) => [state.server, state.fetchServerApiState])
  );

  // Fetch server data on mount if no server data is present
  useEffect(() => {
    if (server.server === null) {
      fetchServerApiState();
    }
  }, [fetchServerApiState, server.server]);

  const splashUrl = server.customize?.splash
    ? generateUrl(server.customize.splash)
    : null;

  return (
    <Box
      className={authScreen}
      style={
        splashUrl
          ? {
              backgroundImage: `url("${splashUrl}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }
          : undefined
      }
    >
      <div className={authGlowTop} />
      <div className={authGlowBottom} />
      <div className={authGrid} />
      <div className={authContent}>{children}</div>
    </Box>
  );
}
