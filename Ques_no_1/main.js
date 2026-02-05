function thirdNegNumber(array) {
  if (array.length != 10) {
    console.log("Array must have 10 numbers");
  }
  const result = array.filter((n) => n < 0).sort((a, b) => a - b);

  document.getElementById("neg").innerHTML = result;
  if (result.length < 3) {
    return null;
  }
  return result[2];
}
let input = [-1, -2, 3, -4, 5, 0, -3, 7, -1, -2];
const outputs = thirdNegNumber(input);
console.log(outputs);
document.getElementById("output").innerHTML = outputs;
