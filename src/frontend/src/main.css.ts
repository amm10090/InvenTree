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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomColor: 'rgba(148, 163, 184, 0.24)'
  },
  [vars.darkSelector]: {
    backgroundColor: 'rgba(24, 24, 27, 0.78)',
    borderBottomColor: 'rgba(148, 163, 184, 0.14)'
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
    backgroundColor: 'rgba(248, 250, 252, 0.96)',
    borderColor: 'rgba(148, 163, 184, 0.34)'
  },
  [vars.darkSelector]: {
    backgroundColor: 'rgba(39, 39, 42, 0.68)',
    borderColor: 'rgba(148, 163, 184, 0.22)'
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
    color: vars.colors.gray[7]
  },
  [vars.darkSelector]: {
    color: vars.colors.dark[0]
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
    color: vars.colors.black,
    backgroundColor: 'rgba(255, 255, 255, 0.96)'
  },
  [vars.darkSelector]: {
    color: vars.colors.dark[0],
    backgroundColor: 'rgba(39, 39, 42, 0.72)'
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
    backgroundColor: 'rgba(248, 250, 252, 0.96)',
    borderColor: 'rgba(148, 163, 184, 0.34)'
  },
  [vars.darkSelector]: {
    backgroundColor: 'rgba(39, 39, 42, 0.68)',
    borderColor: 'rgba(148, 163, 184, 0.22)'
  }
});

export const tab = style({
  fontWeight: 700,
  height: rem(36),
  borderRadius: rem(10),
  letterSpacing: '0.01em',
  transition: 'all 140ms ease',
  [vars.lightSelector]: {
    color: '#18181b',
    ':hover': { backgroundColor: 'rgba(226, 232, 240, 0.9)' }
  },
  [vars.darkSelector]: {
    color: '#e4e4e7',
    ':hover': { backgroundColor: 'rgba(63, 63, 70, 0.9)' }
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
  backgroundColor: 'rgba(148, 163, 184, 0.18)'
});

globalStyle(`${layoutHeaderRight} .mantine-ActionIcon-root`, {
  borderRadius: rem(10),
  width: rem(34),
  height: rem(34),
  transition: 'background-color 120ms ease, transform 120ms ease',
  color: '#3f3f46 !important'
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
  color: '#fafafa !important',
  backgroundColor: '#27272a !important',
  boxShadow: '0 8px 20px rgba(24, 24, 27, 0.24) !important'
});

globalStyle(`[data-mantine-color-scheme='dark'] ${tab}[data-active]`, {
  color: '#18181b !important',
  backgroundColor: '#f59e0b !important',
  boxShadow: '0 8px 20px rgba(245, 158, 11, 0.28) !important'
});

globalStyle(`${layoutHeaderRight} .mantine-ActionIcon-root`, {
  color: '#3f3f46'
});

globalStyle(
  `[data-mantine-color-scheme='dark'] ${layoutHeaderRight} .mantine-ActionIcon-root`,
  {
    color: '#e4e4e7 !important'
  }
);
