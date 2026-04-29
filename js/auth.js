import { supabase } from './supabase.js';

export async function requireAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = 'login.html';
    return null;
  }
  const { data: profile } = await supabase
    .from('users')
    .select('membership_status')
    .eq('id', session.user.id)
    .single();
  if (profile?.membership_status !== 'active') {
    window.location.href = 'inactive.html';
    return null;
  }
  return session;
}

export async function signOut() {
  await supabase.auth.signOut();
  window.location.href = 'login.html';
}
