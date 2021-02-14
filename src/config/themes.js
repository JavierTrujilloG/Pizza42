import { createMuiTheme, responsiveFontSizes, makeStyles } from '@material-ui/core/styles';

const Color = require('color');

const borderRadius = '5px';
const primary = '#3083ff';
const primaryLight = Color(primary).lighten(0.8).desaturate(0.6).darken(0.5).hex();
const bigListCircleSize = 50;

export const ThemeSettings = {
  hero: {
    mobileHeight: 300,
    tabletHeight: 400,
    desktopHeight: 500
  },
  header: {
    height: 82
  },
  depth: {
    header: 30,
    page: 20,
    footer: 1
  },
  transition: {
    defaultTime: '300ms',
    easeOut: 'cubic-bezier(0.250, 0.460, 0.450, 0.940)' /* easeOutQuad */,
    easeIn: 'cubic-bezier(0.550, 0.085, 0.680, 0.530)' /* easeInQuad */,
    easeInOut: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)' /* easeInOutQuad */,
    easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' /* easeOutBack */,
    easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)' /* easeInBack */
  }
};

ThemeSettings.transition.default = `all ${ThemeSettings.transition.defaultTime} ${ThemeSettings.transition.easeOut}`;

export const ThemeColors = {
  primary,
  primaryLight,
  primarySoft: Color(primary).lighten(0.5).saturate(0.8).hex(),
  primaryDark: Color('#001e51').darken(0.7).saturate(0.8).hex(),
  primaryDesaturate: Color(primary).darken(0.63).desaturate(0.2).hex(),
  primaryDarkLight: Color('#001e51').darken(0.6).saturate(0.8).hex(),
  primaryGradientDark: Color('#001e51').darken(0.7).saturate(0.8).hex(),
  primaryGradientLight: '#001e51',
  primaryLightSoft: '#F1F6FD',
  secondary: Color(primaryLight).lighten(0.3).hex(),
  secondaryLight: '#66DBD6',
  grey: '#A4A4A4',
  mediumGrey: '#6C6E6E',
  softGrey: '#f7f7f7',
  themeGrey: '#9EA1A1',
  outlineColor: '#DEE0E0',
  danger: '#E63946'
};

const fonts = {
  openSans: ['Open Sans', 'sans-serif'].join(',')
};

const MuiButtonLargeSize = {
  padding: '10px 30px',
  fontSize: '1.1rem'
};

const MuiAppBar = {
  colorDefault: {
    backgroundColor: ThemeColors.primaryGradientLight
  }
};

const MuiButton = {
  root: {
    borderRadius,
    color: ThemeColors.themeGrey
  },
  label: {
    fontWeight: 400,
    textTransform: 'none'
  },
  contained: {
    padding: '10px 20px',
    boxShadow: 'none'
  },
  containedPrimary: {
    '&:hover': {
      boxShadow: `0 4px 8px 0 ${Color(primary).fade(0.8)}`
    }
  },
  outlined: {
    padding: '10px 20px',
    fontSize: '1rem',
    borderColor: '#FFFFFF',
    color: '#FFFFFF',
    '&:hover': {
      color: 'white',
      backgroundColor: primary,
      borderColor: primary,
      boxShadow: `0 4px 8px 0 ${Color(primary).fade(0.8)}`
    }
  },
  outlinedSecondary: {
    borderColor: ThemeColors.secondary
  },
  outlinedPrimary: {
    borderColor: ThemeColors.primary
  },
  containedSizeLarge: MuiButtonLargeSize,
  outlinedSizeLarge: MuiButtonLargeSize
};

