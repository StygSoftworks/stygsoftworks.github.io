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



// Function to save all the fields to a cookie
function saveFieldsToCookie() {
  // Get all the field values
  var name = $('#name').val();
  var baseAttackBonus = $('#baseAttackBonus').val();
  var currentHP = $('#currentHP').val();
  var maxHP = $('#maxHP').val();
  var fort = $('#fort').val();
  var reflex = $('#reflex').val();
  var will = $('#will').val();
  var strengthMod = $('#strengthMod').val();
  var dexMod = $('#dexMod').val();
  var weaponName = $('#weaponName').val();
  var attackBonus = $('#attackBonus').val();
  var damage = $('#damage').val();
  var weaponType = $('#weaponType').val();
  var range = $('#range').val();

  // Create an object to store the field values
  var fields = {
    name: name,
    baseAttackBonus: baseAttackBonus,
    currentHP: currentHP,
    maxHP: maxHP,
    fort: fort,
    reflex: reflex,
    will: will,
    strengthMod: strengthMod,
    dexMod: dexMod,
    weaponName: weaponName,
    attackBonus: attackBonus,
    damage: damage,
    weaponType: weaponType,
    range: range
  };

  // Convert the fields object to JSON string
  var fieldsJson = JSON.stringify(fields);

  // Save the fields to a cookie
  document.cookie = 'characterFields=' + encodeURIComponent(fieldsJson);
}

// Function to load all the fields from the cookie
function loadFieldsFromCookie() {
  // Get the cookie value
  var cookies = document.cookie.split(';');
  var characterFieldsCookie = null;
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.indexOf('characterFields=') === 0) {
      characterFieldsCookie = cookie;
      break;
    }
  }

  // If the cookie is found, load the fields
  if (characterFieldsCookie) {
    var fieldsJson = decodeURIComponent(characterFieldsCookie.split('=')[1]);
    var fields = JSON.parse(fieldsJson);

    // Set the field values
    $('#name').val(fields.name);
    $('#baseAttackBonus').val(fields.baseAttackBonus);
    $('#currentHP').val(fields.currentHP);
    $('#maxHP').val(fields.maxHP);
    $('#fort').val(fields.fort);
    $('#reflex').val(fields.reflex);
    $('#will').val(fields.will);
    $('#strengthMod').val(fields.strengthMod);
    $('#dexMod').val(fields.dexMod);
    $('#weaponName').val(fields.weaponName);
    $('#attackBonus').val(fields.attackBonus);
    $('#damage').val(fields.damage);
    $('#weaponType').val(fields.weaponType);
    $('#range').val(fields.range);
  }
}

  