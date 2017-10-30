var gulp = require('gulp'),
    awspublish = require('gulp-awspublish');

var localConfig = {
    buildSrc: './build/**/*',
    getAwsConf: function (environment) {
        var conf = require('../../config/aws');
        if (!conf[environment]) {
            throw 'No aws conf for env: ' + environment;
        }
        if (!conf[environment + 'Headers']) {
            throw 'No aws headers for env: ' + environment;
        }
        return { keys: conf[environment], headers: conf[environment + 'Headers'] };
    }
};

gulp.task('s3:production', ['build:production'], function() {
    var awsConf = localConfig.getAwsConf('production');
    var publisher = awspublish.create(awsConf.keys);
    return gulp.src(localConfig.buildSrc)
        .pipe(awspublish.gzip({ ext: '' }))
        .pipe(publisher.publish(awsConf.headers))
        .pipe(publisher.cache())
        .pipe(publisher.sync())
        .pipe(awspublish.reporter());
});
function filterProduct(catalogs){
    var products = [];
    _.forEach(catalogs, function(eachCatalog){
        if(eachCatalog.products && eachCatalog.products.length > 0 && eachCatalog.active == 1){
            products.push(eachCatalog.products);
        }
    })
    return _.flatten(products);
}
function filterCatalog(catalogs){
    var activeCatalogs = _.filter(catalogs, function (eachCatalog) {
        return eachCatalog.active == 1
    })
    return activeCatalogs;
}
/*
   <div>
<span class="slider-description-text">Slide to switch between Product/Catalog</span>
<toggle ng-model="toggleValue" ng-change="sliderChange()" on="Catalog" off="Product"
    onstyle="btn-success" offstyle="btn-warning"  size="btn-sm" title="Slide to switch between Product/Catalog"></toggle>
    </div>*/
