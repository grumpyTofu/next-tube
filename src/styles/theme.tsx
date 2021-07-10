import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

// default theme = dark mode.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#202020",
      dark: "#181818",
      light: "#202020",
    },
    secondary: {
      main: "#FF0000",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#181818",
        },
      },
    },
    MuiCard: {
      root: {
        background: "transparent",
      },
    },
    MuiCardContent: {
      root: {
        color: "white",
      },
    },
    MuiTypography: {
      root: {
        color: "white",
      },
    },
    MuiSvgIcon: {
      root: {
        fill: "white",
      },
    },
    MuiOutlinedInput: {
      root: {
        backgroundColor: "white",
      },
    },
  },
});

// light theme for 'those people'
const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#FF0000",
    },
    secondary: {
      main: "#ededed",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        backgroundColor: "white",
      },
    },
  },
});

export default theme;
export { lightTheme };
