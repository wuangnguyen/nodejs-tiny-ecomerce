module.exports = (hook) => {
  console.log(this.arguments);
  if (hook.params.provider === 'rest') {
    throw new Error("This method doesn't allow");
  }
};
