import type { ReactNode } from "react";

export interface navigationMenuItem {
    label: string;
    path: string;
    element: ReactNode;
    icon: ReactNode;
}

export interface FilterParams {
  referenceCurrencyUuid?: string;
  timePeriod?: string;
  orderBy?: string;
  orderDirection?: string;
  limit?: string;
  offset?: string;
  [key: string]: string | undefined;
};

export interface CoinLink {
  name: string;          // e.g. "Website", "Twitter", etc.
  type?: string;         // optional category from API
  url: string;
}

export interface CoinSupply {
  confirmed: boolean;
  supplyAt?: number;     // unix (sec)
  max?: string;          // numeric string
  total?: string;        // numeric string
  circulating?: string;  // numeric string
}

export interface CoinAllTimeHigh {
  price: string;         // numeric string (USD)
  timestamp: number;     // unix (sec)
}

export interface CoinDetails {
  uuid: string;
  symbol: string;
  name: string;
  color?: string;            // hex
  iconUrl?: string;          // logo
  websiteUrl?: string;       // main site
  coinrankingUrl?: string;   // source ref
  description?: string;
  price: string;             // current price USD
  change?: string;           // 24h % change (string)
  btcPrice?: string;         // price in BTC (1 for BTC itself)
  "24hVolume"?: string;     // 24h volume USD
  marketCap?: string;        // mkt cap USD
  fullyDilutedMarketCap?: string;
  tier?: number;
  rank?: number;
  numberOfMarkets?: number;
  numberOfExchanges?: number;
  listedAt?: number;         // unix (sec)
  supply?: CoinSupply;
  allTimeHigh?: CoinAllTimeHigh;
  sparkline?: Array<string | null>; // historic prices (string)
  tags?: string[];
  links?: CoinLink[];
}

export interface SparklineProps {
  data: Array<string | number | null | undefined> | undefined;
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}
export interface StatProps {
  label: string;
  value: React.ReactNode;
  subValue?: React.ReactNode;
}