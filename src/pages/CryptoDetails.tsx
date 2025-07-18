import React, { useMemo, useState } from "react";
import { useGetCoinDetails } from "@/state/queries";
import { useParams } from "react-router-dom";
import type { CoinDetails, CoinLink, SparklineProps, StatProps } from "@/types";

const nFormatter = (num: number | null | undefined, digits = 2): string => {
  if (num == null || isNaN(num)) return "-";
  const lookup = [
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "K" },
    { value: 1, symbol: "" },
  ];
  const item = lookup.find((i) => num >= i.value) || lookup[lookup.length - 1];
  const scaled = num / item.value;
  return `${scaled.toFixed(scaled >= 100 ? 0 : digits)}${item.symbol}`;
};

const fmtUSD = (num: number | null | undefined, fractionDigits = 2): string => {
  if (num == null || isNaN(num)) return "-";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
  }).format(num);
};

const fmtPercent = (num: number | null | undefined, fractionDigits = 2): string => {
  if (num == null || isNaN(num)) return "-";
  return `${num.toFixed(fractionDigits)}%`;
};

const toNum = (v: string | number | null | undefined): number | null => {
  if (v == null) return null;
  const n = typeof v === "string" ? parseFloat(v) : v;
  return isNaN(n) ? null : n;
};

const fmtDate = (unixSec?: number | null): string => {
  if (!unixSec) return "-";
  const d = new Date(unixSec * 1000);
  return d.toLocaleDateString();
};

const Sparkline: React.FC<SparklineProps> = ({ data, width = 160, height = 40, stroke = "currentColor", strokeWidth = 2, className }) => {
  const points = useMemo(() => {
    if (!data) return [] as number[];
    const nums = data.map((d) => (typeof d === "string" ? parseFloat(d) : d)).filter((n): n is number => n != null && !isNaN(n));
    return nums;
  }, [data]);

  if (!points.length) return <svg width={width} height={height} className={className} />;

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const stepX = width / (points.length - 1);
  const pathD = points.map((p, i) => {
    const x = i * stepX;
    const y = height - ((p - min) / range) * height;
    return `${i === 0 ? "M" : "L"}${x},${y}`;
  }).join(" ");

  return <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className}>
    <path d={pathD} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
  </svg>;
};

const Stat: React.FC<StatProps> = ({ label, value, subValue }) => (
  <div className="p-4 rounded-xl bg-gray-100 border border-gray-200 flex flex-col items-start gap-1">
    <span className="text-xs uppercase tracking-wider text-gray-600">{label}</span>
    <span className="text-base font-semibold text-black">{value}</span>
    {subValue ? <span className="text-xs text-gray-500">{subValue}</span> : null}
  </div>
);

const ProgressBar: React.FC<{ current: number | null; max: number | null; color?: string }> = ({ current, max, color }) => {
  const pct = current != null && max ? Math.min(100, (current / max) * 100) : 0;
  return (
    <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, backgroundColor: color || "#8884d8" }}
      />
    </div>
  );
};

