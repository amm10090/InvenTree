import { rem } from '@mantine/core';
import { globalStyle, style } from '@vanilla-extract/css';

export const authScreen = style({
  position: 'relative',
  minHeight: '100vh',
  overflow: 'hidden',
  background: 'var(--ui-page)'
});

export const authGlowTop = style({
  position: 'absolute',
  top: rem(-120),
  right: rem(-80),
  width: rem(360),
  height: rem(360),
  borderRadius: '50%',
  filter: 'blur(28px)',
  pointerEvents: 'none',
  backgroundColor: 'color-mix(in srgb, var(--ui-accent) 16%, transparent)'
});

export const authGlowBottom = style({
  position: 'absolute',
  bottom: rem(-180),
  left: rem(-120),
  width: rem(420),
  height: rem(420),
  borderRadius: '50%',
  filter: 'blur(32px)',
  pointerEvents: 'none',
  backgroundColor:
    'color-mix(in srgb, var(--ui-accent-strong) 12%, transparent)'
});

export const authGrid = style({
  display: 'none'
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
  border: '1px solid var(--ui-border)',
  background: 'color-mix(in srgb, var(--ui-surface) 94%, var(--ui-page))',
  boxShadow: 'var(--ui-shadow-md)'
});

export const authLogoImage = style({
  filter:
    'drop-shadow(0 10px 18px color-mix(in srgb, var(--ui-accent) 14%, transparent))'
});

export const authBrandName = style({
  margin: 0,
  fontSize: rem(30),
  fontWeight: 700,
  letterSpacing: '-0.03em',
  lineHeight: 1.1,
  color: 'var(--ui-text-strong)'
});

export const authBrandMeta = style({
  fontSize: rem(13),
  fontWeight: 600,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: 'var(--ui-text-muted)'
});

export const authCard = style({
  width: '100%',
  borderRadius: rem(28),
  border: '1px solid var(--ui-border)',
  background: 'var(--ui-surface)',
  boxShadow: 'var(--ui-shadow-md)'
});

export const authCardStack = style({
  gap: rem(16)
});

export const authCardTitle = style({
  fontWeight: 700,
  fontSize: rem(24),
  letterSpacing: '-0.03em',
  lineHeight: 1.2,
  color: 'var(--ui-text-strong)'
});

export const authDivider = style({
  borderColor: 'var(--ui-border)'
});

export const authOptionsPanel = style({
  marginTop: rem(16),
  padding: `${rem(10)} ${rem(14)}`,
  borderRadius: rem(999),
  border: '1px solid var(--ui-border)',
  background: 'var(--ui-page-raised)',
  boxShadow: 'var(--ui-shadow-sm)'
});

export const authOptionsText = style({
  fontSize: rem(12),
  fontWeight: 600,
  letterSpacing: '0.02em',
  color: 'var(--ui-text-muted)'
});

export const authOptionPopover = style({
  padding: rem(12),
  borderRadius: rem(18),
  border: '1px solid var(--ui-border)',
  background: 'var(--ui-surface)',
  boxShadow: 'var(--ui-shadow-md)'
});

export const authOptionPopoverLabel = style({
  marginBottom: rem(8),
  fontSize: rem(11),
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--ui-text-muted)'
});

globalStyle(`${authLogoImage}`, {
  width: 'auto',
  maxWidth: '100%',
  maxHeight: rem(44)
});

globalStyle(`${authCard} label`, {
  fontWeight: 600,
  color: 'var(--ui-text)'
});

globalStyle(`${authCard} input`, {
  minHeight: rem(46),
  background: 'var(--ui-page-raised)',
  borderColor: 'var(--ui-border)',
  color: 'var(--ui-text-strong)'
});

globalStyle(`${authCard} .mantine-Input-section`, {
  color: 'var(--ui-text-muted)'
});

globalStyle(`${authCard} input::placeholder`, {
  color: 'var(--ui-text-muted)',
  opacity: 1
});

globalStyle(`${authCard} [data-with-left-section='true'] input`, {
  paddingLeft: rem(40)
});

globalStyle(`${authCard} input:focus`, {
  boxShadow: 'var(--ui-shadow-focus), var(--ui-shadow-sm)'
});
