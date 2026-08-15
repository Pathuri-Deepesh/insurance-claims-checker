/**
 * BR1: Data Completeness validation.
 * Pure function - no I/O, fully unit-testable.
 *
 * @param {object} claim - { claim_type, amount, incident_date, policy_id }
 * @returns {boolean}
 */
function isValidClaim(claim) {
  if (!claim) return false;

  const { claim_type, amount, incident_date, policy_id } = claim;

  if (!isNonBlankString(claim_type)) return false;
  if (!isNonBlankString(policy_id)) return false;
  if (!isPositiveNumber(amount)) return false;
  if (!isValidDate(incident_date)) return false;

  return true;
}

function isNonBlankString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isPositiveNumber(value) {
  const num = typeof value === 'string' ? Number(value) : value;
  return typeof num === 'number' && !Number.isNaN(num) && Number.isFinite(num) && num > 0;
}

function isValidDate(value) {
  if (!isNonBlankString(value) && !(value instanceof Date)) return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

module.exports = {
  isValidClaim,
  isNonBlankString,
  isPositiveNumber,
  isValidDate,
};