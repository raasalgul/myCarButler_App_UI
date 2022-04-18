import { createTheme } from '@mui/material/styles';

// Theme constant file for the application
const theme=createTheme({
    palette: {
        primary: {
          main: "#df3d8e",
          light: "#FFF",
          dark: "#403D39"
        },
        secondary: {
          main: "#5be749",
        },
      },
    });

  export default theme;