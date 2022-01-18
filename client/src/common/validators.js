export const validators = (value, options) => {
  if (value !== true) {
    return options.message || "must be checked";
  }
};
