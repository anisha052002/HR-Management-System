# Supabase Database Schema

Complete database schema for HRMS AI with Supabase PostgreSQL backend.

## Setup Instructions

1. Create a Supabase project at https://supabase.com
2. Add these environment variables to `.env.local`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

3. Run the SQL scripts below in Supabase SQL Editor

## Tables

### 1. Employees Table

```sql
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  department VARCHAR(100) NOT NULL,
  position VARCHAR(100) NOT NULL,
  salary DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'Active',
  join_date DATE,
  reporting_to UUID REFERENCES employees(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_employees_email ON employees(email);
CREATE INDEX idx_employees_department ON employees(department);
CREATE INDEX idx_employees_status ON employees(status);
```

### 2. Attendance Table

```sql
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  check_in TIMESTAMP,
  check_out TIMESTAMP,
  duration VARCHAR(50),
  status VARCHAR(50) DEFAULT 'Present',
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(employee_id, date)
);

CREATE INDEX idx_attendance_employee ON attendance(employee_id);
CREATE INDEX idx_attendance_date ON attendance(date);
```

### 3. Payroll Table

```sql
CREATE TABLE payroll (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending',
  total_amount DECIMAL(15, 2),
  employee_count INTEGER,
  accuracy DECIMAL(5, 2),
  processed_at TIMESTAMP,
  processed_by UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_payroll_month ON payroll(month);
CREATE INDEX idx_payroll_status ON payroll(status);
```

### 4. Payroll Details Table

```sql
CREATE TABLE payroll_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payroll_id UUID NOT NULL REFERENCES payroll(id) ON DELETE CASCADE,
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  base_salary DECIMAL(10, 2),
  bonus DECIMAL(10, 2),
  allowances DECIMAL(10, 2),
  deductions DECIMAL(10, 2),
  tax_amount DECIMAL(10, 2),
  net_salary DECIMAL(10, 2),
  payment_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_payroll_details_payroll ON payroll_details(payroll_id);
CREATE INDEX idx_payroll_details_employee ON payroll_details(employee_id);
```

### 5. Candidates Table

```sql
CREATE TABLE candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  position VARCHAR(100) NOT NULL,
  ai_score INTEGER DEFAULT 0,
  stage VARCHAR(50) DEFAULT 'Applied',
  applied_date DATE DEFAULT CURRENT_DATE,
  resume_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_candidates_position ON candidates(position);
CREATE INDEX idx_candidates_stage ON candidates(stage);
CREATE INDEX idx_candidates_ai_score ON candidates(ai_score DESC);
```

### 6. Leave Requests Table

```sql
CREATE TABLE leave_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  days INTEGER NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending',
  reason TEXT,
  approved_by UUID REFERENCES employees(id),
  approved_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_leave_employee ON leave_requests(employee_id);
CREATE INDEX idx_leave_status ON leave_requests(status);
CREATE INDEX idx_leave_dates ON leave_requests(start_date, end_date);
```

### 7. Leave Balance Table

```sql
CREATE TABLE leave_balance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  leave_type VARCHAR(50) NOT NULL,
  allocated INTEGER DEFAULT 0,
  used INTEGER DEFAULT 0,
  year INTEGER DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(employee_id, leave_type, year)
);

CREATE INDEX idx_leave_balance_employee ON leave_balance(employee_id);
```

### 8. Performance Reviews Table

```sql
CREATE TABLE performance_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES employees(id),
  overall_score DECIMAL(3, 1),
  productivity_score DECIMAL(3, 1),
  quality_score DECIMAL(3, 1),
  teamwork_score DECIMAL(3, 1),
  leadership_score DECIMAL(3, 1),
  strengths TEXT,
  improvement_areas TEXT,
  comments TEXT,
  period VARCHAR(20),
  review_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_performance_employee ON performance_reviews(employee_id);
CREATE INDEX idx_performance_reviewer ON performance_reviews(reviewer_id);
CREATE INDEX idx_performance_period ON performance_reviews(period);
```

### 9. Benefits Table

```sql
CREATE TABLE benefits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(100),
  coverage VARCHAR(255),
  company_premium DECIMAL(10, 2),
  employee_deduction DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_benefits_type ON benefits(type);
CREATE INDEX idx_benefits_status ON benefits(status);
```

### 10. Employee Benefits Table

```sql
CREATE TABLE employee_benefits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  benefit_id UUID NOT NULL REFERENCES benefits(id) ON DELETE CASCADE,
  enrollment_date DATE DEFAULT CURRENT_DATE,
  coverage_amount DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(employee_id, benefit_id)
);

CREATE INDEX idx_employee_benefits_employee ON employee_benefits(employee_id);
CREATE INDEX idx_employee_benefits_benefit ON employee_benefits(benefit_id);
```

### 11. Users Table (for authentication)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  employee_id UUID REFERENCES employees(id),
  role VARCHAR(50) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

### 12. Audit Log Table

```sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  action VARCHAR(100) NOT NULL,
  table_name VARCHAR(100),
  record_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_created ON audit_logs(created_at);
```

## Row Level Security (RLS)

Enable RLS for all tables:

```sql
-- Enable RLS on all tables
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE benefits ENABLE ROW LEVEL SECURITY;

-- Example policy: Employees can see their own data
CREATE POLICY "Users can view own employee record"
ON employees FOR SELECT
USING (auth.uid()::text = id::text);

-- Example policy: Admins can see all data
CREATE POLICY "Admins can view all employees"
ON employees FOR SELECT
USING (EXISTS (
  SELECT 1 FROM users
  WHERE users.id = auth.uid()
  AND users.role = 'admin'
));
```

## Triggers for Updated Timestamps

```sql
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER employees_update_timestamp
  BEFORE UPDATE ON employees
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER attendance_update_timestamp
  BEFORE UPDATE ON attendance
  FOR EACH ROW
  EXECUTE FUNCTION update_timestamp();

-- ... repeat for other tables
```

## Backup and Restore

### Backup
```bash
pg_dump -h {host} -U {user} -d {database} > backup.sql
```

### Restore
```bash
psql -h {host} -U {user} -d {database} < backup.sql
```

## Performance Optimization Tips

1. **Indexes**: Created on frequently queried columns
2. **Partitioning**: Consider partitioning large tables by date
3. **Denormalization**: Cache frequently accessed aggregated data
4. **Connection pooling**: Use pgBouncer for connection management
5. **Query optimization**: Use EXPLAIN ANALYZE to optimize slow queries

## Related Files

- API Integration: `client/services/supabase.ts`
- Environment Setup: `.env.local`
- Database Service: Uses TypeScript for type safety
