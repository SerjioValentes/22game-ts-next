import theme from '@/helpers/ThemeProvider';
import useMediaQuery from '@mui/material/useMediaQuery';

const useWindowSize = () => {
  const onlyMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  return onlyMediumScreen;
};
export default useWindowSize;
