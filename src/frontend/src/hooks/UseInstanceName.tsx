import { useMemo } from 'react';

import { useGlobalSettingsState } from '../states/SettingsStates';

/**
 * Simple hook for returning the "instance name" of the Server
 */
export default function useInstanceName(): string {
  const globalSettings = useGlobalSettingsState();

  return useMemo(() => {
    const instanceName = globalSettings.getSetting(
      'INVENTREE_INSTANCE',
      '库存管理系统'
    );
    return instanceName === 'InvenTree' ? '库存管理系统' : instanceName;
  }, [globalSettings]);
}
