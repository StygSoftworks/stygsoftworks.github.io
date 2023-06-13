$(document).ready(function() {
  $('#savingThrowsTable').DataTable();
  $('#weaponsTable').DataTable();
});

function rollDice(button) {
  var row = $(button).closest('tr');
  var fort = row.find('#fort').val();
  var reflex = row.find('#reflex').val();
  var will = row.find('#will').val();

  var fortRoll = Math.floor(Math.random() * 20) + 1 + parseInt(fort);
  var reflexRoll = Math.floor(Math.random() * 20) + 1 + parseInt(reflex);
  var willRoll = Math.floor(Math.random() * 20) + 1 + parseInt(will);

  alert("Fort: " + fortRoll + "\nReflex: " + reflexRoll + "\nWill: " + willRoll);
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
  var attackBonus = row.find('#attackBonus').val();
  var damage = row.find('#damage').val();

  // Evaluate damage expression
  var evaluatedDamage = evaluateDamageExpression(damage);

  var attackRoll = Math.floor(Math.random() * 20) + 1 + parseInt(attackBonus);

  alert("Attack Roll: " + attackRoll + "\nDamage: " + evaluatedDamage);
}

function evaluateDamageExpression(expression) {
  var diceRegex = /(\d+d\d+([\+\-]\d+)?)/g;
  var matches = expression.match(diceRegex);
  var result = '';

  if (matches) {
    for (var i = 0; i < matches.length; i++) {
      var dice = matches[i];
      var rollResult = rollDiceExpression(dice);
      result += dice + ': ' + rollResult + ' ';
    }
  }

  return result.trim();
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

  return total + modifier;
}

function addRow() {
  var newRow = '<tr>' +
    '<td><input type="text" class="form-control" id="weaponName"></td>' +
    '<td><input type="number" class="form-control" id="attackBonus"></td>' +
    '<td><input type="text" class="form-control" id="damage"></td>' +
    '<td><input type="text" class="form-control" id="weaponType"></td>' +
    '<td><input type="text" class="form-control" id="range"></td>' +
    '<td>' +
    '<button class="btn btn-primary" onclick="rollAttack(this)">Roll Attack</button>' +
    '<button class="btn btn-danger" onclick="deleteRow(this)">Delete</button>' +
    '</td>' +
    '</tr>';

  $('#weaponsTable tbody').append(newRow);
}

function deleteRow(button) {
  $(button).closest('tr').remove();
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
    var range = $(this).find('.range').val();
    weapons.push({
      weaponName: weaponName,
      attackBonus: attackBonus,
      damage: damage,
      weaponType: weaponType,
      range: range
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
}
