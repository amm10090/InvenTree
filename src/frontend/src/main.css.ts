import { rem } from '@mantine/core';
import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from './theme';

export const layoutHeader = style({
  marginBottom: rem(10),
  borderBottom: `${rem(1)} solid`,
  backdropFilter: 'blur(14px)',
  boxShadow: '0 6px 24px rgba(24, 24, 27, 0.08)',
  transition: 'background-color 160ms ease, border-color 160ms ease',

  [vars.lightSelector]: {
    backgroundColor:
      'color-mix(in srgb, var(--santas-gray-50) 92%, transparent)',
    borderBottomColor:
      'color-mix(in srgb, var(--santas-gray-300) 72%, transparent)'
  },
  [vars.darkSelector]: {
    backgroundColor:
      'color-mix(in srgb, var(--santas-gray-1200) 84%, transparent)',
    borderBottomColor:
      'color-mix(in srgb, var(--santas-gray-900) 72%, transparent)'
  }
});

export const layoutFooter = style({
  marginTop: 10,
  [vars.lightSelector]: { borderTop: `1px solid ${vars.colors.gray[2]}` },
  [vars.darkSelector]: { borderTop: `1px solid ${vars.colors.dark[5]}` }
});

export const layoutHeaderSection = style({
  paddingTop: rem(10),
  paddingBottom: rem(10)
});

export const layoutHeaderRow = style({
  minHeight: rem(48)
});

export const layoutHeaderLeft = style({
  gap: rem(14),
  minWidth: 0,
  flexWrap: 'nowrap'
});

export const layoutHeaderRight = style({
  gap: rem(8),
  flexWrap: 'nowrap',
  borderRadius: rem(999),
  border: `${rem(1)} solid`,
  padding: `${rem(4)} ${rem(8)}`,
  backdropFilter: 'blur(10px)',
  [vars.lightSelector]: {
    backgroundColor:
      'color-mix(in srgb, var(--santas-gray-50) 96%, transparent)',
    borderColor: 'color-mix(in srgb, var(--santas-gray-300) 84%, transparent)'
  },
  [vars.darkSelector]: {
    backgroundColor:
      'color-mix(in srgb, var(--santas-gray-1200) 78%, transparent)',
    borderColor: 'color-mix(in srgb, var(--santas-gray-900) 74%, transparent)'
  }
});

export const layoutHeaderNavbarMessage = style({
  maxWidth: '28vw',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: vars.fontSizes.sm,
  fontWeight: 500,
  [vars.lightSelector]: {
    color: 'var(--santas-gray-900)'
  },
  [vars.darkSelector]: {
    color: 'var(--santas-gray-200)'
  },
  [vars.smallerThan('lg')]: {
    display: 'none'
  }
});

export const layoutHeaderNavButton = style({
  borderRadius: rem(14),
  padding: rem(4),
  transition: 'background-color 120ms ease'
});

export const layoutHeaderUser = style({
  padding: `${rem(6)} ${rem(10)}`,
  borderRadius: rem(999),
  transition: 'background-color 120ms ease, color 120ms ease',

  [vars.lightSelector]: {
    color: 'var(--santas-gray-1200)',
    backgroundColor:
      'color-mix(in srgb, var(--santas-gray-50) 98%, transparent)'
  },
  [vars.darkSelector]: {
    color: 'var(--santas-gray-100)',
    backgroundColor:
      'color-mix(in srgb, var(--santas-gray-1100) 86%, transparent)'
  },

  [vars.smallerThan('xs')]: {
    display: 'none'
  }
});

export const headerDropdownFooter = style({
  margin: `calc(${vars.spacing.md} * -1)`,
  marginTop: vars.spacing.sm,
  padding: `${vars.spacing.md} calc(${vars.spacing.md} * 2)`,
  paddingBottom: vars.spacing.xl,

  [vars.lightSelector]: {
    backgroundColor: vars.colors.gray[0],
    borderTop: `${rem(1)} solid ${vars.colors.gray[1]}`
  },
  [vars.darkSelector]: {
    backgroundColor: vars.colors.dark[7],
    borderTop: `${rem(1)} solid ${vars.colors.dark[5]}`
  }
});

export const link = style({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  paddingLeft: vars.spacing.md,
  paddingRight: vars.spacing.md,
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: vars.fontSizes.sm,

  [vars.lightSelector]: { color: vars.colors.black },
  [vars.darkSelector]: { color: vars.colors.white },

  [vars.smallerThan('sm')]: {
    height: rem(42),
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },

  ':hover': {
    [vars.lightSelector]: { backgroundColor: vars.colors.gray[0] },
    [vars.darkSelector]: { backgroundColor: vars.colors.dark[6] }
  }
});

