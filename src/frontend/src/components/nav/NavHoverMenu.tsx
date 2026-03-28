import { UnstyledButton } from '@mantine/core';

import * as classes from '../../main.css';
import { InvenTreeLogo } from '../items/InvenTreeLogo';

export function NavHoverMenu({
  openDrawer
}: Readonly<{
  openDrawer: () => void;
}>) {
  return (
    <UnstyledButton
      className={classes.layoutHeaderNavButton}
      onClick={() => openDrawer()}
      aria-label='navigation-menu'
    >
      <InvenTreeLogo />
    </UnstyledButton>
  );
}
