import { t } from '@lingui/core/macro';
import {
  Button,
  Group,
  Paper,
  Space,
  Stack,
  Switch,
  Text,
  Tooltip
} from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ModelInformationDict } from '@lib/enums/ModelInformation';
import { ModelType } from '@lib/enums/ModelType';
import { apiUrl } from '@lib/functions/Api';
import type { Setting } from '@lib/types/Settings';
import { api } from '../../App';
import { vars } from '../../theme';
import { Boundary } from '../Boundary';
import { RenderInstance } from '../render/Instance';

type ConfirmResult = {
  requires_confirmation: boolean;
  confirmed: boolean;
  proceed?: boolean;
};
function confirmSettingChange(setting: Setting): ConfirmResult {
  if (setting.confirm) {
    const confirmed = window.confirm(
      setting.confirm_text || t`Do you want to proceed to change this setting?`
    );
    return {
      requires_confirmation: true,
      confirmed: confirmed || false,
      proceed: confirmed
    };
  }
  return { requires_confirmation: false, confirmed: false, proceed: true };
}
/**
 * Render a single setting value
 */
function SettingValue({
  setting,
  onEdit,
  onToggle
}: Readonly<{
  setting: Setting;
  onEdit: (setting: Setting, confirmed: boolean) => void;
  onToggle: (setting: Setting, value: boolean, confirmed: boolean) => void;
}>) {
  const valueText: string = useMemo(() => {
    let value = setting.value;

    if (setting?.choices && setting?.choices?.length > 0) {
      const choice = setting.choices.find((c) => c.value == setting.value);
      value = choice?.display_name || setting.value;
    }

    if (setting?.units) {
      value = `${value} ${setting.units}`;
    }

    return value;
  }, [setting]);

  const [modelInstance, setModelInstance] = useState<any>(null);

  const editSetting = useCallback(() => {
    if (!setting.read_only) {
      const confirm = confirmSettingChange(setting);
      if (!confirm.proceed) return;
      onEdit(setting, confirm.confirmed);
    }
  }, [setting, onEdit]);

  const toggleSetting = useCallback(
    (event: any) => {
      if (!setting.read_only) {
        const confirm = confirmSettingChange(setting);
        if (!confirm.proceed) return;
        onToggle(setting, event.currentTarget.checked, confirm.confirmed);
      }
    },
    [setting, onToggle]
  );

  const modelType: ModelType | null = useMemo(() => {
    if (setting.model_name) {
      const model = setting.model_name.split('.')[1];
      return ModelType[model as keyof typeof ModelType] || null;
    }
    return null;
  }, [setting]);

  useEffect(() => {
    setModelInstance(null);

    if (modelType && setting.value) {
      const endpoint = ModelInformationDict[modelType].api_endpoint;

      api
        .get(apiUrl(endpoint, setting.value))
        .then((response) => {
          if (response.data) {
            setModelInstance(response.data);
          } else {
            setModelInstance(null);
          }
        })
        .catch(() => {
          setModelInstance(null);
        });
    }
  }, [setting, modelType]);

  if (modelInstance && modelType && setting.value) {
    return (
      <Group justify='right' gap='xs'>
        <RenderInstance instance={modelInstance} model={modelType} />
        <Button
          aria-label={`edit-setting-${setting.key}`}
          variant='subtle'
          disabled={setting.read_only}
          onClick={editSetting}
        >
          <IconEdit />
        </Button>
      </Group>
    );
  }

  switch (setting?.type || 'string') {
    case 'boolean':
      return (
        <Switch
          size='sm'
          radius='xl'
          aria-label={`toggle-setting-${setting.key}`}
          disabled={setting.read_only}
          checked={setting.value.toString().toLowerCase() == 'true'}
          onChange={toggleSetting}
          wrapperProps={{
            'aria-label': `setting-${setting.key}-wrapper`
          }}
        />
      );
    default:
      return valueText ? (
        <Group gap='xs' justify='right'>
          <Space />
          <Button
            aria-label={`edit-setting-${setting.key}`}
            variant='subtle'
            disabled={setting.read_only}
            onClick={editSetting}
          >
            {valueText}
          </Button>
        </Group>
      ) : (
        <Button
          aria-label={`edit-setting-${setting.key}`}
          variant='subtle'
          disabled={setting.read_only}
          onClick={editSetting}
        >
          <IconEdit />
        </Button>
      );
  }
}

/**
 * Display a single setting item, and allow editing of the value
 */
export function SettingItem({
  setting,
  shaded,
  onEdit,
  onToggle
}: Readonly<{
  setting: Setting;
  shaded: boolean;
  onEdit: (setting: Setting, confirmed: boolean) => void;
  onToggle: (setting: Setting, value: boolean, confirmed: boolean) => void;
}>) {
  const style: Record<string, string> = {
    padding: '14px 16px',
    borderRadius: '18px',
    border: '1px solid var(--ui-border)',
    backgroundColor: shaded
      ? 'color-mix(in srgb, var(--ui-surface-muted) 68%, transparent)'
      : 'var(--ui-page-raised)',
    boxShadow: 'var(--ui-shadow-sm)'
  };

  return (
    <Paper style={style}>
      <Group justify='space-between' align='flex-start' gap='md' wrap='wrap'>
        <Stack gap={4} style={{ flex: 1, minWidth: '240px' }}>
          <Text fw={600} c='var(--ui-text-strong)'>
            {setting.name}
            {setting.required ? ' *' : ''}
          </Text>
          <Text size='sm' c='var(--ui-text-muted)' style={{ lineHeight: 1.5 }}>
            {setting.description}
          </Text>
        </Stack>
        <Boundary label={`setting-value-${setting.key}`}>
          <Group gap='xs' justify='right' wrap='nowrap'>
            {setting.confirm && (
              <Tooltip label={t`This setting requires confirmation`}>
                <IconEdit color={vars.colors.yellow[7]} size={16} />
              </Tooltip>
            )}
            <SettingValue
              setting={setting}
              onEdit={onEdit}
              onToggle={onToggle}
            />
          </Group>
        </Boundary>
      </Group>
    </Paper>
  );
}
