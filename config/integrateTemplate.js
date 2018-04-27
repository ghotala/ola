module.exports = function (grunt, options) {
  return {
    all: {
      basePath: 'src/html',
      template: 'template.html',
      partials: ['index', 'terapia-indywidualna'],
      dest: 'tmp'
    }
  };
};