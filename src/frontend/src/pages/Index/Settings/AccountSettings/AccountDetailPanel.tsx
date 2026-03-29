import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { Badge, Paper, Stack, Text } from '@mantine/core';
import { IconEdit, IconKey, IconUser } from '@tabler/icons-react';
import { useMemo } from 'react';

import { ActionButton } from '@lib/components/ActionButton';
import { YesNoUndefinedButton } from '@lib/components/YesNoButton';
import { ApiEndpoints } from '@lib/enums/ApiEndpoints';
import type { ApiFormFieldSet } from '@lib/types/Forms';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { ActionDropdown } from '../../../../components/items/ActionDropdown';
import { StylishText } from '../../../../components/items/StylishText';
import { useEditApiFormModal } from '../../../../hooks/UseForm';
import { useUserState } from '../../../../states/UserState';
import * as classes from './AccountSettings.css';

export function AccountDetailPanel() {
  const navigate = useNavigate();

  const [user, fetchUserState] = useUserState(
    useShallow((state) => [state.user, state.fetchUserState])
  );

  const userFields: ApiFormFieldSet = useMemo(() => {
    return {
      first_name: {},
      last_name: {}
    };
  }, []);

  const editAccount = useEditApiFormModal({
    title: t`Edit Account Information`,
    url: ApiEndpoints.user_me,
    onFormSuccess: fetchUserState,
    fields: userFields,
    successMessage: t`Account details updated`
  });

  const profileFields: ApiFormFieldSet = useMemo(() => {
    return {
      displayname: {},
      position: {},
      status: {},
      location: {},
      active: {},
      contact: {},
      type: {},
      organisation: {},
      primary_group: {}
    };
  }, []);

  const editProfile = useEditApiFormModal({
    title: t`Edit Profile Information`,
    url: ApiEndpoints.user_profile,
    onFormSuccess: fetchUserState,
    fields: profileFields,
    successMessage: t`Profile details updated`
  });

  const accountDetailFields = useMemo(
    () => [
      { label: t`Username`, value: user?.username },
      { label: t`First Name`, value: user?.first_name },
      { label: t`Last Name`, value: user?.last_name },
      {
        label: t`Active`,
        value: <YesNoUndefinedButton value={user?.profile?.active} />
      },
      {
        label: t`Staff Access`,
        value: <YesNoUndefinedButton value={user?.is_staff} />
      },
      {
        label: t`Superuser`,
        value: <YesNoUndefinedButton value={user?.is_superuser} />
      }
    ],
    [user]
  );

  const profileDetailFields = useMemo(
    () => [
      { label: t`Display Name`, value: user?.profile?.displayname },
      { label: t`Position`, value: user?.profile?.position },
      { label: t`Status`, value: user?.profile?.status },
      { label: t`Location`, value: user?.profile?.location },
      { label: t`Contact`, value: user?.profile?.contact },
      {
        label: t`Type`,
        value: user?.profile?.type ? <Badge>{user?.profile?.type}</Badge> : null
      },
      { label: t`Organisation`, value: user?.profile?.organisation },
      { label: t`Primary Group`, value: user?.profile?.primary_group }
    ],
    [user]
  );

  return (
    <>
      {editAccount.modal}
      {editProfile.modal}
      <Stack gap='lg'>
        <Paper className={classes.sectionCard}>
          <Stack gap='md'>
            <div className={classes.sectionHeader}>
              <Stack gap={4}>
                <StylishText size='lg'>
                  <Trans>Account Details</Trans>
                </StylishText>
                <Text className={classes.sectionLead}>
                  {user?.username || '—'}
                </Text>
              </Stack>
              <ActionDropdown
                tooltip={t`Account Actions`}
                icon={<IconUser />}
                actions={[
                  {
                    name: t`Edit Account`,
                    icon: <IconEdit />,
                    tooltip: t`Edit Account Information`,
                    onClick: editAccount.open
                  },
                  {
                    name: t`Change Password`,
                    icon: <IconKey />,
                    tooltip: t`Change User Password`,
                    onClick: () => {
                      navigate('/change-password');
                    }
                  }
                ]}
              />
            </div>
            <div className={classes.detailGrid}>
              {accountDetailFields.map((item) => (
                <div className={classes.detailRow} key={item.label}>
                  <Text className={classes.detailLabel}>{item.label}</Text>
                  <div className={classes.detailValue}>
                    {normalizeValue(item.value)}
                  </div>
                </div>
              ))}
            </div>
          </Stack>
        </Paper>

        <Paper className={classes.sectionCard}>
          <Stack gap='md'>
            <div className={classes.sectionHeader}>
              <Stack gap={4}>
                <StylishText size='lg'>
                  <Trans>Profile Details</Trans>
                </StylishText>
                <Text className={classes.sectionLead}>
                  {user?.profile?.displayname || user?.username || '—'}
                </Text>
              </Stack>
              <ActionButton
                text={t`Edit Profile`}
                icon={<IconEdit />}
                tooltip={t`Edit Profile Information`}
                onClick={editProfile.open}
                variant='light'
              />
            </div>
            <div className={classes.detailGrid}>
              {profileDetailFields.map((item) => (
                <div className={classes.detailRow} key={item.label}>
                  <Text className={classes.detailLabel}>{item.label}</Text>
                  <div className={classes.detailValue}>
                    {normalizeValue(item.value)}
                  </div>
                </div>
              ))}
            </div>
          </Stack>
        </Paper>
      </Stack>
    </>
  );
}

function normalizeValue(value: any) {
  if (value === null || value === undefined || value === '') {
    return '—';
  }

  return value;
}
