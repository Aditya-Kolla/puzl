module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['airbnb-typescript', 'eslint-config-prettier'],
    parserOptions: {
        project: './tsconfig.json',
    },
}
