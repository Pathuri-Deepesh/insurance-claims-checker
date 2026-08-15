const db = require('../db/pool');

/**
 * Fetches a policy by its policy_id.
 * @param {string} policyId
 * @returns {object|null} policy row or null if not found
 */
function findPolicyById(policyId) {
  const row = db
    .prepare(
      'SELECT policy_id, effective_date, expiration_date, coverage_details FROM policies WHERE policy_id = ?'
    )
    .get(policyId);

  if (!row) return null;

  return {
    policy_id: row.policy_id,
    effective_date: row.effective_date,
    expiration_date: row.expiration_date,
    coverage_details: JSON.parse(row.coverage_details),
  };
}

module.exports = { findPolicyById };