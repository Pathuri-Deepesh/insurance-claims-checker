const API_BASE_URL = 'http://localhost:4000/api';

/**
 * Submits a claim for compliance checking.
 * @param {{claim_type: string, amount: string|number, incident_date: string, policy_id: string}} claim
 * @returns {Promise<{outcome: string, reason: string, payable_amount?: number}>}
 */
export async function checkClaimCompliance(claim) {
  const response = await fetch(`${API_BASE_URL}/claims/check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(claim),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}