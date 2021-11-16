var express=require('express');
var jwt = require('jsonwebtoken');
var router=express.Router();

const users=[
    {
        id:'1',
        hoten:'thai nhat tan',
        username:'tan',
        password:'123456',
        role:'hs'
    },
    {
        id:'2',
        hoten:'tran minh quang',
        username:'quang',
        password:'123456',
        role:'gv'
    }
]
/*Get all list classroom */
router.post('/api/login', function(req, res, next) {
    let {username,password}=req.body;
    let user=users.find((u)=>{
        if(u.username===username&&u.password===password){
            return u;
        }
    });
    if(user){
        //generate an access token
        const accessToken=jwt.sign(
            //payload
            {
                id:user.id,
                hoten:user.hoten,
                username:user.username,
                role:user.role
            },
            "mySecretKey",
            {
                expiresIn: "20s"
            }
        );
        res.json(
            {
                username:user.username,
                accessToken
            }
        );
    }
    else{
        res.json("hhehehe, false");
    }
    
});


const verify=(req,res,next)=>{
    const authHeader=req.headers.authorization; 
    if(authHeader){
        const token=authHeader.split(" ")[1];
        jwt.verify(token,"mySecretKey",(err,user)=>{
            if(err){
                return res.status(403).json("Token is not valid");
            }
            req.user=user;
            next();
        })
    }  
    else{
        res.status(401).json("you are not authenticated");
    }
}
router.get('/api/user/:userid',verify,(req,res)=>{
    res.json("h moi vao duoc");
});


/*Create classroom */  
// router.post('/api/AddNewClassroom', function(req, res, next) {
//     let id=req.body.id;
//     let tenLop=req.body.tenLop;
//     let sql="INSERT INTO ClassRoomManager VALUES('"+id+"', '"+tenLop+"')";
//     pool.query(sql,
//         (err, result) => {
//          if (err) return next(err);
//         }
        
//        );

// });
module.exports= router;