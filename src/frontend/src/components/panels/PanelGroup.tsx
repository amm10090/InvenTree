import {
  ActionIcon,
  Box,
  Divider,
  Group,
  Indicator,
  Loader,
  Stack,
  Tabs,
  Text,
  Tooltip,
  UnstyledButton
} from '@mantine/core';
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse
} from '@tabler/icons-react';
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';

import type { ModelType } from '@lib/enums/ModelType';
import { identifierString } from '@lib/functions/Conversion';
import { cancelEvent } from '@lib/functions/Events';
import {
  eventModified,
  getBaseUrl,
  navigateToLink
} from '@lib/functions/Navigation';
import { t } from '@lingui/core/macro';
import { useShallow } from 'zustand/react/shallow';
import { generateUrl } from '../../functions/urls';
import { usePluginPanels } from '../../hooks/UsePluginPanels';
import { useLocalState } from '../../states/LocalState';
import { Boundary } from '../Boundary';
import { StylishText } from '../items/StylishText';
import type { PanelGroupType, PanelType } from '../panels/Panel';
import * as classes from './PanelGroup.css';

/**
 * Set of properties which define a panel group:
 *
 * @param pageKey - Unique key for this panel group
 * @param panels - List of panels to display
 * @param model - The target model for this panel group (e.g. 'part' / 'salesorder')
 * @param id - The target ID for this panel group (set to *null* for groups which do not target a specific model instance)
 * @param instance - The target model instance for this panel group
 * @param reloadInstance - Function to reload the model instance
 * @param selectedPanel - The currently selected panel
 * @param onPanelChange - Callback when the active panel changes
 * @param collapsible - If true, the panel group can be collapsed (defaults to true)
 */
export type PanelProps = {
  pageKey: string;
  panels: PanelType[];
  groups?: PanelGroupType[];
  instance?: any;
  reloadInstance?: () => void;
  model?: ModelType | string;
  id?: number | null;
  selectedPanel?: string;
  onPanelChange?: (panel: string) => void;
  collapsible?: boolean;
};

