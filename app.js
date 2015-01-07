var _ = require('lodash');

var Alignments = {
	GOOD: "Good",
	EVIL: "Evil",
	NEUTRAL: "Neutral"
};
module.exports.Alignments = Alignments;

var defaultClassModifiers = {
    isRollIncreaseAllLevels: false
};

var fighter = _.assign(_.clone(defaultClassModifiers, true),{isRollIncreaseAllLevels: true});

module.exports.Classes = {
    Fighter: fighter
}

function Character(classModifiers) {
    this.Abilities = { 
        Strength : 10,
        Dexterity: 10,
        Constitution: 10,
        Wisdom: 10,
        Intelligence: 10,
        Charisma: 10
    };
    if(classModifiers == undefined){
        this.classModifiers = defaultClassModifiers;
    }else{
        this.classModifiers = classModifiers;    
    }
}
Character.prototype = {
    name: 'Jimmy Felon',
    level: 1,
    alignment: Alignments.NEUTRAL,
    _armorClass: 10,
    _hitPoints: 5,
    armorClass: function(armorClass) {
        if (armorClass !== undefined) {
            this._armorClass = armorClass;
        }
        return this._armorClass + getModifier(this.Abilities.Dexterity);
    },
    hitPoints: function(hitPoints) {
        if(hitPoints != undefined){
            this._hitPoints = hitPoints;
        }
        return ((this._hitPoints + getModifier(this.Abilities.Constitution)) * this.level);
    },
    experience: 0,
    takeDamage: function(damageAmount){
        this.hitPoints -= damageAmount;
    },
    isDead: function(){
        if(this.hitPoints < 1){
            return true;
        }
        return false;
    }
};
module.exports.Character = Character;

var IsAHit = function(attackRoll, defenderArmorClass){
	if(attackRoll >= defenderArmorClass){
		return true;
	}else{
		return false;
	}
};
module.exports.IsAHit = IsAHit;

var damage = function(attackRoll, strengthModifier, isCritical) {
	var damageDealt = 1;

	if (isCritical){
		strengthModifier *=2;
		damageDealt = (damageDealt + strengthModifier) * 2
	} else {
		damageDealt += strengthModifier;
	}

	return Math.max(1, damageDealt);
};
module.exports.Damage = damage;

var getModifier = function(score) {
	var modifier = 0;
	var n = score - 10;
	if (n % 2 != 0) {
		n -= 1;
	}
	modifier = n / 2;
	return modifier;
};
module.exports.getModifier = getModifier;

var addExperience = function(character, points) {
    character.experience += points;
    var newLevel = Math.floor(character.experience / 1000) + 1;
    if (character.level < newLevel) {
        levelUp(character, newLevel - character.level);
    }
};
module.exports.addExperience = addExperience;

var levelUp = function(character, levels) {
    character.level += levels;
};
module.exports.levelUp = levelUp;

var Attack = function (attacker, defender, attackRoll) {
    if(IsAHit(attackRoll, defender.armorClass())){
        var currentHitPoints = defender.hitPoints();
        var isCritical = attackRoll == 20;
        var damagePoints = damage(attackRoll,getModifier(attacker.Abilities.Strength), isCritical);
        var newHitPoints = currentHitPoints - damagePoints;
        defender.hitPoints(newHitPoints);
        addExperience(attacker, 10);
        return true;
    }
    return false;
};
module.exports.Attack = Attack;

var attackRoll = function(attacker, expectedAttackRoll) {
    if (expectedAttackRoll == undefined) {
        expectedAttackRoll = 10; //Math.random() * (max - min) + min;
    }
    if(attacker.classModifiers.isRollIncreaseAllLevels){
        return expectedAttackRoll + attacker.level;
    }else{
        return expectedAttackRoll + Math.floor(attacker.level / 2);
    }
    
};
module.exports.attackRoll = attackRoll;


