import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderRadius: {
      none: "0",
      xs: "8px",
      sm: "10px",
      md: "12px",
      lg: "14px",
      xl: "16px",
      screen: "24px",
      full: "1024px",
    },
    extend: {
      fontSize: {
        // paragraph
        paragraph_sm: [
          "16px",
          {
            lineHeight: "18px",
            fontWeight: "400",
            letterSpacing: "0px",
          },
        ],
        paragraph_md: [
          "16px",
          {
            lineHeight: "24px",
            fontWeight: "400",
            letterSpacing: "0px",
          },
        ],
        paragraph_lg: [
          "18px",
          {
            lineHeight: "22px",
            fontWeight: "400",
            letterSpacing: "0px",
          },
        ],
        paragraph_xl: [
          "22px",
          {
            lineHeight: "27px",
            fontWeight: "400",
            letterSpacing: "0px",
          },
        ],
        // heading
        heading_md: [
          "40px",
          {
            lineHeight: "48px",
            fontWeight: "500",
            letterSpacing: "0px",
          },
        ],
        heading_lg: [
          "47px",
          {
            lineHeight: "56px",
            fontWeight: "500",
            letterSpacing: "0px",
          },
        ],
        // sub-heading
        sub_heading_md: [
          "16px",
          {
            lineHeight: "19px",
            fontWeight: "700",
            letterSpacing: "0px",
          },
        ],
        sub_heading_lg: [
          "16px",
          {
            lineHeight: "24px",
            fontWeight: "700",
            letterSpacing: "0px",
          },
        ],
      },
      colors: {
        light: {
          0: "#FFFFFF",
          50: "#ECEEEF",
          100: "#DDDDDD",
          200: "#818A91",
          300: "#777777",
          400: "#55595C",
          500: "#373A3C",
        },
        primary: {
          0: "#DCEDF6",
          100: "#1C7CD5",
        },
        info: "#56c0e0",
        success: {
          0: "#E2EED8",
          100: "#5CB85C",
        },
        warning: {
          0: "#FCF7E4",
          100: "#F0AD4E",
        },
        danger: {
          0: "#EFDFDF",
          100: "#D9534F",
        },
      },
    },
  },
  plugins: [],
}
export default config
