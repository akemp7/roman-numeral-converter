////User Interface///

$(document).ready(function() {

  $("form#user-input").submit(function(event) {
    event.preventDefault();
    var numberInput = parseInt($("input#num").val());

    $("#output").text(convertNumber(numberInput));
  });

});


////Business Logic////

function convertNumber(numberInput) {
  var numberArray = [
    [1, 'I'],
    [5, 'V'],
    [10, 'X'],
    [50, 'L'],
    [100, 'C'],
    [500, 'D'],
    [1000, 'M']
  ];
  var numberMap = new Map(numberArray.reverse());
  var output = '';
  if (numberInput > 3999) {
    alert("Please enter a number less than 3,999");
  } else {
    if (numberMap.get(numberInput)) {
      return numberMap.get(numberInput);
    } else {
      for (var count = 0; count < numberArray.length; count++) {
        var symbolValue = numberArray[count][0];
        if (numberInput - symbolValue >= 0) {  // check if symbol should be used immediately
          while (numberInput - symbolValue >= 0) { // allow repeating symbols
            output += numberArray[count][1];
            numberInput -= symbolValue;
          }
        }
        if (count < 6) { // enables subtraction notations, not needed for I numeral
          var newSymbol = numberArray[count + 1][1];
          var nextSymbolValue = numberArray[count + 1][0];
          if (nextSymbolValue.toString()[0] === "5") { // skip 5--- numerals
            newSymbol = numberArray[count + 2][1];
            nextSymbolValue = numberArray[count + 2][0];
          }
          if (numberInput / nextSymbolValue > 3 && symbolValue - numberInput <= nextSymbolValue) {
            // trigger subtraction notation when more than 3 symbols are needed
            numberInput = numberInput - (symbolValue - nextSymbolValue);
            output += newSymbol + numberArray[count][1];
          }
        }
        if ((numberInput < 10 && numberInput > 0) && symbolValue - 1 === numberInput) {
          // trigger special case subtraction notation for single digits
          numberInput = numberInput - symbolValue;
          output += "I" + numberArray[count][1];
        }
      }
      return output;
    }
  }

}
