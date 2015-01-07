var app = require('./app.js');

this.suite1 = {
    /*
        test.ok(true, 'everythings ok');
        setTimeout(function() {
            test.done();
        }, 10);
  
        test.equal('apples', 'oranges', 'comparing apples and oranges');
        test.done();
    
    'app test': function(test) {
        console.log('hello! %j', app);
        test.equal(app.person.name, 'moo');
        test.done();
    },
    'another test': function(test) {
        test.ok(false);
        test.done();
    }*/
    'get name': function(test) {
        var character = new app.Character();
        test.equal(character.name,'Jimmy Felon');
        test.done();
    },
    'get alignment': function(test) {
        var character = new app.Character();
        test.equal(character.alignment, app.Alignments.NEUTRAL);
        test.done();
    },
    'alignments has correct values': function(test){
        test.equal(app.Alignments.GOOD, "Good");
        test.equal(app.Alignments.EVIL, "Evil");
        test.equal(app.Alignments.NEUTRAL, "Neutral");
        test.done();
    },
    'armor defaults to 10': function(test){
        var character = new app.Character();
        test.equal(character.armorClass(), 10);
        test.done();
    },
    'hit pointes defaults to 5': function(test){
        var character = new app.Character();
        test.equal(character.hitPoints(), 5);
        test.done();
    },
    'character can attack successfuly': function(test) {
        var attackRoll = 20
            , opponentAC = 10;
        test.equal(app.IsAHit(attackRoll, opponentAC), true);
        test.done();
    },
    'damage value is 1 for a normal attack': function(test){
        var attackRoll = 19
            ,strengthModifier = 0
            ,isCritical = false;
        test.equal(app.Damage(attackRoll, strengthModifier, isCritical), 1);
        test.done();
    },
    'damage value doubled on critical hit': function(test){
        var attackRoll = 20
            ,strengthModifier = 0
            ,isCritical = true;
        test.equal(app.Damage(attackRoll, strengthModifier, isCritical), 2);
        test.done();
    },
    'character is dead when no hit points': function(test){
        var defender = new app.Character();
        defender.hitPoints = 1;
        defender.takeDamage(5);
        test.equal(defender.isDead(), true);
        test.done();
    },
    'characters abilities have correct defaults': function(test){
        var character = new app.Character();
        test.equal(character.Abilities.Strength, 10);
        test.equal(character.Abilities.Dexterity, 10);
        test.equal(character.Abilities.Constitution, 10);
        test.equal(character.Abilities.Wisdom, 10);
        test.equal(character.Abilities.Intelligence, 10);
        test.equal(character.Abilities.Charisma, 10);
        test.done();
    },
    /*'characters abilities range from 1 to 20': function(test){
        test.done();
    }*/
    'test character modifier': function(test){
         test.equal(app.getModifier(1), -5);
         test.equal(app.getModifier(5), -3);
         test.equal(app.getModifier(10), 0);
         test.equal(app.getModifier(15), 2);
         test.equal(app.getModifier(20), 5);
         test.done();
    },
    'damage uses strength modifier': function(test) {
        var attackRoll = 10
            , strengthModifier = 2
            ,isCritical = false;
        test.equal(app.Damage(attackRoll, strengthModifier, isCritical), 3);
        test.done();
    },
    'critical hit doubles strength modifier': function(test){
        var attackRoll = 20
            , strengthModifier = 2
            ,isCritical = true;
        test.equal(app.Damage(attackRoll, strengthModifier, isCritical), 10);
        test.done();
    },
    'minum damage dealt is one': function(test){
      var attackRoll = 20
            , strengthModifier = -2
            ,isCritical = false;
        test.equal(app.Damage(attackRoll, strengthModifier, isCritical), 1);
        test.done();  
    },
    'dexterity modifier gets added to armor class': function(test) {
        var character = new app.Character();
        character.Abilities.Dexterity = 15;

        test.equal(character.armorClass(), 12);
        test.done();
    },
    'constitution modifier gets added to hit points': function(test) {
        var character = new app.Character();
        character.Abilities.Constitution = 15;
        test.equal(character.hitPoints(), 7);
        test.done();
    },
    'can add experience points to a character': function(test) {
        var character = new app.Character();
        app.addExperience(character, 2);
        test.equal(character.experience, 2);
        test.done();
    },
    'is attack successful': function(test) {
        var attacker = new app.Character();
        var defender = new app.Character();
        var attackRoll = 11;
        test.equal(app.Attack(attacker, defender, attackRoll), true);
        test.done();
    },
    'attack removes hitpoints from defender': function(test) {
        var attacker = new app.Character();
        var defender = new app.Character();
        var attackRoll = 11;
        app.Attack(attacker, defender, attackRoll);
        test.equal(defender.hitPoints(), 4);
        test.done();
    },
    'attack adds experience points': function(test) {
        var attacker = new app.Character();
        var defender = new app.Character();
        var attackRoll = 11;
        app.Attack(attacker, defender, attackRoll);
        test.equal(attacker.experience, 10);
        test.done();
    },
    'level is defaulted to 1': function(test) {
        var attacker = new app.Character();
        test.equal(attacker.level, 1);
        test.done();
    },
    'every 1000 points character gains a level': function(test){
        var attacker = new app.Character();
        attacker.experience = 999;
        app.addExperience(attacker, 1);
        test.equal(attacker.level, 2);
        test.done();
    },
    'hit points increase by 5 each new level': function(test) {
        var attacker = new app.Character();
        attacker.Abilities.Constitution = 15
        attacker.experience = 999;
        app.addExperience(attacker, 1);
        test.equal(attacker.hitPoints(), 14);
        test.done();
    },
    'attack roll incremented by 1 for going up to an even level': function(test) {
        var level = 2
            , dieRoll = 10;
        test.equal(app.attackRoll(level, dieRoll), 11);
        test.done();  
    }
};










