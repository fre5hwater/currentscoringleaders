# CSL Website Change Protocol

Purpose: prevent small website edits from breaking unrelated sections.

## Non-Negotiable Rule
A visual change is not complete until the requested section is fixed **and** nearby/global sections are confirmed unchanged.

## Before Editing
1. Identify the exact page and section.
2. Identify the exact selector/class/ID involved.
3. Check whether the selector is reused elsewhere.
4. Prefer adding a section-specific class over changing a broad shared selector.
5. Capture current state:
   - desktop screenshot or browser snapshot
   - mobile/narrow screenshot or browser snapshot when relevant
   - note nearby sections above/below

## Edit Rules
1. Make the smallest scoped change.
2. Avoid global selectors like `h1`, `section`, `.container`, `.text`, `.hero`, `.content` unless the goal is global.
3. Do not combine unrelated visual fixes in one edit.
4. Do not refactor layout while making a small alignment/text/style fix.
5. If the requested change needs a broad selector, stop and explain the risk first.

## After Editing
Check:
- Target section changed as requested.
- Section above unchanged.
- Section below unchanged.
- Header/nav unchanged.
- Footer unchanged.
- Desktop layout acceptable.
- Mobile/narrow layout acceptable if relevant.
- No console errors if JS touched.

## Verification Notes Template
```markdown
## Change Verification
- Page:
- Requested change:
- Files edited:
- Selector(s) changed:
- Target section result:
- Nearby section check:
- Header/nav/footer check:
- Mobile check:
- Issues found:
- Final status:
```

## If Something Breaks
1. Do not stack more fixes blindly.
2. Identify the selector causing collateral damage.
3. Revert or narrow the selector.
4. Record the mistake in `C:\Users\Avery\Desktop\AI content\MISTAKE_LOG.md`.

## Recommended Tools
- Browser/Playwright checks for visible changes.
- Local diff review before declaring done.
- Screenshots for before/after when possible.