export const docHover = style({
  border: '1px dashed '
});

export const layoutContent = style({
  flex: 1,
  width: '100%'
});

export const tabs = style({
  minWidth: 0,
  [vars.smallerThan('sm')]: {
    display: 'none'
  }
});

export const tabsList = style({
  borderBottom: '0 !important',
  gap: rem(4),
  borderRadius: rem(14),
  border: `${rem(1)} solid`,
  padding: rem(4),
  [vars.lightSelector]: {
    backgroundColor:
      'color-mix(in srgb, var(--santas-gray-50) 96%, transparent)',
    borderColor: 'color-mix(in srgb, var(--santas-gray-300) 84%, transparent)'
  },
  [vars.darkSelector]: {
    backgroundColor:
      'color-mix(in srgb, var(--santas-gray-1200) 78%, transparent)',
    borderColor: 'color-mix(in srgb, var(--santas-gray-900) 74%, transparent)'
  }
});

export const tab = style({
  fontWeight: 700,
  height: rem(36),
  borderRadius: rem(10),
  letterSpacing: '0.01em',
  transition: 'all 140ms ease',
  [vars.lightSelector]: {
    color: 'var(--santas-gray-1200)',
    ':hover': {
      backgroundColor:
        'color-mix(in srgb, var(--santas-gray-200) 80%, transparent)'
    }
  },
  [vars.darkSelector]: {
    color: 'var(--santas-gray-200)',
    ':hover': {
      backgroundColor:
        'color-mix(in srgb, var(--santas-gray-900) 88%, transparent)'
    }
  }
});

export const error = style({
  backgroundColor: vars.colors.gray[0],
  color: vars.colors.red[6]
});

export const dashboardItemValue = style({
  fontSize: 24,
  fontWeight: 700,
  lineHeight: 1
});

export const dashboardItemTitle = style({
  fontWeight: 700
});

export const card = style({
  [vars.lightSelector]: { backgroundColor: vars.colors.white },
  [vars.darkSelector]: { backgroundColor: vars.colors.dark[7] }
});

export const itemTopBorder = style({
  [vars.lightSelector]: { borderTop: `1px solid ${vars.colors.gray[2]}` },
  [vars.darkSelector]: { borderTop: `1px solid ${vars.colors.dark[4]}` }
});

export const navigationDrawer = style({
  padding: 0
});

globalStyle(`${layoutHeaderNavButton}:hover`, {
  backgroundColor: 'color-mix(in srgb, var(--santas-gray-300) 46%, transparent)'
});

globalStyle(`${layoutHeaderRight} .mantine-ActionIcon-root`, {
  borderRadius: rem(10),
  width: rem(34),
  height: rem(34),
  transition: 'background-color 120ms ease, transform 120ms ease',
  color: 'var(--santas-gray-900) !important'
});

globalStyle(`${layoutHeaderRight} .mantine-ActionIcon-root:hover`, {
  transform: 'translateY(-1px)'
});

globalStyle(
  `${layoutHeaderRight} .mantine-ActionIcon-root[data-variant='transparent']`,
  {
    backgroundColor: 'transparent'
  }
);

globalStyle(`${tabs} .mantine-Tabs-tabLabel`, {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
});

globalStyle(`${tab}[data-active]`, {
  backgroundImage: 'none !important',
  borderColor: 'transparent !important'
});

globalStyle(`[data-mantine-color-scheme='light'] ${tab}[data-active]`, {
  color: 'var(--santas-gray-50) !important',
  backgroundColor: 'var(--santas-gray-900) !important',
  boxShadow:
    '0 8px 20px color-mix(in srgb, var(--santas-gray-1100) 30%, transparent) !important'
});

globalStyle(`[data-mantine-color-scheme='dark'] ${tab}[data-active]`, {
  color: 'var(--santas-gray-50) !important',
  backgroundColor: 'var(--santas-gray-700) !important',
  boxShadow:
    '0 8px 20px color-mix(in srgb, var(--santas-gray-1200) 46%, transparent) !important'
});

globalStyle(`${layoutHeaderRight} .mantine-ActionIcon-root`, {
  color: 'var(--santas-gray-900)'
});

globalStyle(
  `[data-mantine-color-scheme='dark'] ${layoutHeaderRight} .mantine-ActionIcon-root`,
  {
    color: 'var(--santas-gray-200) !important'
  }
);
