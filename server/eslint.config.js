import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

export default defineConfig([
    globalIgnores(['node_modules', 'dist']),

    js.configs.recommended,

    {
        files: ['**/*.js'],

        plugins: {
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports,
            import: importPlugin,
        },

        languageOptions: {
            globals: globals.node,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },

        rules: {
            // sorting
            'no-unused-vars': 'off',
            'simple-import-sort/imports': [
                'error',
                {
                    groups: [
                        // node builtin
                        ['^node:'],

                        // external libs
                        ['^@?\\w'],

                        // absolute imports
                        ['^@/'],

                        // relative imports
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                    ],
                },
            ],

            'simple-import-sort/exports': 'error',

            // unused imports
            'unused-imports/no-unused-imports': 'error',

            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^_',

                    args: 'after-used',
                    argsIgnorePattern: '^_',

                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],

            // no cycles
            'import/no-cycle': 'error',
        },
    },
])
