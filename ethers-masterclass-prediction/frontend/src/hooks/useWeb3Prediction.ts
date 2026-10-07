import { useEffect, useState } from "react";

import { PredictionMarketData } from "../types/prediction";

import { formatEther, parseEther } from "viem";

import { useReadContract, useReadContracts, useWriteContract } from "wagmi";

import {
  PREDICTION_HUB_ADDRESS,
  PREDICTION_HUB_ABI,
} from "../contracts/predictionConfig";

export const usePredictionMarket = (walletAddress: string | null) => {
  // TODO FOR ASSIGNMENT:
  // 1. Connect to PredictionMarketOracleHub contract using ethers.Contract
  // 2. Fetch all markets using getAllMarkets()
  // 3. For each market, read calculateWinnings() and userBets() for connected user
  // 4. Implement event listeners for MarketCreated, BetPlaced, MarketResolved, WinningsClaimed
  // 5. Implement placeBet(), claimWinnings(), and createMarket() (Owner mode)

  const [markets, setMarkets] = useState<PredictionMarketData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    data: allMarkets,
    isLoading: isMarketsLoading,
    error: marketsError,
  } = useReadContract({
    address: PREDICTION_HUB_ADDRESS,
    abi: PREDICTION_HUB_ABI,
    functionName: "getAllMarkets",
  });

  const { writeContractAsync } = useWriteContract();

  const userReadContracts =
    allMarkets && walletAddress
      ? (allMarkets as any[]).flatMap((market: any) => [
          {
            address: PREDICTION_HUB_ADDRESS,
            abi: PREDICTION_HUB_ABI,
            functionName: "userBets",
            args: [market.id, walletAddress],
          },
          {
            address: PREDICTION_HUB_ADDRESS,
            abi: PREDICTION_HUB_ABI,
            functionName: "calculateWinnings",
            args: [market.id, walletAddress],
          },
        ])
      : undefined;

  const { data: userReadData } = useReadContracts({
    contracts: userReadContracts,
    query: {
      enabled: !!userReadContracts,
    },
  });

  // Provider for reading from the blockchain

  // Contract connected to the provider.
  // This is used for read-only functions.

  const fetchAllMarkets = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!allMarkets) {
        setMarkets([]);
        return;
      }

      console.log("Markets from blockchain:", allMarkets);
      const formattedMarkets: PredictionMarketData[] = (
        allMarkets as any[]
      ).map((market: any, marketIndex: number) => {
        const userBetResult = userReadData?.[marketIndex * 2]?.result as
          | readonly [bigint, bigint, boolean]
          | undefined;

        const winningsResult = userReadData?.[marketIndex * 2 + 1]?.result as
          | bigint
          | undefined;

        return {
          id: Number(market.id),
          title: market.title,
          category: market.category,
          endTime: Number(market.endTime),
          outcome: Number(market.outcome),

          totalYesPool: formatEther(market.totalYesPool),
          totalNoPool: formatEther(market.totalNoPool),

          userYesBet: userBetResult ? formatEther(userBetResult[0]) : "0",

          userNoBet: userBetResult ? formatEther(userBetResult[1]) : "0",

          userClaimed: userBetResult ? userBetResult[2] : false,

          userEstimatedWinnings: winningsResult
            ? formatEther(winningsResult)
            : "0",

          isExpired: Number(market.endTime) < Math.floor(Date.now() / 1000),

          resolved: market.resolved,
        };
      });

      setMarkets(formattedMarkets);
    } catch (err: any) {
      console.error("Failed to fetch markets:", err);

      setError(err?.message || "Failed to fetch markets");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch markets when the hook loads
  // and whenever the connected wallet changes.
  useEffect(() => {
    fetchAllMarkets();
  }, [walletAddress]);

  // Blockchain event listeners

  // Place a YES or NO bet
  const placeBet = async (
    marketId: number,
    isYes: boolean,
    amountEth: string,
  ) => {
    try {
      const txHash = await writeContractAsync({
        address: PREDICTION_HUB_ADDRESS,
        abi: PREDICTION_HUB_ABI,
        functionName: "placeBet",
        args: [BigInt(marketId), isYes],
        value: parseEther(amountEth),
      });

      console.log("Bet transaction submitted:", txHash);

      await fetchAllMarkets();
    } catch (err: any) {
      console.error("Failed to place bet:", err);

      setError(err?.message || "Failed to place bet");
    }
  };

  // Claim winnings from a resolved market
  const claimWinnings = async (marketId: number) => {
    try {
      const txHash = await writeContractAsync({
        address: PREDICTION_HUB_ADDRESS,
        abi: PREDICTION_HUB_ABI,
        functionName: "claimWinnings",
        args: [BigInt(marketId)],
      });

      console.log("Claim transaction submitted:", txHash);

      await fetchAllMarkets();
    } catch (err: any) {
      console.error("Failed to claim winnings:", err);

      setError(err?.message || "Failed to claim winnings");
    }
  };

  // Create a new prediction market.
  // This can only succeed if the connected wallet
  // is the contract owner.
  const createMarket = async (
    title: string,
    category: string,
    durationSeconds: number,
  ) => {
    try {
      const txHash = await writeContractAsync({
        address: PREDICTION_HUB_ADDRESS,
        abi: PREDICTION_HUB_ABI,
        functionName: "createMarket",
        args: [title, category, BigInt(durationSeconds)],
      });

      console.log("Create market transaction submitted:", txHash);

      await fetchAllMarkets();
    } catch (err: any) {
      console.error("Failed to create market:", err);

      setError(err?.message || "Failed to create market");
    }
  };

  return {
    markets,
    isLoading,
    error,
    placeBet,
    claimWinnings,
    createMarket,
  };
};
