import { rem } from '@mantine/core';
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../theme';

const lightSchemeSelector = "[data-mantine-color-scheme='light']";
const darkSchemeSelector = "[data-mantine-color-scheme='dark']";

export const authScreen = style({
  position: 'relative',
  minHeight: '100vh',
  overflow: 'hidden',
  [vars.lightSelector]: {
    background: 'linear-gradient(160deg, #f6f9ff 0%, #edf3ff 45%, #e8eef7 100%)'
  },
  [vars.darkSelector]: {
    background: 'linear-gradient(160deg, #07111f 0%, #0d1728 42%, #162235 100%)'
  }
});

export const authGlowTop = style({
  position: 'absolute',
  top: rem(-120),
  right: rem(-80),
  width: rem(420),
  height: rem(420),
  borderRadius: '50%',
  filter: 'blur(18px)',
  pointerEvents: 'none',
  [vars.lightSelector]: {
    background:
      'radial-gradient(circle, rgba(59, 130, 246, 0.16) 0%, rgba(59, 130, 246, 0) 72%)'
  },
  [vars.darkSelector]: {
    background:
      'radial-gradient(circle, rgba(59, 130, 246, 0.24) 0%, rgba(59, 130, 246, 0) 72%)'
  }
});

export const authGlowBottom = style({
  position: 'absolute',
  bottom: rem(-180),
  left: rem(-120),
  width: rem(480),
  height: rem(480),
  borderRadius: '50%',
  filter: 'blur(24px)',
  pointerEvents: 'none',
  [vars.lightSelector]: {
    background:
      'radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, rgba(99, 102, 241, 0) 74%)'
  },
  [vars.darkSelector]: {
    background:
      'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0) 74%)'
  }
});

export const authGrid = style({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  backgroundSize: `${rem(72)} ${rem(72)}`,
  [vars.lightSelector]: {
    opacity: 0.2,
    backgroundImage:
      'linear-gradient(rgba(71, 85, 105, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(71, 85, 105, 0.12) 1px, transparent 1px)',
    maskImage:
      'radial-gradient(circle at center, rgba(0, 0, 0, 0.75), transparent 86%)'
  },
  [vars.darkSelector]: {
    opacity: 0.32,
    backgroundImage:
      'linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)',
    maskImage:
      'radial-gradient(circle at center, rgba(0, 0, 0, 0.95), transparent 88%)'
  }
});

export const authContent = style({
  position: 'relative',
  zIndex: 1,
  minHeight: '100vh'
});

export const authCenter = style({
  width: '100%',
  minHeight: '100vh',
  padding: `${rem(32)} ${rem(16)}`
});

export const authContainer = style({
  width: '100%',
  maxWidth: rem(460)
});

export const authBrand = style({
  marginBottom: rem(20),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: rem(14),
  textAlign: 'center'
});

export const authLogoFrame = style({
  width: rem(84),
  height: rem(84),
  borderRadius: rem(28),
  display: 'grid',
  placeItems: 'center',
  backdropFilter: 'blur(18px)',
  [vars.lightSelector]: {
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.68))',
    border: '1px solid rgba(148, 163, 184, 0.32)',
    boxShadow:
      '0 16px 36px rgba(148, 163, 184, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.95)'
  },
  [vars.darkSelector]: {
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.06))',
    border: '1px solid rgba(148, 163, 184, 0.24)',
    boxShadow:
      '0 18px 40px rgba(2, 6, 23, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
  }
});

export const authLogoImage = style({
  [vars.lightSelector]: {
    filter: 'drop-shadow(0 8px 16px rgba(148, 163, 184, 0.35))'
  },
  [vars.darkSelector]: {
    filter: 'drop-shadow(0 8px 16px rgba(15, 23, 42, 0.28))'
  }
});

export const authBrandName = style({
  margin: 0,
  fontSize: rem(30),
  fontWeight: 700,
  letterSpacing: '-0.03em',
  lineHeight: 1.1,
  [vars.lightSelector]: {
    color: '#0f172a'
  },
  [vars.darkSelector]: {
    color: '#f8fafc'
  }
});

export const authBrandMeta = style({
  fontSize: rem(13),
  fontWeight: 500,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  [vars.lightSelector]: {
    color: 'rgba(30, 41, 59, 0.72)'
  },
  [vars.darkSelector]: {
    color: 'rgba(226, 232, 240, 0.74)'
  }
});

export const authCard = style({
  width: '100%',
  borderRadius: rem(28),
  backdropFilter: 'blur(24px)',
  [vars.lightSelector]: {
    border: '1px solid rgba(148, 163, 184, 0.3)',
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(248, 250, 252, 0.92))',
    boxShadow:
      '0 24px 56px rgba(148, 163, 184, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.95)'
  },
  [vars.darkSelector]: {
    border: '1px solid rgba(148, 163, 184, 0.2)',
    background:
      'linear-gradient(180deg, rgba(15, 23, 42, 0.84), rgba(15, 23, 42, 0.72))',
    boxShadow:
      '0 28px 70px rgba(2, 6, 23, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
  }
});

