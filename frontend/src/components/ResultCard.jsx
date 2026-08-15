import './ResultCard.css';

const OUTCOME_CONFIG = {
  Compliant: { className: 'result-card--compliant', icon: '✅' },
  'Non-Compliant': { className: 'result-card--non-compliant', icon: '❌' },
  'Needs Manual Review': { className: 'result-card--manual-review', icon: '⚠️' },
};

export default function ResultCard({ result }) {
  if (!result) return null;

  if (result.error) {
    return (
      <div className="result-card result-card--error">
        <div className="result-card__badge">🚫 Error</div>
        <p className="result-card__reason">{result.error}</p>
      </div>
    );
  }

  const config = OUTCOME_CONFIG[result.outcome] || { className: '', icon: 'ℹ️' };

  return (
    <div className={`result-card ${config.className}`}>
      <div className="result-card__badge">
        {config.icon} {result.outcome}
      </div>
      <p className="result-card__reason">{result.reason}</p>
      {typeof result.payable_amount === 'number' && (
        <div className="result-card__payable">
          <span>Payable Amount</span>
          ${result.payable_amount.toFixed(2)}
        </div>
      )}
    </div>
  );
}