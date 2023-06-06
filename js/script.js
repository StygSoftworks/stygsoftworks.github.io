
//function to roll a dice of size n and add a modifier of m
function rollDice(n, m) {
    //generate a random number between 1 and n
    var diceRoll = Math.floor(Math.random() * n) + 1;

    //add the modifier
    diceRoll += m;

    //return the result
    return diceRoll;
}

// Function to close the weapon form
function closeRollForm(formId) {
    $('#' + formId).remove();
}

// Function to roll for initiative
function rollInitiative(formId) {
    var initiativeInput = $('#' + formId + '-initiative');
    var initiativeResultLabel = $('#initiativeResultLabel');

    // Get the input value and validate it as an integer
    var inputValue = parseInt(initiativeInput.val());
    if (isNaN(inputValue)) {
        alert('Please enter a valid integer for initiative.');
        return;
    }

    // Generate a random d20 roll
    var d20Roll = Math.floor(Math.random() * 20) + 1;

    // Calculate the initiative result
    var initiativeResult = d20Roll + inputValue;

    // Display the initiative result label
    initiativeResultLabel.text('Initiative Result: ' + initiativeResult).show();
    
}

function parseAndRollDice(controlIdToRead) {
    
    var text = $('#' + controlIdToRead).val();
    // Split the text by '+' to get individual dice expressions
    var diceExpressions = text.split('+');
    
    console.log(diceExpressions);
    event.preventDefault();

    var sum = 0;
    var rollResults = [];
    for (var i = 0; i < diceExpressions.length; i++) {
        var expression = diceExpressions[i];

        //if the expression does not contain a d, then add it to the sum
        if(expression.indexOf('d') == -1){
            sum+= parseInt(expression);
        }
        else
        {
            //split the expression into count and size of dice
            var parts = expression.split('d');
            var count = parseInt(parts[0], 10);
            var size = parseInt(parts[1], 10);
            var roll = 0;
            //roll the dice 'count' times and add the result to the sum
            for(var j = 0; j < count; j++){
                currentRoll = rollDice(size, 0);
                roll += currentRoll;
                sum += currentRoll;
            }

            //store the roll result as a description for the roll which should include the dice expression and the result
            rollResults.push(count + 'd' + size + ' = ' + roll + '<br>');

        }
    }

    //display the result adding a line for each roll result
    showDialog('Damage Roll', 'You rolled a ' + sum + ' for damage.' + '<br>' + rollResults.join('\n'));



    /*
    // Variable to store the final sum
    var sum = 0;
    
    // Iterate over each dice expression
    for (var i = 0; i < diceExpressions.length; i++) {
      var expression = diceExpressions[i];
      
      // Split the expression into count and size of dice, and the modifier
      var parts = expression.split('d');
      var count = parseInt(parts[0], 10);
      var sizeAndModifier = parts[1].split('+');
      var size = parseInt(sizeAndModifier[0], 10);
      var modifier = parseInt(sizeAndModifier[1], 10);
      
      // Roll the dice 'count' times and add the result to the sum
      for (var j = 0; j < count; j++) {
        sum += rollDice(size, modifier);
      }
    }

    console.log(sum);
    event.preventDefault();
    //display the result
    showDialog('Damage Roll', 'You rolled a ' + sum + ' for damage.');
    */
    
    // Return the final sum
    //return sum;
  }



// Function to roll for attack
function rollAttack(controlIdToRead) {

    var inputValue = $('#' + controlIdToRead).val();

    //validate the input value
    if (isNaN(parseInt(inputValue))) {
        
        //show the dialog box to indicate that the input is invalid
        showDialog('Invalid Input', 'Please enter a valid integer for attack bonus.');
    }
    else{

        var roll = rollDice(20, parseInt(inputValue));

        //display the result
        showDialog('Attack Roll', 'You rolled a ' + roll + ' for attack.');

    }



    event.preventDefault();
}

