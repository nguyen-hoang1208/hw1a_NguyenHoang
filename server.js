const express=require('express');                        //starting express
const app=express();                                 //assign app to use these function of express module
const fs=require('fs');                              //assign file system object to read the file favs.json
var bodyParser= require('body-parser');              // using bodyParser to wrap data in order to put of get via script
app.listen(3000,()=>console.log('listening at 3000'));   //function to reach server and get response via notice console.log
app.use(express.static(__dirname));                    //read file index html
app.use(bodyParser.json());                            //using bodyParser
var arrayof3Items=[];                                  //create array to store these data from read file
let k=0;
fs.readFile('favs.json','utf8',function(err,data){       //function readfile
    if(err) throw err;                                   //if read file error, get the notice
    let readData=JSON.parse(data);                          //parse data and then store on variable readData
    for(const eachItem of readData){                     //loop to get data
      arrayof3Items[k]={                       
        created_at:eachItem.created_at,                    //get created_at
        text:eachItem.text,                              //get text
        id:eachItem.user.id,                             //get userID
        screen_name:eachItem.user.screen_name             //get screen_name
    }
    k=k+1;                                                //increament to store data via loop
    console.log(arrayof3Items)                          // check data in console log
    }   
  
    //Restful API get
app.get('/arrayof3Items', function(req,res){    
    res.send({arrayof3Items:arrayof3Items});
  }) 

    //Restful API post
app.post('/arrayof3Items',function(req,res){
   var assign3text=req.body.text;     //using body parser to get text data on scripts input and story via assign3text
   var assign3User_ID=req.body.id;    //using body parse to get user_ID input on scripts file
   
  var text_empty="";                  
   arrayof3Items.push({               //push these data on server
      id:assign3User_ID,              //id
      created_at:text_empty,          //created_at
      text:assign3text,              //text
      screen_name: text_empty         //screen_name
   });
   res.send('successfully created');
})
    //Restful API PUT OR UPDATE

app.put('/arrayof3Items/:id',function(req,res){   
  var id=req.params.id;                         //wrap id 
  var newscreen_name=req.body.screen_name;      //wrap screen_name that input and story newscreen_name
  var found=false;                          
  arrayof3Items.forEach(function(arrayof3Item,index){   //loop all items
     if(!found&&arrayof3Item.id==Number(id)){                   
        arrayof3Item.screen_name=newscreen_name;
     }
  })
     res.send('successfully updated data');   //message display when successfully updated
})
  //Restful API DELETE 
app.delete('/arrayof3Items/:id',function(req,res){
  var id=req.params.id;                        //wrap id
  var found=false;
  arrayof3Items.forEach(function(arrayof3Item,index){ //loop
     if(!found&&arrayof3Item.id==Number(id)){
          arrayof3Items.splice(index,1);
     }
  })

  res.send('successfully deleted product');
})
    




   
  
});