
//convert csv list to array or numbers
function listToArray(nums) {
  let ArrOfNums =  nums.split(',') 
  let numArr = []
    for(let x = 0; x < ArrOfNums.length; x++) {
        let num = Number(ArrOfNums[x]);
        if (Number.isNaN(num)) {
         return new Error(`${ArrOfNums[x]} is not a number.`)
        };
        numArr.push(num);
     }
     return numArr;
  }
   

function mean(nums) {
    let tot = 0;
    for(let x= 0; x < nums.length; x++){
    tot += nums[x]
  }
  return nums.length > 0 ? tot / nums.length :0;
  }
  
  function median(nums) {
    let sortedNums = nums.slice().sort((a, b) => a - b);
    let length = sortedNums.length;
  
    if (length === 0) {
      return 0;
    }
    if (length % 2 === 1) {
      // odd length - return the number/element in the middle
      return sortedNums[Math.floor(length / 2)];
    } else {
      // even length - return the average of the middle two numbers/elements
      const middle1 = sortedNums[length / 2 - 1];
      const middle2 = sortedNums[length / 2];
      return (middle1 + middle2) / 2;
    }
  }
  
  function mode(nums) {
    let freqMap = new Map();
    nums.forEach((nums) => {
      freqMap.set(nums, (freqMap.get(nums) || 0) + 1);
    });
    let mode = [];
    let maxFreq = 0;
    // return the number(s) that appear the most
    freqMap.forEach((freq, nums) => {
      if (freq > maxFreq) {
        mode = [nums];
        maxFreq = freq;
      } else if (freq === maxFreq) {
        mode.push(nums);
      }
    });
    return mode.length === nums.length ? [] : mode;
  }

  module.exports = {
    listToArray,
    mean,
    median,
    mode
  };