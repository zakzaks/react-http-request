import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";

export default [
	{
		files: ["**/*.{js,mjs,cjs,jsx}"],
		languageOptions: { globals: globals.browser },
		rules: js.configs.recommended.rules,
	},
	pluginReact.configs.flat.recommended,
	{
		plugins: { "react-hooks": pluginReactHooks },
		rules: pluginReactHooks.configs.recommended.rules,
	},
	{
		settings: { react: { version: "detect" } },
		rules: { "react/react-in-jsx-scope": "off" },
	},
];
