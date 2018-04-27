module.exports = function (grunt, options) {
  return {
    html: {
      expand: true,
      cwd: 'tmp',
      src: ['*.html'],
      dest: 'public'
    },
    css: {
      expand: true,
      cwd: 'tmp',
      src: ['*.css'],
      dest: 'public/css'
    },
    assets: {
      expand: true,
      cwd: 'src/assets',
      src: ['*.*'],
      dest: 'public/assets'
    }
  };
};