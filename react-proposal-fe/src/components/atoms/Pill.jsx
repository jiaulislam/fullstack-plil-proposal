import Chip from "@mui/material/Chip"

const Pill = ({label, icon, color}) => {
  return (
    <Chip
      icon={icon}
      size="small"
      label={label.toUpperCase()}
      color={color}
      variant="outlined"
    />
  );
};

export default Pill;
