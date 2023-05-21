// function fahrenheitToCelsius(globalDegree) {
//     var celsiusArray = []
//     for (i = globalDegree[0]; i <= globalDegree[-1]; i++){
//         var celsius = (i - 32) * 5 / 9;
//         celsius.push(globalDegree)
//   };
//   return celsiusArray
// };
//   var globalDegree = [72,86,59]

// console.log(farenheitToCelsius(globalDegree))

function fahrenheitToCelsius(globalDegree) {
    var celsiusArray = [];
    for (var i = 0; i < globalDegree.length; i++) {
      var celsius = Math.round((globalDegree[i] - 32) * 5 / 9);
      celsiusArray.push(celsius);
    }
    return celsiusArray;
  }
  
  var globalDegree = [72, 86, 59];
  console.log(fahrenheitToCelsius(globalDegree));