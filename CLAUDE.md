# Teams Coach4U — Claude Code Guide

> Design system version: **v1.3**
> Template: https://github.com/cathcoach4u/coach4u-shared/blob/main/templates/CLAUDE.md
> Shared design system: https://github.com/cathcoach4u/coach4u-shared
> Full setup guide: https://github.com/cathcoach4u/coach4u-shared/blob/main/SETUP.md

## Styles

All styles are inline in each HTML page. There is no external stylesheet link.

Add Google Fonts to every HTML page `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@700&family=Montserrat:wght@400&display=swap" rel="stylesheet" />
```

Brand colours (define as CSS custom properties on `:root`):

| Variable | Value |
|---|---|
| `--color-navy` | `#1B3664` |
| `--color-blue` | `#5684C4` |
| `--color-body` | `#2D2D2D` |
| `--color-border` | `#DDDDDD` |

## Supabase Project

| | |
|---|---|
| URL | `https://eekefsuaefgpqmjdyniy.supabase.co` |
| Anon Key | `sb_publishable_pcXHwQVMpvEojb4K3afEMw_RMvgZM-Y` |

## Critical Rules

**Supabase init — always inline.** GitHub Pages does not reliably load external `.js` modules. Always initialise Supabase inline in a `<script type="module">` block. Never import from an external config file.

**Reset password redirect.** Use `window.location.href` (not `window.location.origin`) when building the `redirectTo` URL. Using `origin` drops the path and breaks Supabase's redirect matching.

**Membership gating.** Every page except login/forgot/reset must verify `users.membership_status = 'active'` after confirming a session. Redirect to `inactive.html` if not.

## Auth Flow

- Login: email + password only (no magic link)
- Forgot password → `forgot-password.html`
- Reset password → `reset-password.html`

## Add a New Member (SQL)

```sql
INSERT INTO users (id, email, membership_status)
SELECT id, email, 'active'
FROM auth.users
WHERE LOWER(email) = LOWER('email@here.com');
```

---
## App-Specific Notes

This is the **Teams Coach4U** standalone app — a GitHub Pages static site for managing team members, seats, roles, and GWC (Gets it, Wants it, Has the Capacity) alignment.

- **Repo:** `cathcoach4u/coach4Uapp-teamcoach4U`
- **Live site:** `https://cathcoach4u.github.io/coach4Uapp-teamcoach4U/`
- **Supabase project:** `eekefsuaefgpqmjdyniy.supabase.co` (shared Coach4U project)
- No AI coach or edge functions in this app
- File structure: `index.html`, `login.html`, `forgot-password.html`, `reset-password.html`, `js/auth.js`, `js/supabase.js`
