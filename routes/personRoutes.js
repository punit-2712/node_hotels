const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
router.post("/", async (req, res) => {
  try {
    const data = req.body; //jo body parser modify karke bhej raha hai data vo req.body par store hota hain

    //ab we will create a new person document using Mongoose model
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log("Data Saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Errror" });
  }
});

//make API to get the documents in collections of person

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fecthed");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Errror" });
  }
});

//parameterised API

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //extract the work type from URL
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fecthed");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invlid server Error" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server error" });
  }
});


router.put('/:id',async(req,res)=>{
  try{

    const personId= req.params.id;
    const updatedPersonData=req.data;
    const response =await Person.findByIdAndUpdate(personId,updatedPersonData,{ 

      new:true,
      runValidators:true,
    })
    if(!response){
      return res.status(404).json({error:'Person not found'});
    }
    console.log('data updated');
    res.status(200).json(response);


  }catch(err){

    console.log(err);
    res.status(500).json({error:'Internal Server Error'})

  }
})


router.delete('/:id',async(req,res)=>{
  try{

    const personId = req.params.id;
    const response=await Person.findByIdAndRemove(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data deleted");
    res.status(200).json({message:'Person deleted Successfully'});

  }catch{

    console.log(err);
    res.status(500).json({error:'Internal Server Error'});

  }
})

module.exports = router;
