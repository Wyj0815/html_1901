// sass编译成css
//1.引入gulp包
//2.引入gulp-sass包
//3.生成gulp任务，进行sass编译
const gulp = require("gulp");
const sass = require("gulp-sass");
const watch = require("gulp-watch");
gulp.task("compile",function(){
    return gulp.src("./src/sass/index.scss")
    .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))
})

gulp.task("footer",function(){
    return gulp.src("./src/sass/footer.scss")
    .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))
})

gulp.task("header",function(){
    return gulp.src("./src/sass/header.scss")
    .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))
})
gulp.task("list",function(){
    return gulp.src("./src/sass/list.scss")
    .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))
})
gulp.task("car",function(){
    return gulp.src("./src/sass/car.scss")
    .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))
})
gulp.task("goods",function(){
    return gulp.src("./src/sass/goods.scss")
    .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))
})
gulp.task("fixBox",function(){
    return gulp.src("./src/sass/fixBox.scss")
    .pipe(sass({outputStyle:'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('./src/css'))
})

// 监听
gulp.task("jt",function(){
    return watch("./src/sass/index.scss",gulp.series("compile"));
})

gulp.task("jt2",function(){
    return watch("./src/sass/footer.scss",gulp.series("footer"));
})

gulp.task("jt3",function(){
    return watch("./src/sass/header.scss",gulp.series("header"));
})
gulp.task("jt4",function(){
    return watch("./src/sass/list.scss",gulp.series("list"));
})
gulp.task("jt5",function(){
    return watch("./src/sass/car.scss",gulp.series("car"));
})
gulp.task("jt6",function(){
    return watch("./src/sass/goods.scss",gulp.series("goods"));
})
gulp.task("jt7",function(){
    return watch("./src/sass/fixBox.scss",gulp.series("fixBox"));
})


