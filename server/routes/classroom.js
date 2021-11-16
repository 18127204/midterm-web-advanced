var express=require('express');
var router=express.Router();
var pool=require('./pool');
var passport=require('../modules/passport');

/*Get all list classroom */
router.get('/api/GetALLListClassroom', function(req, res, next) {
    pool.query('select * from classroom',(error,result)=>{
        if(error){
            res.send(error);
        }
        else{
            res.json(result);
            console.log(result);
        }   
    });
});
/*Create classroom */  
router.post('/api/AddNewClassroom', function(req, res, next) {
    let id=req.body.id;
    let tenLop=req.body.tenLop;
    let sql="INSERT INTO ClassRoomManager VALUES('"+id+"', '"+tenLop+"')";
    pool.query(sql,
        (err, result) => {
         if (err) return next(err);
        }
        
       );

});
/*Test data protect */
router.get('/testLopHoc',(req,res,next)=>{
    res.json([
        {
            id:1,
            name:'toan'
        },
        {
            id:2,
            name:'van'
        },
        {
            id:3,
            name:'anhvan'
        }
    ])
})

/*get value from account */  
router.get('/account/:id', function(req, res, next) {

    let sql='select * from account where id=?';
    pool.query(sql,[req.params.id],(error,result)=>{
        if(error){
            res.send(error);
        }
        else{
            res.json(result);
            console.log(result);
        }   
    });

});

module.exports= router;