import { defineConfig } from '@playwright/test'

/* Runs against the production build (npm run build first). The server is Nitro's node-server output. */
const PORT = 4173

export default defineConfig({
  testDir: 'tests',
  testMatch: '*.spec.ts',
  timeout: 120_000,
  workers: 2,
  reporter: [['list']],
  use: {
    baseURL: `http://localhost:${PORT}`,
    /* WebGL headless (BRIEF §13.2) */
    launchOptions: { args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] },
  },
  webServer: {
    command: 'node .output/server/index.mjs',
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    env: { PORT: String(PORT), RESEND_API_KEY: 're_test', RESEND_BASE_URL: 'http://localhost:4174' },
  },
})
