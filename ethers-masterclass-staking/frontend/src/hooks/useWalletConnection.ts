Adindu Ezinwanne@XERO MINGW64 ~/Downloads/Random/frontend-classes-web3/ethers-masterclass-prediction/frontend (prediction-market-fe-challenge)
$ npm install wagmi viem @tanstack/react-query @reown/appkit @reown/appkit-adapter-wagmi
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
npm error
npm error While resolving: prediction-market-frontend@0.0.0
npm error Found: typescript@5.7.3
npm error node_modules/typescript
npm error   dev typescript@"~5.7.2" from the root project
npm error   peerOptional typescript@">=5.0.4" from @abstract-foundation/agw-client@1.12.3
npm error   node_modules/@abstract-foundation/agw-client
npm error     peerOptional @abstract-foundation/agw-client@"^1.0.0" from @privy-io/react-auth@3.47.0
npm error     node_modules/@privy-io/react-auth
npm error       peerOptional @privy-io/react-auth@">=3.25.0" from accounts@0.18.5
npm error       node_modules/accounts
npm error         peerOptional accounts@"~0.18" from @wagmi/core@3.6.5
npm error         node_modules/@wagmi/core
npm error   3 more (viem, @solana/kit, ox)
npm error
npm error Could not resolve dependency:
npm error peerOptional typescript@">=5.9.3" from @wagmi/core@3.6.5
npm error node_modules/@wagmi/core
npm error   peer @wagmi/core@">=2.21.2" from @reown/appkit-adapter-wagmi@1.8.24
npm error   node_modules/@reown/appkit-adapter-wagmi
npm error     @reown/appkit-adapter-wagmi@"*" from the root project
npm error   peerOptional @wagmi/core@">=3.4.3" from accounts@0.18.5
npm error   1 more (wagmi)
npm error
npm error Fix the upstream dependency conflict, or retry this command with --force or --legacy-peer-deps to accept an incorrect (and potentially broken) dependency resolution.
npm error
npm error
npm error For a full report see:
npm error C:\Users\Adindu Ezinwanne\.npm-cache\_logs\2026-10-06T19_23_34_997Z-eresolve-report.txt
npm error A complete log of this run can be found in: C:\Users\Adindu Ezinwanne\.npm-cache\_logs\2026-10-06T19_23_34_997Z-debug-0.log



// import { useState, useEffect, useCallback, useMemo } from "react";
// import { BrowserProvider, JsonRpcSigner, formatEther } from "ethers";
// import {
//   EIP6963AnnounceProvider,
//   EIP6963RequestProvider,
//   SUPPORTED_CHAINS,
// } from "../constants";

// type EIP1193Provider = {
//   request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
//   on: (event: string, listener: (...args: any[]) => void) => void;
//   removeListener: (event: string, listener: (...args: any[]) => void) => void;
// };

// type EIP6963ProviderDetail = {
//   info: {
//     rdns: string;
//   };
//   provider: EIP1193Provider;
// };

// type EIP6963ProviderEvent = CustomEvent<EIP6963ProviderDetail>;

// type ProviderError = Error & {
//   code?: number;
// };

// type ChainConfig = {
//   name: string;
//   nativeCurrency: {
//     name: string;
//     symbol: string;
//     decimals: number;
//   };
//   rpcUrl: string;
//   blockExplorer: string;
// };

// type SupportedChains = Record<number, ChainConfig>;

// const chains = SUPPORTED_CHAINS as SupportedChains;

// export const useWalletConnection = () => {
//   const [account, setAccount] = useState<string | null>("");
//   const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
//   const [balance, setBalance] = useState<string | null>(null);
//   const [chainId, setChainId] = useState<number | null>(null);
//   const [browserProvider, setBrowserProvider] =
//     useState<BrowserProvider | null>(null);
//   const [provider, setProvider] = useState<EIP1193Provider | null>(null);
//   const [isRefreshingBalance, setIsRefreshingBalance] =
//     useState<boolean>(false);
//   const [isConnecting, setIsConnecting] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const isSupportedChain = useMemo(() => {
//     if (!chainId) {
//       return false;
//     }
//     return Boolean(chains[chainId]);
//   }, [chainId]);

