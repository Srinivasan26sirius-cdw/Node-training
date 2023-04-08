let fs=require('fs');
let http=require('http');
let rn = require('random-number');
let gen = rn.generator({
  min:  -1000
, max:  1000
, integer: true
});
http.createServer((req,res,err)=>
{
    if(err) {
        console.log(err);
    }
    if(req.url!='/favicon.ico') {
        let colors=[];
        let colorData=[];
        fs.readFile('./assets/color_palette.json','utf-8',(err,data)=>{
    
            if(err) {
                console.log("error");
            }
            colors=JSON.parse(data);
            
            for(let index=0;index<5;index++) {
                colorData.push(colors[gen(0,colors.length,true)]);
            }
            fs.writeFile('./assets/randomized_color_palette.json',JSON.stringify(colorData),(err)=>{
                if(err) {
                    console.log(err);
                }
                fs.readFile('./assets/randomized_color_palette.json','utf8',(err,color)=>{
                    if(err) {
                        console.log("error");
                    }
                    console.log(JSON.parse(color));
                });
            })
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify(colorData,null,4));
            res.end();
        });
    }
   
}).listen(4002);
