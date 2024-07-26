import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logOut, setIsLoggedIn } from "../../store/slices/authSlice";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, isLoggedIn } = useSelector((state) => state.auth);

  function handleLogOut() {
    dispatch(logOut());
    dispatch(setIsLoggedIn(false));
    navigate("/");
    console.log(status);
    console.log(isLoggedIn);
  }
  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <LogoutIcon onClick={() => handleLogOut()} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
