import { createClient } from '@supabase/supabase-js'

//const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseUrl = 'https://ycvllpshddblulchgzrr.supabase.co'
//const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljdmxscHNoZGRibHVsY2hnenJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgwMDQ0MDYsImV4cCI6MjA1MzU4MDQwNn0.if0mTbtYThrBK-NjyJK0IIsEoJREVfs5jwqgb2Iuc84'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)