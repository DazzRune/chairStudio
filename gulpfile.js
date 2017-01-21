var gulp 		= require("gulp");
var clean 		= require('del');
var sass 		= require("gulp-sass");
var browserSync = require("browser-sync");
var imagemin 	= require("gulp-imagemin");
var autoprefixer = require("gulp-autoprefixer");
var cleanCSS 	= require("gulp-clean-css");
var uglifyJS 	= require("gulp-uglify");

// запуск одной командой s, где s=E: && cd E:\Web-dev\JS\chairStudio && gulp watch (user-aliases.cmd)

// !!! задачи выполняются одновременно (асинхронно)
// запостить на GitHub!
// запускать командой: gulp watch
// основы gulp - https://www.youtube.com/watch?v=vW51JUVT66w&list=WL&index=1

gulp.task('clean', function () {
  	return clean(['dist/**/*']);
});

gulp.task('copyHTML', function() {
	return gulp.src('app/**/*.html')
		.pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
	return gulp.src('app/sass/style.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/css'))
		.pipe(autoprefixer({
			browsers: ['> 1%', 'IE 10'],
			cascade: false
		}))
		.pipe(cleanCSS({compatibility: '*'})) // * - поддержка ie9+
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('uglifyJS', function() {
	return gulp.src('app/js/**/*.js')
		.pipe(uglifyJS())
		.pipe(gulp.dest('dist/js'))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app' // корень (если на сервере: server: "app" - текущий каталог)
		}
		// notify: false // убрать уведомления
	});
});

gulp.task('imgmin', function() {
	return gulp.src('app/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});

gulp.task('config', ['clean'], function() { // [..] - таски, выполняемые до запуска watch
	gulp.start('copyHTML', 'imgmin', 'sass', 'uglifyJS', 'browser-sync');
});

gulp.task('watch', ['config'], function() {
	gulp.watch('app/sass/**/*.scss', function() { 
		setTimeout(function () {gulp.start('sass');},1000); //задержка перед компиляцией, для SSD не нужно
	}); 
	// gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/*.html', ['copyHTML', browserSync.reload]);
	gulp.watch('app/js/**/*.js', function() {
		setTimeout(function() {gulp.start('uglifyJS');},1000);
		browserSync.reload;
	});	
})
