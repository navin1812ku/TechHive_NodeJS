const express=require("express");
const UserService = require("../services/UserService");
const UserRouter = express.Router();
 
UserRouter.post('/professional/add', async function (req, res) {
    var data=req.body
    var profession = await UserService.AddProfession(data);
    res.json(profession);
});

UserRouter.get("/professional", async (req, res) => {
    var pdoc = await UserService.getAllProfession();
    res.json(pdoc);
  });

  UserRouter.put("/professional/update/:id", async (req, res) => {
    var val = req.params.id;
    var { fname, lname, email, mobile, services } = req.body;
    var updatedProfessional = {
      fname: fname,
      lname: lname,
      email: email,
      mobile: mobile,
      services: services
    };
    var pdoc = await UserService.updateProfession(val,updatedProfessional);
    res.json(pdoc);
  });

  UserRouter.delete("/professional/delete/:id", async (req, res) => {
    const val=req.params["id"]
    var pdoc = await UserService.removeProfession(val);
    res.json(pdoc);
  });

module.exports= UserRouter;