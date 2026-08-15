DROP TABLE IF EXISTS policies;

CREATE TABLE policies (
  policy_id       TEXT    NOT NULL PRIMARY KEY,
  effective_date  TEXT    NOT NULL,
  expiration_date TEXT    NOT NULL,
  coverage_details TEXT   NOT NULL,
  created_at      TEXT    DEFAULT (datetime('now'))
);