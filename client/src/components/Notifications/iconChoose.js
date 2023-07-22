import React from "react";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import DoneSharpIcon from "@mui/icons-material/DoneSharp";
const Icon = ({ type }) => {
  return (
    <div>
      {type === "Success" ? (
        <DoneSharpIcon style={{ color: "green" }} />
      ) : (
        <ClearSharpIcon style={{ color: "red" }} />
      )}
    </div>
  );
};

export default Icon;
