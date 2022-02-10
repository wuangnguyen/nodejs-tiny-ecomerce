module.exports = (hook) => {
  if (hook.params.provider === 'rest') {
    throw new Error("This method doesn't allow");
  }
};
