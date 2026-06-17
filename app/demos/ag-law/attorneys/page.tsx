import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const attorneys = [
  {
    name: "Ahmed Abdelgawad",
    title: "Senior Partner",
    practice: "Corporate · M&A",
    bars: ["Egypt", "England & Wales"],
    languages: ["Arabic", "English", "French"],
    bio: "Founding partner. Forty years advising sovereign clients, family offices and listed groups across the MENA region.",
    education: "LL.B Cairo · LL.M Harvard",
  },
  {
    name: "Yasmin El-Sherbini",
    title: "Managing Partner",
    practice: "Banking & Finance",
    bars: ["Egypt", "DIFC"],
    languages: ["Arabic", "English"],
    bio: "Heads the firm's banking practice. Lead counsel on the largest syndicated facility in Egypt in 2024.",
    education: "LL.B Ain Shams · LL.M Cambridge",
  },
  {
    name: "Karim Madkour",
    title: "Partner",
    practice: "Dispute Resolution",
    bars: ["Egypt", "ICC", "LCIA"],
    languages: ["Arabic", "English", "Italian"],
    bio: "Arbitrator and counsel in commercial and investor-state matters. Listed in WWL Future Leaders for Arbitration.",
    education: "LL.B Cairo · LL.M Sciences Po",
  },
  {
    name: "Layla Mansour",
    title: "Partner",
    practice: "Energy & Infrastructure",
    bars: ["Egypt", "ADGM"],
    languages: ["Arabic", "English"],
    bio: "Project finance and concession agreements across upstream, midstream and renewables. Two-time IFLR1000 Rising Star.",
    education: "LL.B Alexandria · LL.M Columbia",
  },
  {
    name: "Hossam Eid",
    title: "Counsel",
    practice: "Corporate · M&A",
    bars: ["Egypt"],
    languages: ["Arabic", "English"],
    bio: "Cross-border acquisitions and private equity. Joined the firm from a magic-circle practice in 2022.",
    education: "LL.B Cairo · LL.M NYU",
  },
  {
    name: "Nour El-Sayed",
    title: "Counsel",
    practice: "Tax & Regulatory",
    bars: ["Egypt", "Chartered Tax Adviser"],
    languages: ["Arabic", "English", "German"],
    bio: "Transfer pricing, indirect tax and FRA regulatory work. Author of the firm's quarterly tax bulletin.",
    education: "LL.B Cairo · LL.M Munich",
  },
];

export const metadata = { title: "Attorneys · AG Law" };

export default function AttorneysPage() {
  return (
    <main className="mx-auto max-w-[1240px] px-6 py-20 md:px-10 md:py-28">
      <div className="text-[11px] uppercase tracking-[0.28em] text-[#B89466]">
        Our people
      </div>
      <h1
        className="mt-4 text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.05]"
        style={{ fontFamily: "var(--agl-display)" }}
      >
        The partnership.
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#0F1A33]/75 md:text-lg">
        Senior practitioners with decades of combined experience. Each of our
        partners has trained, practiced or sat as adjudicator in jurisdictions
        beyond Egypt, and our counsel pool is admitted at the bars of London,
        Paris, the DIFC and the ADGM.
      </p>

      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-[#0F1A33]/10 bg-[#0F1A33]/10 md:grid-cols-2">
        {attorneys.map((a) => (
          <article key={a.name} className="bg-[#F6F1E6] p-8 md:p-10">
            <div className="flex items-start gap-5">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm border border-[#0F1A33]/15 bg-[#0F1A33]/[0.04] text-[11px] uppercase tracking-[0.2em] text-[#0F1A33]/70"
                aria-hidden
              >
                {a.name
                  .split(" ")
                  .slice(0, 2)
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex-1">
                <h2
                  className="text-2xl"
                  style={{ fontFamily: "var(--agl-display)" }}
                >
                  {a.name}
                </h2>
                <div className="mt-1 text-[12px] uppercase tracking-[0.18em] text-[#B89466]">
                  {a.title} · {a.practice}
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-[#0F1A33]/75">
              {a.bio}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-[#0F1A33]/10 pt-5 text-[12px] leading-relaxed">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0F1A33]/55">
                  Bar
                </dt>
                <dd className="mt-1">{a.bars.join(", ")}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0F1A33]/55">
                  Languages
                </dt>
                <dd className="mt-1">{a.languages.join(", ")}</dd>
              </div>
              <div className="col-span-2">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#0F1A33]/55">
                  Education
                </dt>
                <dd className="mt-1">{a.education}</dd>
              </div>
            </dl>

            <Link
              href="/demos/ag-law/book"
              className="group mt-7 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[#0F1A33] hover:text-[#B89466]"
            >
              Request a consultation
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
