var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

var logger = require('morgan');

const authRouter = require('./routes/auth');
const filesRouter = require('./routes/files');
const searchRouter = require('./routes/search');

const app = express();

const jwt_config = require('./config/jwt.config');
app.set('jwt-secret', jwt_config.secret);

// sequelize에서 작성된 모델을 기반으로 실제 데이터베이스에서 생성
const sequelize = require('./models').sequelize;
sequelize.sync();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/auth', authRouter);
app.use('/files', filesRouter);
app.use('/search', searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//nodemon 작동 위해
app.listen(8080, function(){
  console.log("info",'Server is running at port : ' + 3000);
});

module.exports = app;
