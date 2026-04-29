# businesscoach4u — The Strategic Hub — Claude Code Guide

> Template: https://github.com/cathcoach4u/coach4u-shared/blob/main/templates/CLAUDE.md
> Shared design system: https://github.com/cathcoach4u/coach4u-shared
> Full setup guide: https://github.com/cathcoach4u/coach4u-shared/blob/main/SETUP.md

## Shared Stylesheet

Add to every HTML page `<head>`:

```html
<link rel="stylesheet" href="https://cathcoach4u.github.io/coach4u-shared/css/style.css">
```

## Supabase Project

| | |
|---|---|
| URL | `https://uoixetfvboevjxlkfyqy.supabase.co` |
| Anon Key | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvaXhldGZ2Ym9ldmp4bGtmeXF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NDY2ODAsImV4cCI6MjA5MDQyMjY4MH0.ZXYJVdvcj70aGMH1FAixIr0hNCaCDSYLEL93hHVCGDU` |

> Note: This app uses its own Supabase project (not the shared one) because the business data (VTO, rocks, scorecard, etc.) lives here.

## Critical Rules

**Supabase init — always inline.** GitHub Pages does not reliably load external `.js` modules. Always initialise Supabase inline in a `<script type="module">` block. Never import from an external config file.

**Reset password redirect.** Use `window.location.href` (not `window.location.origin`) when building the `redirectTo` URL. Using `origin` drops the path and breaks Supabase's redirect matching.

**Membership gating.** Every page except login/forgot/reset must verify `users.membership_status = 'active'` after confirming a session. Redirect to `inactive.html` if not.

## Auth Flow

- Login: email + password via `login.html`
- Forgot password → `forgot-password.html`
- Reset password → `reset-password.html`
- Protected pages call `window.requireAuth()` which redirects to `login.html` if no session
- On sign-in, user is redirected to `index.html` (the main Strategic Hub app)

## File Structure

```
index.html          — The Strategic Hub SPA (protected, requires auth)
login.html          — Login page
forgot-password.html
reset-password.html
css/style.css       — Business module styles
js/app.js           — Strategic Hub app logic
js/auth.js          — Auth helpers (requireAuth, signOut)
js/supabase.js      — Supabase client init
js/ai.js            — AI Strategy Coach integration
```

## Add a New Member (SQL)

```sql
INSERT INTO users (id, email, membership_status)
SELECT id, email, 'active'
FROM auth.users
WHERE LOWER(email) = LOWER('email@here.com');
```

---
## App-Specific Notes

- This is "The Strategic Hub" — an EOS/Traction-style business planning tool
- Features: VTO (Vision/Traction Organiser), Rocks (quarterly priorities), Scorecard, L10 Meetings, Issues (IDS), Team Alignment, Multi-business switcher
- AI Strategy Coach powered by Claude via Supabase Edge Function at `https://uoixetfvboevjxlkfyqy.supabase.co/functions/v1/ai-proxy`
- The business switcher allows a holding company + sub-businesses structure
- Migrated from `external-Coach4u-app/business/` into this standalone repo
