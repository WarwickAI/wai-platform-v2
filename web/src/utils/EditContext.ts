import React from "react";

export const EditContext = React.createContext<{
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isEdit: false,
  setIsEdit: () => {},
});
