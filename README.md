# Sercotec TypeScript row schema fix

This package contains:

- `lib/sercotec-audit/types.ts`: new shared strict row schemas.
- `patches/sercotec-types-fix.patch`: minimal patch for:
  - `app/sercotec-2023/page.tsx`
  - `app/sercotec-2024/page.tsx`

Apply from repository root:

```bash
git apply patches/sercotec-types-fix.patch
```

Then run:

```bash
pnpm typecheck
```

No generated data arrays are changed. The patch only replaces duplicated local row type aliases with a shared typed module and imports that module in the two affected pages.
