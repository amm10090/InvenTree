import { SimpleGrid } from '@mantine/core';

import { AccountDetailPanel } from './AccountDetailPanel';
import { UserTheme } from './UserThemePanel';

export function AccountContent() {
  return (
    <SimpleGrid cols={{ base: 1, xl: 2 }} spacing='lg'>
      <AccountDetailPanel />
      <UserTheme />
    </SimpleGrid>
  );
}
