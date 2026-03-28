import { ActionIcon, Center, Group, Text, Tooltip } from '@mantine/core';
import { IconServer } from '@tabler/icons-react';

import { useShallow } from 'zustand/react/shallow';
import {
  authOptionsPanel,
  authOptionsText
} from '../../pages/Auth/AuthLayout.css';
import { useServerApiState } from '../../states/ServerApiState';
import { ColorToggle } from '../items/ColorToggle';
import { LanguageToggle } from '../items/LanguageToggle';

export function AuthFormOptions({
  hostname,
  toggleHostEdit
}: Readonly<{
  hostname: string;
  toggleHostEdit: () => void;
}>) {
  const [server] = useServerApiState(useShallow((state) => [state.server]));

  return (
    <Center mx={'md'}>
      <Group gap='xs' className={authOptionsPanel}>
        <ColorToggle />
        <LanguageToggle />
        {window.INVENTREE_SETTINGS.show_server_selector && (
          <Tooltip label={hostname}>
            <ActionIcon
              size='lg'
              variant='subtle'
              radius='xl'
              onClick={toggleHostEdit}
            >
              <IconServer />
            </ActionIcon>
          </Tooltip>
        )}
        <Text className={authOptionsText}>
          {server.version} | {server.apiVersion}
        </Text>
      </Group>
    </Center>
  );
}