const MuiIconButton = {
  root: {
    padding: '10px',
    transitionProperty: 'all',
    backgroundColor: ThemeColors.softGrey,
    '& svg': {
      fill: '#CDCECE'
    },

    '&.MuiPickersCalendarHeader-iconButton': {
      '& svg': {
        fill: ThemeColors.secondary
      }
    }
  },
  sizeSmall: {
    padding: '6px',
    '& .MuiSvgIcon-root': {
      fontSize: '1.08rem'
    }
  },
  colorPrimary: {
    borderColor: ThemeColors.primary,
    backgroundColor: ThemeColors.primary,
    '& svg': {
      fill: '#FFFFFF'
    },
    '&:hover': {
      backgroundColor: ThemeColors.primary,
      boxShadow: `0 4px 8px 0 ${Color(primary).fade(0.8)}`,
      '& svg': {
        fill: '#FFFFFF'
      }
    },
    '& .MuiTouchRipple-rippleVisible': {
      color: '#FFFFFF'
    }
  },
  colorSecondary: {
    borderColor: ThemeColors.secondary,
    backgroundColor: ThemeColors.secondary,
    '& svg': {
      fill: '#FFFFFF'
    },
    '&:hover': {
      backgroundColor: ThemeColors.secondaryLight,
      boxShadow: '0 4px 8px 0 rgba(0,0,0,0.3)',
      '& svg': {
        fill: '#FFFFFF'
      }
    },
    '& .MuiTouchRipple-rippleVisible': {
      color: '#FFFFFF'
    }
  },
  colorInherit: {
    backgroundColor: 'transparent',
    '&.Mui-checked': {
      '& svg': {
        fill: ThemeColors.primary
      }
    },
  }
};
export const Theme = responsiveFontSizes(
  createMuiTheme({
    shape: {
      borderRadius: 6
    },
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: ThemeColors.primary
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: ThemeColors.secondary
      },
      contrastThreshold: 3,
      tonalOffset: 0.01
    },
    typography: {
      fontFamily: fonts.openSans,
      h1: {
        fontSize: '3.2rem',
        fontWeight: 400,
        letterSpacing: -0.3
      },
      h2: {
        fontSize: '1.69rem',
        fontWeight: 800,
        letterSpacing: -0.3
      },
      h3: {
        fontFamily: fonts.openSans,
        fontWeight: 700,
        fontSize: '2.3rem',
        letterSpacing: -0.3
      },
      h4: {
        fontFamily: fonts.openSans,
        fontWeight: 700,
        fontSize: '1.59rem',
        letterSpacing: -0.3
      },
      h5: {
        fontFamily: fonts.openSans,
        fontWeight: 700,
        fontSize: '1.4rem',
        letterSpacing: -0.3
      },
      h6: {
        fontFamily: fonts.openSans,
        fontWeight: 700,
        fontSize: '1.25rem',
        letterSpacing: -0.3
      },
      body1: {
        lineHeight: '1.3',
        color: '#333333',
        letterSpacing: -0.3
      }
    },
    overrides: {
      MuiAppBar,
      MuiButton,
      MuiIconButton,
      MUIDataTableHeadCell: {
        root: {
          fontFamily: fonts.openSans,
          fontWeight: 600,
          color: '#000000'
        }
      },
      MuiTableRow: {
        root: {
          '&:hover': {
              cursor: "pointer",
              backgroundColor: `${ThemeColors.primaryLightSoft} !important`,
          }
        }
      },
      MuiInputAdornment: {
        root: {
          '& svg': {
            fill: ThemeColors.themeGrey
          }
        }
      },
      MuiLink: {
        underlineHover: {
          textDecoration: 'underline'
        }
      },
      MuiOutlinedInput: {
        root: {
          borderRadius,
          borderColor: ThemeColors.outlineColor
        },
        input: {
          borderRadius,
          overflow: 'hidden',
          background: 'white',
          padding: '16px !important'
        },
        notchedOutline: {
          borderColor: ThemeColors.outlineColor
        }
      },
      MuiInputLabel: {
        root: {
          color: ThemeColors.secondary,
          fontWeight: 600,
          fontSize: '0.85rem'
        }
      },
      MuiSelect: {
        icon: {
          width: '20px',
          top: 'calc(50% - 11px)',
          fill: ThemeColors.themeGrey
        },
        iconOutlined: {
          right: '11px'
        }
      }
    }
  })
);