function BasePanelGroup({
  pageKey,
  panels,
  groups,
  onPanelChange,
  selectedPanel,
  reloadInstance,
  instance,
  model,
  id,
  collapsible = true
}: Readonly<PanelProps>): ReactNode {
  const localState = useLocalState();
  const location = useLocation();
  const navigate = useNavigate();

  const { panel } = useParams();

  const [expanded, setExpanded] = useState<boolean>(true);

  const pluginPanelSet = usePluginPanels({
    id: id,
    model: model,
    instance: instance,
    reloadFunc: reloadInstance
  });

  const [allPanels, groupedPanels] = useMemo(() => {
    const rebuiltGroups: PanelGroupType[] = [];
    const remainingPanels = [...panels];
    const mergedPanels: PanelType[] = [...panels];

    groups?.forEach((group) => {
      const nextGroup: any = { ...group, panels: [] };

      group.panelIDs?.forEach((panelID) => {
        const index = remainingPanels.findIndex(
          (entry) => entry.name === panelID
        );
        if (index !== -1) {
          nextGroup.panels.push(remainingPanels[index]);
          remainingPanels.splice(index, 1);
        }
      });

      rebuiltGroups.push(nextGroup);
    });

    if (remainingPanels.length > 0) {
      rebuiltGroups.push({
        id: 'ungrouped',
        label: '',
        panels: remainingPanels
      });
    }

    const pluginPanels: PanelType[] = [];

    pluginPanelSet.panels?.forEach((pluginPanel) => {
      let panelKey = pluginPanel.name;
      const existingPanel = panels.find((entry) => entry.name === panelKey);

      if (existingPanel) {
        panelKey = identifierString(
          `${pluginPanel.pluginName}-${pluginPanel.name}`
        );
      }

      const normalizedPanel = {
        ...pluginPanel,
        name: panelKey
      };

      pluginPanels.push(normalizedPanel);
      mergedPanels.push(normalizedPanel);
    });

    if (pluginPanels.length > 0) {
      rebuiltGroups.push({
        id: 'plugins',
        label: t`Plugin Provided`,
        panels: pluginPanels
      });
    }

    return [mergedPanels, rebuiltGroups];
  }, [groups, panels, pluginPanelSet]);

  const activePanels = useMemo(
    () => allPanels.filter((entry) => !entry.hidden && !entry.disabled),
    [allPanels]
  );

  const handlePanelChange = useCallback(
    (targetPanel: string, event?: any) => {
      cancelEvent(event);
      if (event && eventModified(event)) {
        const url = `${location.pathname}/../${targetPanel}`;
        navigateToLink(url, navigate, event);
      } else {
        navigate(`../${targetPanel}`);
      }

      localState.setLastUsedPanel(pageKey)(targetPanel);

      if (targetPanel && onPanelChange) {
        onPanelChange(targetPanel);
      }
    },
    [location.pathname, localState, navigate, onPanelChange, pageKey]
  );

  useEffect(() => {
    if (selectedPanel && selectedPanel !== panel) {
      handlePanelChange(selectedPanel);
    }
  }, [handlePanelChange, panel, selectedPanel]);

  const currentPanel: string = useMemo(() => {
    if (activePanels.findIndex((entry) => entry.name === panel) === -1) {
      return activePanels[0]?.name ?? '';
    }

    return panel ?? '';
  }, [activePanels, panel]);

  return (
    <Boundary label={`PanelGroup-${pageKey}`}>
      <Tabs
        value={currentPanel}
        orientation='vertical'
        keepMounted={false}
        aria-label={`panel-group-${pageKey}`}
        classNames={{
          root: classes.root,
          list: classes.list,
          panel: classes.panel,
          tab: classes.tab,
          tabSection: classes.tabSection,
          tabLabel: classes.tabLabel
        }}
      >
        <Tabs.List aria-label={`panel-tabs-${pageKey}`}>
          {groupedPanels.map((group) => (
            <Box key={`group-${group.id}`} className={classes.group}>
              <Text
                hidden={!group.label || !expanded}
                className={classes.groupLabel}
                key={`group-label-${group.id}`}
              >
                {group.label}
              </Text>
              {group.label && <Divider className={classes.groupDivider} />}
              {group.panels?.map(
                (entry) =>
                  !entry.hidden && (
                    <Tooltip
                      label={entry.label ?? entry.name}
                      key={entry.name}
                      disabled={expanded}
                      position='right'
                    >
                      <Tabs.Tab
                        key={`panel-label-${entry.name}`}
                        value={entry.name}
                        leftSection={entry.icon}
                        hidden={entry.hidden}
                        disabled={entry.disabled}
                        style={{ cursor: entry.disabled ? 'unset' : 'pointer' }}
                        onClick={(event: any) =>
                          handlePanelChange(entry.name, event)
                        }
                      >
                        <Indicator
                          color={
                            entry.notification_dot == 'info'
                              ? 'earth'
                              : entry.notification_dot == 'warning'
                                ? 'yellow'
                                : 'red'
                          }
                          position='middle-end'
                          disabled={!entry.notification_dot}
                        >
                          <Group justify='left' gap='xs' wrap='nowrap'>
                            <UnstyledButton
                              component={'a'}
                              className={classes.tabLink}
                              style={{ textAlign: 'left' }}
                              href={generateUrl(
                                `/${getBaseUrl()}${location.pathname}/${entry.name}`
                              )}
                            >
                              {expanded && entry.label}
                            </UnstyledButton>
                          </Group>
                        </Indicator>
                      </Tabs.Tab>
                    </Tooltip>
                  )
              )}
            </Box>
          ))}
          {collapsible && (
            <div className={classes.toolbar}>
              <Tooltip
                position='right'
                label={expanded ? t`Collapse panels` : t`Expand panels`}
              >
                <ActionIcon
                  className={classes.collapseButton}
                  onClick={() => setExpanded(!expanded)}
                  variant='subtle'
                  size='lg'
                >
                  {expanded ? (
                    <IconLayoutSidebarLeftCollapse opacity={0.75} />
                  ) : (
                    <IconLayoutSidebarRightCollapse opacity={0.75} />
                  )}
                </ActionIcon>
              </Tooltip>
              {pluginPanelSet.isLoading && <Loader size='xs' />}
            </div>
          )}
        </Tabs.List>
        {allPanels.map(
          (entry) =>
            !entry.hidden && (
              <Tabs.Panel
                key={`panel-${entry.name}`}
                value={entry.name}
                aria-label={`nav-panel-${identifierString(`${pageKey}-${entry.name}`)}`}
                p={0}
              >
                <Stack gap='lg'>
                  {entry.showHeadline !== false && (
                    <>
                      <div className={classes.panelHeader}>
                        <StylishText size='xl'>{entry.label}</StylishText>
                        {entry.controls && (
                          <Group justify='right' wrap='nowrap'>
                            {entry.controls}
                          </Group>
                        )}
                      </div>
                      <Divider className={classes.panelDivider} />
                    </>
                  )}
                  <Boundary label={`PanelContent-${entry.name}`}>
                    {entry.content}
                  </Boundary>
                </Stack>
              </Tabs.Panel>
            )
        )}
      </Tabs>
    </Boundary>
  );
}

function IndexPanelComponent({
  pageKey,
  selectedPanel,
  panels
}: Readonly<PanelProps>) {
  const lastUsedPanel = useLocalState(
    useShallow((state) => {
      const panelName =
        selectedPanel || state.lastUsedPanels[pageKey] || panels[0]?.name;

      const panel = panels.findIndex(
        (entry) => entry.name === panelName && !entry.disabled && !entry.hidden
      );
      if (panel === -1) {
        return (
          panels.find((entry) => !entry.disabled && !entry.hidden)?.name || ''
        );
      }

      return panelName;
    })
  );

  return <Navigate to={lastUsedPanel} replace />;
}

/**
 * Render a panel group. The current panel will be appended to the current url.
 * The last opened panel will be stored in local storage and opened if no panel is provided via url param
 * @param panels - The list of panels to display
 * @param onPanelChange - Callback when the active panel changes
 * @param collapsible - If true, the panel group can be collapsed (defaults to true)
 */
export function PanelGroup(props: Readonly<PanelProps>) {
  return (
    <Routes>
      <Route index element={<IndexPanelComponent {...props} />} />
      <Route path='/:panel/*' element={<BasePanelGroup {...props} />} />
    </Routes>
  );
}
