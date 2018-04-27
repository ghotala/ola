module.exports = function (grunt, options) {
  return {
    tmp: {
      src: ['tmp'],
      force: true
    },
    public: {
      src: ['public'],
      force: true
    }
  };
};