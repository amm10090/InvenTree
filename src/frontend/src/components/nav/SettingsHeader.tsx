import { t } from '@lingui/core/macro';
import { SegmentedControl, Stack, Text } from '@mantine/core';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserState } from '../../states/UserState';
import { StylishText } from '../items/StylishText';
import * as classes from './SettingsHeader.css';

interface SettingsHeaderInterface {
  label: string;
  title: string;
  shorthand?: string;
  subtitle?: string | ReactNode;
}

/**
 * Construct a settings page header with interlinks to one other settings page
 */
export function SettingsHeader({
  label,
  title,
  shorthand,
  subtitle
}: Readonly<SettingsHeaderInterface>) {
  const user = useUserState();
  const navigate = useNavigate();

  return (
    <div className={classes.shell}>
      <Stack gap='xs' className={classes.content}>
        <div className={classes.titleRow}>
          <StylishText size='xl'>{title}</StylishText>
          {shorthand && <Text className={classes.shorthand}>{shorthand}</Text>}
        </div>
        {subtitle ? <Text className={classes.subtitle}>{subtitle}</Text> : null}
      </Stack>
      {user.isStaff() && (
        <div className={classes.actions}>
          <SegmentedControl
            className={classes.segmented}
            data={[
              { value: 'user', label: t`User Settings` },
              { value: 'system', label: t`System Settings` },
              { value: 'admin', label: t`Admin Center` }
            ]}
            onChange={(value) => navigate(`/settings/${value}`)}
            value={label}
          />
        </div>
      )}
    </div>
  );
}
