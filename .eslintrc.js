module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true
    },
    extends: 'eslint:recommended',
    rules: {
        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: 0,
        indent: 'off'
    },
    parserOptions: {
        ecmaVersion: 'latest'
    }
};
