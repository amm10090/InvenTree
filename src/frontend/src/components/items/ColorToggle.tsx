import {
  ActionIcon,
  Group,
  Tooltip,
  useMantineColorScheme
} from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';

import { t } from '@lingui/core/macro';

export function ColorToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group justify='center'>
      <Tooltip label={t`Toggle color scheme`}>
        <ActionIcon
          onClick={toggleColorScheme}
          size='lg'
          style={{
            color:
              colorScheme === 'dark'
                ? 'var(--ui-accent-strong)'
                : 'var(--ui-accent)'
          }}
          variant='transparent'
        >
          {colorScheme === 'dark' ? <IconSun /> : <IconMoonStars />}
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
