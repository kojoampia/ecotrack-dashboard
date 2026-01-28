-- Core Ledger Table
CREATE TABLE carbon_ledger (
    id UUID PRIMARY KEY,
    tenant_id VARCHAR(50) NOT NULL, -- The Client ID
    scope_type VARCHAR(10) NOT NULL, -- SCOPE_1, 2, or 3
    activity_data DOUBLE PRECISION NOT NULL, -- e.g., 500.5
    unit VARCHAR(10) NOT NULL, -- e.g., "kWh", "LITERS"
    co2_equivalent_kg BIGINT NOT NULL, 
    evidence_url TEXT, -- Link to S3 bucket containing the invoice/log
    confidence_score DECIMAL(3,2), -- 0.00 to 1.00
    recorded_at TIMESTAMPTZ DEFAULT NOW(),
    version INT DEFAULT 1 -- For Optimistic Locking
);

-- Enable Row Level Security
ALTER TABLE carbon_ledger ENABLE ROW LEVEL SECURITY;

-- Create a Policy: Users can only see data where tenant_id matches their session
CREATE POLICY tenant_isolation_policy ON carbon_ledger
    USING (tenant_id = current_setting('app.current_tenant'));