let navigateFunction = null;

export const setNavigateFunction = (navFunc) => {
  navigateFunction = navFunc;
};

export const navigateTo = (path) => {
  if (navigateFunction) {
    navigateFunction(path);
  } else {
    console.error("Navigate function not set");
  }
};
