var express=require('express');
var router=express.Router();
var pool=require('./pool');
var passport=require('../modules/passport');



/*Get all list classroom with check param: idNguoiThamGia F */
router.get('/api/GetALLListClassroom/:idNguoiThamGia', function(req, res, next) {
    let idNTGia=req.params.idNguoiThamGia;
    let sql='select distinct tenlophoc,phan,chude,phong,duonglink from classroom where id_nguoithamgia= ? or id_chuphong=?'
    pool.query(sql,[idNTGia,idNTGia],(error,result)=>{
        if(error){
            res.send(error);
        }
        else{
            // console.log('GetALLLis: ',result);
            res.json(result);
            
        }   
    });
});

/*Create classroom F*/  
router.post('/api/AddNewClassroom', function(req, res, next) {
    let {id_nguoithamgia,tenlophoc,phan,chude,phong,duonglink,id_chuphong}=req.body;
    let sqlNewClass="insert into classroom (id_nguoithamgia,tenlophoc,phan,chude,phong,duonglink,id_chuphong) values(?,?,?,?,?,?,?)";
    pool.query(sqlNewClass,[id_nguoithamgia,tenlophoc,phan,chude,phong,duonglink,id_chuphong],(err, result) => {
         if (err){
            res.json({message:'add new class fail'});
         }
         else{
            //  console.log('kq insert class',result);
            res.json({message:'add new class success'});
         }
    }   
       );

});
module.exports= router;