const {statusmodel,usermodel}=require("../../service/mongoose")


const fetchController = async (req, res) => {
    try { 
        var response = await statusmodel.find({
          userphonenumber: { $ne: res.locals.phonenumber },
        });
        res.statusCode = 200;
        res.send({
            status: "successfully",
            data: response
        });
    }
    catch (err) {
        console.log(err);
        res.statusCode = 400;
        res.send({
            status: "unsuccessfully",
            data: err
        });
    }
}



const createStatusController=async (req,res)=>{

 try{

    const userdata=await usermodel.findOne({phonenumber:res.locals.phonenumber})
    const exist=await statusmodel.findOne({userId:userdata._id})
    if(exist==null){
        var data = {
          userId: userdata._id,
          userphonenumber: userdata.phonenumber,
          username: `${userdata.firstName} ${userdata.lastName}`,
          stausMessage: req.body.stausMessage,
          statusImage: req.body.statusImage,
          statusType: req.body.statusType,
          userphotos: userdata.photos,
        };
    
        const response=await statusmodel(data).save().catch(err=>{
            console.log(err);
        })
    
        res.statusCode = 200;
        res.send({
            status: "successfully",
            message: `status Created`,
        });
    }else{
        res.statusCode = 200;
        res.send({
            status: "successfully",
            message: `Status is Already Exists`,
    })
   
}
 }
 catch(err){
    res.statusCode = 200;
    res.send({
        status: "failed",
        message: `something went wrong`,
})}

}

const is24HoursCompleted=(startDate) =>{
    const currentTime = new Date();
    const diffInMilliseconds = currentTime.getTime() - startDate.getTime();
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60); // Convert to hours
    return diffInHours >= 24;
}

const statusTimeRemoverBot=async ()=>{

    var expiredStatusId=[]
    var response = await statusmodel.find();

    response.map((value)=>{
        if (is24HoursCompleted(value.timestamp)) {
            expiredStatusId.push(value._id);
        }
    })

    await statusmodel.deleteMany({ _id: { $in: expiredStatusId } });
    

}

const fetchMyStatusContoller=async (req,res)=>{
        const userdata=await usermodel.findOne({phonenumber:res.locals.phonenumber})
    const exist=await statusmodel.findOne({userId:userdata._id})
    if(exist==null){
           
        res.statusCode = 200;
        res.send({
          status: "successfully",
          message: `no status found`,
          data:{
            username:`${userdata.firstName} ${userdata.lastName}`,
            userphotos:userdata.photos,
     
          }
        }); 
    }
    else{
    res.statusCode = 200;
    res.send({
      status: "successfully",
      message: `status found`,
      data: {
        username: `${userdata.firstName} ${userdata.lastName}`,
        userphotos: userdata.photos,
        statusdata: exist,
      },
    });
    }
    
}

module.exports = {
  fetchController,
  createStatusController,
  statusTimeRemoverBot,
  fetchMyStatusContoller
};