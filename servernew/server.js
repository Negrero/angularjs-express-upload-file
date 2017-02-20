/**
 * Created by negrero on 20/02/2017.
 */

var express=require("express");
var multer=require('multer');
var app=express();
//var upload = multer({ dest: 'uploads/' })
/*configure the multer*/


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })
//app.use(multer({dest:'./uploads/'}).single('file'));

app.use(express.static('../app'));
/*Handling routes*/
app.get('/',function(req,res){

    res.send('../app/index.html');
});

app.post('/api/file', upload.single('file'), function (req, res, next) {
    console.log("success");
    console.log(req.file);
    res.status(204).end();
});

/* Run the server */
app.listen(3001,function(){
    console.log("working on port 3001")
});