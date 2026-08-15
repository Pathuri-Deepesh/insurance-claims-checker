const OUTCOMES = {
  COMPLIANT: 'Compliant',
  NON_COMPLIANT: 'Non-Compliant',
  NEEDS_MANUAL_REVIEW: 'Needs Manual Review',
};

const REASONS = {
  INCOMPLETE_DATA: 'Incomplete or invalid claim data.',
  POLICY_NOT_FOUND: 'Policy not found.',
  OUTSIDE_COVERAGE_PERIOD: "Incident occurred outside the policy's coverage period.",
  TYPE_NOT_COVERED: 'Policy does not cover this claim type.',
  NO_PAYOUT_DEDUCTIBLE: 'No payout due - claim amount does not exceed deductible.',
  PAYABLE_CAPPED: 'Payable amount capped at policy limit.',
  PAYABLE_APPROVED: 'Payable amount approved.',
};

/**
 * BR3: Policy Period check. Inclusive of effective/expiration dates.
 */
function isWithinPolicyPeriod(incidentDate, effectiveDate, expirationDate) {
  const incident = new Date(incidentDate).getTime();
  const effective = new Date(effectiveDate).getTime();
  const expiration = new Date(expirationDate).getTime();
  return incident >= effective && incident <= expiration;
}

/**
 * BR4: Coverage Type check.
 */
function isClaimTypeCovered(claimType, coverageDetails) {
  return Object.prototype.hasOwnProperty.call(coverageDetails, claimType);
}

/**
 * BR5: Payable Amount calculation.
 * payable_amount = max(0, min(amount, coverage_limit) - deductible)
 */
function calculatePayableAmount(amount, coverageLimit, deductible) {
  const cappedAmount = Math.min(amount, coverageLimit);
  const payableAmount = Math.max(0, cappedAmount - deductible);

  let reason;
  if (payableAmount === 0) {
    reason = REASONS.NO_PAYOUT_DEDUCTIBLE;
  } else if (amount > coverageLimit) {
    reason = REASONS.PAYABLE_CAPPED;
  } else {
    reason = REASONS.PAYABLE_APPROVED;
  }

  return { payableAmount, reason };
}

/**
 * Evaluates BR2 (policy already resolved) through BR5.
 * Pure function: given a valid claim and a policy (or null), returns the outcome.
 *
 * @param {object} claim - { claim_type, amount, incident_date, policy_id }
 * @param {object|null} policy
 * @returns {{ outcome: string, reason: string, payable_amount?: number }}
 */
function evaluateClaim(claim, policy) {
  if (!policy) {
    return { outcome: OUTCOMES.NEEDS_MANUAL_REVIEW, reason: REASONS.POLICY_NOT_FOUND };
  }

  if (!isWithinPolicyPeriod(claim.incident_date, policy.effective_date, policy.expiration_date)) {
    return { outcome: OUTCOMES.NON_COMPLIANT, reason: REASONS.OUTSIDE_COVERAGE_PERIOD };
  }

  if (!isClaimTypeCovered(claim.claim_type, policy.coverage_details)) {
    return { outcome: OUTCOMES.NON_COMPLIANT, reason: REASONS.TYPE_NOT_COVERED };
  }

  const { coverage_limit, deductible } = policy.coverage_details[claim.claim_type];
  const amount = typeof claim.amount === 'string' ? Number(claim.amount) : claim.amount;
  const { payableAmount, reason } = calculatePayableAmount(amount, coverage_limit, deductible);

  return {
    outcome: OUTCOMES.COMPLIANT,
    reason,
    payable_amount: payableAmount,
  };
}

module.exports = {
  evaluateClaim,
  calculatePayableAmount,
  isWithinPolicyPeriod,
  isClaimTypeCovered,
  OUTCOMES,
  REASONS,
};