// Auth helpers for businesscoach4u standalone site
// Requires window.supabaseClient from supabase.js

function getBaseUrl() {
  const pathname = window.location.pathname;
  const dir = pathname.substring(0, pathname.lastIndexOf('/') + 1);
  return window.location.origin + dir;
}

window.signOut = async function() {
  try {
    await window.supabaseClient.auth.signOut();
    window.location.href = getBaseUrl() + 'login.html';
  } catch (err) {
    console.error('Sign out error:', err);
  }
}

window.getUser = async function() {
  try {
    const { data: { user } } = await window.supabaseClient.auth.getUser();
    return user || null;
  } catch (err) {
    return null;
  }
}

window.requireAuth = async function() {
  try {
    const { data: { user } } = await window.supabaseClient.auth.getUser();
    if (!user) {
      window.location.href = getBaseUrl() + 'login.html';
      return null;
    }
    console.log('User authenticated:', user.email);
    return user;
  } catch (err) {
    console.error('Error checking auth:', err);
    window.location.href = getBaseUrl() + 'login.html';
  }
}
