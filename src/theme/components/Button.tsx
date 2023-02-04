const Button = {
  baseStyle: {
    borderRadius: '7px',
    py: 3,
  },
  variants: {
    primary: {
      bg: 'daabo-primary.500',
      color: 'daabo-white',
      paddingInlineStart: '2rem',
      paddingInlineEnd: '2rem',
      boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.21)',
      _disabled: {
        opacity: 1,
        bg: '#bbbbbb',
      },
      _hover: {
        bg: '#6b4eff8a',
      },
      _focus: {
        bg: '#4a35b1',
      },
    },
    secondary: {
      bg: 'white',
      color: 'daabo-primary',
      paddingInlineStart: '2rem',
      paddingInlineEnd: '2rem',
      _disabled: {
        opacity: 1,
        bg: '#bbbbbb',
      },
      _hover: {
        bg: '#6b4eff8a',
        color: 'daabo-white',
      },
      _focus: {
        bg: '#4a35b1',
        color: 'daabo-white',
      },
    },
    outline: {
      borderColor: 'daabo-primary',
      borderWidth: '2px',
    },
  },
  defaultProps: {
    variant: 'primary',
  },
};

export default Button;
