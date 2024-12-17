'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: "Inter",

    body1: {
      fontSize: "15px",
    },

    body2: {
      fontSize: "14px",
    },

    h6: {
      fontSize: "17px",
    },

    h5: {
      fontSize: "24px",
      fontWeight: "600"
    }
  },

  palette: {
    background: {
      default: "#FAFAFA",
      paper: "#fff"
    }
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          background: "#fff",
          borderBottom: "0.0625rem solid #E6E6E6"
        }
      }
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow: "none",
          // background: "#fff",
          border: "1px solid #E6E6E6",
          background: "#0f0",
          overflow: "hidden"
        },

        outlined: {
          background: "#fff",
        },

        elevation: {
          padding: "0.5rem",
          background: "#F1F1F1",
        }
      }
    },

    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: "8px",
          textTransform: "none",

          "&:hover": {
            boxShadow: "none"
          }
        },

        outlinedPrimary: {
          border: "1px solid #D0D5DD",
          color: "#000",
        },

        containedInfo: {
          background: "#444444",

          "&:hover": {
            background: "#555555"
          }
        },

        containedSecondary: {
          background: "#9FA0A833",
          color: "#000",

          "&:hover": {
            background: "#9FA0A817"
          }
        },

        containedSuccess: {
          background: "#24C01626",
          color: "#24C016",

          "&:hover": {
            background: "#24C01610"
          }
        },

        containedWarning: {
          background: "#F9C03E26",
          color: "#F9C03E",

          "&:hover": {
            background: "#F9C03E10"
          }
        }
      }
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          borderColor: "#D0D5DD"
        }
      }
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          width: "16px",
          height: "16px"
        }
      }
    },

    MuiIcon: {
      styleOverrides: {
        root: {
          width: "16px",
          height: "16px"
        }
      }
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          padding: 0,
          borderRadius: 0
        }
      }
    },

    MuiCardActionArea: {
      styleOverrides: {
        root: {
          padding: "0.5rem"
        }
      }
    }
  },
});

export default theme;