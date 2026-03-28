import { ActionIcon, Popover, Stack, Text, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLanguage } from '@tabler/icons-react';

import { t } from '@lingui/core/macro';
import {
  authOptionPopover,
  authOptionPopoverLabel
} from '../../pages/Auth/AuthLayout.css';
import { LanguageSelect } from './LanguageSelect';

export function LanguageToggle() {
  const [open, toggle] = useDisclosure();

  return (
    <Popover
      opened={open}
      onChange={(nextOpen) => (nextOpen ? toggle.open() : toggle.close())}
      position='top'
      shadow='md'
      width={220}
      offset={10}
      trapFocus={false}
    >
      <Popover.Target>
        <Tooltip label={t`Select language`}>
          <ActionIcon
            onClick={toggle.toggle}
            size='lg'
            variant={open ? 'subtle' : 'transparent'}
            radius='xl'
            aria-label='Language toggle'
          >
            <IconLanguage />
          </ActionIcon>
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown className={authOptionPopover}>
        <Stack gap={8}>
          <Text className={authOptionPopoverLabel}>{t`Language`}</Text>
          <LanguageSelect width='100%' onChange={() => toggle.close()} />
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
