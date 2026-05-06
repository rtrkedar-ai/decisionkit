import React from "react";
import Calculator from "./pages/Calculator";
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7f8fb",
    color: "#101827",
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    overflowX: "hidden",
  },
  wrap: {
    maxWidth: 1080,
    margin: "0 auto",
    padding: "28px 24px 72px",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 64,
  },
  brand: {
    fontWeight: 950,
    letterSpacing: "-0.045em",
    fontSize: 24,
  },
  navCta: {
    padding: "10px 16px",
    borderRadius: 999,
    background: "#111827",
    color: "white",
    fontWeight: 850,
    textDecoration: "none",
    fontSize: 14,
    border: "1px solid #111827",
  },
  hero: {
    textAlign: "center",
    maxWidth: 880,
    margin: "0 auto",
  },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 13px",
    borderRadius: 999,
    background: "#fff",
    border: "1px solid #e5e7eb",
    color: "#374151",
    fontSize: 14,
    fontWeight: 850,
    marginBottom: 22,
    boxShadow: "0 1px 2px rgba(15,23,42,.04)",
  },
  h1: {
    fontSize: "clamp(44px, 5vw, 68px)",
    lineHeight: 1.02,
    letterSpacing: "-0.06em",
    margin: "0 auto 24px",
    maxWidth: 860,
  },
  lead: {
    fontSize: 20,
    lineHeight: 1.6,
    color: "#4b5563",
    maxWidth: 800,
    margin: "0 auto 30px",
  },
  ctaRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px 22px",
    borderRadius: 14,
    background: "#111827",
    color: "white",
    fontWeight: 950,
    textDecoration: "none",
    border: "1px solid #111827",
  },
  secondary: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px 22px",
    borderRadius: 14,
    background: "white",
    color: "#111827",
    fontWeight: 950,
    textDecoration: "none",
    border: "1px solid #d1d5db",
  },
  small: {
    color: "#6b7280",
    fontSize: 14,
    marginTop: 14,
    lineHeight: 1.5,
  },
  mockWrap: {
    maxWidth: 620,
    margin: "48px auto 0",
  },
  mock: {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 28,
    padding: 24,
    boxShadow: "0 24px 60px rgba(15,23,42,.12)",
    width: "100%",
    boxSizing: "border-box",
    textAlign: "left",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 950,
    marginBottom: 14,
  },
  metric: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "13px 0",
    borderBottom: "1px solid #f1f5f9",
    gap: 18,
  },
  metricLabel: {
    color: "#64748b",
    fontSize: 14,
  },
  metricValue: {
    fontWeight: 950,
    textAlign: "right",
  },
  badge: {
    display: "inline-flex",
    padding: "8px 10px",
    borderRadius: 999,
    background: "#fef3c7",
    color: "#854d0e",
    fontWeight: 950,
    fontSize: 13,
    marginBottom: 12,
  },
  lockedValue: {
    filter: "blur(4px)",
    userSelect: "none",
  },
  section: {
    marginTop: 92,
  },
  sectionHead: {
    fontSize: "clamp(34px, 5vw, 54px)",
    lineHeight: 1,
    letterSpacing: "-0.055em",
    margin: "0 0 18px",
    maxWidth: 820,
  },
  sectionText: {
    color: "#4b5563",
    fontSize: 18,
    lineHeight: 1.6,
    maxWidth: 820,
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 18,
    marginTop: 28,
  },
  feature: {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 22,
    padding: 22,
    minHeight: 160,
    boxShadow: "0 8px 24px rgba(15,23,42,.04)",
  },
  featureIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    fontSize: 20,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 950,
    marginBottom: 8,
  },
  featureText: {
    color: "#64748b",
    lineHeight: 1.55,
    fontSize: 15,
  },
  compare: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 18,
    marginTop: 28,
  },
  compareCard: {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 22,
    padding: 24,
    boxShadow: "0 8px 24px rgba(15,23,42,.04)",
  },
  list: {
    margin: "14px 0 0",
    paddingLeft: 20,
    color: "#4b5563",
    lineHeight: 1.8,
  },
  pricing: {
    background: "#111827",
    color: "white",
    borderRadius: 30,
    padding: 34,
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: 24,
    alignItems: "center",
    boxShadow: "0 24px 60px rgba(15,23,42,.18)",
  },
  price: {
    fontSize: 52,
    fontWeight: 950,
    letterSpacing: "-0.06em",
    margin: "8px 0 4px",
  },
  footer: {
    marginTop: 60,
    color: "#6b7280",
    fontSize: 14,
    textAlign: "center",
  },
};

function Metric({ label, value, locked }) {
  return (
    <div style={styles.metric}>
      <span style={styles.metricLabel}>{label}</span>
      <strong style={{ ...styles.metricValue, ...(locked ? styles.lockedValue : {}) }}>{value}</strong>
    </div>
  );
}

function Feature({ icon, title, children }) {
  return (
    <div style={styles.feature}>
      <div style={styles.featureIcon}>{icon}</div>
      <div style={styles.featureTitle}>{title}</div>
      <div style={styles.featureText}>{children}</div>
    </div>
  );
}

export default function App() {

  const path = window.location.pathname;

  if (path === "/calculator") {
    return <Calculator />;
  }

return (
  <main style={styles.page}>
    <div style={styles.wrap}>
      <nav style={styles.nav}>
        <div style={styles.brand}>DecisionKit</div>
        <a href="/calculator" style={styles.navCta}>Get the calculator</a>
      </nav>

      <section style={styles.hero}>
        <div style={styles.eyebrow}>🎓 True MBA ROI Calculator</div>
        <h1 style={styles.h1}>Most MBA ROI calculators lie.</h1>
        <p style={styles.lead}>
          They compare tuition with salary and call it ROI. DecisionKit shows your real MBA return after loan EMI, rent, lifestyle, taxes, job delay, visa risk, and currency mismatch.
        </p>

        <div style={styles.ctaRow}>
          <a href="/calculator" style={styles.primary}>Calculate my MBA ROI</a>
          <a href="#how" style={styles.secondary}>See how it works</a>
        </div>
      </section>
    </div>
  </main>
);
}
