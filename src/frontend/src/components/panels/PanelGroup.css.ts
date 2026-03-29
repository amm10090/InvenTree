import { rem } from '@mantine/core';
import { style } from '@vanilla-extract/css';
import { vars } from '../../theme';

export const root = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(220px, 248px) minmax(0, 1fr)',
  gap: rem(18),
  alignItems: 'start',
  '@media': {
    [vars.smallerThan('md')]: {
      gridTemplateColumns: '1fr'
    }
  }
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: rem(8),
  alignSelf: 'stretch',
  padding: rem(14),
  border: '1px solid var(--ui-border)',
  borderRadius: rem(22),
  background: 'var(--ui-surface)',
  boxShadow: 'var(--ui-shadow-md)',
  '@media': {
    [vars.smallerThan('md')]: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    }
  }
});

export const group = style({
  width: '100%'
});

export const groupLabel = style({
  padding: `0 ${rem(10)} ${rem(8)}`,
  fontSize: rem(12),
  fontWeight: 700,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: 'var(--ui-text-muted)'
});

export const groupDivider = style({
  borderColor: 'var(--ui-border)',
  marginBottom: rem(8)
});

export const tab = style({
  width: '100%',
  minHeight: rem(44),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  borderRadius: rem(14),
  color: 'var(--ui-text)',
  padding: `${rem(10)} ${rem(12)}`,
  selectors: {
    '&[data-active]': {
      background: 'var(--ui-accent)',
      color: 'var(--ui-on-accent)',
      boxShadow: 'var(--ui-shadow-sm)'
    },
    '&[data-active]:hover': {
      background: 'var(--ui-accent)'
    }
  },
  '@media': {
    [vars.smallerThan('md')]: {
      width: 'auto',
      flex: '1 1 170px'
    }
  }
});

export const tabSection = style({
  color: 'inherit'
});

export const tabLabel = style({
  fontWeight: 600,
  color: 'inherit'
});

export const tabLink = style({
  display: 'inline-flex',
  width: '100%',
  color: 'inherit',
  textDecoration: 'none'
});

export const toolbar = style({
  display: 'flex',
  alignItems: 'center',
  gap: rem(8),
  marginTop: rem(4),
  paddingTop: rem(8),
  borderTop: '1px solid var(--ui-border)',
  '@media': {
    [vars.smallerThan('md')]: {
      width: '100%'
    }
  }
});

export const collapseButton = style({
  color: 'var(--ui-text-muted)'
});

export const panel = style({
  minWidth: 0,
  minHeight: rem(520),
  padding: rem(22),
  border: '1px solid var(--ui-border)',
  borderRadius: rem(22),
  background: 'var(--ui-surface)',
  boxShadow: 'var(--ui-shadow-md)',
  overflowX: 'auto',
  '@media': {
    [vars.smallerThan('md')]: {
      minHeight: rem(420),
      padding: rem(18)
    }
  }
});

export const panelHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: rem(12),
  flexWrap: 'wrap'
});

export const panelDivider = style({
  borderColor: 'var(--ui-border)'
});
