module.exports = {
  "*.{ts,tsx,js,jsx}": () => ["npm run lint:strict", "npm run format"],
  "*.{json,md,css,mjs,yml,yaml}": () => "npm run format",
};
