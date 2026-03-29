import { Box } from '@mantine/core';
import {
  authContent,
  authGlowBottom,
  authGlowTop,
  authGrid,
  authScreen
} from '../pages/Auth/AuthLayout.css';

/**
 * Render content within a "splash screen" container.
 */
export default function SplashScreen({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box className={authScreen}>
      <div className={authGlowTop} />
      <div className={authGlowBottom} />
      <div className={authGrid} />
      <div className={authContent}>{children}</div>
    </Box>
  );
}
