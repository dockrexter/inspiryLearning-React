// ----------------------------------------------------------------------

export default function Input(theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            '& svg': { color: theme.palette.text.disabled },
            background: "rgb(56, 165, 133,0.12)",


          }
        },
        input: {
          '&::placeholder': {
            background: "rgb(56, 165, 133,0.12)",


          }
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56]
          }
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          background: "rgb(56, 165, 133,0.12)",
          '&:hover': {
            background: "rgb(56, 165, 133,0.12)",
          },
          '&.Mui-focused': {
            background: "rgb(56, 165, 133,0.12)",
          },
          '&.Mui-disabled': {
            background: "rgb(56, 165, 133,0.12)",
          }
        },
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56]
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[500_32],
            background: "rgb(56, 165, 133,0.12)",

          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground,
              background: "rgb(56, 165, 133,0.12)",

            }
          }
        }
      }
    }
  };
}
