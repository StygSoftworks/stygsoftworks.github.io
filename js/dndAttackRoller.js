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



  function createCookie(name, value, days) {
    var expires = '';
  
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
  
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
  }


  function saveFieldsToCookie() {
    var fields = {};
  
    // Save character info
    fields.name = $('#name').val();
    fields.baseAttackBonus = $('#baseAttackBonus').val();
    fields.currentHP = $('#currentHP').val();
    fields.maxHP = $('#maxHP').val();
  
    // Save saving throws
    fields.fort = $('#fort').val();
    fields.reflex = $('#reflex').val();
    fields.will = $('#will').val();
  
    // Save modifiers
    fields.strengthMod = $('#strengthMod').val();
    fields.dexMod = $('#dexMod').val();
  
    // Save weapons
    fields.weapons = [];
  
    $('#weaponsTable tbody tr').each(function() {
      var weapon = {};
      weapon.name = $(this).find('#weaponName').val();
      weapon.attackBonus = $(this).find('#attackBonus').val();
      weapon.damage = $(this).find('#damage').val();
      weapon.weaponType = $(this).find('#weaponType').val();
      weapon.range = $(this).find('#range').val();
      fields.weapons.push(weapon);
    });
  
    // Save fields to cookie
    var jsonFields = JSON.stringify(fields);


    // Store fields in a cookie
    createCookie('characterFields', jsonFields, 999); // Expires after 7 days


    //log the cookie
    console.log(jsonFields);


    

  }


  function loadFieldsFromCookie() {
    // Get cookie value
    var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)characterFields\s*\=\s*([^;]*).*$)|^.*$/, '$1');
  
    console.log(document.cookie);
    console.log(cookieValue);

    if (cookieValue) {
      try {
        // Parse cookie value
        var fields = JSON.parse(cookieValue);
  
        // Load character info
        $('#name').val(fields.name);
        $('#baseAttackBonus').val(fields.baseAttackBonus);
        $('#currentHP').val(fields.currentHP);
        $('#maxHP').val(fields.maxHP);
  
        // Load saving throws
        $('#fort').val(fields.fort);
        $('#reflex').val(fields.reflex);
        $('#will').val(fields.will);
  
        // Load modifiers
        $('#strengthMod').val(fields.strengthMod);
        $('#dexMod').val(fields.dexMod);
  
        // Load weapons
        $('#weaponsTable tbody').empty();
  
        for (var i = 0; i < fields.weapons.length; i++) {
          var weapon = fields.weapons[i];
          var newRow = '<tr>' +
            '<td><input type="text" class="form-control" id="weaponName" value="' + weapon.name + '"></td>' +
            '<td><input type="number" class="form-control" id="attackBonus" value="' + weapon.attackBonus + '"></td>' +
            '<td><input type="text" class="form-control" id="damage" value="' + weapon.damage + '"></td>' +
            '<td><input type="text" class="form-control" id="weaponType" value="' + weapon.weaponType + '"></td>' +
            '<td><input type="text" class="form-control" id="range" value="' + weapon.range + '"></td>' +
            '<td>' +
            '<button class="btn btn-primary" onclick="rollAttack(this)">Roll Attack</button>' +
            '<button class="btn btn-danger" onclick="deleteRow(this)">Delete</button>' +
            '</td>' +
            '</tr>';
  
          $('#weaponsTable tbody').append(newRow);
        }
      } catch (error) {
        // Handle invalid JSON or parsing error
        console.error('Error parsing JSON from cookie:', error);
      }
    }
  }
  
  