import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default tseslint.config(
  // Ignore patterns
  {
    ignores: [
      'dist',
      'build',
      'coverage',
      'node_modules',
      '*.config.js',
      '*.config.ts',
      'public',
    ]
  },
  
  // Base configuration
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.stylistic,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: ['./tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': react,
      'jsx-a11y': jsxA11y,
    },
    
    settings: {
      react: { version: 'detect' },
    },
    
    rules: {
      // React Hooks rules
      ...reactHooks.configs.recommended.rules,
      
      // React Refresh rules
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      
      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-pascal-case': 'error',
      'react/no-array-index-key': 'warn',
      'react/no-children-prop': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-deprecated': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-is-mounted': 'error',
      'react/no-render-return-value': 'error',
      'react/no-string-refs': 'error',
      'react/no-unescaped-entities': 'error',
      'react/no-unknown-property': 'error',
      'react/require-render-return': 'error',
      'react/self-closing-comp': 'error',
      
      // Accessibility rules
      ...jsxA11y.configs.recommended.rules,
      
      // TypeScript strict rules
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
        disallowTypeAnnotations: false,
      }],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      
      // Import/Export rules
      'no-duplicate-imports': 'error',
      
      // Code quality rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-alert': 'error',
      'eqeqeq': ['error', 'always'],
      'prefer-const': 'error',
      'prefer-template': 'error',
      'object-shorthand': 'error',
      'curly': ['error', 'all'],
      
      // Complexity rules
      'complexity': ['warn', 10],
      'max-depth': ['warn', 4],
      'max-lines': ['warn', 300],
      'max-lines-per-function': ['warn', 50],
      'max-params': ['warn', 4],
    },
  },
  
  // Config file overrides
  {
    files: ['vite.config.ts', 'tailwind.config.ts'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  
  // React component overrides
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'max-lines-per-function': 'off',
    },
  }
)