INSERT INTO policies (policy_id, effective_date, expiration_date, coverage_details) VALUES
('POL-1001', '2024-01-01', '2024-12-31',
  '{"auto": {"coverage_limit": 10000, "deductible": 500}, "fire": {"coverage_limit": 20000, "deductible": 1000}}'
),
('POL-1002', '2023-06-01', '2024-06-01',
  '{"theft": {"coverage_limit": 5000, "deductible": 200}}'
),
('POL-1003', '2024-03-01', '2024-09-30',
  '{"auto": {"coverage_limit": 8000, "deductible": 1000}, "water_damage": {"coverage_limit": 15000, "deductible": 750}}'
);