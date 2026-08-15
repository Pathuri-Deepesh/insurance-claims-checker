import { useState } from 'react';
import ClaimForm from './components/ClaimForm';
import ResultCard from './components/ResultCard';
import { checkClaimCompliance } from './api/claimsApi';
import './App.css';

function App() {
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(claim) {
    setIsSubmitting(true);
    setResult(null);
    try {
      const response = await checkClaimCompliance(claim);
      setResult(response);
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>🛡️ Insurance Claims Compliance Checker</h1>
        <p>Validate claims against policy terms instantly</p>
      </div>
      <div className="card">
        <ClaimForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        <ResultCard result={result} />
      </div>
    </div>
  );
}

export default App;