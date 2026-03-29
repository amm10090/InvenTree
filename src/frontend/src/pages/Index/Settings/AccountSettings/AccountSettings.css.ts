import { rem } from '@mantine/core';
import { style } from '@vanilla-extract/css';
import { vars } from '../../../../theme';

export const sectionCard = style({
  padding: rem(20),
  borderRadius: rem(22),
  border: '1px solid var(--ui-border)',
  background: 'var(--ui-surface)',
  boxShadow: 'var(--ui-shadow-md)'
});

export const sectionHeader = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: rem(12),
  flexWrap: 'wrap'
});

export const sectionLead = style({
  color: 'var(--ui-text-muted)',
  fontSize: rem(13),
  lineHeight: 1.5
});

export const detailGrid = style({
  display: 'grid',
  gap: rem(12)
});

export const detailRow = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(120px, 156px) minmax(0, 1fr)',
  gap: rem(12),
  alignItems: 'center',
  padding: `${rem(12)} ${rem(14)}`,
  borderRadius: rem(16),
  background: 'color-mix(in srgb, var(--ui-surface-muted) 68%, transparent)',
  '@media': {
    [vars.smallerThan('sm')]: {
      gridTemplateColumns: '1fr',
      gap: rem(6)
    }
  }
});

export const detailLabel = style({
  fontSize: rem(13),
  fontWeight: 600,
  color: 'var(--ui-text-muted)'
});

export const detailValue = style({
  minWidth: 0,
  color: 'var(--ui-text-strong)'
});

export const settingRow = style({
  display: 'grid',
  gridTemplateColumns: 'minmax(120px, 172px) minmax(0, 1fr)',
  gap: rem(14),
  alignItems: 'center',
  padding: `${rem(12)} ${rem(14)}`,
  borderRadius: rem(16),
  background: 'color-mix(in srgb, var(--ui-surface-muted) 68%, transparent)',
  '@media': {
    [vars.smallerThan('sm')]: {
      gridTemplateColumns: '1fr',
      gap: rem(10)
    }
  }
});

export const settingLabel = style({
  fontSize: rem(13),
  fontWeight: 600,
  color: 'var(--ui-text-muted)'
});

export const settingControl = style({
  minWidth: 0
});

export const loaderPreview = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: rem(12),
  flexWrap: 'wrap'
});
