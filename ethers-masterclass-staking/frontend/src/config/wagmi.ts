import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { sepolia } from "wagmi/chains";

const projectId = "YOUR_PROJECT_ID";

const metadata = {
  name: "Prediction Market",
  description: "Prediction Market dApp",
  url: window.location.origin,
  icons: [],
};

const networks = [sepolia];

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
});

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
});
