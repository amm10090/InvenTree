import { rem } from '@mantine/core';
import { style } from '@vanilla-extract/css';
import { vars } from '../../theme';

export const shell = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: rem(18),
  padding: rem(18),
  borderRadius: rem(22),
  border: '1px solid var(--ui-border)',
  background: 'var(--ui-surface)',
  boxShadow: 'var(--ui-shadow-md)',
  flexWrap: 'wrap'
});

export const content = style({
  minWidth: 0,
  flex: 1
});

export const titleRow = style({
  display: 'flex',
  alignItems: 'center',
  gap: rem(10),
  flexWrap: 'wrap'
});

export const shorthand = style({
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: rem(28),
  padding: `0 ${rem(10)}`,
  borderRadius: rem(999),
  border: '1px solid var(--ui-border)',
  background: 'var(--ui-page-raised)',
  color: 'var(--ui-text-muted)',
  fontSize: rem(13),
  fontWeight: 600
});

export const subtitle = style({
  color: 'var(--ui-text-muted)',
  fontSize: rem(14),
  lineHeight: 1.5
});

export const actions = style({
  flexShrink: 0,
  width: 'fit-content',
  '@media': {
    [vars.smallerThan('md')]: {
      width: '100%'
    }
  }
});

export const segmented = style({
  width: '100%',
  minWidth: rem(320),
  '@media': {
    [vars.smallerThan('md')]: {
      minWidth: 0
    }
  }
});
