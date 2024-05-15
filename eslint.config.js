import arc from '@architect/eslint-config'

const config = [
  ...arc,
  {
    ignores: [
      '.nyc_output/',
      'arc-proxy-*',
      'coverage/',
      'dist.js',
      'scratch/',
      'src/http/get-index',
      'types/',
    ],
    languageOptions: {
      sourceType: 'module',
    },
  },
]

export default config
