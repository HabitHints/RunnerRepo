# Blacksmith vs GitHub Runner Demo

A minimal demo repository for comparing **GitHub-hosted runners** against
**[Blacksmith](https://blacksmith.sh) runners** on an identical CI workload.

The CI pipeline is a realistic-but-small Node/TypeScript job:

1. `npm ci` — dependency install (network + disk I/O)
2. `npm run build` — TypeScript compile
3. `npm test` — Jest suite with deliberately CPU-heavy tests
   (prime sieve, SHA-256 hash chains, PBKDF2, naive matrix multiplication)
4. `npm run bench` — a timed CPU benchmark that prints per-task wall-clock
   times, so you can compare raw compute between runners directly in the logs

## How to run the demo

### Step 1 — Baseline on GitHub runners

The workflow ships pointing at GitHub's hosted runner:

```yaml
runs-on: ubuntu-latest
```

Trigger a run (push a commit, or use the **Run workflow** button — the
workflow has `workflow_dispatch` enabled) and note the total job duration and
the benchmark step output.

### Step 2 — Switch one line to Blacksmith

Prerequisite: install the [Blacksmith GitHub App](https://app.blacksmith.sh)
on this repository (takes ~1 minute).

Then edit `.github/workflows/ci.yml` and swap the single `runs-on` line:

```diff
-    runs-on: ubuntu-latest
+    runs-on: blacksmith-4vcpu-ubuntu-2404
```

Push the change and compare:

- **Total job duration** (Actions run summary)
- **Queue time** (time from trigger to job start)
- **Per-step timings** (install / build / test)
- **Benchmark output** (raw single-core and multi-task CPU times)

`blacksmith-4vcpu-ubuntu-2404` matches the 4 vCPUs of GitHub's free
`ubuntu-latest` runner for a fair comparison. Other sizes
(`blacksmith-2vcpu-…`, `blacksmith-8vcpu-…`, etc.) are also available.

## Running locally

```bash
npm ci
npm run build
npm test
npm run bench
```
