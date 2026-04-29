# Changelog — Teams Coach4U

## Unreleased

### Changed
- Aligned to Coach4U design system v1.3
- Replaced external `coach4u-shared` stylesheet with fully inline styles on all pages
- Updated brand navy from `#003366` to `#1B3664` across all pages
- Added CSS custom properties for brand colours and fonts to all pages
- Added Google Fonts (Inter 700, Montserrat 400) to all pages
- Removed `js/supabase.js` and `js/auth.js` (external module imports violate inline-only rule)
- Renamed login form elements to match v1.3 template (`signInForm`, `login-btn`, `message`)
- Added `.sign-out-btn` class to sign-out button on `index.html`
- Replaced off-palette grey `#6C757D` with `#2D2D2D` across all pages

### Added
- `inactive.html` — membership gating redirect target (was missing, caused 404)
- `CHANGELOG.md`

### Fixed
- Reset password success copy: removed exclamation mark and ellipsis character
