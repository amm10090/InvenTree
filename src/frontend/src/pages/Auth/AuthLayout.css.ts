import { rem } from '@mantine/core';
import { globalStyle, style } from '@vanilla-extract/css';
import { vars } from '../../theme';

export const authScreen = style({
  position: 'relative',
  minHeight: '100vh',
  overflow: 'hidden',
  background: 'linear-gradient(160deg, #07111f 0%, #0d1728 42%, #162235 100%)'
});

export const authGlowTop = style({
  position: 'absolute',
  top: rem(-120),
  right: rem(-80),
  width: rem(420),
  height: rem(420),
  borderRadius: '50%',
  background:
    'radial-gradient(circle, rgba(59, 130, 246, 0.24) 0%, rgba(59, 130, 246, 0) 72%)',
  filter: 'blur(18px)',
  pointerEvents: 'none'
});

export const authGlowBottom = style({
  position: 'absolute',
  bottom: rem(-180),
  left: rem(-120),
  width: rem(480),
  height: rem(480),
  borderRadius: '50%',
  background:
    'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0) 74%)',
  filter: 'blur(24px)',
  pointerEvents: 'none'
});

export const authGrid = style({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  opacity: 0.32,
  backgroundImage:
    'linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)',
  backgroundSize: `${rem(72)} ${rem(72)}`,
  maskImage:
    'radial-gradient(circle at center, rgba(0, 0, 0, 0.95), transparent 88%)'
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
  background:
    'linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.06))',
  border: '1px solid rgba(148, 163, 184, 0.24)',
  boxShadow:
    '0 18px 40px rgba(2, 6, 23, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(18px)'
});

export const authLogoImage = style({
  filter: 'drop-shadow(0 8px 16px rgba(15, 23, 42, 0.28))'
});

export const authBrandName = style({
  margin: 0,
  color: '#f8fafc',
  fontSize: rem(30),
  fontWeight: 700,
  letterSpacing: '-0.03em',
  lineHeight: 1.1
});

export const authBrandMeta = style({
  color: 'rgba(226, 232, 240, 0.74)',
  fontSize: rem(13),
  fontWeight: 500,
  letterSpacing: '0.04em',
  textTransform: 'uppercase'
});

export const authCard = style({
  width: '100%',
  borderRadius: rem(28),
  border: '1px solid rgba(148, 163, 184, 0.2)',
  background:
    'linear-gradient(180deg, rgba(15, 23, 42, 0.84), rgba(15, 23, 42, 0.72))',
  boxShadow:
    '0 28px 70px rgba(2, 6, 23, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(24px)'
});

export const authCardStack = style({
  gap: vars.spacing.md
});

export const authCardTitle = style({
  color: '#f8fafc',
  fontWeight: 700,
  fontSize: rem(24),
  letterSpacing: '-0.03em',
  lineHeight: 1.2
});

export const authDivider = style({
  borderColor: 'rgba(148, 163, 184, 0.16)'
});

export const authOptionsPanel = style({
  marginTop: rem(16),
  padding: `${rem(10)} ${rem(14)}`,
  borderRadius: rem(999),
  border: '1px solid rgba(148, 163, 184, 0.14)',
  background: 'rgba(15, 23, 42, 0.38)',
  backdropFilter: 'blur(16px)'
});

export const authOptionsText = style({
  color: 'rgba(226, 232, 240, 0.72)',
  fontSize: rem(12),
  fontWeight: 600,
  letterSpacing: '0.02em'
});

globalStyle(`${authLogoImage}`, {
  width: 'auto',
  maxWidth: '100%',
  maxHeight: rem(44)
});

globalStyle(`${authCard} label`, {
  color: 'rgba(226, 232, 240, 0.78)',
  fontWeight: 600
});

globalStyle(`${authCard} input`, {
  minHeight: rem(46),
  background: 'rgba(15, 23, 42, 0.42)',
  borderColor: 'rgba(148, 163, 184, 0.18)',
  color: '#f8fafc'
});

globalStyle(`${authCard} input::placeholder`, {
  color: 'rgba(148, 163, 184, 0.72)'
});

globalStyle(`${authCard} [data-with-left-section='true'] input`, {
  paddingLeft: rem(40)
});
