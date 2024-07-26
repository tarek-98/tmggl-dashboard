import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";
import { Link, useNavigate } from "react-router-dom";

const StatBox = ({ title, subtitle, icon, linkText, link }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  function handleNanigateUsers() {
    navigate(link);
  }
  function handleNanigateVendors() {
    navigate(link);
  }
  function handleNanigateProducts() {
    navigate(link);
  }
  function handleNanigateOrders() {
    navigate(link);
  }

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="h5"
          sx={{
            color: colors.greenAccent[500],
            cursor: "pointer",
            width: "fit-content",
            marginRight: "95%",
          }}
          className="d-flex align-items-center justify-content-end"
        >
          <p
            className="m-0"
            onClick={() => {
              handleNanigateUsers();
              handleNanigateVendors();
            }}
          >
            {linkText}
          </p>
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
