import {
  type MantineSize,
  Text,
  useMantineColorScheme,
  useMantineTheme
} from '@mantine/core';
import { useMemo } from 'react';
import type { JSX } from 'react';

export function StylishText({
  children,
  size
}: Readonly<{
  children: JSX.Element | string;
  size?: MantineSize;
}>) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const color = useMemo(() => {
    const palette = theme.colors[theme.primaryColor] ?? theme.colors.gray;
    return palette[colorScheme === 'dark' ? 2 : 8];
  }, [theme, colorScheme]);

  return (
    <Text
      fw={700}
      size={size ?? 'xl'}
      style={{
        color,
        letterSpacing: '-0.02em',
        lineHeight: 1.2
      }}
    >
      {children}
    </Text>
  );
}
