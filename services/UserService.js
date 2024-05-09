const mongoose=require("mongoose")
const UserModel=require("../models/User")
mongoose.connect('mongodb://127.0.0.1:27017/myapp')
const UserService={

    AddProfession:async(data)=>{
        var userdoc=await UserModel.create(data);
        return userdoc
    },
    getAllProfession:async()=>{
        var userdoc=await UserModel.find()
        return userdoc
    },
    removeProfession:async(val)=>{
        var removedoc=await UserModel.findOneAndDelete({id:val})
        return removedoc
    },
    updateProfession:async(val,data)=>{
        var updatedoc=await UserModel.findOneAndUpdate({id:val},data,{new:true,useFindAndModify:false})
        return updatedoc
    }
}
module.exports=UserService;