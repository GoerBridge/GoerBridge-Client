import { useState } from "react";
import styled, { useTheme } from "styled-components";
import { Flex } from "../../components/Box";
import Box from "../../components/Box/Box";
import Grid from "../../components/Box/Grid";
import { Button } from "../../components/Button";
import Heading from "../../components/Heading/Heading";
import Text from "../../components/Text/Text";
import EXTERNAL_LINK_PROPS from "../../util/externalLinkProps";
import getThemeValue from "../../util/getThemeValue";
import { ModalBody, ModalCloseButton, ModalContainer, ModalHeader, ModalTitle } from "../Modal";
import { walletLocalStorageKey } from "./config";
import { Login, WalletConfig } from "./types";
import WalletCard, { MoreWalletCard } from "./WalletCard";

interface Props<T> {
  login: Login<T>;
  onDismiss?: () => void;
  displayCount?: number;
  t: (key: string) => string;
  wallets: WalletConfig<T>[];
}

const WalletWrapper = styled(Box)`
  &::after {
    content: " ";
    display: block;
    height: 4px;
    width: 90%;

    margin: 32px auto 0;
    background: #5ac132;
    border-radius: 4px;
  }
`;

const getPriority = (priority: WalletConfig["priority"]) => (typeof priority === "function" ? priority() : priority);

/**
 * Checks local storage if we have saved the last wallet the user connected with
 * If we find something we put it at the top of the list
 *
 * @returns sorted config
 */
function getPreferredConfig<T>(walletConfig: WalletConfig<T>[]) {
  const sortedConfig = walletConfig.sort(
    (a: WalletConfig<T>, b: WalletConfig<T>) => getPriority(a.priority) - getPriority(b.priority)
  );

  const preferredWalletName = localStorage?.getItem(walletLocalStorageKey);

  if (!preferredWalletName) {
    return sortedConfig;
  }

  const preferredWallet = sortedConfig.find((sortedWalletConfig) => sortedWalletConfig.title === preferredWalletName);

  if (!preferredWallet) {
    return sortedConfig;
  }

  return [
    preferredWallet,
    ...sortedConfig.filter((sortedWalletConfig) => sortedWalletConfig.title !== preferredWalletName),
  ];
}

function ConnectModal<T>({ login, onDismiss = () => null, displayCount = 3, t, wallets: connectors }: Props<T>) {
  const [showMore, setShowMore] = useState(false);
  const theme = useTheme();
  const sortedConfig = getPreferredConfig(connectors);
  // Filter out WalletConnect if user is inside TrustWallet built-in browser
  const walletsToShow =
    window.ethereum?.isTrust &&
    // @ts-ignore
    !window?.ethereum?.isSafePal
      ? sortedConfig.filter((wallet) => wallet.title !== "WalletConnect")
      : sortedConfig;
  const displayListConfig = showMore ? walletsToShow : walletsToShow.slice(0, displayCount);

  return (
    <ModalContainer $maxWidth="630px">
      <ModalHeader background="transparent">
        <ModalTitle>
          <Heading>Connect your Wallet</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <ModalBody minWidth={["320px", null, "340px"]}>
        <WalletWrapper p="24px 0 32px" overflowY="auto">
          <Grid gridTemplateColumns="1fr" width="100%" maxWidth="400px" margin="0 auto">
            {displayListConfig.map((wallet) => (
              <Flex key={wallet.title} justifyContent="center">
                <Flex flexDirection="column" alignItems="center">
                  <WalletCard walletConfig={wallet} login={login} onDismiss={onDismiss} />
                  <Text as="p" fontSize={[16, null, 24]} fontWeight={500} mt="16px">
                    {wallet.title}
                  </Text>
                </Flex>
              </Flex>
            ))}
            {/* {!showMore && walletsToShow.length > 4 && <MoreWalletCard t={t} onClick={() => setShowMore(true)} />} */}
          </Grid>
        </WalletWrapper>
        {/* <Box p="24px">
          <Text textAlign="center" color="textSubtle" as="p" mb="16px">
            {t("Haven’t got a crypto wallet yet?")}
          </Text>
          <Button
            as="a"
            href="https://docs.pancakeswap.finance/get-started/connection-guide"
            variant="subtle"
            width="100%"
            {...EXTERNAL_LINK_PROPS}
          >
            {t("Learn How to Connect")}
          </Button>
        </Box> */}
      </ModalBody>
    </ModalContainer>
  );
}

export default ConnectModal;
