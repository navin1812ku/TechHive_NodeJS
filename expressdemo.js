var express=require('express')
var bodyParser=require('body-parser')
const PersonModel=require("./models/User");
var cors=require('cors')
const mongoose=require('mongoose')
var app=express()
var jsonBodyParser=bodyParser.json()
app.use(jsonBodyParser)
app.use(cors())
mongoose.connect('mongodb://127.0.0.1:27017/myapp')
// var urlEncodedBodyParser=bodyParser.urlencoded({extended:false})
//display all professional
app.get('/professional',function (req,res){ 
    PersonModel.find().then((data)=> res.json(data))
})

app.get('/professional/:services',function (req,res){ 
    var ser=req.params.services
    PersonModel.find({services:ser}).then((data)=> res.json(data))
})

// //display professionals by id
// app.get('/professional/:id',function (req,res){ 
//     const id=req.params["id"]
//     res.json(professional.filter((el)=>el.id==id));
// })

//post or add individual professional
app.post('/professional',function (req,res){ 
    var {id,fname,lname,email,mobile,services}=req.body;
    const person=new PersonModel({
    id,fname,lname,email,mobile,services
    })
    person.save().then(()=>{
        console.log('User Saved');
    })
    res.json(person)
})

app.put('/professional/update/:id', function (req, res) {
    var val = req.params.id;
    var { fname, lname, email, mobile, services } = req.body;
  
    // Construct the updated object
    var updatedProfessional = {
      fname: fname,
      lname: lname,
      email: email,
      mobile: mobile,
      services: services
    };
  
    // Update the object by ID
    res.json(PersonModel.findOneAndUpdate({id:val}, updatedProfessional, {new:true,useFindAndModify:false})
      .then((data) => {
        console.log(data);
        res.send(data); // Optional: Send the updated data as the response
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error occurred while updating professional.'); // Send an error response
      }))
  });

// //update on individual professional
// app.put('/professional/:id',function (req,res){ 
//     var id=req.params.id
//     var chgprofessional=null
//     var {fnam,lnam,em,mob,ser}=req.body
//     PersonModel.findOneAndUpdate({id:id},{fname:fnam,lname:lnam,email:em,mobile:mob,services:ser},{new:true,useFindAndModify:false}).then((data)=>console.log(data))

    // for(let i=0;i<PersonModel.length;i++){
    //     if(PersonModel[i].id==id){
    //            if(fname)
    //              PersonModel[i].fname=fname
    //            if(lname)
    //              PersonModel[i].lname=lname
    //             if(fname)
    //              PersonModel[i].email=email
    //            if(lname)
    //              PersonModel[i].mobile=mobile
    //         chgprofessional=PersonModel[i]
    //     }
    // }
    // res.json(chgprofessional);
// })

// //delete professional by id
app.delete('/professional/:id',function (req,res){ 
        const val=req.params["id"]
        PersonModel.deleteOne({id:val})
      .then((data) => {
        console.log(data);
        res.send(data); // Optional: Send the updated data as the response
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error occurred while updating professional.'); // Send an error response
      });
    })
//     professional=professional.filter((el)=>el.id!=id)
//     res.send("Deleted "+id);
// })

var server = app.listen(8082,function(){
    var host=server.address().address;
    var port=server.address().port
    console.log("Example app listening")
})