import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        testTimeout: 30000,
        fileParallelism: false,
        maxConcurrency: 1
    }
})
