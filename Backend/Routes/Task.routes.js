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
    const total_Projects = await TaskModel.countDocuments();
    const closed_Projects = await TaskModel.countDocuments({ status: "Closed" });
    const running_Projects = await TaskModel.countDocuments({ status: "Running" });
    const cancelled_Projects = await TaskModel.countDocuments({ status: "Cancelled" });
    const currDate = formattedDate();

    const closure_Delay = await TaskModel.find({end_date: {$lt: currDate}}).countDocuments();

    res.status(200).send({total_Projects,closed_Projects,running_Projects,cancelled_Projects,closure_Delay})

  } 
  
  catch (err) {
    console.log(err);
    res.send("Internal Server Error");
  }
})


taskRoutes.get("/projects/departments", async(req,res) => {

  try {
    
    const departments = {
      Strategy: 'STR',
      Finance: 'FIN',
      Quality: 'QLT',
      Maintenance: 'MAN',
      Store: 'STO',
      HR: 'HR'
    };

    let totalOnes = [];
    let closedOnes = [];

    for (const department in departments) {
      const total = await TaskModel.countDocuments({ department });
      const closed = await TaskModel.countDocuments({ department, status: 'Closed' });
      totalOnes.push(total);
      closedOnes.push(closed);
    }

    const statCategory = Object.values(departments);

    res.status(200).send({totalOnes, closedOnes, statCategory})
  } 
  
  catch (err) {
    console.log(err);
    res.send("Internal Server Error");
  }
})


module.exports = { taskRoutes };