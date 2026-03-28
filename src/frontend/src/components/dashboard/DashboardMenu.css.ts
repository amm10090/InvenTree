import { rem } from '@mantine/core';
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../theme';

const lightSchemeSelector = "[data-mantine-color-scheme='light']";
const darkSchemeSelector = "[data-mantine-color-scheme='dark']";

export const menuPaper = style({
  borderRadius: rem(16),
  border: '1px solid',
  backdropFilter: 'blur(10px)',
  [vars.lightSelector]: {
    borderColor: 'rgba(148, 163, 184, 0.32)',
    backgroundColor: 'rgba(255, 255, 255, 0.88)'
  },
  [vars.darkSelector]: {
    borderColor: 'rgba(148, 163, 184, 0.2)',
    backgroundColor: 'rgba(15, 23, 42, 0.46)'
  }
});

export const menuMainGroup = style({
  minHeight: rem(40),
  gap: rem(12)
});

export const menuActionGroup = style({
  padding: `${rem(4)} ${rem(6)}`,
  borderRadius: rem(999),
  border: '1px solid',
  [vars.lightSelector]: {
    borderColor: 'rgba(148, 163, 184, 0.34)',
    backgroundColor: 'rgba(248, 250, 252, 0.95)'
  },
  [vars.darkSelector]: {
    borderColor: 'rgba(148, 163, 184, 0.22)',
    backgroundColor: 'rgba(15, 23, 42, 0.58)'
  }
});

globalStyle(`${menuActionGroup} .mantine-ActionIcon-root`, {
  borderRadius: rem(999),
  transition: 'background-color 140ms ease, transform 140ms ease'
});

globalStyle(
  `${lightSchemeSelector} ${menuActionGroup} .mantine-ActionIcon-root:hover`,
  {
    backgroundColor: 'rgba(226, 232, 240, 0.82)'
  }
);

globalStyle(
  `${darkSchemeSelector} ${menuActionGroup} .mantine-ActionIcon-root:hover`,
  {
    backgroundColor: 'rgba(51, 65, 85, 0.8)'
  }
);
