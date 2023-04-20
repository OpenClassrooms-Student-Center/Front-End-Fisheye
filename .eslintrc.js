module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "eqeqeq": "warn",
        "indent": ["warn", 2, { "SwitchCase": 1 }],
        "multiline-ternary": ["warn", "always-multiline"]
    },
    "scripts": {
        "lint": "eslint -c node_modules/my-awesome-ruleset/.eslintrc --max-warnings=0 ."
    },
    "gitHooks": {
      "pre-push": "npm run lint"
    }
}