const Description: React.FC<{ text?: string; maxChars?: number }> = ({ text, maxChars = 280 }) => {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;
  const short = text.length > maxChars ? text.slice(0, maxChars) + "…" : text;
  const showing = expanded ? text : short;
  const showToggle = text.length > maxChars;
  return (
    <div className="mt-4 text-sm leading-relaxed text-gray-800">
      {showing}
      {showToggle && (
        <button onClick={() => setExpanded((v) => !v)} className="ml-2 text-blue-600 hover:underline text-xs font-semibold">
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
};

const LinksList: React.FC<{ links?: CoinLink[] }> = ({ links }) => {
  if (!links?.length) return null;
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {links.map((l) => (
        <li key={l.url}>
          <a href={l.url} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-xs">
            {l.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

const TagsBadges: React.FC<{ tags?: string[] }> = ({ tags }) => {
  if (!tags?.length) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {tags.map((t) => (
        <span key={t} className="px-2 py-0.5 rounded-md text-xs bg-gray-100 border border-gray-300 capitalize">
          {t.replace(/-/g, ' ')}
        </span>
      ))}
    </div>
  );
};

export const CoinDetailsUI: React.FC<{ data: CoinDetails | { coin?: CoinDetails } | null | undefined }> = ({ data }) => {
  const coin: CoinDetails | undefined = (data as any)?.coin ?? (data as any);
  if (!coin) return <div className="p-4">No coin data.</div>;

  const priceNum = toNum(coin.price);
  const changeNum = toNum(coin.change);
  const volNum = toNum((coin as any)["24hVolume"]);
  const mcapNum = toNum(coin.marketCap);
  const fdMcapNum = toNum(coin.fullyDilutedMarketCap);
  const athNum = toNum(coin.allTimeHigh?.price);
  const circNum = toNum(coin.supply?.circulating);
  const maxNum = toNum(coin.supply?.max);

  const athDiffPct = useMemo(() => athNum && priceNum ? ((priceNum - athNum) / athNum) * 100 : null, [athNum, priceNum]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 text-black">
      <header className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          {coin.iconUrl ? (
            <img src={coin.iconUrl} alt={coin.name} className="w-12 h-12" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200" />
          )}
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {coin.name} <span className="text-gray-500 text-lg">{coin.symbol}</span>
            </h1>
            {coin.rank != null && <p className="text-sm text-gray-500">Rank #{coin.rank}</p>}
          </div>
        </div>
        <div className="sm:ml-auto text-left sm:text-right">
          <div className="text-2xl font-bold">{fmtUSD(priceNum, priceNum && priceNum > 100 ? 0 : 2)}</div>
          <div className="text-sm text-black">
            {changeNum != null ? `${changeNum > 0 ? "+" : ""}${changeNum.toFixed(2)}% (24h)` : "-"}
          </div>
        </div>
      </header>

      {coin.sparkline?.length && (
        <div className="mb-8 flex items-center gap-2 text-gray-600 text-xs">
          <Sparkline data={coin.sparkline} stroke={changeNum != null && changeNum < 0 ? "#dc2626" : "#16a34a"} />
          24h price trend
        </div>
      )}

      <section className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <Stat label="Market Cap" value={fmtUSD(mcapNum)} subValue={nFormatter(mcapNum)} />
        <Stat label="24h Volume" value={fmtUSD(volNum)} subValue={nFormatter(volNum)} />
        <Stat label="FD Market Cap" value={fmtUSD(fdMcapNum)} subValue={nFormatter(fdMcapNum)} />
        <Stat label="Markets" value={coin.numberOfMarkets ?? "-"} />
        <Stat label="Exchanges" value={coin.numberOfExchanges ?? "-"} />
        <Stat label="Listed" value={fmtDate(coin.listedAt)} />
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Supply</h2>
        <ProgressBar current={circNum} max={maxNum} color={coin.color} />
        <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
          <span>Circulating: {nFormatter(circNum)}</span>
          <span>Max: {nFormatter(maxNum)}</span>
          {coin.supply?.confirmed && <span className="text-green-600 text-xs">Confirmed</span>}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">All-Time High</h2>
        <div className="flex items-center gap-4 text-sm">
          <span>{fmtUSD(athNum)}</span>
          <span className="text-gray-500">on {fmtDate(coin.allTimeHigh?.timestamp)}</span>
          {athDiffPct != null && (
            <span className="text-xs text-black">{fmtPercent(athDiffPct)} from ATH</span>
          )}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold">About {coin.name}</h2>
        <Description text={coin.description} />
      </section>

      <section className="mb-8">
        <h3 className="text-base font-semibold">Links</h3>
        <LinksList links={coin.links} />
      </section>

      <section className="mb-8">
        <h3 className="text-base font-semibold">Tags</h3>
        <TagsBadges tags={coin.tags} />
      </section>

      {coin.coinrankingUrl && (
        <div className="mt-8 text-xs text-gray-400">
          Data source: <a className="underline" href={coin.coinrankingUrl} target="_blank" rel="noopener noreferrer">CoinRanking</a>
        </div>
      )}
    </div>
  );
};

export const CryptoDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useGetCoinDetails(id || "");

  if (!id) return <div className="p-4">No coin ID in route.</div>;
  if (isLoading) return <div className="p-4">Loading coin details...</div>;
  if (isError) return <div className="p-4 text-red-500">Error: {(error as Error)?.message}</div>;

  return <CoinDetailsUI data={data} />;
};

export default CryptoDetailsPage;
