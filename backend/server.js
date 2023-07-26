const dotenv = require("dotenv");
const app = require("./app");
const connectDatabases = require("./config/Databases");

//Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    server.close(()=>{
        process.exit(1)
    })
});

//config
dotenv.config({path:"backend/config/config.env"});

//connect mongodb databases
connectDatabases()
const server=app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})       

// console.log(youtube)

//unhandled Promise rejection error

process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`shutting down the server due to unhandled Promises rejection`);
    server.close(()=>{
        process.exit(1)
    })
})

 





