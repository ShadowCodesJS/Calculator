(function() {
  "use strict";
  var getEl = function(element) {
    if (element.charAt(0) === "#") {
      return document.querySelector(element);
    }

    return document.querySelectorAll(element);
  };

  
  let output = getEl("#output"),
    equals = getEl("#equals"),
    nums = getEl(".num"),
    ops = getEl(".ops"),
    currentNumShown = "",
    firstNumInput = "",
    result,
    operator;

  let setNum = function() {
    if (result) {
      currentNumShown = this.getAttribute("data-num");
      result = "";
    } else {
      currentNumShown += this.getAttribute("data-num");
    }

    output.innerHTML = currentNumShown;

  };

  let moveNum = function() {
    firstNumInput = currentNumShown;
    currentNumShown = "";
    operator = this.getAttribute("data-ops");

    equals.setAttribute("data-result", "");
  };

  var calcAndDisplay = function() {
    firstNumInput = parseFloat(firstNumInput);
    currentNumShown = parseFloat(currentNumShown);

    switch (operator) {
      case "plus":
        result = firstNumInput + currentNumShown;
        break;

      case "minus":
        result = firstNumInput - currentNumShown;
        break;

      case "times":
        result = firstNumInput * currentNumShown;
        break;

      case "divide":
        result = firstNumInput / currentNumShown;
        break;

      default:
        resultNum = theNum;
    }
    
    if (!isFinite(result)) {
      if (isNaN(result)) {
        result = "You broke it!";
      } else {
        result = "Stop dividing by zero!";
      }
    }
    
    output.innerHTML = result;
    equals.setAttribute("data-result", result);

    firstNumInput = 0;
    currentNumShown = result;

  };

  let clearAll = function() {
    firstNumInput = "";
    currentNumShown = "";
    output.innerHTML = "0";
    equals.setAttribute("data-result", result);
  };

  for (var i = 0, l = nums.length; i < l; i++) {
    nums[i].onclick = setNum;
  }

  for (var i = 0, l = ops.length; i < l; i++) {
    ops[i].onclick = moveNum;
  }

  equals.onclick = calcAndDisplay;

  getEl("#clear").onclick = clearAll;

}());