//   const currentChain = useMemo(() => {
//     if (!chainId) {
//       return null;
//     }
//     return chains[chainId] || null;
//   }, [chainId]);

//   const setAccountAndSigner = useCallback(
//     async (accounts: string[]): Promise<void> => {
//       if (browserProvider && accounts.length > 0) {
//         const newAccount = accounts[0];
//         setAccount(newAccount);
//         const signer = await browserProvider.getSigner(newAccount);
//         setSigner(signer);
//       } else {
//         setAccount(null);
//         setSigner(null);
//         setBalance(null);
//       }
//     },
//     [browserProvider]
//   );

//   const getBalance = useCallback(async (): Promise<void> => {
//     if (!browserProvider || !account) {
//       return;
//     }

//     try {
//       setIsRefreshingBalance(true);

//       const network = await browserProvider.getNetwork();

//       if (!chains[Number(network.chainId)]) {
//         setBalance(null);
//         return;
//       }

//       const balance = await browserProvider.getBalance(account);

//       setBalance(Number(formatEther(balance)).toFixed(5));
//     } catch (error: unknown) {
//       console.error("Failed to fetch balance:", error);

//       setBalance(null);
//     } finally {
//       setIsRefreshingBalance(false);
//     }
//   }, [browserProvider, account]);

//   const switchChain = useCallback(
//     async (targetChainId: number): Promise<void> => {
//       if (!provider) {
//         throw new Error("No wallet provider detected.");
//       }

//       const chain = chains[targetChainId];
//       if (!chain) {
//         throw new Error(
//           `Chain ${targetChainId} is not supported by this application.`
//         );
//       }

//       const hexChainId = `0x${targetChainId.toString(16)}`;
//       try {
//         await provider.request({
//           method: "wallet_switchEthereumChain",
//           params: [{ chainId: hexChainId }],
//         });
//       } catch (error: unknown) {
//         /** * Error 4902 means the wallet does not know * about this chain yet. * * Ask the wallet to add it. */
//         // Check for all error codes here https://eips.ethereum.org/EIPS/eip-1193 under the Provider Errors;
//         const providerError = error as ProviderError;

//         if (providerError.code === 4902) {
//           await provider.request({
//             method: "wallet_addEthereumChain",
//             params: [
//               {
//                 chainId: hexChainId,
//                 chainName: chain.name,
//                 nativeCurrency: chain.nativeCurrency,
//                 rpcUrls: [chain.rpcUrl],
//                 blockExplorerUrls: [chain.blockExplorer],
//               },
//             ],
//           });
//           await provider.request({
//             method: "wallet_switchEthereumChain",
//             params: [{ chainId: hexChainId }],
//           });
//         } else {
//           throw error;
//         }
//       }
//     },
//     [provider]
//   );

//   const validateChainId = useCallback((): boolean => {
//     if (!chainId) {
//       return false;
//     }

//     return Boolean(SUPPORTED_CHAINS[chainId]);
//   }, [chainId]);

//   const connectWallet = useCallback(async (): Promise<void> => {
//     if (!browserProvider) {
//       throw new Error("No wallet provider detected.");
//     }
//     setIsConnecting(true);
//     try {
//       const accounts = (await browserProvider.send(
//         "eth_requestAccounts",
//         []
//       )) as string[];
//       await setAccountAndSigner(accounts);
//       const network = await browserProvider.getNetwork();
//       setChainId(Number(network.chainId));
//     } catch (error: any) {
//       setError(
//         error && error.message
//           ? error.message
//           : "An unexpected error occured, please try again"
//       );
//     } finally {
//       setIsConnecting(false);
//     }
//   }, [browserProvider, setAccountAndSigner]);