export const AppStyles = makeStyles(() => ({
  // ···········································
  // LAYOUTS

  appMaxWidth: {
    margin: '0 auto',
    width: '100%',
    maxWidth: '1440px'
  },
  totalHeight: {
    height: '100vh'
  },
  flexHeightScroll: {
    overflowY: 'auto',
    height: '0px'
  },
  fullWidth: {
    width: '100%'
  },
  fullHeight: {
    height: '100%'
  },

  // ···········································
  // BACKGROUNDS

  darkPrimaryBackground: {
    backgroundColor: ThemeColors.primaryDark
  },
  primaryBackground: {
    backgroundColor: ThemeColors.primary
  },
  secondaryBackground: {
    backgroundColor: ThemeColors.secondary
  },
  softGreyBackground: {
    backgroundColor: Color(ThemeColors.softGrey).darken(0.05).hex()
  },
  midGreyBackground: {
    backgroundColor: Color(ThemeColors.softGrey).darken(0.1).hex()
  },
  greyBackground: {
    backgroundColor: ThemeColors.grey
  },
  primaryGradientDarkBg: {
    backgroundColor: ThemeColors.primaryGradientDark
  },
  primaryGradientLightBg: {
    backgroundColor: ThemeColors.primaryGradientLight
  },
  primaryDarkGradientBg: {
    background: `linear-gradient(180deg, ${ThemeColors.primaryGradientDark} 0%, ${ThemeColors.primaryGradientLight} 100%)`
  },

  themeGreyBorderBottom: {
    borderBottom: '1px solid #ECECEC'
  },

  dividerTop: {
    borderTop: '1px solid rgba(0, 0, 0, 0.12)'
  },

  // ···········································
  // TEXTS

  textWhite: {
    color: '#FFFFFF !important'
  },
  textGrey: {
    color: `${ThemeColors.grey} !important`
  },
  textPrimary: {
    color: `${ThemeColors.primary} !important`
  },
  textPrimaryLight: {
    color: `${Color(ThemeColors.primary).alpha(0.5).string()} !important`
  },
  textPrimarySoft: {
    color: `${ThemeColors.primarySoft} !important`
  },
  textPrimaryDesaturate: {
    color: `${ThemeColors.primaryDesaturate} !important`
  },
  textPrimaryGradientLight: {
    color: `${ThemeColors.primaryGradientLight} !important`
  },
  text400: {
    fontWeight: '400 !important'
  },
  text600: {
    fontWeight: '600 !important'
  },
  text800: {
    fontWeight: '800 !important'
  },
  textSize1_15: {
    fontSize: '1.15rem !important'
  },
  textSize1_25: {
    fontSize: '1.25rem !important'
  },
  textSize0_9: {
    fontSize: '0.9rem !important'
  },
  h7: {
    lineHeight: '2rem !important',
    fontSize: '1.125rem !important',
    fontWeight: '900 !important'
  },
  textUppercase: {
    textTransform: 'uppercase'
  },
  textSpaced: {
    letterSpacing: '0.4em !important'
  },
  textCenter: {
    textAlign: 'center'
  },

  // ···········································
  // UI

  iconButtonNoBg: {
    backgroundColor: 'transparent !important'
  },

  buttonOutlinedWhite: {
    borderColor: '#FFFFFF !important',
    color: '#FFFFFF !important'
  },

  iconButtonWhiteFill: {
    '& svg': {
      fill: '#FFFFFF'
    }
  },

  priorityChip: {
    height: '20px !important',
    backgroundColor: 'red !important',
    padding: '0 16px !important',
    '& .MuiChip-label': {
      color: '#FFFFFF !important',
      fontWeight: 900
    }
  },
  highPriorityChip: {
    backgroundColor: '#E64B45 !important'
  },
  midPriorityChip: {
    backgroundColor: '#F2964B !important'
  },
  lowPriorityChip: {
    backgroundColor: '#E6BB2E !important'
  },
  playStoreButton: {
    display: 'block',
    width: 190,
    backgroundImage: 'none',
    backgroundColor: '#3F3F4E',
    borderRadius: '0.4rem',
    boxShadow: '0rem 0.3rem 0.7rem rgba(0, 0, 0, 0.15)'
  },
  dangerButton: {
    color: '#FFFFFF',
    backgroundColor: ThemeColors.danger,
    '&:hover': {
      backgroundColor: ThemeColors.danger,
      boxShadow: `0 4px 8px 0 ${Color(ThemeColors.danger).fade(0.8)}`
    }
  },

  // ···········································
  // LISTS

  bigRoundedNumbersList: {
    counterReset: 'li',
    /* Initiate a counter */
    marginLeft: 0,
    /* Remove the default left margin */
    paddingLeft: 0,
    /* Remove the default left padding */

    '& > li': {
      position: 'relative',
      /* Create a positioning context */
      marginBottom: 15,
      /* Give each list item a left margin to make room for the numbers */
      padding: '10px 0 5px 0',
      /* Add some spacing around the content */
      paddingLeft: bigListCircleSize + 44,
      listStyle: 'none',
      /* Disable the normal item numbering */

      '&:after': {
        content: 'counter(li)',
        /* Use the counter as content */
        counterIncrement: 'li',
        /* Increment the counter by 1 */
        /* Position and style the number */
        position: 'absolute',
        top: 0,
        left: 0, // -($list-circle-size + 44px);
        boxSizing: 'border-box',
        width: bigListCircleSize,
        height: bigListCircleSize,
        /* Some space between the number and the content in browsers that support
           generated content but not positioning it (Camino 2 is one example) */
        // padding:4px;
        color: ThemeColors.primary,
        background: 'white',
        fontWeight: 400,
        textAlign: 'center',
        fontSize: '1.3em',
        lineHeight: '48px',
        borderRadius: bigListCircleSize / 2,
        boxShadow: '2px 6px 23px 0 rgba(19, 37, 74, 0.1)'
      }
    }
  }
}));

