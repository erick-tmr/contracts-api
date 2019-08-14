module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:jest/recommended"
  ],
  "rules": {
    "strict": ["error", "global"],
    "semi": ["error", "always"]
  },
  "plugins": ["jest"]
}
