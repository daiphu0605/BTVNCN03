var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bé tập tính' });
});

router.post('/', (req, res)=> {
  var st = req.body.st;
  var nd = req.body.nd;

  var operator = {
    plus: false,
    sub: false,
    mul: false,
    div: false,
    value: Number(req.body.operator),
  };
  /*Check operator */
  switch (operator.value)
  {
    case 1:
      operator.plus = true;
      break;
    case 2:
      operator.sub = true;
      break; 
    case 3: 
      operator.mul = true;
      break;
    case 4:
      operator.div = true;
      break;
    default:
  }
  
  /*Check Null*/
  if (st == "" && nd == "")
  {
    let Error = "Chưa nhập số thứ nhất và số thứ hai.";
    res.render('index', { title: 'Bé tập tính', operator, Error});
    return;
  }
  else if (st == "") {
    let Error = "Chưa nhập số thứ nhất.";
    res.render('index', { title: 'Bé tập tính', nd, operator, Error});
    return;
  }
  else if (nd == "") {
    let Error = "Chưa nhập số thứ hai.";
    res.render('index', { title: 'Bé tập tính', st, operator, Error});
    return;
  }

  /*Check Number*/
  if (isNaN(st) && isNaN(nd))
  {
    let Error = "Chưa nhập đúng số thứ nhất và số thứ hai.";
    res.render('index', { title: 'Bé tập tính', operator, Error});
    return;
  }
  else if (isNaN(st)) {
    let Error = "Chưa nhập đúng số thứ nhất.";
    res.render('index', { title: 'Bé tập tính', nd, operator, Error});
    return;
  }
  else if (isNaN(nd)) {
    let Error = "Chưa nhập đúng số thứ hai.";
    res.render('index', { title: 'Bé tập tính', st, operator, Error});
    return;
  }

  /*Convert number*/
  st = Number(st);
  nd = Number(nd);
  
  /*Handle math*/
  if (operator.plus) {
    var result = st + nd;
    res.render('index', { title: 'Bé tập tính', st, nd, operator, result });
  }
  else if (operator.sub) {
    var result = st - nd;
    res.render('index', { title: 'Bé tập tính', st, nd, operator, result });
  }
  else if (operator.mul) {
    var result = st * nd;
    res.render('index', { title: 'Bé tập tính', st, nd, operator, result });
  }
  else if (operator.div) {
    if (nd == 0) {
      let Error = "Số thứ hai bằng không, không thể thực hiện phép chia.";
      res.render('index', { title: 'Bé tập tính', st, nd, operator, Error });
      return;
    }
    var result = st / nd;
    res.render('index', { title: 'Bé tập tính', st, nd, operator, result }); 
  }
  else {
    let Error = "Chưa chọn phép tính";
    res.render('index', { title: 'Bé tập tính', st, nd, Error });
  }
});

module.exports = router;
