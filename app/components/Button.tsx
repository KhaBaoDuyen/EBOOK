import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ButtonCustom = styled(Button)(() => ({
  backgroundColor: "#15B088",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#14a17e",
  },
}));

export default ButtonCustom;
