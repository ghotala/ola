module.exports = function (grunt, options) {
  return {
    main: {
      options: {
        sourcemap: 'none',
        style: 'compressed'
      },
      files: {
        'tmp/all.css': 'src/scss/all.scss'
      }
    },
    progressive: {
      options: {
        sourcemap: 'none',
        style: 'compressed'
      },
      files: {
        'tmp/main.css': 'src/scss/main.scss',
        'tmp/550px.css': 'src/scss/550px.scss',
        'tmp/700px.css': 'src/scss/700px.scss',
        'tmp/960px.css': 'src/scss/960px.scss'
      }
    }
  };
};