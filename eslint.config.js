import globals from "globals"
import pluginJs from "@eslint/js"

export default [
	{
		files: ["**/*.js"],
		ignores: ["**/__tests__/**"],
		languageOptions: { 
			ecmaVersion: 2022,
			sourceType: "module",
			globals: {
				...globals.node,
				...globals.browser,
			}
		},
		rules: {
			"semi": ["error", "never"],
			"eol-last": ["error", "always"],
			"no-multiple-empty-lines": ["error", { "max": 1 }],
			"space-before-blocks": ["error", "always"],
			"quotes": ["error", "double"],
			"indent": ["error", "tab", { "SwitchCase": 1 }],
			"space-in-parens": ["error", "never"],
			"key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
			"object-curly-spacing": ["error", "always"] 
		}
	}
]
