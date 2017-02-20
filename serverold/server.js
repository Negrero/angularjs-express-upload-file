/**
 * Created by negrero on 20/02/2017.
 */

var express=require("express");
var multer=require('multer');
var app=express();
var done=false;

/*configure the multer*/

app.use(
    multer(
        {dest:'./uploads/',rename:function(fieldname,filename){
            return filename+Date.now();
        },
            onFileUploadStart:function(file){
                console.log(file.fieldname+'is starting....')
            },
            onFileUploadComplete: function(file){
                console.log(file.fieldname+' uploaded to '+file.path);
                done=true
            }
        }));

app.use(express.static('../app'));
/*Handling routes*/
app.get('/',function(req,res){
    console.log("comenzando. .........");
    res.send('../app/index.html');
});

app.post('/api/file',function(req,res){
    if(done==true){
        console.log(req.files);
        res.end("File uploaded.");
    }
});

/* Run the server */
app.listen(3000,function(){
    console.log("working on port 3000")
});