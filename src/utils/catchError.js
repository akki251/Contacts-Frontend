export const catchError = async (fn) => {
  try {
    return await fn();
  } catch (error) {
    return {
      data: null,
      errorMessage: error.message,
    };
  }
};
