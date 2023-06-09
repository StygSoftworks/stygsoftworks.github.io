

//roll a dice of size n
function rollDice(n) {
    //generate a random number between 1 and n
    var diceRoll = Math.floor(Math.random() * n) + 1;

    //return the result
    return diceRoll;
}

//function to roll a dice of size n and add a modifier of m
function rollDice(n, m) {
    //generate a random number between 1 and n
    var diceRoll = Math.floor(Math.random() * n) + 1;

    //add the modifier
    diceRoll += m;

    //return the result
    return diceRoll;
}

//function to roll n dice of size m and add the results
function rollNDice(n, m) {
    var diceRoll = 0;
    for (var i = 0; i < n; i++) {
        diceRoll += rollDice(m, 0);
    }
    return diceRoll;
}

function parseDiceRollExpression(expression) {
    const regex = /(-?\d*d\d+|-?\d+)/g;
    const matches = expression.match(regex);
  
    if (!matches) {
      throw new Error('Invalid dice roll expression');
    }
  
    const rolls = [];
  
    for (let match of matches) {
      const rollObj = {
        expression: match,
        rolls: [],
        modifier: 0
      };
  
      if (match.includes('d')) {
        const parts = match.split('d');
        const numDice = parseInt(parts[0]);
        const diceSides = parseInt(parts[1]);
  
        if (isNaN(numDice) || isNaN(diceSides)) {
          throw new Error('Invalid dice roll expression');
        }
  
        for (let i = 0; i < Math.abs(numDice); i++) {
          const roll = Math.floor(Math.random() * diceSides) + 1;
          rollObj.rolls.push(roll);
        }
  
        rollObj.modifier = numDice >= 0 ? 0 : -diceSides;
      } else {
        rollObj.modifier = parseInt(match);
        if (isNaN(rollObj.modifier)) {
          throw new Error('Invalid dice roll expression');
        }
      }
  
      rolls.push(rollObj);
    }
  
    const total = rolls.reduce((acc, rollObj) => {
      return acc + rollObj.modifier + rollObj.rolls.reduce((sum, roll) => sum + roll, 0);
    }, 0);
  
    return {
      dicerolls: rolls,
      total: total
    };
  }
  

  //restrict input to only allow digits and minus sign
  function restrictToIntegerInput(selector) {
    $(document).on("input", selector, function() {
      var inputValue = $(this).val();

      //remove all non-digit characters except for minus sign and only allow one minus sign at the beginning
      var sanitizedValue = inputValue.replace(/[^0-9-]|(.)-+/g, '$1');

      $(this).val(sanitizedValue);
    });
  }


  //restrict input to only allow digits, minus sign, plus sign, and 'd'
  function restrictToDnDDiceInput(selector) {
    $(document).on("input", selector, function() {
      var inputValue = $(this).val();

      // Remove all non-digit characters except for minus sign, plus sign, and 'd'
      var sanitizedValue = inputValue.replace(/[^0-9\+\-d]|(.)\++|(.)(?=\d+d\d+)/g, '$1$2');

      // Ensure there's only one plus sign or minus sign in sequential order
      sanitizedValue = sanitizedValue.replace(/([+-])(?=.*[+-])/g, '');

      // Ensure there's only one 'd' and it's not preceded by another 'd'
      sanitizedValue = sanitizedValue.replace(/(?<=\d)d(?=.*d)/g, '');

      $(this).val(sanitizedValue);
    });
  }


  function parseAndCalculateExpression(expression) {
    // Replace 'd' with ' + rollNDice(' and '+' with '+'
    expression = expression.replace(/d/g, ' + rollNDice(').replace(/\+/g, ' + ').replace(/-/g, ' - ');
    
    // Regular expression pattern to match dice rolling expressions
    var dicePattern = /(\d+)d(\d+)/g;
    
    // Replace dice rolling expressions with rollNDice(count, size)
    expression = expression.replace(dicePattern, 'rollNDice($1, $2)');
    
    console.log(expression);

    // Evaluate the modified expression using eval()
    var result = eval(expression);
    
    // Return the final result
    return result;
  }

//Evaluate an expression such as 3+6
function parseStringAsIntOrEvaluateExpression(str) {
    // Check if the string contains an arithmetic operation
    if (str.includes('+') || str.includes('-') || str.includes('*') || str.includes('/')) {
      // Evaluate the expression using eval()
      return eval(str);
    } else {
      // Parse the string as an integer
      return parseInt(str, 10);
    }
  }
