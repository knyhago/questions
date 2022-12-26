const express=require('express');
const app=express();
const port=8021;
const mongoose=require('mongoose');
const url='mongodb+srv://knyhago:kenny@cluster0.2kzve.mongodb.net/?retryWrites=true&w=majority';
const Question=require('./Models/Question');
const nodemailer=require('nodemailer');

const config=require('config')

const Official =require('./Models/officials')

const bodyparser=require('body-parser');
const cors=require('cors');




app.use(cors());
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

var sender=nodemailer.createTransport({
    service:config.get('email.service'),
    secure:true,
    auth:{
        user:config.get('email.user'),
        pass:config.get('email.pass')
    }
})

var composeMail={
    from:config.get('email.from'),
    to:"kennethhagin545@gmail.com",
    subject:"Testing nodeMailer",
    message:"test success",
    html:"<h1>Succ html</h1>"
}

// sender.sendMail(composeMail,(err,succ)=>{
//     if (err) throw err
//     console.log(succ)
// })

app.get('/',async (req,res)=>{
    try {
        res.status(200).json({
            message:"health done"
        })
        
    } catch (error) {
        
    }
})

// app.get('/all',async (req,res)=>{
//     condition={};
//     if(req.query.hp)
//     {
//         const hp=req.query.hp;
//         condition={Price:{$gt:hp}}
//     }
//     else if(req.query.lp)
//     {
//         const lp=req.query.lp;
//         condition={Price:{$lte:lp}}
//     }
//     else if(req.query.hp && req.query.lp)
//     {
//         const hp=req.query.hp;
//         const lp=req.query.lp;
//         condition={Price:{$lte:lp}&&{$gt:hp}}
//     }
//     res.status(200).json(await Bill.find(condition))  

    
// })

app.get('/all',(req,res)=>{
    var id=req.params.id;
    var condition={};
    


    Question.find(condition).sort({Priority:-1})
    .then((result)=>{
        res.status(200).json(result)
    })

})



app.post('/postbill',async(req,res)=>{
   
    try 
    {
        const qn=new Question({
            Question:req.body.question,
            Message:req.body.message,
            Priority:0,
            taggedTo:req.body.taggedTo?req.body.taggedTo:'none'
        })
        await qn.save((err,suc)=>{
            if (err) throw err
            res.send(suc)
        })
        var datas=await Question.find({taggedTo:taggedTo})
        console.log(datas)
    } 
    catch (error)
     {
        console.log(err)
        
    }

   


})

app.patch('/updat/:id/:method',async(req,res)=>{
    var id=req.params.id;
    var get=await Question.findById(id)    
    var old=get.Priority;    
    var inc=old+1;
    var dec=old-1;

    var method=req.params.method;

    if(method==='dec')
    {
        Question.findByIdAndUpdate(id,{$set:{"Priority":dec}},{new:true})
        .then((suc)=>{
            res.status(200).send(suc)
        })
            
    }
    else if(method==='inc'){
        Question.findByIdAndUpdate(id,{$set:{"Priority":inc}},{new:true})
    .then((suc)=>{
        res.status(200).send(suc)
    })
        
    }

     

 })

app.delete('/delete/:id',async (req,res)=>{
    var id=req.params.id;
    Question.findByIdAndDelete({_id:id})
    .then((suc)=>{
        res.status(200).send("deleted")
    })
})
// app.patch('/update/:id',async(req,res)=>{
//     var id=req.params.id;
//     const updat=req.body;
//     var arr=[];
//     try {
        
//         Bill.find({_id:id})
        
//         .then((result)=>{
            
//             var name=result[0].Name;
//             var price=Number(result[0].Price)
//             if(price===200)
//         {
//             res.json({message:"200 a matha mudyathhu"})
//         }
//         else
//         {
//             Bill.findByIdAndUpdate(id,updat)
//             .then((succ)=>{
//                 res.status(200).json({message:"updated bro"})
//             })
            

//         }
//         })       


//     } catch (err) {
//         res.status(400).json({
//             message:err.error
//         })
        
//     }
// })

// app.delete('/delete/:id',async (req,res)=>{
//     var id=req.params.id;
//      Bill.findByIdAndDelete({_id:id})
     
//      .then((suc)=>[
//         res.status(200).json({message:"deleted"})
        
        
//      ])
//     .catch((err)=>{
//         res.status(400).json({error:err})
//     })
    
//     .then((data)=>{
        
//         if(data!=undefined)
//         {
//             naming=data.Name.split(' ');
//             naming.map((x)=>{
//                 if(x==='kny'||x==='kenny')
//                 {
//                    try{res.status(400).json({message:"cannot delete king"})}
//                    catch(err){
//                     throw err
//                    }
                  
//                 }
//                 else
//                 {                    
//                     try{
//                         Bill.deleteOne({_id:id})
//                         .then((succ)=>
//                         {
//                             res.status(200).json({Message:"delet successfully",
//                         Message2:succ
                            
//                                 })
//                         }
//                         )
//                             }
//                     catch(err)
//                         {
//                             res.status(400).json({
//                                 message:"error"
//                             ,
//                             message2:err
//                             })
                    
//                         }
//          }
//             })
//         }        
//         else
//             {
//                 res.status(200).json({message:"not found"})

//             }
//     })

   
// })

/*officials post */

app.post('/postoff',async (req,res)=>{
   

    var data = new Official({
        Name:req.body.name,
        Position:req.body.position,
        EmailId:req.body.emailid

    })

    data.save()
    .then((suc)=>{
        res.status(200).send("saved")
    })
    .catch((err)=>{
        res.status(400).send(err)
    })
})

app.get('/alloff',async(req,res)=>{
    Official.find()
    .then((suc)=>{
        res.status(200).send(suc)
    })
    .catch((err)=>{
        res.status(400).send(err)
    })
})
mongoose.connect(url,(err,succ)=>{
    if (err) throw err
    console.log("connected to db")
    app.listen(port,(err)=>{
        if (err) throw err
        console.log(`port${port}`)
    })
})