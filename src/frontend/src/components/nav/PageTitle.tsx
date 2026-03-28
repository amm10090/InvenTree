import { useEffect, useMemo } from 'react';
import { useGlobalSettingsState } from '../../states/SettingsStates';

/**
 * Component to set the page title
 */
export default function PageTitle({
  title,
  subtitle
}: Readonly<{
  title?: string;
  subtitle?: string;
}>) {
  const globalSettings = useGlobalSettingsState();

  const pageTitle = useMemo(() => {
    const rawInstanceName = globalSettings.getSetting(
      'INVENTREE_INSTANCE',
      '库存管理系统'
    );
    const instanceName =
      rawInstanceName === 'InvenTree' ? '库存管理系统' : rawInstanceName;
    const useInstanceName = globalSettings.isSet(
      'INVENTREE_INSTANCE_TITLE',
      false
    );

    let data = '';

    if (title) {
      data += title;
    }

    if (subtitle) {
      data += ` - ${subtitle}`;
    }

    if (useInstanceName) {
      data = `${instanceName} | ${data}`;
    }

    if (!data) {
      // Backup: No title provided
      data = instanceName;
    }

    return data;
  }, [title, subtitle, globalSettings]);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return <title>{pageTitle}</title>;
}
