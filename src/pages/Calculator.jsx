import React, { useMemo, useState } from "react";

const RAZORPAY_LINK = "https://rzp.io/rzp/4zSsUO35";

const countryDefaults = {
  India: { currency: "₹", tuition: 3500000, living: 900000, currentSalary: 1200000, postSalary: 2800000, tax: 25 },
  USA: { currency: "$", tuition: 120000, living: 60000, currentSalary: 70000, postSalary: 130000, tax: 30 },
  UK: { currency: "£", tuition: 75000, living: 42000, currentSalary: 45000, postSalary: 85000, tax: 28 },
  Canada: { currency: "C$", tuition: 105000, living: 52000, currentSalary: 60000, postSalary: 115000, tax: 30 },
  Germany: { currency: "€", tuition: 50000, living: 36000, currentSalary: 45000, postSalary: 85000, tax: 38 },
};

function formatMoney(value, symbol) {
  const n = Math.round(Number(value) || 0);
  return `${symbol}${n.toLocaleString("en-IN")}`;
}

function calculateEMI(principal, annualRate, years) {
  const p = Number(principal) || 0;
  const r = (Number(annualRate) || 0) / 100 / 12;
  const months = (Number(years) || 0) * 12;
  if (!p || !months) return 0;
  if (!r) return p / months;
  return (p * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

export default function Calculator() {
  const [country, setCountry] = useState("USA");
  const defaults = countryDefaults[country];

  const [tuition, setTuition] = useState(defaults.tuition);
  const [living, setLiving] = useState(defaults.living);
  const [currentSalary, setCurrentSalary] = useState(defaults.currentSalary);
  const [postSalary, setPostSalary] = useState(defaults.postSalary);
  const [savings, setSavings] = useState(10000);
  const [loanAmount, setLoanAmount] = useState(defaults.tuition * 0.7);
  const [interestRate, setInterestRate] = useState(8);
  const [loanTenure, setLoanTenure] = useState(10);

  function changeCountry(nextCountry) {
    const d = countryDefaults[nextCountry];
    setCountry(nextCountry);
    setTuition(d.tuition);
    setLiving(d.living);
    setCurrentSalary(d.currentSalary);
    setPostSalary(d.postSalary);
    setLoanAmount(Math.round(d.tuition * 0.7));
  }

  const result = useMemo(() => {
    const totalInvestment = Number(tuition) + Number(living);
    const opportunityCost = Number(currentSalary) * 2;
    const trueCost = totalInvestment + opportunityCost - Number(savings);
    const incomeJump = Math.max(0, Number(postSalary) - Number(currentSalary));
    const breakEvenYears = incomeJump > 0 ? trueCost / incomeJump : 999;

    const monthlyTakeHome = (Number(postSalary) * (1 - defaults.tax / 100)) / 12;
    const emi = calculateEMI(loanAmount, interestRate, loanTenure);
    const monthlyLiving = Number(living) / 24;
    const leftover = monthlyTakeHome - emi - monthlyLiving;
    const emiBurden = monthlyTakeHome > 0 ? (emi / monthlyTakeHome) * 100 : 0;

    let verdict = "Comfortable";
    let verdictColor = "#047857";
    let verdictBg = "#d1fae5";

    if (leftover < 0 || emiBurden > 45) {
      verdict = "Financially risky";
      verdictColor = "#b91c1c";
      verdictBg = "#fee2e2";
    } else if (emiBurden > 30) {
      verdict = "Risky but recoverable";
      verdictColor = "#92400e";
      verdictBg = "#fef3c7";
    } else if (emiBurden > 20) {
      verdict = "Manageable";
      verdictColor = "#1d4ed8";
      verdictBg = "#dbeafe";
    }

    return {
      trueCost,
      incomeJump,
      breakEvenYears,
      monthlyTakeHome,
      emi,
      monthlyLiving,
      leftover,
      emiBurden,
      verdict,
      verdictColor,
      verdictBg,
    };
  }, [tuition, living, currentSalary, postSalary, savings, loanAmount, interestRate, loanTenure, defaults.tax]);

  return (
    <main style={styles.page}>
      <div style={styles.wrap}>
        <header style={styles.header}>
          <a href="/" style={styles.back}>← Back to DecisionKit</a>
          <div style={styles.badge}>True MBA ROI Calculator</div>
          <h1 style={styles.h1}>See if your MBA actually pays off.</h1>
          <p style={styles.sub}>
            Free preview shows ROI. Full report shows monthly reality after EMI, rent, tax and risk.
          </p>
        </header>

        <section style={styles.grid}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>1. Quick inputs</h2>

            <label style={styles.label}>MBA / work country</label>
            <select style={styles.input} value={country} onChange={(e) => changeCountry(e.target.value)}>
              {Object.keys(countryDefaults).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <Input label={`Tuition cost (${defaults.currency})`} value={tuition} setValue={setTuition} />
            <Input label={`Living cost during MBA (${defaults.currency})`} value={living} setValue={setLiving} />
            <Input label={`Current annual salary (${defaults.currency})`} value={currentSalary} setValue={setCurrentSalary} />
            <Input label={`Expected post-MBA salary (${defaults.currency})`} value={postSalary} setValue={setPostSalary} />
            <Input label={`Savings / scholarship used (${defaults.currency})`} value={savings} setValue={setSavings} />
            <Input label={`Loan amount (${defaults.currency})`} value={loanAmount} setValue={setLoanAmount} />
            <Input label="Loan interest rate (%)" value={interestRate} setValue={setInterestRate} />
            <Input label="Loan repayment tenure (years)" value={loanTenure} setValue={setLoanTenure} />
          </div>

          <div style={styles.resultCol}>
            <div style={styles.card}>
              <div style={{ ...styles.verdict, color: result.verdictColor, background: result.verdictBg }}>
                {result.verdict}
              </div>

              <h2 style={styles.cardTitle}>Free ROI preview</h2>

              <Metric
                label="Years to recover MBA investment"
                value={result.breakEvenYears > 50 ? "Not recoverable" : `${result.breakEvenYears.toFixed(1)} years`}
              />
              <Metric label="5-year income uplift" value={formatMoney(result.incomeJump * 5, defaults.currency)} />
              <Metric label="True MBA investment" value={formatMoney(result.trueCost, defaults.currency)} />

              <div style={styles.note}>
                This preview only shows ROI. The full report shows whether your monthly life after MBA is actually comfortable.
              </div>
            </div>

            <div style={styles.paywall}>
              <div style={styles.lock}>🔒 Full report locked</div>
              <h2 style={styles.payTitle}>Unlock the real MBA decision report</h2>
              <p style={styles.payText}>
                Your MBA may look good on paper. But your EMI, rent, taxes, and downside risk decide everything.
              </p>

              <ul style={styles.list}>
                <li>Monthly take-home after tax</li>
                <li>EMI burden on your income</li>
                <li>Monthly leftover after living costs</li>
                <li>Worst-case risk warning</li>
                <li>Clear recommendations to reduce risk</li>
              </ul>

              <div style={styles.priceBox}>
                <span style={styles.strike}>Full price: $19</span>
                <strong>Launch price: $7</strong>
                <span>Approx. ₹599 in India. One-time payment. Lifetime access.</span>
              </div>

              <a
                href={RAZORPAY_LINK}
                target="_blank"
                rel="noreferrer"
                style={styles.payButton}
              >
                Unlock Full Report — $7
              </a>
            </div>

            <div style={styles.lockedPreview}>
              <h2 style={styles.cardTitle}>Full report preview</h2>
              <Metric label="Monthly take-home" value="Locked" />
              <Metric label="Monthly EMI" value="Locked" />
              <Metric label="Monthly leftover" value="Locked" />
              <Metric label="EMI burden" value="Locked" />
              <div style={styles.note}>
                Full report unlocks after payment.
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Input({ label, value, setValue }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={styles.label}>{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={styles.input}
      />
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div style={styles.metric}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7f8fb",
    color: "#101827",
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  wrap: {
    maxWidth: 1180,
    margin: "0 auto",
    padding: "32px 24px 80px",
  },
  header: {
    textAlign: "center",
    maxWidth: 820,
    margin: "0 auto 42px",
  },
  back: {
    display: "inline-block",
    marginBottom: 20,
    color: "#64748b",
    textDecoration: "none",
    fontWeight: 700,
  },
  badge: {
    display: "inline-flex",
    padding: "8px 14px",
    borderRadius: 999,
    background: "white",
    border: "1px solid #e5e7eb",
    fontWeight: 850,
    marginBottom: 18,
  },
  h1: {
    fontSize: "clamp(42px, 6vw, 68px)",
    lineHeight: 1,
    letterSpacing: "-0.06em",
    margin: "0 0 18px",
  },
  sub: {
    fontSize: 19,
    color: "#4b5563",
    lineHeight: 1.6,
    margin: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 420px",
    gap: 22,
    alignItems: "start",
  },
  resultCol: {
    display: "grid",
    gap: 18,
    position: "sticky",
    top: 20,
  },
  card: {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 10px 30px rgba(15,23,42,.05)",
  },
  cardTitle: {
    margin: "0 0 18px",
    fontSize: 22,
    letterSpacing: "-0.03em",
  },
  label: {
    display: "block",
    fontSize: 14,
    fontWeight: 800,
    color: "#374151",
    marginBottom: 7,
  },
  input: {
    width: "100%",
    padding: "13px 14px",
    borderRadius: 12,
    border: "1px solid #d1d5db",
    fontSize: 15,
    background: "white",
  },
  verdict: {
    display: "inline-flex",
    padding: "8px 11px",
    borderRadius: 999,
    fontWeight: 950,
    fontSize: 13,
    marginBottom: 14,
  },
  metric: {
    display: "flex",
    justifyContent: "space-between",
    gap: 18,
    padding: "13px 0",
    borderBottom: "1px solid #f1f5f9",
    color: "#475569",
  },
  note: {
    marginTop: 16,
    padding: 14,
    borderRadius: 16,
    background: "#f1f5f9",
    color: "#475569",
    fontSize: 14,
    lineHeight: 1.5,
  },
  paywall: {
    background: "#111827",
    color: "white",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 18px 44px rgba(15,23,42,.20)",
  },
  lock: {
    color: "#cbd5e1",
    fontSize: 13,
    fontWeight: 950,
    marginBottom: 10,
  },
  payTitle: {
    margin: "0 0 10px",
    fontSize: 24,
    letterSpacing: "-0.04em",
  },
  payText: {
    color: "#d1d5db",
    lineHeight: 1.55,
    marginBottom: 14,
  },
  list: {
    margin: 0,
    paddingLeft: 20,
    color: "#e5e7eb",
    lineHeight: 1.75,
  },
  priceBox: {
    display: "grid",
    gap: 4,
    marginTop: 18,
    marginBottom: 14,
  },
  strike: {
    textDecoration: "line-through",
    color: "#9ca3af",
    fontSize: 14,
  },
  payButton: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    textAlign: "center",
    background: "linear-gradient(135deg,#7c3aed,#2563eb)",
    color: "#fff",
    padding: "18px 24px",
    borderRadius: "18px",
    fontSize: "22px",
    fontWeight: "800",
    textDecoration: "none",
    marginTop: "24px",
    boxShadow: "0 12px 30px rgba(37,99,235,.35)",
  },
  lockedPreview: {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 24,
    padding: 24,
    boxShadow: "0 10px 30px rgba(15,23,42,.05)",
    opacity: 0.55,
  },
};