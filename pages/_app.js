import "../styles/globals.css";

import { WagmiConfig, createConfig, configureChains } from "wagmi";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { SessionProvider } from "next-auth/react";
import { mainnet, sepolia } from "wagmi/chains";
import { infuraProvider } from "wagmi/providers/infura";
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, sepolia],
  [infuraProvider({ apiKey: "a998955bf89e4c21b1db087604cce0ce" })],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "...",
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={config}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Component {...pageProps} suppressHydrationWarning />
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
