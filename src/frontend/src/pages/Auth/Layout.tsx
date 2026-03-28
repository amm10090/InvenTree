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
import { Outlet, useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import SplashScreen from '../../components/SplashScreen';
import { InvenTreeLogo } from '../../components/items/InvenTreeLogo';
import { doLogout } from '../../functions/auth';
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

export default function LoginLayoutComponent() {
  const [server] = useServerApiState(useShallow((state) => [state.server]));

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
