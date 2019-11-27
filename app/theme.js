import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red,
  },
  status: {
    danger: 'orange',
  },
});

export default responsiveFontSizes(theme);
