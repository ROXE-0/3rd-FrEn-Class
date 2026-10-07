// PredictionMarketOracleHub ABI & Addresses

import type { Abi } from "viem";

export const PREDICTION_HUB_ADDRESS =
  "0x2b76e3270698c75c2f1bc46C6190Fb5565ED278b" as `0x${string}`;

export const PREDICTION_HUB_ABI: Abi = [
  {
    type: "function",
    name: "nextMarketId",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },

  {
    type: "function",
    name: "markets",
    stateMutability: "view",
    inputs: [
      {
        type: "uint256",
        name: "",
      },
    ],
    outputs: [
      { type: "uint256", name: "id" },
      { type: "string", name: "title" },
      { type: "string", name: "category" },
      { type: "uint256", name: "endTime" },
      { type: "uint8", name: "outcome" },
      { type: "uint256", name: "totalYesPool" },
      { type: "uint256", name: "totalNoPool" },
      { type: "bool", name: "resolved" },
    ],
  },

  {
    type: "function",
    name: "userBets",
    stateMutability: "view",
    inputs: [
      { type: "uint256", name: "" },
      { type: "address", name: "" },
    ],
    outputs: [
      { type: "uint256", name: "yesAmount" },
      { type: "uint256", name: "noAmount" },
      { type: "bool", name: "claimed" },
    ],
  },

  {
    type: "function",
    name: "calculateWinnings",
    stateMutability: "view",
    inputs: [
      { type: "uint256", name: "_marketId" },
      { type: "address", name: "_user" },
    ],
    outputs: [{ type: "uint256" }],
  },

  {
    type: "function",
    name: "getAllMarkets",
    stateMutability: "view",
    inputs: [],
    outputs: [
      {
        type: "tuple[]",
        components: [
          { type: "uint256", name: "id" },
          { type: "string", name: "title" },
          { type: "string", name: "category" },
          { type: "uint256", name: "endTime" },
          { type: "uint8", name: "outcome" },
          { type: "uint256", name: "totalYesPool" },
          { type: "uint256", name: "totalNoPool" },
          { type: "bool", name: "resolved" },
        ],
      },
    ],
  },

  {
    type: "function",
    name: "placeBet",
    stateMutability: "payable",
    inputs: [
      { type: "uint256", name: "_marketId" },
      { type: "bool", name: "_isYes" },
    ],
    outputs: [],
  },

  {
    type: "function",
    name: "claimWinnings",
    stateMutability: "nonpayable",
    inputs: [{ type: "uint256", name: "_marketId" }],
    outputs: [],
  },

  {
    type: "function",
    name: "createMarket",
    stateMutability: "nonpayable",
    inputs: [
      { type: "string", name: "_title" },
      { type: "string", name: "_category" },
      { type: "uint256", name: "_durationSeconds" },
    ],
    outputs: [{ type: "uint256" }],
  },

  {
    type: "function",
    name: "resolveMarket",
    stateMutability: "nonpayable",
    inputs: [
      { type: "uint256", name: "_marketId" },
      { type: "uint8", name: "_outcome" },
    ],
    outputs: [],
  },

  {
    type: "event",
    name: "MarketCreated",
    inputs: [
      {
        type: "uint256",
        name: "marketId",
        indexed: true,
      },
      {
        type: "string",
        name: "title",
        indexed: false,
      },
      {
        type: "string",
        name: "category",
        indexed: false,
      },
      {
        type: "uint256",
        name: "endTime",
        indexed: false,
      },
    ],
  },

  {
    type: "event",
    name: "BetPlaced",
    inputs: [
      {
        type: "uint256",
        name: "marketId",
        indexed: true,
      },
      {
        type: "address",
        name: "user",
        indexed: true,
      },
      {
        type: "bool",
        name: "isYes",
        indexed: false,
      },
      {
        type: "uint256",
        name: "amount",
        indexed: false,
      },
    ],
  },

  {
    type: "event",
    name: "MarketResolved",
    inputs: [
      {
        type: "uint256",
        name: "marketId",
        indexed: true,
      },
      {
        type: "uint8",
        name: "outcome",
        indexed: false,
      },
    ],
  },

  {
    type: "event",
    name: "WinningsClaimed",
    inputs: [
      {
        type: "uint256",
        name: "marketId",
        indexed: true,
      },
      {
        type: "address",
        name: "user",
        indexed: true,
      },
      {
        type: "uint256",
        name: "amount",
        indexed: false,
      },
    ],
  },
];
