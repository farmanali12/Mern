const mongoose=require("mongoose")

const connectDatabases=()=>{

    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log(`mongodB connected with ${data.connection.host}`)
    }) 

    // I comment this catch code for to get unhandled promise rejection error

    // .catch((err)=>{
    //     console.log(err)
    // }) 

}       
module.exports=connectDatabases  