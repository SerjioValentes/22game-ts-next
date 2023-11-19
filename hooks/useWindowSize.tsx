import theme from '@/helpers/ThemeProvider';
import useMediaQuery from '@mui/material/useMediaQuery';

const useWindowSize = () => {
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return smallScreen;
};
export default useWindowSize;
