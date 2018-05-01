const gulp = require('flarum-gulp');

gulp({
    modules: {
        'flagrow/terms': [
            '../lib/**/*.js',
            'src/**/*.js',
        ],
    },
});
