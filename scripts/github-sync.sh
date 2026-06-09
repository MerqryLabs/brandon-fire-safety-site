#!/bin/bash
set -e

if [ -z "$GITHUB_TOKEN" ]; then
  echo "GITHUB_SYNC: GITHUB_TOKEN is not set — skipping GitHub push."
  exit 0
fi

if [ -z "$GITHUB_REPO" ]; then
  echo "GITHUB_SYNC: GITHUB_REPO is not set — skipping GitHub push."
  exit 0
fi

# Normalize GITHUB_REPO: accept full URL, SSH, or plain owner/repo
REPO=$(echo "$GITHUB_REPO" \
  | sed 's|^https://github\.com/||' \
  | sed 's|^git@github\.com:||' \
  | sed 's|\.git$||')

BRANCH=$(git symbolic-ref --short HEAD 2>/dev/null || echo "main")
REMOTE_URL="https://x-access-token:${GITHUB_TOKEN}@github.com/${REPO}.git"

echo "GITHUB_SYNC: Pushing branch '${BRANCH}' to ${REPO}..."

git config user.email "replit-agent@replit.com"
git config user.name "Replit Agent"

# Normal push — no force flags. Fails fast if remote has diverged.
# Pushing .github/workflows/ requires the 'workflow' scope on the PAT.
PUSH_OUTPUT=$(git push "$REMOTE_URL" "HEAD:${BRANCH}" 2>&1) && EXIT_CODE=0 || EXIT_CODE=$?
echo "$PUSH_OUTPUT" | sed "s/${GITHUB_TOKEN}/***REDACTED***/g"

if [ $EXIT_CODE -eq 0 ]; then
  echo "GITHUB_SYNC: Done."
  exit 0
fi

# Detect missing 'workflow' scope — warn clearly but do not fail post-merge
if echo "$PUSH_OUTPUT" | grep -q "workflow"; then
  echo ""
  echo "GITHUB_SYNC: WARNING — push blocked because the GitHub PAT is missing the 'workflow' scope."
  echo "GITHUB_SYNC: To fix: regenerate your PAT at https://github.com/settings/tokens/new"
  echo "GITHUB_SYNC:   and enable BOTH 'repo' AND 'workflow' scopes, then update the GITHUB_TOKEN secret."
  echo "GITHUB_SYNC: All code changes remain safely saved in Replit."
  exit 0
fi

echo "GITHUB_SYNC: Push failed — see output above."
exit 1
