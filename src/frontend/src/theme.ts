import { createTheme, mergeThemeOverrides, rem } from '@mantine/core';
import { themeToVars } from '@mantine/vanilla-extract';

const appFontFamily =
  '"Noto Sans SC", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';

export const baseThemeOverride = {
  cursorType: 'pointer',
  respectReducedMotion: true,
  primaryColor: 'santasGray',
  colors: {
    santasGray: [
      '#eff1f4',
      '#dde0e7',
      '#c0c8d4',
      '#a7b2c3',
      '#909eb4',
      '#8491a6',
      '#748093',
      '#626c7c',
      '#4f5866',
      '#3c434e'
    ]
  },
  fontFamily: appFontFamily,
  headings: {
    fontFamily: appFontFamily
  },
  components: {
    Input: {
      defaultProps: {
        radius: 'md',
        size: 'md'
      }
    },
    Select: {
      defaultProps: {
        checkIconPosition: 'right',
        maxDropdownHeight: 280,
        withScrollArea: true
      },
      styles: {
        wrapper: {
          minWidth: 0
        },
        input: {
          minHeight: rem(42),
          paddingInlineStart: rem(14),
          paddingInlineEnd: rem(40),
          borderRadius: rem(14),
          border: '1px solid var(--ui-border)',
          backgroundColor: 'var(--ui-surface)',
          color: 'var(--mantine-color-text)',
          boxShadow: 'var(--ui-shadow-sm)',
          transition:
            'border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease'
        },
        section: {
          color: 'var(--mantine-color-dimmed)'
        },
        dropdown: {
          marginTop: rem(6),
          padding: rem(6),
          borderRadius: rem(16),
          border: '1px solid var(--ui-border)',
          backgroundColor: 'var(--ui-surface)',
          boxShadow: 'var(--ui-shadow-md)'
        },
        option: {
          padding: `${rem(10)} ${rem(12)}`,
          borderRadius: rem(10),
          fontWeight: 500,
          transition: 'background-color 120ms ease, color 120ms ease'
        }
      }
    },
    Button: {
      defaultProps: {
        radius: 'md'
      }
    },
    ActionIcon: {
      defaultProps: {
        radius: 'md'
      }
    },
    Paper: {
      defaultProps: {
        radius: 'md'
      }
    },
    Card: {
      defaultProps: {
        radius: 'md'
      }
    },
    Modal: {
      defaultProps: {
        radius: 'md',
        centered: true
      }
    }
  }
} as const;

export const theme = createTheme(baseThemeOverride);
export const createAppTheme = (themeOverride = {}) =>
  createTheme(mergeThemeOverrides(baseThemeOverride, themeOverride));
export const vars = themeToVars(theme);
