module.exports = function(grunt) {
  var configs = require('load-grunt-configs')(grunt);
  grunt.initConfig(configs);

  require('load-grunt-tasks')(grunt);
  grunt.registerMultiTask('integrateTemplate', 'integrates HTML partials and meta config into HTML template', function() {
    var data = this.data;
    var basePath = data.basePath;
    var destPath = data.dest;
    var templateFile = basePath + '/' + data.template;
    var partials = data.partials;
    var minifiedCssFile = data.minifiedCss;

    grunt.log.writeln('Received data: ' + JSON.stringify(data));

    grunt.log.writeln('Checking for template file [' + templateFile + ']');
    if (!grunt.file.exists(templateFile)) {
      console.log.errorlns('Template file not found!');
      return;
    }

    partials.forEach(function(partial) {
      var configFile = basePath + '/' + partial + '/config.json';
      var mainContentFile = basePath + '/' + partial + '/main_content.html';
      var lowerContentFile = basePath + '/' + partial + '/lower_content.html';

      grunt.log.writeln('Checking for config file [' + configFile + ']')
      if (!grunt.file.exists(configFile)) {
        console.log.errorlns('Config file not found!');
        return;
      }

      grunt.log.writeln('Checking for main content file [' + mainContentFile + ']')
      if (!grunt.file.exists(mainContentFile)) {
        console.log.errorlns('Main content file not found!');
        return;
      }

      var minifiedCss;
      grunt.log.writeln('Checking for minified css [' + minifiedCssFile + ']')
      if (!grunt.file.exists(minifiedCssFile)) {
        console.log.errorlns('Minified css file not found!');
        return;
      }

      grunt.log.writeln('Reading template file');
      var template = grunt.file.read(templateFile);

      grunt.log.writeln('Reading and parsing config file');
      var config = JSON.parse(grunt.file.read(configFile));

      grunt.log.writeln('Reading main content file');
      var mainContent = grunt.file.read(mainContentFile);

      grunt.log.writeln('Reading minified css file');
      var minifiedCss = grunt.file.read(minifiedCssFile);      

      var lowerContent;
      grunt.log.writeln('Checking for lower content file [' + lowerContentFile + ']')
      if (grunt.file.exists(lowerContentFile)) {
        grunt.log.writeln('Reading lower content file')
        lowerContent = grunt.file.read(lowerContentFile);
      }
      else {
        grunt.log.writeln('Lower content file not found, skipping')
      }

      var model = {
        title: config.title,
        description: config.description,
        mainContent: mainContent,
        lowerContent: lowerContent,
        inlineCss: minifiedCss
      };

      grunt.log.writeln('Processing template');
      var outputContent = grunt.template.process(template, { data: model });

      var outputFile = destPath + '/' + partial + '.html';
      grunt.log.writeln('Writing output file [' + outputFile + ']');
      grunt.file.write(outputFile, outputContent);

      grunt.log.oklns('Output file created');
    });

    grunt.log.oklns('Done');
  });

  grunt.registerTask('default',['clean:tmp','sass','integrateTemplate','clean:public','copy']);
}