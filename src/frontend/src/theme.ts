import { createTheme, mergeThemeOverrides, rem } from '@mantine/core';
import { themeToVars } from '@mantine/vanilla-extract';

const appFontFamily =
  '"Noto Sans SC", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';

export const baseThemeOverride = {
  cursorType: 'pointer',
  respectReducedMotion: true,
  fontFamily: appFontFamily,
  headings: {
    fontFamily: appFontFamily
  },
  components: {
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
          border: '1px solid rgba(148, 163, 184, 0.2)',
          backgroundColor: 'var(--mantine-color-body)',
          color: 'var(--mantine-color-text)',
          boxShadow: '0 1px 2px rgba(15, 23, 42, 0.06)',
          transition:
            'border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease',
          '&:hover': {
            borderColor: 'rgba(148, 163, 184, 0.32)'
          },
          '&:focus, &:focus-within, &[data-expanded]': {
            borderColor: 'var(--mantine-primary-color-filled)',
            boxShadow:
              '0 0 0 3px color-mix(in srgb, var(--mantine-primary-color-filled) 18%, transparent), 0 14px 32px rgba(15, 23, 42, 0.1)'
          }
        },
        section: {
          color: 'var(--mantine-color-dimmed)'
        },
        dropdown: {
          marginTop: rem(6),
          padding: rem(6),
          borderRadius: rem(16),
          border: '1px solid rgba(148, 163, 184, 0.16)',
          backgroundColor: 'var(--mantine-color-body)',
          boxShadow: '0 18px 44px rgba(15, 23, 42, 0.14)'
        },
        option: {
          padding: `${rem(10)} ${rem(12)}`,
          borderRadius: rem(10),
          fontWeight: 500,
          transition: 'background-color 120ms ease, color 120ms ease',
          '&[data-combobox-hovered]': {
            backgroundColor: 'var(--mantine-color-default-hover)',
            color: 'var(--mantine-color-text)'
          },
          '&[data-combobox-selected]': {
            backgroundColor: 'var(--mantine-primary-color-light)',
            color: 'var(--mantine-color-text)',
            fontWeight: 600
          }
        }
      }
    }
  }
} as const;

export const theme = createTheme(baseThemeOverride);
export const createAppTheme = (themeOverride = {}) =>
  createTheme(mergeThemeOverrides(baseThemeOverride, themeOverride));
export const vars = themeToVars(theme);
