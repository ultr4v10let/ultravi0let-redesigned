import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Coins,
  FileCode2,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";

const stats = [
  { v: "EGP 38M", k: "Pooled across circles" },
  { v: "11,400", k: "Members" },
  { v: "98.4%", k: "On-time contribution rate" },
  { v: "Zero", k: "Defaults to date" },
];

const features = [
  {
    i: Users,
    t: "Circles of six to twenty",
    d: "Form a circle with friends, family, or strangers we&apos;ve vetted. Everyone contributes monthly; one member receives the pot each month.",
  },
  {
    i: FileCode2,
    t: "Smart-contract custody",
    d: "Funds are held by an audited Solidity contract on Base, not by us. Payouts execute automatically. No human can divert the pot.",
  },
  {
    i: BadgeCheck,
    t: "KYC for every member",
    d: "Sumsub-powered identity, sanctions screening, and reputation scoring. Late-payers get rate-limited; defaulters cannot rejoin.",
  },
  {
    i: ShieldCheck,
    t: "Double-entry ledger",
    d: "Every contribution and payout is a balanced journal entry. Audit your full position at any time, down to the wei.",
  },
];

const live = [
  { name: "Layali Family Circle", size: 8, slot: "3 / 8", monthly: "EGP 1,500", next: "12 days" },
  { name: "Founders Group · Dubai", size: 12, slot: "Joining", monthly: "EGP 5,000", next: "—" },
  { name: "Sherouq Engineers", size: 6, slot: "5 / 6", monthly: "EGP 4,000", next: "8 days" },
];

