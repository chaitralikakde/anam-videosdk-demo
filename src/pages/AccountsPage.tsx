import React from "react";
import { Link } from "react-router-dom";

export const AccountsPage: React.FC = () => {
  const accounts = [
    { type: "Checking Account", number: "****4521", balance: "$12,450.00", color: "#0F172A",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg> },
    { type: "Savings Account", number: "****8834", balance: "$45,230.50", color: "#059669", extra: "4.5% APY",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
    { type: "Credit Card", number: "****7892", balance: "$2,150.00", color: "#7C3AED", extra: "Limit: $10,000",
      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
  ];

  const transactions = [
    { id: 1, desc: "Amazon Purchase", amount: "-$89.99", date: "Mar 12, 2026", type: "debit" },
    { id: 2, desc: "Salary Deposit", amount: "+$5,200.00", date: "Mar 10, 2026", type: "credit" },
    { id: 3, desc: "Netflix Subscription", amount: "-$15.99", date: "Mar 8, 2026", type: "debit" },
    { id: 4, desc: "Transfer from Savings", amount: "+$500.00", date: "Mar 7, 2026", type: "credit" },
    { id: 5, desc: "Electric Bill", amount: "-$120.00", date: "Mar 5, 2026", type: "debit" },
    { id: 6, desc: "Grocery Store", amount: "-$67.43", date: "Mar 4, 2026", type: "debit" },
  ];

  return (
    <div className="page accounts-page">
      <div className="page-header">
        <h1>Accounts</h1>
        <p>Overview of all your banking accounts</p>
      </div>

      <div className="accounts-grid">
        {accounts.map((acc, i) => (
          <div key={i} className="account-card" style={{ borderTopColor: acc.color }}>
            <div className="account-card-header">
              <div className="account-icon-wrapper">{acc.icon}</div>
              <span className="account-number">{acc.number}</span>
            </div>
            <div className="account-type">{acc.type}</div>
            <div className="account-balance">{acc.balance}</div>
            {acc.extra && <div className="account-extra">{acc.extra}</div>}
            <div className="account-actions">
              <button className="btn btn-sm btn-outline">View Details</button>
              <Link to="/transfers" className="btn btn-sm btn-primary">Transfer</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="transactions-section">
        <h2>Recent Transactions</h2>
        <div className="transactions-list">
          {transactions.map(tx => (
            <div key={tx.id} className="transaction-item">
              <div className="tx-info">
                <div className={`tx-dot ${tx.type}`}></div>
                <div>
                  <div className="tx-desc">{tx.desc}</div>
                  <div className="tx-date">{tx.date}</div>
                </div>
              </div>
              <div className={`tx-amount ${tx.type}`}>{tx.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
