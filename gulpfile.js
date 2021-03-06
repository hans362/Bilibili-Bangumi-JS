const gulp = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const header = require('gulp-header');
const pkg = require('./package.json');
const connect = require('gulp-connect');


const jsBanner = ['/*! Bilibili-Bangumi-JS v<%= pkg.version %>',
    'Hans362 (https://hans362.cn)',
    'https://bilibili-bangumi-js.vercel.app',
    '<%= pkg.license %> License */'
].join(' | ');

const cssBanner = ['/*! Bilibili-Bangumi-JS v<%= pkg.version %>',
    'Hans362 (https://hans362.cn)',
    'https://bilibili-bangumi-js.vercel.app',
    '<%= pkg.license %> License */'
].join(' | ');


const browserslist = [
    'last 3 versions',
    'since 2016',
    '> 1%',
    'Chrome >= 49',
    'Firefox >= 50',
    'ie >= 11',
    'Safari >= 9',
]

const configs = {
    autoprefixer: {
        overrideBrowserslist: browserslist
    },
    cleanCSS: {
        compatibility: 'ie11'
    },
};

gulp.task('minify-js', () => gulp.src('src/**/*.js')
    .pipe(babel({
        'presets': [
            ['@babel/env', {
                'targets': browserslist,
                'loose': true
            }]
        ]
    }))
    .pipe(uglify({
        keep_fnames: false
    }))
    .pipe(header(jsBanner, { pkg }))
    .pipe(gulp.dest('dist')));

gulp.task('minify-css', () => gulp.src('src/**/*.css')
    .pipe(autoprefixer(configs.autoprefixer))
    .pipe(cleanCSS(configs.cleanCSS))
    .pipe(header(cssBanner, { pkg }))
    .pipe(gulp.dest('dist')));

gulp.task('build', gulp.parallel('minify-js', 'minify-css'));

gulp.task('server', function() {
    connect.server({
        livereload: true,
        port: 8888,
	host: "0.0.0.0"
    });
});

gulp.task('default', gulp.parallel('build'));