export const authCardStack = style({
  gap: vars.spacing.md
});

export const authCardTitle = style({
  fontWeight: 700,
  fontSize: rem(24),
  letterSpacing: '-0.03em',
  lineHeight: 1.2,
  [vars.lightSelector]: {
    color: '#0f172a'
  },
  [vars.darkSelector]: {
    color: '#f8fafc'
  }
});

export const authDivider = style({
  [vars.lightSelector]: {
    borderColor: 'rgba(148, 163, 184, 0.28)'
  },
  [vars.darkSelector]: {
    borderColor: 'rgba(148, 163, 184, 0.16)'
  }
});

export const authOptionsPanel = style({
  marginTop: rem(16),
  padding: `${rem(10)} ${rem(14)}`,
  borderRadius: rem(999),
  backdropFilter: 'blur(16px)',
  [vars.lightSelector]: {
    border: '1px solid rgba(148, 163, 184, 0.28)',
    background: 'rgba(255, 255, 255, 0.78)'
  },
  [vars.darkSelector]: {
    border: '1px solid rgba(148, 163, 184, 0.14)',
    background: 'rgba(15, 23, 42, 0.38)'
  }
});

export const authOptionsText = style({
  fontSize: rem(12),
  fontWeight: 600,
  letterSpacing: '0.02em',
  [vars.lightSelector]: {
    color: 'rgba(30, 41, 59, 0.72)'
  },
  [vars.darkSelector]: {
    color: 'rgba(226, 232, 240, 0.72)'
  }
});

export const authOptionPopover = style({
  padding: rem(12),
  borderRadius: rem(18),
  backdropFilter: 'blur(20px)',
  [vars.lightSelector]: {
    border: '1px solid rgba(148, 163, 184, 0.3)',
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.94))',
    boxShadow: '0 18px 44px rgba(148, 163, 184, 0.32)'
  },
  [vars.darkSelector]: {
    border: '1px solid rgba(148, 163, 184, 0.18)',
    background:
      'linear-gradient(180deg, rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.86))',
    boxShadow: '0 18px 44px rgba(2, 6, 23, 0.42)'
  }
});

export const authOptionPopoverLabel = style({
  marginBottom: rem(8),
  fontSize: rem(11),
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  [vars.lightSelector]: {
    color: 'rgba(51, 65, 85, 0.72)'
  },
  [vars.darkSelector]: {
    color: 'rgba(226, 232, 240, 0.72)'
  }
});

globalStyle(`${authLogoImage}`, {
  width: 'auto',
  maxWidth: '100%',
  maxHeight: rem(44)
});

globalStyle(`${authCard} label`, {
  fontWeight: 600
});

globalStyle(`${lightSchemeSelector} ${authCard} label`, {
  color: 'rgba(30, 41, 59, 0.88)'
});

globalStyle(`${darkSchemeSelector} ${authCard} label`, {
  color: 'rgba(226, 232, 240, 0.78)'
});

globalStyle(`${authCard} input`, {
  minHeight: rem(46)
});

globalStyle(`${lightSchemeSelector} ${authCard} input`, {
  background: 'rgba(255, 255, 255, 0.95)',
  borderColor: 'rgba(148, 163, 184, 0.5)',
  color: '#0f172a'
});

globalStyle(`${darkSchemeSelector} ${authCard} input`, {
  background: 'rgba(15, 23, 42, 0.42)',
  borderColor: 'rgba(148, 163, 184, 0.18)',
  color: '#f8fafc'
});

globalStyle(`${lightSchemeSelector} ${authCard} .mantine-Input-section`, {
  color: 'rgba(71, 85, 105, 0.78)'
});

globalStyle(`${darkSchemeSelector} ${authCard} .mantine-Input-section`, {
  color: 'rgba(148, 163, 184, 0.72)'
});

globalStyle(`${authCard} input::placeholder`, {
  opacity: 1
});

globalStyle(`${lightSchemeSelector} ${authCard} input::placeholder`, {
  color: 'rgba(100, 116, 139, 0.9)'
});

globalStyle(`${darkSchemeSelector} ${authCard} input::placeholder`, {
  color: 'rgba(148, 163, 184, 0.72)'
});

globalStyle(`${authCard} [data-with-left-section='true'] input`, {
  paddingLeft: rem(40)
});

globalStyle(`${lightSchemeSelector} ${authCard} input:focus`, {
  boxShadow: '0 0 0 1px rgba(59, 130, 246, 0.45)'
});

globalStyle(`${darkSchemeSelector} ${authCard} input:focus`, {
  boxShadow: '0 0 0 1px rgba(99, 102, 241, 0.5)'
});
