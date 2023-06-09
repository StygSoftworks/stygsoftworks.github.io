
//show the dialog box with the title and body
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

// Function to roll a number of dice
function rollSave(formId) {

    var input = $('#' + formId);

    //determine whether or not the formid is of type reflex, fortitude, or will
    var saveType = formId.split('-')[1];

    //parse the input value as an integer
    var inputValue = parseInt(eval(input.val()));


    //parseDiceRollExpression('1d20'+inputValue);

    //roll a d20
    var d20Roll = Math.floor(Math.random() * 20) + 1;

    //capitalize the first letter of the save type
    //saveType = saveType.charAt(0).toUpperCase() + saveType.slice(1);

    //display a roll result. You rolled a d20Roll for the roll, and a total of inputValue for the save
    showDialog(saveType.charAt(0).toUpperCase() + saveType.slice(1), 'You rolled a ' + d20Roll + ' for the roll with a mod of '+inputValue+', and a total of <b>' + (d20Roll + inputValue) + '</b> for the ' + saveType + ' roll.');
}

// Function to make a table flexible
function createFlexibleTable(tableId) {
    $(function() {
        // Make the table headers resizable
            $("#" + tableId + " th").resizable({
            handles: "e", // Only allow resizing by the east (right) side of the header
            minWidth: 50, // Set a minimum width for the columns
            resize: function(event, ui) {
                // Get the index of the resized column
                var columnIndex = ui.helper.index();
                
                // Set the width of the corresponding cells in the table body
                $("#" + tableId + " tbody tr").each(function() {
                var cell = $(this).find("td").eq(columnIndex);
                cell.width(ui.helper.width());
                });
            }
        });
    });
}
  
function rollAttackFnc(inputIdToReadDamage, inputIdToReadAttackBonus)
{
    //convert value to string
    var inputTxt = $('#' + inputIdToReadDamage).val().toString();

    //get the attack bonus
    var attackBonusString = $('#' + inputIdToReadAttackBonus).val().toString();
    var attackBonusRolls = parseDiceRollExpression('1d20+' + attackBonusString);
    var attackRollValue = parseInt(attackBonusRolls.dicerolls[0].rolls[0]);
    var attackRollExplanation = '<br><br>Attack Roll<br>You rolled a ' + attackRollValue + ' for the roll with a mod of '
     + attackBonusString + ', and a total of <b>' + (attackRollValue + parseInt(attackBonusString)) + '</b> for the attack roll.';


     //get the damage roll
    var damageRolls = parseDiceRollExpression(inputTxt);

    //damage roll explanation for each roll
    var damageRollExplanation = '<br><br>Damage Roll<br>';

    damageRollExplanation+= 'You rolled a total of ' + damageRolls.total;

    console.log(damageRolls);


    //console.log(attackBonusRolls);

    showDialog('Your Input', inputTxt +attackRollExplanation+damageRollExplanation);


}

