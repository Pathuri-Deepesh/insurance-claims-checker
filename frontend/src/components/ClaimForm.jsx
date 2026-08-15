import { useState } from 'react';
import './ClaimForm.css';

const INITIAL_FORM_STATE = {
  claim_type: '',
  amount: '',
  incident_date: '',
  policy_id: '',
};

export default function ClaimForm({ onSubmit, isSubmitting }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form className="claim-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="claim_type">Claim Type</label>
        <input
          id="claim_type"
          name="claim_type"
          type="text"
          placeholder="e.g. auto, fire, theft, water_damage"
          value={formData.claim_type}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label htmlFor="amount">Amount ($)</label>
        <input
          id="amount"
          name="amount"
          type="number"
          placeholder="e.g. 2000"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label htmlFor="incident_date">Incident Date</label>
        <input
          id="incident_date"
          name="incident_date"
          type="date"
          value={formData.incident_date}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label htmlFor="policy_id">Policy ID</label>
        <input
          id="policy_id"
          name="policy_id"
          type="text"
          placeholder="e.g. POL-1001"
          value={formData.policy_id}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="submit-button" disabled={isSubmitting}>
        {isSubmitting ? 'Checking...' : '🔍 Check Compliance'}
      </button>
    </form>
  );
}