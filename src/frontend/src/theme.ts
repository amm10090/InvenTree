import { createTheme, mergeThemeOverrides, rem } from '@mantine/core';
import { themeToVars } from '@mantine/vanilla-extract';

const appFontFamily =
  '"Noto Sans SC", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif';

export const baseThemeOverride = {
  cursorType: 'pointer',
  respectReducedMotion: true,
  primaryColor: 'earth',
  colors: {
    earth: [
      '#f7f4ef',
      '#ede6dc',
      '#ddd2c3',
      '#cab9a4',
      '#b7a08b',
      '#a38a73',
      '#8c745f',
      '#72604e',
      '#5d4f41',
      '#4b4034'
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
    InputWrapper: {
      defaultProps: {
        inputWrapperOrder: ['label', 'description', 'input', 'error']
      }
    },
    Textarea: {
      defaultProps: {
        radius: 'md',
        size: 'md'
      }
    },
    Select: {
      defaultProps: {
        radius: 'md',
        size: 'md',
        comboboxProps: {
          shadow: 'md',
          withinPortal: true
        }
      }
    },
    MultiSelect: {
      defaultProps: {
        radius: 'md',
        size: 'md',
        comboboxProps: {
          shadow: 'md',
          withinPortal: true
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
    SegmentedControl: {
      defaultProps: {
        radius: 'xl'
      }
    },
    Tabs: {
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

export const smallerFont = {
  fontSize: rem(10),
  padding: '3px 6px'
};
