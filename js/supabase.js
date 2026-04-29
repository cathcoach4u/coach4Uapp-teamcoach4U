import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL      = 'https://eekefsuaefgpqmjdyniy.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_pcXHwQVMpvEojb4K3afEMw_RMvgZM-Y';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
