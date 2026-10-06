# Architecture Rules

## Multi-Repository Strategy

### DWS6 (Primary)
- **Path:** `/home/admin100/dws6`
- **Branch:** `main`
- **GitHub:** `blogtheristo/dws6`
- **Purpose:** Main development repository
- **Rules:**
  - PR required for all changes to `main`
  - No direct push to `main`
  - CI/CD runs on PR merge

### KYA_V3 (Worktree)
- **Path:** `/home/admin100/.opencode-worktrees/dws6/KYA_v3`
- **Branch:** `opencode/KYA_v3` (worktree default)
- **GitHub:** `blogtheristo/KYA_V3`
- **Purpose:** Public KYA v3 specification repository
- **Rules:**
  - PR required for all changes to `main`
  - No direct push to `main`
  - Feature branches: `feature/*`
  - Branch sync: `opencode/KYA_v3` → `main` via PR

### Future Worktrees (DWS7, DWS8, etc.)
- **Branch:** `opencode/<name>` or `features/*`
- **GitHub:** `blogtheristo/dws7`, `blogtheristo/dws8`
- **Rules:**
  - Same as KYA_V3
  - PR required for all changes

## Git Workflow

```bash
# 1. Create feature branch (always from main)
git checkout main
git pull origin main
git checkout -b feature/my-change

# 2. Make changes, commit
git add -A
git commit -m "feat: describe change"

# 3. Push to origin (creates remote branch)
git push origin feature/my-change

# 4. Create PR on GitHub: feature/my-change → main

# 5. After merge, sync opencode branch
git checkout opencode/KYA_v3
git merge main
git push origin opencode/KYA_v3
```

## PR Requirements

- [ ] Title: clear, follows convention
- [ ] Description: describes changes
- [ ] Linked issues (if any)
- [ ] All CI checks passing
- [ ] HIC approval (for production changes)
- [ ] No conflicts

## Branch Naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/*` | `feature/kya-v3-public` |
| Fix | `fix/*` | `fix/README-typo` |
| Hotfix | `hotfix/*` | `hotfix/critical-bug` |
| Opencode | `opencode/*` | `opencode/KYA_v3` |

## GitHub App

- **App:** `dws-opencode-loop`
- **Repositories:** All repositories under `blogtheristo`
- **Webhook:** `https://api.dws6.com/github-webhook`
- **Installation:** Auto-installs via webhook

## Important Notes

1. **Main is protected** - no direct pushes
2. **All changes go through PR**
3. **Opencode branch = feature branches sync target**
4. **Worktrees share commit history via PR**