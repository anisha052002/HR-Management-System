import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Employee queries
export async function getEmployees(limit = 20, offset = 0) {
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
}

export async function getEmployeeById(id: string) {
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createEmployee(employeeData: any) {
  const { data, error } = await supabase
    .from('employees')
    .insert([employeeData])
    .select();

  if (error) throw error;
  return data?.[0];
}

export async function updateEmployee(id: string, employeeData: any) {
  const { data, error } = await supabase
    .from('employees')
    .update(employeeData)
    .eq('id', id)
    .select();

  if (error) throw error;
  return data?.[0];
}

export async function deleteEmployee(id: string) {
  const { error } = await supabase
    .from('employees')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}

// Attendance queries
export async function getAttendanceRecords(date?: string, employeeId?: string) {
  let query = supabase.from('attendance').select('*');

  if (date) {
    query = query.eq('date', date);
  }
  if (employeeId) {
    query = query.eq('employee_id', employeeId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function recordAttendance(attendanceData: any) {
  const { data, error } = await supabase
    .from('attendance')
    .insert([attendanceData])
    .select();

  if (error) throw error;
  return data?.[0];
}

// Payroll queries
export async function getPayrollRecords(month?: string) {
  let query = supabase.from('payroll').select('*');

  if (month) {
    query = query.eq('month', month);
  }

  const { data, error } = await query.order('month', { ascending: false });
  if (error) throw error;
  return data;
}

export async function processPayroll(payrollData: any) {
  const { data, error } = await supabase
    .from('payroll')
    .insert([payrollData])
    .select();

  if (error) throw error;
  return data?.[0];
}

// Leave queries
export async function getLeaveRequests(status?: string) {
  let query = supabase.from('leave_requests').select('*');

  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createLeaveRequest(leaveData: any) {
  const { data, error } = await supabase
    .from('leave_requests')
    .insert([leaveData])
    .select();

  if (error) throw error;
  return data?.[0];
}

export async function approveLeaveRequest(id: string, approvedBy: string) {
  const { data, error } = await supabase
    .from('leave_requests')
    .update({ status: 'Approved', approved_by: approvedBy })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data?.[0];
}

// Candidate queries
export async function getCandidates(position?: string, stage?: string) {
  let query = supabase.from('candidates').select('*');

  if (position) {
    query = query.eq('position', position);
  }
  if (stage) {
    query = query.eq('stage', stage);
  }

  const { data, error } = await query.order('ai_score', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createCandidate(candidateData: any) {
  const { data, error } = await supabase
    .from('candidates')
    .insert([candidateData])
    .select();

  if (error) throw error;
  return data?.[0];
}

export async function updateCandidateScore(id: string, aiScore: number) {
  const { data, error } = await supabase
    .from('candidates')
    .update({ ai_score: aiScore })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data?.[0];
}

// Performance queries
export async function getPerformanceReviews(employeeId?: string) {
  let query = supabase.from('performance_reviews').select('*');

  if (employeeId) {
    query = query.eq('employee_id', employeeId);
  }

  const { data, error } = await query.order('review_date', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createPerformanceReview(reviewData: any) {
  const { data, error } = await supabase
    .from('performance_reviews')
    .insert([reviewData])
    .select();

  if (error) throw error;
  return data?.[0];
}

// Auth queries
export async function signUp(email: string, password: string, userData: any) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  });

  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return true;
}

export async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}
