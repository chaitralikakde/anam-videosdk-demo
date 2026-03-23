import React from "react";

export const CardsPage: React.FC = () => {
  return (
    <div className="page cards-page">
      <div className="page-header">
        <h1>Cards</h1>
        <p>Manage your debit and credit cards</p>
      </div>

      <div className="cards-layout">
        <div className="virtual-card-section">
          <div className="virtual-card">
            <div className="vc-top">
              <span className="vc-bank">SecureBank</span>
              <span className="vc-type">VISA</span>
            </div>
            <div className="vc-chip">
              <svg width="36" height="26" viewBox="0 0 40 30">
                <rect width="40" height="30" rx="5" fill="#C9A84C"/>
                <line x1="0" y1="10" x2="40" y2="10" stroke="#A88A30" strokeWidth="2"/>
                <line x1="0" y1="20" x2="40" y2="20" stroke="#A88A30" strokeWidth="2"/>
                <line x1="15" y1="0" x2="15" y2="30" stroke="#A88A30" strokeWidth="1"/>
                <line x1="25" y1="0" x2="25" y2="30" stroke="#A88A30" strokeWidth="1"/>
              </svg>
            </div>
            <div className="vc-number">4521 &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; 7892</div>
            <div className="vc-bottom">
              <div>
                <div className="vc-label">Card Holder</div>
                <div className="vc-value">JOHN DOE</div>
              </div>
              <div>
                <div className="vc-label">Expires</div>
                <div className="vc-value">12/28</div>
              </div>
              <div>
                <div className="vc-label">CVV</div>
                <div className="vc-value">&bull;&bull;&bull;</div>
              </div>
            </div>
          </div>

          <div className="rewards-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span>12,450 Rewards Points</span>
          </div>
        </div>

        <div className="card-controls">
          <h3>Card Controls</h3>
          <div className="controls-grid">
            <button className="control-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span>Freeze Card</span>
            </button>
            <button className="control-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
              <span>Set Limits</span>
            </button>
            <button className="control-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
              <span>Request New</span>
            </button>
            <button className="control-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              <span>Notifications</span>
            </button>
          </div>

          <h3>Recent Transactions</h3>
          <div className="card-transactions">
            {[
              { desc: "Apple Store", amount: "-$999.00", date: "Mar 12" },
              { desc: "Uber Ride", amount: "-$23.50", date: "Mar 11" },
              { desc: "Starbucks", amount: "-$6.75", date: "Mar 10" },
              { desc: "Payment - Thank You", amount: "+$1,500.00", date: "Mar 9" },
            ].map((tx, i) => (
              <div key={i} className="card-tx-item">
                <div>
                  <div className="card-tx-desc">{tx.desc}</div>
                  <div className="card-tx-date">{tx.date}</div>
                </div>
                <div className={`card-tx-amount ${tx.amount.startsWith("+") ? "credit" : "debit"}`}>
                  {tx.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
