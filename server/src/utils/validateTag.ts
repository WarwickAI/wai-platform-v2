import { TagInput } from "./TagInput";

export const validateTag = (options: TagInput) => {
  if (options.title.length <= 2) {
    return [
      {
        field: "title",
        message: "length must be greater than 2",
      },
    ];
  }

  if (options.color.charAt(0) !== "#") {
    return [
      {
        field: "color",
        message: "tag color must start with a #",
      },
    ];
  }
  return null;
};