$(document).ready(function() {

    // Set the initial content
    //$('#mainPanel').html('<h1>Welcome to the Home Page</h1>');

    // Handle click events on menu buttons
    $('#homeButton').on('click', function() {

        clearAndLoadContent('<h1>Welcome to the Home Page</h1>');

        var homeHtml = `

            <p>
                This is a simple website to help a Swan play dnd 3.5
            </p>

            <img src="images/Jim-Mac-Is-Gay-6-8-2023.gif" alt="Dnd Logo">


            `;


        //set the content of header tag to the home page
        $('#mainPanel').html(homeHtml);
    });

    $('#combatButton').on('click', function() {

        clearAndLoadContent();

        //set the content of header tag to the combat page
        $('#header').html('<h1>Dnd Combat</h1>');

        var baseStatsId = ''; //'baseStatsTable' + Date.now();
        var baseStatsHtml = `

            <table id="${baseStatsId}" class="ui-widget attackForm">
                <thead>
                    <tr class="ui-widget-header">
                        <th>Base Attack</th>
                        <th>Strength Mod</th>
                        <th>Dexterity Mod</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input type="text" class="intInput ui-widget-input" id="${baseStatsId}baseAttack" name="${baseStatsId}-baseAttack" value="0">
                        </td>   
                        <td>
                            <input type="text" class="intInput ui-widget-input" id="${baseStatsId}strengthModifier" name="${baseStatsId}-strengthModifier" value="0">
                        </td>
                        <td>
                            <input type="text" class="intInput ui-widget-input" id="${baseStatsId}dexterityModifier" name="${baseStatsId}-dexterityModifier" value="0">
                        </td>
                    </tr>
                </tbody>
            </table>

            <br>
        `;

        var initiativeId = '';//'initiative' + Date.now();
        var initiativeHtml = `
            <div class="initiativeRow">
                <label for="${initiativeId}-initiative">Initiative:</label>
                <input type="text" id="${initiativeId}-initiative" value="0" name="${initiativeId}-initiative" class="initiativeInput ui-widget-input" required>
                <button class="rollInitiativeButton ui-button go" onclick="rollSave('${initiativeId}-initiative')">Roll for Initiative</button>
            </div>
            <br>
        `;

        var baseSavesId = '';//'baseSavesTable' + Date.now();
        var baseSavesHtml = `

            <table id="baseSavesTable" class="ui-widget">
                <thead>
                    <tr class="ui-widget-header">
                        <th>Ref</th>
                        <th>Fort</th>
                        <th>Will</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input type="text" class="ui-widget-input" id="${baseSavesId}-reflex" name="${baseSavesId}baseAttack" value="0">
                            
                        </td>   
                        <td>
                            <input type="text" class="ui-widget-input" id="${baseSavesId}-fortitude" name="${baseSavesId}strengthModifier" value="0">
                        </td>
                        <td>
                            <input type="text" class="ui-widget-input" id="${baseSavesId}-willpower" name="${baseSavesId}dexterityModifier" value="0">
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <button class="rollSaveButton ui-button go" onclick="rollSave('${baseSavesId}-reflex')">Roll</button>
                        </td>

                        <td>
                            <button class="rollSaveButton ui-button go" onclick="rollSave('${baseSavesId}-fortitude')">Roll</button>
                        </td>

                        <td>
                            <button class="rollSaveButton ui-button go" onclick="rollSave('${baseSavesId}-willpower')">Roll</button>
                        </td>
                
                    </tr>
                </tbody>
            </table>

            <br>
        `;

        var weaponTableHtml = `

        <div id="weaponTableContainer">


        <br>
        <button id="addRowBtn" class="ui-button go">Add Weapon</button> <!-- New add row button -->
            <table id="weaponTable">
                <thead>
                    <tr>
                        <th></th>
                        <th>Weapon Name</th>
                        <th>Weapon Type</th>
                        <th>Attack Bonus</th>
                        <th>Weapon Damage</th>
                        <th>Action</th> <!-- New column for delete buttons -->
                    </tr>
                </thead>
                <tbody>
                    <!-- Table rows will be dynamically added using JavaScript -->
                </tbody>
            </table>

            
        </div>
        `;
        $('#mainPanel').append(baseStatsHtml);
        $('#mainPanel').append(baseSavesHtml);
        $('#mainPanel').append(initiativeHtml);
        $('#mainPanel').append(weaponTableHtml);

        restrictToIntegerInput(".intInput");

        //on keyup "dexterityModifier" update the -initiative with the value of the dexterityModifier
        $('#dexterityModifier').keyup(function() {
            $('#-initiative').val($('#dexterityModifier').val());

        });


        $.widget("custom.weaponTable", {
            _create: function() {
            var self = this;
        
            this.element.DataTable({
                paging: false,
                searching: false,
                ordering: false,
                info: false,
                
                columnDefs: [
                  { targets: -1, orderable: false } // Disable sorting for the last column
                ],
                initComplete: function() {
                  // Add click event handler for delete buttons
                self.element.find('.delete-row-btn').on('click', function() {
                    var $row = $(this).closest('tr');
                    self.element.DataTable().row($row).remove().draw();
                });
                }
            });

              //auto adjust column widths
                this.element.DataTable().columns.adjust().draw();
            },
            addRow: function(data) {

                var $table = this.element.DataTable();

                var wepTableGuiId = 'weaponTableGuiId' + Date.now();            
                var arrayOfData = [];

                //inputs for Weapon Name	Weapon Type	Attack Bonus	Attack Mod	Weapon Damage	Action
                var actionRollHtmlInput = `<button class="rollAttack ui-button go" onclick="rollAttackFnc('${wepTableGuiId}-wepDamage','${wepTableGuiId}-attackBonus')">Roll</button>`;
                var weaponNameHtmlInput = `<input type="text" class="wepLookup ui-widget-input wide" id="${wepTableGuiId}-wepName" name="${wepTableGuiId}-wepName" value="" autocorrect="off" autocapitalize="none">`;
                var weaponTypeHtmlInput = `<label class="ui-widget-input" id="${wepTableGuiId}-wepType" name="${wepTableGuiId}-wepType" value="">`;
                var attackBonusHtmlInput = `<input type="text" class="intInput ui-widget-input" id="${wepTableGuiId}-attackBonus" name="${wepTableGuiId}-attackBonus" value="0">`;
                var weaponDamageHtmlInput = `<input type="text" class="ui-widget-input" id="${wepTableGuiId}-wepDamage" name="${wepTableGuiId}-wepDamage" value="0">`;
                var actionHtmlInput = `<button class="delete-row-btn ui-button deletebtn">Delete</button>`;

                // Add the inputs to the array
                arrayOfData.push(actionRollHtmlInput);
                arrayOfData.push(weaponNameHtmlInput);
                arrayOfData.push(weaponTypeHtmlInput);
                arrayOfData.push(attackBonusHtmlInput);
                arrayOfData.push(weaponDamageHtmlInput);
                arrayOfData.push(actionHtmlInput);

                // Add the row to the table
                $table.row.add(arrayOfData).draw();


                $('.wepLookup').on('touchstart', function() {
                    $(this).autocomplete('search');
                  });

                $(".wepLookup").autocomplete({
                    source: function(request, response) {
                      var term = request.term;
                      var filteredNames = weaponData.map(function(v) {return v.name;}).sort().filter(function(name) {
                        return name.toLowerCase().indexOf(term.toLowerCase()) !== -1;
                      });
                
                      if (filteredNames.length === 0) {
                        filteredNames.push("No matching results");
                      }
                
                      response(filteredNames);
                    },
                    select: function(event, ui) {
                        var selectedWeapon = ui.item.value;

                        //get the weapon data
                        var weaponSelected = weaponData.filter(function(weapon) {
                            return weapon.name === selectedWeapon;
                        });

                        //console.log( weaponSelected);

                        //get the nearest input with id ending with "-wepDamage" and set the value to weaponselected.damage
                        //$(this).closest('tr').find('input[id$="-wepDamage"]').val(weaponSelected[0].damage);
                        $(this).closest('tr').find('label[id$="-wepType"]').text(weaponSelected[0].type);

                        //value with id baseAttack
                        var babValue = $('#baseAttack').val();

                        //strengthModifier
                        var strengthModifier = $('#strengthModifier').val();

                        //dexterityModifier
                        var dexterityModifier = $('#dexterityModifier').val();

                        //determine if the weapon is melee or ranged or natural by looking at the weapon type
                        var weaponType = weaponSelected[0].type;

                        //if melee
                        if(weaponType === 'Melee'){
                            //set the attack bonus to bab + strength
                            $(this).closest('tr').find('input[id$="-attackBonus"]').val(parseInt(babValue) + parseInt(strengthModifier));

                            //set damage to strength modifier
                            $(this).closest('tr').find('input[id$="-wepDamage"]').val(weaponSelected[0].damage + ' + ' +strengthModifier);
                        }
                        //if ranged
                        else if(weaponType === 'Ranged'){
                            //set the attack bonus to bab + dexterity
                            $(this).closest('tr').find('input[id$="-attackBonus"]').val(parseInt(babValue) + parseInt(dexterityModifier));
                            $(this).closest('tr').find('input[id$="-wepDamage"]').val(weaponSelected[0].damage );


                        }
                        //if natural
                        else if(weaponType === 'Natural'){
                            //set the attack bonus to bab + strength
                            $(this).closest('tr').find('input[id$="-attackBonus"]').val(parseInt(babValue) + parseInt(strengthModifier));
                            $(this).closest('tr').find('input[id$="-wepDamage"]').val(weaponSelected[0].damage + ' + ' +strengthModifier);
                        }
                      }
                  });

                // Update delete button event handlers after adding a new row
                var $deleteButtons = this.element.find('.delete-row-btn');
                $deleteButtons.off('click').on('click', function() {
                    var $row = $(this).closest('tr');
                    $table.row($row).remove().draw();
                });
            }
          });
        
          $("#weaponTable").weaponTable();
        
          $("#addRowBtn").on("click", function() {
            var newRowData = ["", "", "", "", "", ""];
            $("#weaponTable").weaponTable("addRow", newRowData);
          });


                  // Adjust column sizes on window resize
                  $(window).on('resize', function() {
                    $('#weaponTable').DataTable().columns.adjust();

                    //redraw the table
                    $('#weaponTable').DataTable().draw();


                });
        

    });

    //click the button with an id of combatButton via jquery
    $('#combatButton').click();

    //click the button with an id of addRowBtn via jquery
    $('#addRowBtn').click();
    
    // Function to clear the main panel and load new content
    function clearAndLoadContent(content) {
        $('#mainPanel').empty().html(content);

        //empty the header tag
        $('#header').empty().html();
    }


    //create flexible table for baseSavesTable
    createFlexibleTable("baseSavesTable");
});
