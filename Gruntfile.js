module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'public/styles/css/main.css' : 'public/styles/sass/main.scss',
                    'public/styles/css/home.css' : 'public/styles/sass/home.scss',
                    'public/styles/css/sidebar.css' : 'public/styles/sass/sidebar.scss',
                    'public/styles/css/categories-layout.css' : 'public/styles/sass/categories-layout.scss',
                    'public/styles/css/columnar-layout.css' : 'public/styles/sass/columnar-layout.scss'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default',['watch']);
    grunt.registerTask('dev',['sass']);
};