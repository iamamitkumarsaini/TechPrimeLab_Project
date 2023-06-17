const express = require("express");
const { TaskModel } = require("../Model/Task.model");

const taskRoutes = express.Router();

const formattedDate = () => {

  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2,0);
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
  

taskRoutes.get("/projects", async (req, res) => {
  try {
    const { page = 1, search = "", sort = "" } = req.query;

    const pipeline = [];

    if (search) {
      const searchStage = {
        $match: {
          $or: [
            { title: { $regex: new RegExp(search, "i") } },
            { reason: { $regex: new RegExp(search, "i") } },
            { type: { $regex: new RegExp(search, "i") } },
            { divison: { $regex: new RegExp(search, "i") } },
            { category: { $regex: new RegExp(search, "i") } },
            { priority: { $regex: new RegExp(search, "i") } },
            { department: { $regex: new RegExp(search, "i") } },
            { location: { $regex: new RegExp(search, "i") } },
            { status: { $regex: new RegExp(search, "i") } },
          ],
        },
      };
      pipeline.push(searchStage);
    }

    if (sort) {
      let sortStage;

      if (sort === "_id") {
        sortStage = {
          $sort: { _id: -1 },
        };
      } else {
        sortStage = {
          $sort: { [sort]: 1 },
        };
      }

      pipeline.push(sortStage);
    }

    const totalCountPipeline = [...pipeline]; 
    totalCountPipeline.push({ $count: "totalCount" }); 

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
    res.send({ message: "Internal Server Error" });
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
        res.send("Internal Server Error");
    }
})

taskRoutes.patch("/project/:id", async(req,res) => {

    const {id} = req.params;
    const {status} = req.body;

    try {
        const newTask = await TaskModel.findByIdAndUpdate(id,{status}, {new: true});

        if(!newTask){
            return res.send({"message": 'Project not found' });
        }

        res.status(200).send({"message":"Status updated successfully", "updatedTask": newTask});  
    } 
    
    catch (err) {
        console.log(err);
        res.send("Internal Server Error");
    }
})


taskRoutes.get("/projects/stats", async(req,res) => {

  try {

    const currDate = formattedDate();

      const pipeline = [
    {
      $group: {
        _id: null,
        total_Projects: { $sum: 1 },
        closed_Projects: { $sum: { $cond: [{ $eq: ["$status", "Closed"] }, 1, 0] } },
        running_Projects: { $sum: { $cond: [{ $eq: ["$status", "Running"] }, 1, 0] } },
        cancelled_Projects: { $sum: { $cond: [{ $eq: ["$status", "Cancelled"] }, 1, 0] } },
        closure_Delay: { $sum: { $cond: [{ $lt: ["$end_date", currDate] }, 1, 0] } }
      }
    }
  ];

    const [result] = await TaskModel.aggregate(pipeline).exec();
    console.log("result", result)
    const { total_Projects, closed_Projects, running_Projects, cancelled_Projects, closure_Delay } = result;

    res.status(200).send({total_Projects,closed_Projects,running_Projects,cancelled_Projects,closure_Delay})

  }
  
  catch (err) {
    console.log(err);
    res.send("Internal Server Error");
  }
})


taskRoutes.get("/projects/departments", async(req,res) => {

  try {

    const pipeline = [
      {
        $group:{
          _id: "$department",
          total: {$sum: 1},
          closed: {$sum:{$cond: [{$eq: ["$status", "Closed"]},1,0]}}
        }
      },
      {
        $project: {
          _id:0,
          department: "$_id",
          total: 1,
          closed:1
        }
      }
    ];

    const results = await TaskModel.aggregate(pipeline);

    const totalOnes = results.map((result) => result.total);
    const closedOnes = results.map((result) => result.closed);
    const statCategory = results.map((result) => result.department);

    res.status(200).send({totalOnes, closedOnes, statCategory})
  } 
  
  catch (err) {
    console.log(err);
    res.send("Internal Server Error");
  }
})


module.exports = { taskRoutes };