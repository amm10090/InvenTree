import { rem } from '@mantine/core';
import { globalStyle, style } from '@vanilla-extract/css';

import { vars } from './theme';

export const layoutHeader = style({
  marginBottom: rem(14),
  borderBottom: `${rem(1)} solid var(--ui-border)`,
  backgroundColor: 'color-mix(in srgb, var(--ui-page-raised) 94%, transparent)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'var(--ui-shadow-sm)',
  transition: 'background-color 160ms ease, border-color 160ms ease'
});

export const layoutFooter = style({
  marginTop: 10,
  borderTop: '1px solid var(--ui-border)'
});

export const layoutHeaderSection = style({
  paddingTop: rem(12),
  paddingBottom: rem(12)
});

export const layoutHeaderRow = style({
  minHeight: rem(52),
  gap: rem(16)
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
  border: `${rem(1)} solid var(--ui-border)`,
  padding: `${rem(4)} ${rem(8)}`,
  backgroundColor: 'color-mix(in srgb, var(--ui-surface) 96%, transparent)',
  boxShadow: 'var(--ui-shadow-sm)'
});

export const layoutHeaderNavbarMessage = style({
  maxWidth: '28vw',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: vars.fontSizes.sm,
  fontWeight: 500,
  color: 'var(--ui-text-muted)',
  '@media': {
    [vars.smallerThan('lg')]: {
      display: 'none'
    }
  }
});

export const layoutHeaderNavButton = style({
  borderRadius: rem(14),
  padding: rem(4),
  transition: 'background-color 120ms ease'
});

export const layoutHeaderUser = style({
  padding: `${rem(6)} ${rem(12)}`,
  borderRadius: rem(999),
  color: 'var(--ui-text-strong)',
  backgroundColor: 'var(--ui-page-raised)',
  border: `${rem(1)} solid var(--ui-border)`,
  transition: 'background-color 120ms ease, color 120ms ease',
  '@media': {
    [vars.smallerThan('xs')]: {
      display: 'none'
    }
  }
});

export const headerDropdownFooter = style({
  margin: `calc(${vars.spacing.md} * -1)`,
  marginTop: vars.spacing.sm,
  padding: `${vars.spacing.md} calc(${vars.spacing.md} * 2)`,
  paddingBottom: vars.spacing.xl,
  backgroundColor: 'var(--ui-surface-muted)',
  borderTop: '1px solid var(--ui-border)'
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
  color: 'var(--ui-text)',
  '@media': {
    [vars.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%'
    }
  },
  ':hover': {
    backgroundColor: 'var(--ui-surface-muted)'
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
  '@media': {
    [vars.smallerThan('sm')]: {
      display: 'none'
    }
  }
});

export const tabsList = style({
  borderBottom: '0 !important',
  gap: rem(4),
  borderRadius: rem(16),
  border: `${rem(1)} solid var(--ui-border)`,
  padding: rem(4),
  backgroundColor: 'var(--ui-page-raised)',
  boxShadow: 'var(--ui-shadow-sm)'
});

export const tab = style({
  fontWeight: 700,
  height: rem(36),
  borderRadius: rem(12),
  letterSpacing: '0.01em',
  color: 'var(--ui-text)',
  transition: 'background-color 140ms ease, color 140ms ease',
  ':hover': {
    backgroundColor: 'var(--ui-surface-muted)'
  }
});

export const error = style({
  backgroundColor: 'var(--ui-surface-muted)',
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
  backgroundColor: 'var(--ui-surface)'
});

export const itemTopBorder = style({
  borderTop: '1px solid var(--ui-border)'
});

export const navigationDrawer = style({
  padding: 0
});

globalStyle(`${layoutHeaderNavButton}:hover`, {
  backgroundColor: 'var(--ui-surface-muted)'
});

globalStyle(`${layoutHeaderRight} .mantine-ActionIcon-root`, {
  borderRadius: rem(10),
  width: rem(34),
  height: rem(34),
  transition: 'background-color 120ms ease, color 120ms ease',
  color: 'var(--ui-text) !important'
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
  borderColor: 'transparent !important',
  color: 'var(--ui-on-accent) !important',
  backgroundColor: 'var(--ui-accent) !important',
  boxShadow: 'var(--ui-shadow-sm)'
});
