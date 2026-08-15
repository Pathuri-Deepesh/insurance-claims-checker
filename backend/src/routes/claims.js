const express = require('express');
const { isValidClaim } = require('../validators/claimValidator');
const { findPolicyById } = require('../services/policyRepository');
const { evaluateClaim, OUTCOMES, REASONS } = require('../services/complianceService');

const router = express.Router();

/**
 * POST /api/claims/check
 * Body: { claim_type, amount, incident_date, policy_id }
 */
router.post('/check', (req, res, next) => {
  try {
    const claim = req.body;

    if (!isValidClaim(claim)) {
      return res.status(200).json({
        outcome: OUTCOMES.NEEDS_MANUAL_REVIEW,
        reason: REASONS.INCOMPLETE_DATA,
      });
    }

    const policy = findPolicyById(claim.policy_id.trim());

    const result = evaluateClaim(
      {
        claim_type: claim.claim_type.trim(),
        amount: Number(claim.amount),
        incident_date: claim.incident_date,
        policy_id: claim.policy_id.trim(),
      },
      policy
    );

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;