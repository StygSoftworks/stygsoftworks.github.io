$(document).ready(function() {
  $('#savingThrowsTable').DataTable();
  $('#weaponsTable').DataTable();

  
  //loadFieldsFromCookie();

  //add a row
  addRow(true);

  //console.log(weaponData);





});

function showModal(title, body) {
  // Create the modal dialog HTML
  var modalHTML = `
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitle">${title}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            ${body}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Append the modal HTML to the body
  $('body').append(modalHTML);

  // Show the modal
  $('#myModal').modal('show');

  // Remove the modal from the DOM after it's hidden
  $('#myModal').on('hidden.bs.modal', function() {
    $(this).remove();
  });
}

function rollSaves(button) {
  var row = $(button).closest('tr');
  var fort = eval(row.find('#fort').val());
  var reflex = eval(row.find('#reflex').val());
  var will = eval(row.find('#will').val());

  var fortRoll = Math.floor(Math.random() * 20) + 1;
  var reflexRoll = Math.floor(Math.random() * 20) + 1;
  var willRoll = Math.floor(Math.random() * 20) + 1 ;

  var fortTotal = fortRoll + parseInt(fort);
  var reflexTotal = reflexRoll + parseInt(reflex);
  var willTotal = willRoll + parseInt(will);

  var fortDisplay = '<p class="ml-2">Fortitude: ' + fortRoll + '(D20) + ' + fort + ' = <b>' + fortTotal + '</b></p>';
  var reflexDisplay = '<p class="ml-2">Reflex: ' + reflexRoll + '(D20) + ' + reflex + ' = <b>' + reflexTotal + '</b></p>';
  var willDisplay = '<p class="ml-2">Will: ' + willRoll + '(D20) + ' + will + ' = <b>' + willTotal + '</b></p>';
  
  var htmlContent = '<div class="container">' +
                    '  <div class="row">' +
                    '    <div class="col">' +
                    '      ' + fortDisplay +
                    '    </div>' +
                    '  </div>' +
                    '  <div class="row">' +
                    '    <div class="col">' +
                    '      ' + reflexDisplay +
                    '    </div>' +
                    '  </div>' +
                    '  <div class="row">' +
                    '    <div class="col">' +
                    '      ' + willDisplay +
                    '    </div>' +
                    '  </div>' +
                    '</div>';



  //show modal
  showModal('Saving Throws', htmlContent);



  //alert("Fort: " + fortRoll + "\nReflex: " + reflexRoll + "\nWill: " + willRoll);
}

function toggleModifiersPanel() {
  var strengthMod = $('#strengthMod').val();
  var dexMod = $('#dexMod').val();

  if (strengthMod !== '' || dexMod !== '') {
    $('#modifiersPanel').collapse('show');
  } else {
    $('#modifiersPanel').collapse('hide');
  }
}

function rollAttack(button) {
  var row = $(button).closest('tr');


  var weaponName = row.find('#weaponName').val();

  var attackBonus = eval(row.find('#attackBonus').val());
  var damage = row.find('#damage').val();
  var weaponType = row.find('#weaponType').val();
  var baseAttackBonus = $('#baseAttackBonus').val();
  var attackModFromAttribute = 0;
  var attributeRolledOn = '';

  //damageBonus
  var miscDamageBonus = eval(row.find('#damageBonus').val());

  //alert(attackBonus);

  var testText ='';
  var damageBonus = 0;
  //testText += '<br>This is a test';
  //testText += '<br>Weapon Type: ' + weaponType;

  switch (weaponType) {
    case 'melee':
      attackModFromAttribute = $('#strengthMod').val();
      attributeRolledOn = 'Str';
      damageBonus = $('#strengthMod').val();
      break;
    case 'ranged':
      attackModFromAttribute = $('#dexMod').val();
      attributeRolledOn = 'Dex';
      break;
    case 'natural':
      attackModFromAttribute = $('#strengthMod').val();
      attributeRolledOn = 'Str';
      damageBonus = $('#strengthMod').val();
      break;
  }

  var totalAttackBonus = parseInt(baseAttackBonus) + parseInt(attackModFromAttribute) + parseInt(attackBonus);



  // Evaluate damage expression
  var evaluatedDamage = evaluateDamageExpression(damage, damageBonus, miscDamageBonus);

  var attackRoll = Math.floor(Math.random() * 20) + 1;
  var attackTotal = attackRoll+ eval(totalAttackBonus);

  var attackInfoDisplay = '<p class="ml-2">Attack:'+attackRoll + '(D20 Roll) +' + baseAttackBonus + '(BAB) +' + attackModFromAttribute + '('+attributeRolledOn+') +' + attackBonus + '(misc) = <b>' + attackTotal + '</b></p>';
  var damageInfoDisplay = '<p class="ml-2">Damage: ' + damage + ' = ' + evaluatedDamage + '</p>';

  var htmlContent = '<div class="container">' +

                    '  <div class="row">' +
                    '    <div class="col">' +
                    '      ' + attackInfoDisplay +
                    '    </div>' +
                    '  </div>' +
                    '  <div class="row">' +
                    '    <div class="col">' +
                    '      ' + damageInfoDisplay +
                    '    </div>' +
                    '  </div>' +
                    '</div>';
  //show modal
  showModal('Attack Roll: ' + weaponName, htmlContent);
}

function evaluateDamageExpression(expression,modBonus=0,miscBonus=0) {
  //convert expressions to an array
  var values = splitTextToArrayByMathSymbols(expression);
  var totalOutput = '';
  var rollingTotal = 0;

  //console.log(values);
  //for each value in the array, if it's a dice expression, roll it
  for (var i = 0; i < values.length; i++) {
    var currentValue = 0;
    
    //determine if the value is a dice expression
    if (values[i].includes('d')) 
    {
      currentValue = rollDiceExpression(values[i]);

      //if there is a negative sign in front of the dice expression, make the value negative
      if (values[i].includes('-'))
      {
        currentValue = currentValue * -1;
      }

      totalOutput += 'Roll for ' + values[i] + ' = ' + currentValue + '<br>';

    }
    else
    {
      currentValue = parseInt(values[i]);
      totalOutput += 'Modifier ' + values[i] +'<br>';
    }

    rollingTotal += currentValue;
  }

  if (modBonus != 0)
  {
    totalOutput += 'Str Bonus =' + modBonus +'<br>';
    rollingTotal += parseInt(modBonus);
  }

  if (miscBonus != 0)
  {
    totalOutput += 'Misc Bonus =' + miscBonus +'<br>';
    rollingTotal += parseInt(miscBonus);
  }

  
  return 'The total damage is <b>' + rollingTotal + '</b><br>Damage Roll Breakdown<br>' + totalOutput;
  
}

function rollDiceExpression(diceExpression) {
  var regex = /(\d+)d(\d+)([\+\-]\d+)?/;
  var matches = diceExpression.match(regex);
  var quantity = parseInt(matches[1]);
  var sides = parseInt(matches[2]);
  var modifier = matches[3] ? parseInt(matches[3]) : 0;
  var total = 0;

  for (var i = 0; i < quantity; i++) {
    total += Math.floor(Math.random() * sides) + 1;
  }

  console.log('Rolling ' + quantity + 'd' + sides + ' + ' + modifier + ' = ' + eval(total + modifier));

  return total + modifier;
}

function getRandomWeapon() {
  //get the number of weapons in the array
  var numberOfWeapons = weaponData.length;

  //get a random number between 0 and the number of weapons
  var randomWeaponNumber = Math.floor(Math.random() * numberOfWeapons);

  //get the weapon at the random number
  var randomWeapon = weaponData[randomWeaponNumber];

  //return the weapon
  return randomWeapon;
}

function addRow(random) {

  //distinct list of all the weaponData names
  var weaponNames = weaponData.map(function (weapon) {
    return weapon.name;
  });

  var newRow = '<tr>' +
    '<td><input type="text" class="form-control wepSelector" id="weaponName"></td>' +
    '<td><input type="text" class="form-control" id="attackBonus"></td>' +
    '<td><input type="text" class="form-control" value="Initial value" id="damage"></td>' +
    '<td><input type="text" class="form-control" id="damageBonus"></td>' +
    '<td><select class="form-control" id="weaponType"><option value="melee">Melee</option><option value="ranged">Ranged</option><option value="natural">Natural</option></select></td>    ' +
    
    '<td>' +
    '<button class="btn btn-primary" onclick="rollAttack(this)">Roll Attack</button>' +
    '<button class="btn btn-danger" onclick="deleteRow(this)">Delete</button>' +
    '</td>' +
    '</tr>';


    if (random==true) {
      var randomWeapon = getRandomWeapon();
      newRow = '<tr>' +
      '<td><input type="text" class="form-control wepSelector" id="weaponName" value="' + randomWeapon.name +'"></td>' +
      '<td><input type="text" class="form-control" id="attackBonus" value="0"></td>' +
      '<td><input type="text" class="form-control" value="' + randomWeapon.damage + '" id="damage"></td>' +
      '<td><input type="text" class="form-control" id="damageBonus" value="0"></td>' +
      '<td><select class="form-control" id="weaponType"><option value="melee">Melee</option><option value="ranged">Ranged</option><option value="natural">Natural</option></select></td>    ' +
      '<td>' +
      '<button class="btn btn-primary" onclick="rollAttack(this)">Roll Attack</button>' +
      '<button class="btn btn-danger" onclick="deleteRow(this)">Delete</button>' +
      '</td>' +
      '</tr>';
    }

    var table = $('#weaponsTable').DataTable();
    table.row.add($(newRow)).draw();

    //get the row just added
    //var row = table.row($(newRow));
    //print out all the weaponType options
    //console.log(row.node().querySelectorAll('#weaponType option'));

    //add autocomplete to the wepSelector
    $('.wepSelector').autocomplete({
      source: weaponNames

      //when a weapon is selected, populate the other fields
    }).on('autocompleteselect', function (event, ui) {

      //get the row
      var row = table.row($(this).closest('tr'));

      //get the weapon that was selected
      var selectedWeapon = weaponData.find(function (weapon) {
        return weapon.name == ui.item.value;
      });

      //populate the other fields
      row.node().querySelector('#attackBonus').value = "0";
      row.node().querySelector('#damage').value = selectedWeapon.damage;
      row.node().querySelector('#damageBonus').value = "0";
      //row.node().querySelector('#weaponType').value = selectedWeapon.weaponType;

      //select the right weaponType
      var weaponTypeOptions = row.node().querySelectorAll('#weaponType option');
      for (var i = 0; i < weaponTypeOptions.length; i++) {
        if (weaponTypeOptions[i].value.toUpperCase() == selectedWeapon.type.toUpperCase()) {
          weaponTypeOptions[i].selected = true;
        }
      }


    });




  //$('#weaponsTable tbody').append(newRow);

 
}

function deleteRow(button) {
  //$(button).closest('tr').remove();
  var table = $('#weaponsTable').DataTable();
  var row = table.row($(button).closest('tr'));
  row.remove().draw();
}

// Save fields to cookie
function saveFieldsToCookie() {
  // Character Info
  var name = $('#name').val();
  var baseAttackBonus = $('#baseAttackBonus').val();
  var currentHP = $('#currentHP').val();
  var maxHP = $('#maxHP').val();

  // Saving Throws
  var fort = $('#fort').val();
  var reflex = $('#reflex').val();
  var will = $('#will').val();

  // Modifiers
  var strengthMod = $('#strengthMod').val();
  var dexMod = $('#dexMod').val();

  // Weapons
  var weapons = [];
  $('#weaponsTable tbody tr').each(function() {
    var weaponName = $(this).find('.weaponName').val();
    var attackBonus = $(this).find('.attackBonus').val();
    var damage = $(this).find('.damage').val();
    var weaponType = $(this).find('.weaponType').val();
    var damageBonus = $(this).find('.damageBonus').val();
    weapons.push({
      weaponName: weaponName,
      attackBonus: attackBonus,
      damage: damage,
      weaponType: weaponType,
      damageBonus: damageBonus
    });
  });

  // Create an object to store the field values
  var fields = {
    characterInfo: {
      name: name,
      baseAttackBonus: baseAttackBonus,
      currentHP: currentHP,
      maxHP: maxHP
    },
    savingThrows: {
      fort: fort,
      reflex: reflex,
      will: will
    },
    modifiers: {
      strengthMod: strengthMod,
      dexMod: dexMod
    },
    weapons: weapons
  };

  // Convert the object to JSON string
  var fieldsJSON = JSON.stringify(fields);

  // Save the JSON string to a cookie
  document.cookie = 'characterFields=' + fieldsJSON + '; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
}

// Load fields from cookie
function loadFieldsFromCookie() {
  // Get the cookie value
  var cookies = document.cookie.split(';');
  var characterFieldsJSON = '';
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf('characterFields=') === 0) {
      characterFieldsJSON = decodeURIComponent(cookie.substring('characterFields='.length, cookie.length));
      break;
    }
  }


 // console.log(characterFieldsJSON);

  //only attempt to load if characterFieldsJSON is not empty
  if (characterFieldsJSON.length > 0)
  {


    // Parse the JSON string to an object
    var fields = JSON.parse(characterFieldsJSON);

    // Set the field values from the object
    // Character Info
    $('#name').val(fields.characterInfo.name);
    $('#baseAttackBonus').val(fields.characterInfo.baseAttackBonus);
    $('#currentHP').val(fields.characterInfo.currentHP);
    $('#maxHP').val(fields.characterInfo.maxHP);

    // Saving Throws
    $('#fort').val(fields.savingThrows.fort);
    $('#reflex').val(fields.savingThrows.reflex);
    $('#will').val(fields.savingThrows.will);

    // Modifiers
    $('#strengthMod').val(fields.modifiers.strengthMod);
    $('#dexMod').val(fields.modifiers.dexMod);

    // Weapons
    $('#weaponsTable tbody').empty();
    /*
    $.each(fields.weapons, function(index, weapon) {
      var row = $('<tr>');
      row.append($('<td>').append($('<input>').attr('type', 'text').addClass('form-control weaponName').val(weapon.weaponName)));
      row.append($('<td>').append($('<input>').attr('type', 'number').addClass('form-control attackBonus').val(weapon.attackBonus)));
      row.append($('<td>').append($('<input>').attr('type', 'text').addClass('form-control damage').val(weapon.damage)));
      row.append($('<td>').append($('<input>').attr('type', 'text').addClass('form-control weaponType').val(weapon.weaponType)));
      row.append($('<td>').append($('<input>').attr('type', 'text').addClass('form-control range').val(weapon.range)));
      row.append($('<td>').append(
        $('<button>').addClass('btn btn-primary').text('Roll Attack').click(function() {
          rollAttack(this);
        }),
        $('<button>').addClass('btn btn-danger').text('Delete').click(function() {
          deleteRow(this);
        })
      ));
      $('#weaponsTable tbody').append(row);





      
    });
    */

    // Weapons
    var table = $('#weaponsTable').DataTable();
    table.clear();

    $.each(fields.weapons, function(index, weapon) {
      var row = $('<tr>');
      row.append($('<td>').append($('<input>').attr('type', 'text').addClass('form-control wepSelector').val(weapon.weaponName)));
      row.append($('<td>').append($('<input>').attr('type', 'text').addClass('form-control attackBonus').val(weapon.attackBonus)));
      row.append($('<td>').append($('<input>').attr('type', 'text').addClass('form-control').val(weapon.damage)));
      row.append($('<td>').append($('<input>').attr('type', 'text').addClass('form-control').val(weapon.damageBonus)));
      row.append($('<td>').append($('<select>').addClass('form-control weaponType')
        .append($('<option>').val('melee').text('Melee'))
        .append($('<option>').val('ranged').text('Ranged'))
        .append($('<option>').val('natural').text('Natural'))
        .val(weapon.weaponType)
      ));



      row.append($('<td>').append(
        $('<button>').addClass('btn btn-primary').text('Roll Attack').click(function() {
          rollAttack(this);
        }),
        $('<button>').addClass('btn btn-danger').text('Delete').click(function() {
          deleteRow(this);
        })
      ));
      table.row.add(row);
    });

    table.draw();

    


  }
}


// function to split the text by math symbols
function splitTextToArrayByMathSymbols(text) {
  // Split the text by "+" and "-" symbols
  var splitArray = text.split(/([+-])/);

  // Remove empty strings and "+" symbols from the split array
  splitArray = splitArray.filter(function (value) {
    return value.trim() !== '' && value.trim() !== '+';
  });

  // Combine the "-" sign with the corresponding value
  var resultArray = [];
  for (var i = 0; i < splitArray.length; i++) {
    var value = splitArray[i].trim();
    if (value === "-" && i + 1 < splitArray.length) {
      resultArray.push(value + splitArray[i + 1]);
      i++; // Skip the next value as it has been combined with "-"
    } else {
      resultArray.push(value);
    }
  }

  return resultArray;
}
