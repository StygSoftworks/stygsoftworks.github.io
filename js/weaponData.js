var weaponData = [
    { "name": "Dagger", "type": "Melee", "attackMod": "Str", "damage": "1d4" },
    { "name": "Gauntlet", "type": "Melee", "attackMod": "Str", "damage": "1d3" },
    { "name": "Gauntlet, Spiked", "type": "Melee", "attackMod": "Str", "damage": "1d4" },
    { "name": "Short Sword", "type": "Melee", "attackMod": "Str", "damage": "1d6" },
    { "name": "Long Sword", "type": "Melee", "attackMod": "Str", "damage": "1d8" },
    { "name": "Axe, Hand", "type": "Melee", "attackMod": "Str", "damage": "1d6" },
    { "name": "Axe, Battle", "type": "Melee", "attackMod": "Str", "damage": "1d8" },
    { "name": "Mace, Light", "type": "Melee", "attackMod": "Str", "damage": "1d6" },
    { "name": "Mace, Heavy", "type": "Melee", "attackMod": "Str", "damage": "1d8" },
    { "name": "Hammer, Light", "type": "Melee", "attackMod": "Str", "damage": "1d4" },
    { "name": "Hammer, War", "type": "Melee", "attackMod": "Str", "damage": "1d8" },
    { "name": "Flail", "type": "Melee", "attackMod": "Str", "damage": "1d8" },
    { "name": "Flail, Heavy", "type": "Melee", "attackMod": "Str", "damage": "1d10" },
    { "name": "Glaive", "type": "Melee", "attackMod": "Str", "damage": "1d10" },
    { "name": "Greataxe", "type": "Melee", "attackMod": "Str", "damage": "1d12" },
    { "name": "Greatsword", "type": "Melee", "attackMod": "Str", "damage": "2d6" },
    { "name": "Halberd", "type": "Melee", "attackMod": "Str", "damage": "1d10" },
    { "name": "Lance", "type": "Melee", "attackMod": "Str", "damage": "1d8" },
    { "name": "Morningstar", "type": "Melee", "attackMod": "Str", "damage": "1d8" },
    { "name": "Pick, Light", "type": "Melee", "attackMod": "Str", "damage": "1d4" },
    { "name": "Pick, Heavy", "type": "Melee", "attackMod": "Str", "damage": "1d6" },
    { "name": "Rapier", "type": "Melee", "attackMod": "Dex", "damage": "1d6" },
    { "name": "Scimitar", "type": "Melee", "attackMod": "Dex", "damage": "1d6" },
    { "name": "Trident", "type": "Melee", "attackMod": "Str", "damage": "1d8" },
    { "name": "Warhammer", "type": "Melee", "attackMod": "Str", "damage": "1d8" },
    { "name": "Whip", "type": "Melee", "attackMod": "Dex", "damage": "1d3" },
    { "name": "Falchion", "type": "Melee", "attackMod": "Str", "damage": "2d4" },
    { "name": "Greatclub", "type": "Melee", "attackMod": "Str", "damage": "1d10" },
    { "name": "Spiked Chain", "type": "Melee", "attackMod": "Dex", "damage": "2d4" },
    { "name": "Bastard Sword", "type": "Melee", "attackMod": "Str", "damage": "1d10" },
    { "name": "Dwarven Waraxe", "type": "Melee", "attackMod": "Str", "damage": "1d10" },
    { "name": "Whip, Drow", "type": "Melee", "attackMod": "Dex", "damage": "1d3" },
    { "name": "Quarterstaff", "type": "Melee", "attackMod": "Str", "damage": "1d6/1d6" },
    { "name": "Crossbow, Light", "type": "Ranged", "attackMod": "Dex", "damage": "1d8" },
    { "name": "Crossbow, Heavy", "type": "Ranged", "attackMod": "Dex", "damage": "1d10" },
    { "name": "Longbow", "type": "Ranged", "attackMod": "Str", "damage": "1d8" },
    { "name": "Shortbow", "type": "Ranged", "attackMod": "Str", "damage": "1d6" },
    { "name": "Sling", "type": "Ranged", "attackMod": "Str", "damage": "1d4" },
    { "name": "Javelin", "type": "Ranged", "attackMod": "Str", "damage": "1d6" },
    { "name": "Dart", "type": "Ranged", "attackMod": "Dex", "damage": "1d4" },
    { "name": "Shuriken", "type": "Ranged", "attackMod": "Dex", "damage": "1d2" },
    { "name": "Throwing Axe", "type": "Ranged", "attackMod": "Str", "damage": "1d6" },
    { "name": "Throwing Dagger", "type": "Ranged", "attackMod": "Dex", "damage": "1d4" },
    { "name": "Bolas", "type": "Ranged", "attackMod": "Dex", "damage": "Special" },
    { "name": "Net", "type": "Ranged", "attackMod": "Dex", "damage": "Special" },
    { "name": "Unarmed Strike", "type": "Natural", "attackMod": "Str", "damage": "1d3" },
    { "name": "Claw", "type": "Natural", "attackMod": "Str", "damage": "1d4" },
    { "name": "Bite", "type": "Natural", "attackMod": "Str", "damage": "1d6" },
    { "name": "Gore", "type": "Natural", "attackMod": "Str", "damage": "1d6" },
    { "name": "Slam", "type": "Natural", "attackMod": "Str", "damage": "1d6" },
    { "name": "Talons", "type": "Natural", "attackMod": "Str", "damage": "1d6" },
    { "name": "Pincers", "type": "Natural", "attackMod": "Str", "damage": "1d8" },

    { "name": "Monk Belt Fist", "type": "Melee", "attackMod": "Str", "damage": "1d8" },


    { "name": "Sting", "type": "Natural", "attackMod": "Str", "damage": "1d4" }
  ];
  
