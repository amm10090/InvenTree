import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import {
  Group,
  Loader,
  Paper,
  Select,
  Slider,
  Stack,
  Text
} from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';

import { useShallow } from 'zustand/react/shallow';
import { ColorToggle } from '../../../../components/items/ColorToggle';
import { LanguageSelect } from '../../../../components/items/LanguageSelect';
import { StylishText } from '../../../../components/items/StylishText';
import { SizeMarks } from '../../../../defaults/defaults';
import { useLocalState } from '../../../../states/LocalState';
import * as classes from './AccountSettings.css';

function getRadiusFromValue(value: number) {
  const target = SizeMarks.find((mark) => mark.value === value);
  return target?.label ?? 'sm';
}

function getValueFromRadius(value: string | number) {
  const target = SizeMarks.find((mark) => mark.label === value);
  return target?.value ?? 50;
}

export function UserTheme() {
  const [userTheme, setTheme] = useLocalState(
    useShallow((state) => [state.userTheme, state.setTheme])
  );

  const [radius, setRadius] = useState(getValueFromRadius(userTheme.radius));

  useEffect(() => {
    setRadius(getValueFromRadius(userTheme.radius));
  }, [userTheme.radius]);

  const loaderOptions = useMemo(
    () => [
      { value: 'bars', label: t`Bars` },
      { value: 'oval', label: t`Oval` },
      { value: 'dots', label: t`Dots` }
    ],
    []
  );

  function changeRadius(value: number) {
    const mappedRadius = getRadiusFromValue(value);
    setRadius(value);
    setTheme([{ key: 'radius', value: mappedRadius.toString() }]);
  }

  return (
    <Paper className={classes.sectionCard}>
      <Stack gap='md'>
        <StylishText size='lg'>
          <Trans>Display Settings</Trans>
        </StylishText>

        <div className={classes.settingRow}>
          <Text className={classes.settingLabel}>
            <Trans>Language</Trans>
          </Text>
          <div className={classes.settingControl}>
            <LanguageSelect width={220} />
          </div>
        </div>

        <div className={classes.settingRow}>
          <Text className={classes.settingLabel}>
            <Trans>Color Mode</Trans>
          </Text>
          <div className={classes.settingControl}>
            <ColorToggle />
          </div>
        </div>

        <div className={classes.settingRow}>
          <Text className={classes.settingLabel}>
            <Trans>Border Radius</Trans>
          </Text>
          <div className={classes.settingControl}>
            <Slider
              label={(value) => getRadiusFromValue(value)}
              step={25}
              marks={SizeMarks}
              value={radius}
              onChange={changeRadius}
              mb={18}
            />
          </div>
        </div>

        <div className={classes.settingRow}>
          <Text className={classes.settingLabel}>
            <Trans>Loader</Trans>
          </Text>
          <div className={classes.settingControl}>
            <Group className={classes.loaderPreview}>
              <Select
                aria-label='Loader Type Selector'
                data={loaderOptions}
                value={userTheme.loader}
                onChange={(value) => {
                  if (value != null) setTheme([{ key: 'loader', value }]);
                }}
              />
              <Loader type={userTheme.loader} mah={16} size='sm' />
            </Group>
          </div>
        </div>
      </Stack>
    </Paper>
  );
}