export default function CotHome() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#28160E]/10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[600px] w-[600px] rounded-full opacity-40 blur-[100px]"
          style={{
            background:
              "radial-gradient(closest-side, #B85138 0%, transparent 70%)",
          }}
        />
        <div className="mx-auto grid max-w-[1240px] gap-12 px-6 py-20 md:grid-cols-[1.2fr_1fr] md:px-10 md:py-28">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#B85138]">
              Rotating credit · reinvented
            </div>
            <h1
              className="mt-6 text-[clamp(2.6rem,6vw,5.5rem)] leading-[1] tracking-tight"
              style={{ fontFamily: "var(--cot-display)" }}
            >
              Money you grow
              <br />
              <em>together</em>, not alone.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-[#28160E]/75 md:text-lg">
              An ancient practice — the gameya, the chit fund, the ROSCA —
              rebuilt for 2026. Pool funds with a trusted circle. Take your
              turn at the front of the line. No interest, no banks, no
              collateral.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/demos/circle-of-trust/circles"
                className="inline-flex items-center gap-2 rounded-full bg-[#28160E] px-6 py-3.5 text-sm font-medium text-[#FBF2E4] transition-colors hover:bg-[#B85138]"
              >
                Browse open circles
                <ArrowRight size={16} />
              </Link>
              <Link
                href="#how"
                className="inline-flex items-center gap-2 rounded-full border border-[#28160E]/20 px-6 py-3.5 text-sm font-medium text-[#28160E] transition-colors hover:bg-[#28160E]/[0.04]"
              >
                How it works
              </Link>
            </div>

            <div className="mt-10 inline-flex items-center gap-2.5 rounded-full border border-[#28160E]/15 bg-[#FBF2E4] px-4 py-2 text-xs text-[#28160E]/75">
              <FileCode2 size={14} className="text-[#B85138]" />
              Custody secured by audited smart contracts on{" "}
              <span className="font-mono text-[#28160E]">Base</span>
            </div>
          </div>

          {/* Live circles card */}
          <div className="relative">
            <div className="rounded-3xl border border-[#28160E]/15 bg-white p-1.5 shadow-[0_20px_60px_-20px_rgba(40,22,14,0.25)]">
              <div className="rounded-[20px] bg-[#FFFBF4] p-5">
                <div className="flex items-center justify-between border-b border-[#28160E]/10 pb-3">
                  <div className="font-medium">Open circles · this week</div>
                  <Link
                    href="/demos/circle-of-trust/circles"
                    className="text-xs text-[#B85138] hover:underline"
                  >
                    See all
                  </Link>
                </div>
                <ul className="mt-4 space-y-3">
                  {live.map((c) => (
                    <li
                      key={c.name}
                      className="flex items-center gap-3 rounded-xl border border-[#28160E]/10 p-3"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B85138]/15 text-[#B85138]">
                        <Coins size={16} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{c.name}</div>
                        <div className="text-[12px] text-[#28160E]/55">
                          {c.size} members · {c.monthly}/mo
                        </div>
                      </div>
                      <div className="text-right text-[11px]">
                        <div className="font-mono text-[#28160E]/75">{c.slot}</div>
                        <div className="text-[#28160E]/45">
                          {c.next === "—" ? "Forming" : `Next ${c.next}`}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-px overflow-hidden border-t border-[#28160E]/10 bg-[#28160E]/10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.k} className="bg-[#FBF2E4] p-6">
              <div
                className="text-3xl md:text-4xl"
                style={{ fontFamily: "var(--cot-display)" }}
              >
                {s.v}
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[#28160E]/55">
                {s.k}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How */}
      <section id="how" className="bg-[#FBF2E4]">
        <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-10 md:py-28">
          <div className="text-[11px] uppercase tracking-[0.22em] text-[#B85138]">
            How it works
          </div>
          <h2
            className="mt-3 text-[clamp(2rem,4.4vw,3.6rem)] leading-tight"
            style={{ fontFamily: "var(--cot-display)" }}
          >
            Old idea. <em>New plumbing.</em>
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-[#28160E]/12 bg-[#28160E]/10 md:grid-cols-2">
            {features.map((f) => (
              <div key={f.t} className="bg-[#FBF2E4] p-8 md:p-10">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#28160E] text-[#FBF2E4]"
                >
                  <f.i size={20} />
                </div>
                <h3
                  className="mt-5 text-2xl"
                  style={{ fontFamily: "var(--cot-display)" }}
                  dangerouslySetInnerHTML={{ __html: f.t }}
                />
                <p
                  className="mt-3 text-sm leading-relaxed text-[#28160E]/75"
                  dangerouslySetInnerHTML={{ __html: f.d }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust + smart contracts */}
      <section id="trust" className="border-y border-[#28160E]/10 bg-[#28160E] text-[#FBF2E4]">
        <div className="mx-auto grid max-w-[1240px] gap-12 px-6 py-20 md:grid-cols-[1.1fr_1fr] md:px-10 md:py-28">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-[#E8A982]">
              Smart contracts · audit
            </div>
            <h2
              className="mt-4 text-[clamp(2rem,4vw,3.2rem)] leading-tight"
              style={{ fontFamily: "var(--cot-display)" }}
            >
              The pot is <em>never</em> in our hands.
            </h2>
            <p className="mt-6 max-w-lg text-[#FBF2E4]/75">
              Every active circle is a Solidity contract deployed on Base
              mainnet. Contributions go straight from your wallet into the
              contract escrow; payouts execute automatically on the agreed
              date. We cannot pause, divert, or freeze your funds — and we
              wouldn&apos;t want to be able to.
            </p>
            <Link
              href="#"
              className="mt-8 inline-flex items-center gap-2 text-sm text-[#E8A982] hover:text-white"
            >
              Read the OpenZeppelin audit
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#FBF2E4]/15 bg-[#1A0E08]">
            <div className="flex items-center gap-3 border-b border-[#FBF2E4]/10 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#FBF2E4]/55">
              <span className="h-2 w-2 rounded-full bg-[#E8A982]" />
              CircleEscrow.sol · v3.2 · audited
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[11px] leading-relaxed text-[#FBF2E4]/85">
{`function contribute(uint256 circleId) external payable {
  Circle storage c = circles[circleId];
  require(block.timestamp >= c.cycleStart);
  require(msg.value == c.monthlyAmount, "amount");
  c.balances[msg.sender] += msg.value;
  emit Contribution(circleId, msg.sender, msg.value);

  if (totalThisCycle(c) == c.fullPot) {
    address payable winner = c.queue[c.position];
    c.position++;
    winner.transfer(c.fullPot);
    emit Payout(circleId, winner, c.fullPot);
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[#FBF2E4]">
        <div className="mx-auto max-w-[1240px] px-6 py-16 md:px-10 md:py-24">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2
                className="text-[clamp(2rem,4vw,3rem)] leading-tight"
                style={{ fontFamily: "var(--cot-display)" }}
              >
                Ready to take your turn?
              </h2>
              <p className="mt-3 max-w-xl text-[#28160E]/75">
                Browse open circles and pick one that fits your monthly
                contribution. KYC takes about three minutes.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/demos/circle-of-trust/circles"
                className="inline-flex items-center gap-2 rounded-full bg-[#B85138] px-6 py-3.5 text-sm font-medium text-[#FBF2E4] transition-colors hover:bg-[#9F4129]"
              >
                <Wallet size={16} />
                Browse circles
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
