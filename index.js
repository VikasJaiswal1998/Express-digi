import 'dotenv/config';

import express from 'express';

const app = express();
const port  =  process.env.PORT|| 7000;
app.use(express.json())

let teaData = []
let nextID  = 1

// add a new tea 
app.post("/teas",(req,res)=>{
    const {prices,name,time} = req.body
    const newTea = {id:nextID++,name,prices,time}
    teaData.push(newTea) // saving in array we have no DB yet
    res.status(201).send(newTea)
})

// get all teas
app.get("/allTeas",(req,res)=>{
    res.status(200).send(teaData);
})


// get one tea
app.get("/singleTea/:id",(req,res)=>{
   const tea =  teaData.find(ele => ele.id === parseInt(req.params.id))  // everythings which comes from url is in string form
   if(!tea){
    res.status(404).send("Tea not found")
   }
    res.status(200).send(tea);
})


// update any tea

app.put("/updateTeas/:id",(req,res)=>{
    // const id =  req.params.id;
    const tea =  teaData.find(ele => ele.id === parseInt(req.params.id))
    if(!tea){
    res.status(404).send("Tea not found")
   }

   const {name,prices,time} = req.body
   tea.name = name;
   tea.prices = prices;
   tea.time = time;
   res.status(200).send(tea)

})

// delete tea

app.delete("/teas/:id",(req,res)=>{
    const index =   teaData.findIndex(t => t.id == parseInt(req.params.id));
    if(index === -1){
        return res.status(404).send('tea not found')
    }

    teaData.splice(index, 1)
    return res.status(201).send('deleted')
})



// app.get("/",(req,res)=>{
//     res.send("Hello from vikas")
// })

// app.get("/ice-tea",(req,res)=>{
//     res.send("Liptin ice-green tea")
// })


app.listen(port,()=>{
    console.log(`Server is Running at port ${port}...`);
})




