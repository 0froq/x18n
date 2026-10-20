import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts', 'src/cli.ts'],
  platform: 'node',
  // Stable chunk names keep the tsnapi export snapshot from churning on content hashes.
  hash: false,
  dts: true,
  exports: {
    exclude: ['cli'],
  },
  publint: true,
})
