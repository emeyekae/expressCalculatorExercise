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