//   const disconnectWallet = useCallback(async (): Promise<void> => {
//     try {
//       if (provider) {
//         await provider.request({
//           method: "wallet_revokePermissions",
//           params: [{ eth_accounts: {} }],
//         });
//       }
//     } catch (error: unknown) {
//       console.error("Failed to revoke wallet permission:", error);
//     }

//     setAccount(null);
//     setSigner(null);
//     setChainId(null);
//     setBalance(null);
//   }, [provider]);

//   const handleAccountsChanged = useCallback(
//     async (accounts: string[]): Promise<void> => {
//       await setAccountAndSigner(accounts);

//       if (accounts.length == 0) {
//         setChainId(null);
//         setBalance(null);
//       }
//     },
//     [setAccountAndSigner]
//   );

//   const handleChainChanged = useCallback(
//     (newChainId: string): void => {
//       setChainId(parseInt(newChainId, 16));

//       setBalance(null);
//       if (provider) {
//         setBrowserProvider(new BrowserProvider(provider as any));
//       }
//     },
//     [provider]
//   );

//   const handleDisconnect = useCallback(
//     async (error: unknown): Promise<void> => {
//       console.error("Wallet disocnnected with error: ", error);
//       await disconnectWallet();
//       console.log("handle disconnect successful...");
//     },
//     [disconnectWallet]
//   );

//   useEffect(() => {
//     const init = async (): Promise<void> => {
//       if (!browserProvider) {
//         return;
//       }

//       console.log("browserProvider is nowwwwwwwwww set....");
//       const accounts = (await browserProvider.send(
//         "eth_accounts",
//         []
//       )) as string[];

//       if (accounts.length == 0) {
//         return;
//       }
//       await setAccountAndSigner(accounts);

//       const network = await browserProvider.getNetwork();
//       setChainId(Number(network.chainId));
//     };

//     if (!browserProvider) {
//       console.log("browserProvider is not set....");
//       return;
//     }

//     init();
//   }, [browserProvider, setAccountAndSigner]);

//   useEffect(() => {
//     if (!provider) {
//       return;
//     }

//     provider.on("chainChanged", handleChainChanged);
//     provider.on("accountsChanged", handleAccountsChanged);
//     provider.on("disconnect", handleDisconnect);

//     return () => {
//       provider.removeListener("chainChanged", handleChainChanged);
//       provider.removeListener("accountsChanged", handleAccountsChanged);
//       provider.removeListener("disconnect", handleDisconnect);
//     };
//   }, [provider, handleAccountsChanged, handleChainChanged, handleDisconnect]);

//   useEffect(() => {
//     if (!account || !browserProvider) {
//       return;
//     }
//     getBalance();
//   }, [account, browserProvider, getBalance]);

//   useEffect(() => {
//     const handleProviderAnnouncement = (event: Event): void => {
//       const providerEvent = event as EIP6963ProviderEvent;

//       if (providerEvent.detail.info.rdns === "io.metamask") {
//         const injectedProvider = providerEvent.detail.provider;

//         setProvider(injectedProvider);
//         setBrowserProvider(new BrowserProvider(injectedProvider as any));
//       }
//     };

//     window.addEventListener(
//       EIP6963AnnounceProvider,
//       handleProviderAnnouncement
//     );

//     window.dispatchEvent(new Event(EIP6963RequestProvider));

//     return () => {
//       window.removeEventListener(
//         EIP6963AnnounceProvider,
//         handleProviderAnnouncement
//       );
//     };
//   }, []);

//   return {
//     wallet: {
//       address: account,
//       chainId,
//       balance,
//       isConnected: !!account,
//       isConnecting,
//       error,
//     },
//     provider,
//     browserProvider,
//     signer,

//     chainId,
//     isSupportedChain,
//     currentChain,
//     supportedChains: SUPPORTED_CHAINS,

//     connectWallet,
//     disconnectWallet,
//     getBalance,
//     switchNetwork: switchChain,
//     validateChainId,
//   };
// };