function generateRollForm() {
        // Generate a unique form ID based on the current timestamp
        var formId = 'weaponForm' + Date.now();

        // Create the HTML form
        var formHtml = `
        <br>
            <form id="${formId}" class="weaponForm">


                <button class="closeFormButton" onclick="closeRollForm('${formId}')">
                    <span class="ui-icon ui-icon-closethick"></span>
                </button>
                <br>

                <label for="${formId}-name">Weapon Name:</label>
                <input type="text" id="${formId}-name" name="${formId}-name" value="Longsword"><br>

                <label for="${formId}-attack">Attack Roll   :</label>
                <input type="text" id="${formId}-attack" name="${formId}-attack" value="4">
                <button class="btnRollAttack" onclick="rollAttack('${formId}-attack')"  >Roll Attack</button>
                <br>

                <label for="${formId}-damage">Damage Roll:</label>
                <input class="inputDmg" type="text" id="${formId}-damage" name="${formId}-damage")" value="1d8+1"> 
                <button class="btnRollDmg" onclick="parseAndRollDice('${formId}-damage')" >Roll Dmg</button>
                </br>

                
            </form>
        `;

        // Append the form to the "mainPanel" element
        $('#mainPanel').append(formHtml);

        // Apply jQuery UI styling to the form elements
        $('#' + formId).addClass('ui-widget ui-widget-content ui-corner-all');
        $('#' + formId + ' input').addClass('ui-widget-content');
        $('#' + formId + ' button').addClass('ui-widget-content');
        $('#' + formId + ' label').addClass('ui-widget-content');
        //$('.closeFormButton').button();

        //onkeypressdown for class inputDmg
        $('.inputDmg').keypress(function(event){
            //only accept backspace, numbers, d, +, and -
            if(event.which != 8 && event.which != 100 && event.which != 43 && event.which != 45 && (event.which < 48 || event.which > 57)){
                event.preventDefault();
            }

            //if the last character is a d, dont allow another d. do the same for + and -
            if(event.which == 100 && $(this).val().slice(-1) == 'd'){
                event.preventDefault();
            }

            if(event.which == 43 && $(this).val().slice(-1) == '+'){

                event.preventDefault();
            }

            if(event.which == 45 && $(this).val().slice(-1) == '-'){

                event.preventDefault();
            }



        });

        

}

function showDialog(title, body) {
    // Create a unique ID for the dialog element
    var dialogId = 'dialog' + Date.now();

    // Create the dialog HTML
    var dialogHtml = `
        <div id="${dialogId}" title="${title}">
            <p>${body}</p>
        </div>
    `;

    // Append the dialog HTML to the body
    $('body').append(dialogHtml);

    // Create the dialog using jQuery UI
    $('#' + dialogId).dialog({
        modal: true,
        width: 400,
        buttons: {
            Close: function() {
                $(this).dialog('close');
            }
        },
        close: function() {
            $(this).dialog('destroy');
            $(this).remove();
        }
    });
}

function setDamageRoll(controlIdToSet)
{
        //set the title of the dialog
        var title = 'Damage Roll';

        var bodyHtml = `
                    <input type="text" id="damageRollInput" name="damageRoll"> 
                `;

        var body = bodyHtml;

        // Create a unique ID for the dialog element
        var dialogId = 'dialog' + Date.now();

        // Create the dialog HTML
        var dialogHtml = `
            <div id="${dialogId}" title="${title}">
                <p>${body}</p>
            </div>
        `;
    
        // Append the dialog HTML to the body
        $('body').append(dialogHtml);
    
        // Create the dialog using jQuery UI
        $('#' + dialogId).dialog({
            modal: true,
            width: 400,
            buttons: {
                Close: function() {
                    $(this).dialog('close');
                }
            },
            close: function() {
                $(this).dialog('destroy');
                $(this).remove();
    
                //set the value of the control to a random number
                var diceRoll = Math.floor(Math.random() * 20) + 1;
    
                //add the modifier
                diceRoll += 5;
    
                //return the result
                $('#' + controlIdToSet).val(diceRoll);
    
                //console.log(controlIdToSet);
    
            }
        });

}

$(document).ready(function() {


    // Set the initial content
    $('#mainPanel').html('<h1>Welcome to the Home Page</h1>');

    // Handle click events on menu buttons
    $('#homeButton').on('click', function() {

        clearAndLoadContent('<h1>Welcome to the Home Page</h1>');

        //set the content of header tag to the home page
        $('#header').html('<h1>Welcome to the Home Page</h1>');
    });

    $('#combatButton').on('click', function() {

        clearAndLoadContent();

        //set the content of header tag to the combat page
        $('#header').html('<h1>Dnd Combat</h1>');


        var formId = 'initiative' + Date.now();
        //add a row
        var initiativeHtml = `
            <div class="initiativeRow">
                <label for="${formId}-initiative">Initiative:</label>
                <input type="text" id="${formId}-initiative" name="${formId}-initiative" class="initiativeInput" required>
                <button class="rollInitiativeButton" onclick="rollInitiative('${formId}')">Roll for Initiative</button>
                <label id="initiativeResultLabel" class="initiativeResultLabel" style=""></label>
            </div>
        `;

        // Append the form to the "mainPanel" element
        $('#mainPanel').append(initiativeHtml);

        //add a button that will generate a form
        $('#mainPanel').append('</br><button id="generateRollForm" onclick="generateRollForm();" >Add Different Attack</button></br>');

        generateRollForm();

        // Apply jQuery UI styling to the form elements
        $('#' + formId).addClass('ui-widget ui-widget-content ui-corner-all');
        $('#' + formId + ' input').addClass('ui-widget-content');
        $('#' + formId + ' label').addClass('ui-widget-content');








    });

    // Function to clear the main panel and load new content
    function clearAndLoadContent(content) {
        $('#mainPanel').empty().html(content);

        //empty the header tag
        $('#header').empty().html();
    }
});
