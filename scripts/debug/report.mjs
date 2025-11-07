#!/usr/bin/env node

/**
 * Auto-reporter: Fetches /__debug/report and prints chat-friendly status block
 */

import { execSync } from 'child_process';

const PREVIEW_URL = process.env.PREVIEW_URL || 'https://3000-isnj9ofymsbtrhk650nk1-b6a5c71b.manus.computer';
const REPORT_URL = `${PREVIEW_URL}/__debug/report`;

async function fetchReport() {
  try {
    const response = await fetch(REPORT_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`❌ Failed to fetch ${REPORT_URL}: ${error.message}`);
    console.error('Falling back to individual endpoints...');
    return null;
  }
}

async function fetchFallback() {
  try {
    const [routes, features, config, tests] = await Promise.all([
      fetch(`${PREVIEW_URL}/__debug/routes`).then(r => r.text()),
      fetch(`${PREVIEW_URL}/__debug/features`).then(r => r.json()),
      fetch(`${PREVIEW_URL}/__debug/config`).then(r => r.json()),
      fetch(`${PREVIEW_URL}/__debug/tests`).then(r => r.json()),
    ]);

    const commit = execSync('git rev-parse --short HEAD').toString().trim();
    const branch = execSync('git branch --show-current').toString().trim();

    return {
      branch,
      commit,
      preview: PREVIEW_URL,
      timestamp: new Date().toISOString(),
      routes,
      features,
      config,
      tests: {
        unit: tests.unit?.status || 'N/A',
        e2e: tests.e2e?.status || 'N/A',
      },
    };
  } catch (error) {
    console.error(`❌ Fallback failed: ${error.message}`);
    return null;
  }
}

function formatReport(data) {
  if (!data) {
    return '=== BUILD REPORT ===\n❌ FAILED TO FETCH DATA\n====================';
  }

  const { branch, commit, timestamp, preview, routes, features, config, tests } = data;

  return `
=== BUILD REPORT ===
branch=${branch}  commit=${commit}  time=${timestamp}
preview=${preview}

[ROUTES]
${routes}

[FEATURES]
${JSON.stringify(features, null, 2)}

[CONFIG]
${JSON.stringify(config, null, 2)}

[TESTS]
unit=${tests.unit}
e2e=${tests.e2e}
====================
`.trim();
}

async function main() {
  console.log('🔍 Fetching build report...\n');

  let data = await fetchReport();
  
  if (!data) {
    console.log('⚠️  /__debug/report failed, trying fallback...\n');
    data = await fetchFallback();
  }

  const report = formatReport(data);
  console.log(report);
  
  if (data) {
    console.log(`\n✅ Report generated at ${new Date().toLocaleTimeString()}`);
    console.log(`📍 ${data.branch}@${data.commit}`);
  }
}

main().catch(error => {
  console.error('❌ Reporter crashed:', error);
  process.exit(1);
});
