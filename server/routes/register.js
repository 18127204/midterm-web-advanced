var express = require("express");
var router = express.Router();
var pool = require("./pool");
var passport = require("../modules/passport");

/*Create classroom */
router.post("/", function (req, res, next) {
  let { hoten, email, sodienthoai, diachi, username, password } = req.body;

  let sqlAccount = "insert into account (username,password) values(?,?)";
  pool.query(sqlAccount, [username, password], (error, result) => {
    if (error) {
      res.json({ message: "registerfail" });
    } else {
      let sqlInfor =
        "insert into infomation (hoten,email,sodienthoai,diachi) values(?,?,?,?)";
      pool.query(
        sqlInfor,
        [hoten, email, sodienthoai, diachi],
        (error, result) => {
          if (error) {
            res.json({ message: "registerfail" });
          } else {
            res.json({ message: "registersuccess" });
          }
        }
      );
    }
  });
});

module.exports = router;
