var express=require('express');
var router=express.Router();
var pool=require('./pool');
var nodemailer = require('nodemailer');

router.post('/SendEmailTeacher',(req, res, next)=>{
    let {emailNguoiGui,passEmail,emailNguoiNhan,duongLinkFull,chude,duonglink,id,id_chuphong,phan,phong,tenlophoc}=req.body;

    let contentSend = `
    <p>Hi ${emailNguoiNhan}, from ${emailNguoiGui}</p>
    <p>Please join to class with link: ${duongLinkFull}</p>
    <p>Please not share for anyone</p>
    <p>Thank you!</p>
    `;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${emailNguoiGui}`, 
            pass: `${passEmail}`  
        },
        tls: {
            rejectUnauthorized: false
        }
     });

     let mailOptions = {
        from: `${emailNguoiGui}`, // sender address
        to: `${emailNguoiNhan}`,
        subject: "Invited class",
        html: contentSend,
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if(error){
            console.log('loi roi',error);
            return;
        }
        console.log('sent',info.response);
        let sqlInsertTeacher='insert into classroom (id,tenlophoc,phan,chude,phong,duonglink,id_chuphong,id_nguoithamgia) values(?,?,?,?,?,?,(select id from infomation where email=?),(select id from infomation where email=?))';
        
        pool.query(sqlInsertTeacher,[id,tenlophoc,phan,chude,phong,duonglink,emailNguoiNhan,emailNguoiNhan],(error,result)=>{
            if(error){
                res.send(error);
            }
            else{
                res.json(result);
                // console.log(result);
            }   
        });


    });
})

router.post('/SendEmailStudent',(req, res, next)=>{
    let {emailNguoiGui,passEmail,emailNguoiNhan,duongLinkFull,chude,duonglink,id,id_chuphong,phan,phong,tenlophoc}=req.body;

    let contentSend = `
    <p>Hi ${emailNguoiNhan}, from ${emailNguoiGui}</p>
    <p>Please join to class with link: ${duongLinkFull}</p>
    <p>Please not share for anyone</p>
    <p>Thank you!</p>
    `;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${emailNguoiGui}`, 
            pass: `${passEmail}`  
        },
        tls: {
            rejectUnauthorized: false
        }
     });

     let mailOptions = {
        from: `${emailNguoiGui}`, // sender address
        to: `${emailNguoiNhan}`,
        subject: "Invited class",
        html: contentSend,
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if(error){
            console.log('loi roi',error);
            return;
        }
        console.log('sent',info.response);
/*
insert into classroom (id,tenlophoc,phan,chude,phong,duonglink,id_chuphong,id_nguoithamgia)
values(1,'toán','1.1','hình không gian','F203','/classroom/1637069808370',(select id from infomation where email='tuhoa123abc@gmail.com'),(select id from infomation where email='tuhoa123abc@gmail.com'))
*/

        let sqlInsertTeacher='insert into classroom (id,tenlophoc,phan,chude,phong,duonglink,id_chuphong,id_nguoithamgia) values(?,?,?,?,?,?,?,(select id from infomation where email=?))';
        
        pool.query(sqlInsertTeacher,[id,tenlophoc,phan,chude,phong,duonglink,id_chuphong,emailNguoiNhan],(error,result)=>{
            if(error){
                res.send(error);
            }
            else{
                res.json(result);
                // console.log(result);
            }   
        });


    });
})

module.exports= router;