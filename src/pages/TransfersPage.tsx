import React, { useEffect } from "react";
import { usePageContext } from "../context/PageContext";

export const TransfersPage: React.FC = () => {
  const { formData, setFormField, highlightedElement, formSubmitTrigger, setFormSubmitTrigger } = usePageContext();

  const quickAmounts = [50, 100, 250, 500];

  useEffect(() => {
    if (formSubmitTrigger === "transfer") {
      console.log("Transfer submitted via agent:", formData);
      alert(`Transfer initiated!\nTo: ${formData.recipient || ""}\nAmount: $${formData.amount || "0"}\nNote: ${formData.note || ""}`);
      setFormSubmitTrigger(null);
    }
  }, [formSubmitTrigger, formData, setFormSubmitTrigger]);

  const recentTransfers = [
    { id: 1, to: "Jane Smith", amount: "$250.00", date: "Mar 11, 2026", status: "Completed" },
    { id: 2, to: "Electric Co.", amount: "$120.00", date: "Mar 9, 2026", status: "Completed" },
    { id: 3, to: "John Doe", amount: "$500.00", date: "Mar 7, 2026", status: "Completed" },
  ];

  return (
    <div className="page transfers-page">
      <div className="page-header">
        <h1>Transfers</h1>
        <p>Send money quickly and securely</p>
      </div>

      <div className="transfer-layout">
        <div className="transfer-form-card">
          <form onSubmit={(e) => {
            e.preventDefault();
            alert(`Transfer sent!\nTo: ${formData.recipient}\nAmount: $${formData.amount}`);
          }}>
            <div className={`form-group ${highlightedElement === "from" ? "highlighted" : ""}`}>
              <label>From Account</label>
              <select className="form-input" data-field="from"
                value={formData.from || ""} onChange={(e) => setFormField("from", e.target.value)}>
                <option value="">Select account</option>
                <option value="checking">Checking (****4521) - $12,450.00</option>
                <option value="savings">Savings (****8834) - $45,230.50</option>
              </select>
            </div>

            <div className={`form-group ${highlightedElement === "recipient" ? "highlighted" : ""}`}>
              <label>Recipient</label>
              <input type="text" placeholder="Name, email, or account number"
                value={formData.recipient || ""} onChange={(e) => setFormField("recipient", e.target.value)}
                className="form-input" data-field="recipient" />
            </div>

            <div className={`form-group ${highlightedElement === "amount" || highlightedElement === "transfer amount" ? "highlighted" : ""}`}>
              <label>Amount</label>
              <div className="amount-input-wrapper">
                <span className="currency-symbol">$</span>
                <input type="number" placeholder="0.00"
                  value={formData.amount || ""} onChange={(e) => setFormField("amount", e.target.value)}
                  className="form-input amount-input" data-field="amount" />
              </div>
              <div className="quick-amounts">
                {quickAmounts.map(amt => (
                  <button key={amt} type="button" className="quick-amount-btn"
                    onClick={() => setFormField("amount", amt.toString())}>
                    ${amt}
                  </button>
                ))}
              </div>
            </div>

            <div className={`form-group ${highlightedElement === "note" ? "highlighted" : ""}`}>
              <label>Note (Optional)</label>
              <input type="text" placeholder="What's this for?"
                value={formData.note || ""} onChange={(e) => setFormField("note", e.target.value)}
                className="form-input" data-field="note" />
            </div>

            <button type="submit" className="btn btn-primary btn-full" data-action="transfer">
              Send Transfer
            </button>
          </form>
        </div>

        <div className="recent-transfers">
          <h3>Recent Transfers</h3>
          <div className="transfer-history">
            {recentTransfers.map(t => (
              <div key={t.id} className="transfer-history-item">
                <div className="transfer-avatar">{t.to[0]}</div>
                <div className="transfer-detail">
                  <div className="transfer-to">{t.to}</div>
                  <div className="transfer-date">{t.date}</div>
                </div>
                <div className="transfer-right">
                  <div className="transfer-amt">{t.amount}</div>
                  <div className="transfer-status">{t.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
