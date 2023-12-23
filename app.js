const express = require('express');
const app = express();
const {mean,median,mode, listToArray } = require('./functions');
const ExpressError = require('./expressError');


app.get('/mean', function(req, res, next) {
    if (!req.query.nums) {
      //throw error if list is empty
      throw new ExpressError("nums are required", 400)
    }
    let numsArr = listToArray(req.query.nums)
    console.log(`${numsArr}`)
    if (numsArr instanceof Error){
        throw new ExpressError(numsArr.message,400)
    }
    let result = {
    operation: "mean",
    value: mean(numsArr)
      }
    return res.send(result)
    });

  app.get('/median', function(req, res, next) {
    if (!req.query.nums) {
      //throw error if list is empty
      throw new ExpressError("nums are required", 400)
    }
    let numsArr = listToArray(req.query.nums)
    console.log(`${numsArr}`)
    if (numsArr instanceof Error){
        throw new ExpressError(numsArr.message,400)
    }
    let result = {
    operation: "median",
    value: median(numsArr)
      }
    return res.send(result)
    });

    app.get('/mode', function(req, res, next) {
        if (!req.query.nums) {
          //throw error if list is empty
          throw new ExpressError("nums are required", 400)
        }
        let numsArr = listToArray(req.query.nums)
        console.log(`${numsArr}`)
        if (numsArr instanceof Error){
            throw new ExpressError(numsArr.message,400)
        }
        let result = {
        operation: "mode",
        value: mode(numsArr)
          }
        return res.send(result)
        });
    
   app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
  });

  /** error handler */
  app.use(function (err, req, res, next) {
    // res.status(err.status || 500);
     let status = err.status || 500;
     let message = err.msg;
     console.log(` ${err.message} ${err.status}`)
     return res.json({
       message: err.message,
       status: parseInt(err.status,10) + " Bad Request" 
     });
  });
  


  
  
  app.listen(3000, function() {
    console.log(`Server starting on port 3000`);
  });


//Suggestions
//1. There is some code duplication in the route handlers (/mean, /median, /mode). You can create a common function to handle the common logic of parsing the nums query parameter and throwing errors if necessary.
//2. The status property in the error handler could be more consistently formatted. 
//status: `${err.status} Bad Request`
//3.The error handler uses a status code of 500 for all errors. It might be beneficial to return more appropriate HTTP status codes based on the type of error (e.g., 400 for client errors, 404 for not found, etc.).
//4.It's a good practice to implement a graceful shutdown mechanism for your server. For example, you can listen for the SIGINT signal to gracefully close the server when the process is terminated.
//5.Ensure that you're validating and sanitizing user input to prevent potential security vulnerabilities like SQL injection or other types of attacks. In this case, validating and parsing the input for the nums parameter is critical
//6.Consider using environment variables for configuration, such as specifying the port number. This makes your application more configurable and adaptable to different environments.
