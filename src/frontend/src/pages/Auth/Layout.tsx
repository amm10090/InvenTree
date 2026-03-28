import { i18n } from '@lingui/core';
import { Trans } from '@lingui/react/macro';
import {
  Button,
  Center,
  Container,
  Divider,
  Group,
  Loader,
  Paper,
  Stack,
  Text
} from '@mantine/core';
import { useLayoutEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { api } from '../../App';
import SplashScreen from '../../components/SplashScreen';
import { InvenTreeLogo } from '../../components/items/InvenTreeLogo';
import {
  activateLocale,
  getPriorityLocale
} from '../../contexts/LanguageContext';
import { doLogout } from '../../functions/auth';
import { useLocalState } from '../../states/LocalState';
import { useServerApiState } from '../../states/ServerApiState';
import {
  authBrand,
  authBrandMeta,
  authBrandName,
  authCard,
  authCardStack,
  authCardTitle,
  authCenter,
  authContainer,
  authDivider,
  authLogoFrame,
  authLogoImage
} from './AuthLayout.css';

const authDefaultLocale = 'zh_Hans';
const authDefaultAcceptLanguage = 'zh-hans, en-us';

export default function LoginLayoutComponent() {
  const [language] = useLocalState(useShallow((state) => [state.language]));
  const [server] = useServerApiState(useShallow((state) => [state.server]));

  useLayoutEffect(() => {
    if (language || server.default_locale) {
      return;
    }

    const previousLocale = i18n.locale;
    const previousAcceptLanguage =
      api.defaults.headers.common['Accept-Language'];

    api.defaults.headers.common['Accept-Language'] = authDefaultAcceptLanguage;

    // 未选择语言时，认证页临时使用简体中文。
    void activateLocale(authDefaultLocale);

    return () => {
      if (previousAcceptLanguage) {
        api.defaults.headers.common['Accept-Language'] = previousAcceptLanguage;
      } else {
        delete api.defaults.headers.common['Accept-Language'];
      }

      void activateLocale(previousLocale || getPriorityLocale());
    };
  }, [language, server.default_locale]);

  return (
    <SplashScreen>
      <Center className={authCenter}>
        <Container className={authContainer}>
          <div className={authBrand}>
            <div className={authLogoFrame}>
              <InvenTreeLogo height={44} className={authLogoImage} />
            </div>
            <Text className={authBrandName}>
              {server.instance || 'InvenTree'}
            </Text>
            {server.version && (
              <Text className={authBrandMeta}>{server.version}</Text>
            )}
          </div>
          <Outlet />
        </Container>
      </Center>
    </SplashScreen>
  );
}

export function Wrapper({
  children,
  titleText,
  logOff = false,
  loader = false,
  smallPadding = false
}: Readonly<{
  children?: React.ReactNode;
  titleText: string;
  logOff?: boolean;
  loader?: boolean;
  smallPadding?: boolean;
}>) {
  const navigate = useNavigate();

  return (
    <Paper p='xl' className={authCard}>
      <Stack gap={smallPadding ? 0 : 'md'} className={authCardStack}>
        <Text className={authCardTitle}>{titleText}</Text>
        <Divider className={authDivider} />
        {loader && (
          <Group justify='center'>
            <Loader />
          </Group>
        )}
        {children}
        {logOff && (
          <>
            <Divider className={authDivider} />
            <Button onClick={() => doLogout(navigate)} color='red'>
              <Trans>Log off</Trans>
            </Button>
          </>
        )}
      </Stack>
    </Paper>
  );
}
