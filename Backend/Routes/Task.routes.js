const express = require("express");
const { TaskModel } = require("../Model/Task.model");

const taskRoutes = express.Router();
  

taskRoutes.get("/projects", async (req, res) => {
  try {
    const { page = 1, search = "", sort = "" } = req.query;

    const pipeline = [];

    if (search) {
      const searchStage = {
        $match: {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { reason: { $regex: search, $options: "i" } },
            { type: { $regex: search, $options: "i" } },
            { divison: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
            { priority: { $regex: search, $options: "i" } },
            { department: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
            { status: { $regex: search, $options: "i" } },
          ],
        },
      };
      pipeline.push(searchStage);
    }

    if (sort) {
      const sortStage = {
        $sort: { [sort]: 1 },
      };
      pipeline.push(sortStage);
    }

    const totalCountPipeline = [...pipeline]; // Create a separate pipeline for total count
    totalCountPipeline.push({ $count: "totalCount" }); // Add $count stage to count the total documents

    pipeline.push(
      { $skip: (page - 1) * 10 },
      { $limit: 10 }
    );

    const [projects, totalCount] = await Promise.all([
      TaskModel.aggregate(pipeline),
      TaskModel.aggregate(totalCountPipeline)
    ]);

    res.status(200).send({ projects, totalCount: totalCount[0]?.totalCount || 0 });

  } 
  
  catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});




taskRoutes.post("/add/project", async(req,res) => {

    const payload = req.body;

    try {
        const task = new TaskModel(payload);
        await task.save();

        res.status(201).send({"message": "Task created successfully"});
    } 
    
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})

taskRoutes.patch("/project/:id", async(req,res) => {

    const {id} = req.params;
    const {status} = req.body;
    console.log("status", status)

    try {
        const newTask = await TaskModel.findByIdAndUpdate(id,{status}, {new: true});

        if(!newTask){
            return res.status(404).send({"message": 'Project not found' });
        }

        res.status(200).send({"message":"Status updated successfully", "updatedTask": newTask});
    } 
    
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = { taskRoutes };