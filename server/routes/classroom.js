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

/*Get value detail classroom based on link F */  
router.get('/api/detailClassroom/:duonglink', function(req, res, next) {
    let linkFind='/classroom/'+req.params.duonglink;
    let sql='select distinct id,tenlophoc,phan,chude,phong,duonglink,id_chuphong from classroom where duonglink=? limit 1';
    console.log('duong link  ',linkFind);
    pool.query(sql,[linkFind],(error,result)=>{
        if(error){
            res.send(error);
        }
        else{
            res.json(result);
            // console.log(result);
        }   
    });

});

/*Get teachers in classroom based on link F */
router.get('/api/teacherClassroom/:duonglink', function(req, res, next) {
    let linkFind='/classroom/'+req.params.duonglink;
    let sql='select * from infomation where id in (select distinct id_chuphong from classroom where duonglink=?)';
    pool.query(sql,[linkFind],(error,result)=>{
        if(error){
            res.send(error);
        }
        else{
            res.json(result);
            // console.log(result);
        }   
    });

});

/*Get students in classroom based on link F*/
router.get('/api/studentClassroom/:duonglink', function(req, res, next) {
    let linkFind='/classroom/'+req.params.duonglink;
    let sql='select * from infomation where id in (select distinct id_nguoithamgia from classroom where duonglink=? and id_nguoithamgia not in (select distinct id_chuphong from classroom where duonglink=?))';

    pool.query(sql,[linkFind,linkFind],(error,result)=>{
        if(error){
            res.send(error);
        }
        else{
            res.json(result);
            // console.log(result);
        }   
    });

});

/*Join classroom by link F*/
router.get('/api/joinClassroom/:duonglink', function(req, res, next) {
    let linkFind='/classroom/'+req.params.duonglink;
    let sqlFindLink='select distinct tenlophoc,phan,chude,phong,duonglink from classroom where duonglink=?';

    pool.query(sqlFindLink,[linkFind],(error,result)=>{
        if(error){
            res.send(error);
        }
        else{
            console.log('join thanh cong',result);
            res.json(result);
            
        }   
    });

});
/*add people to classroom by id F*/
router.post('/api/AddPeopleClassroom', function(req, res, next) {
    let {id_nguoithamgia,duonglink}=req.body;
    let linkFind='/classroom/'+duonglink;
    let sqlFindClass="insert into classroom (id,tenlophoc,phan,chude,phong,duonglink,id_chuphong,id_nguoithamgia) select id,tenlophoc,phan,chude,phong,duonglink,id_chuphong,? from classroom where duonglink=? limit 1";
    pool.query(sqlFindClass,[id_nguoithamgia,linkFind],(err, result) => {
         if (err){
            console.log('add people class fail');
            res.json({message:'add people class fail'});
         }
         else{
            console.log('add people class success',result);
            res.json({message:'add people success'});
         }
    }   
       );

});

module.exports= router;