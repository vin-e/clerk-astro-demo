/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      colors: {
        "primary-600": "#6C47FF",
        "primary-700": "#5639CC",
        "primary-50": "#F4F2FF",
        "success-700": "#027A48",
        "success-50": "#ECFDF3",
      },
    },
	},
	plugins: [],
}
