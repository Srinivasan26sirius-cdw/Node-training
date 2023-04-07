let fs=require('fs');
let http=require('http');
http.createServer((req,res,err)=>
{
    if(err) {
        console.log(err);
    }
    if(req.url!='/favicon.ico') {
        let colors=[];
        let colorData=[];
        fs.readFile('./json/color_palette.json','utf8',(err,data)=>{
    
            if(err) {
                console.log("error");
            }
            colors=JSON.parse(data);
            
            for(let index=0;index<5;index++) {
                colorData.push(colors[Math.floor(Math.random() * (colors.length+ 1))]);
            }
            fs.writeFile('./json/randomized_color_palette.json',JSON.stringify(colorData),(err)=>{
                if(err) {
                    console.log(err);
                }
                fs.readFile('./json/randomized_color_palette.json','utf8',(err,color)=>{
                    if(err) {
                        console.log("error");
                    }
                    console.log(JSON.parse(color));
                });
            })
            res.write(JSON.stringify(colorData,null,4));
            res.end();
        });
    }
   
}).listen(4000);