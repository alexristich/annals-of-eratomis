// Component to handle the implementation details of Hero

// starting with a single Hero instance for now
// TODO figure out how to best handle storage and retrieval of hero for different players
Heroes = new Mongo.Collection('heroes');

var Schemas = {};

Schemas.Hero = new SimpleSchema({
    username: {
        type: String,
        label: "Username"
    },

    hitPoints: {
        type: Number,
        label: "Hit Points",
        optional: true
    },

    damage: {
        type: Number,
        label: "Damage",
        optional: true
    },

    defense: {
        type: Number,
        label: "Defense Bonus",
        optional: true
    },

    atkSpeed: {
        type: Number,
        label: "Attack Speed",
        optional: true
    },

    xpos: {
        type: Number,
        label: "X Position",
        min: 0
    },

    ypos: {
        type: Number,
        label: "Y Position",
        min: 0
    },

    width: {
        type: Number,
        label: "Width"
    },

    height: {
        type: Number,
        label: "Height"
    },

    movSpeed: {
        type: Number,
        label: "Movement Speed",
        optional: true,
        min: 0,
        max: 10
    },

    gold: {
        type: Number,
        label: "Gold",
        optional: true,
        min: 0
    },

    // currently equipped weapon
    currWeapon: {
        type: Schemas.Weapon,
        label: "Current Weapon",
        optional: true
    },

    // list of all owned weapons
    purcWeapons: {
        type: [Schemas.Weapon],
        label: "Purchased Weapons",
        optional: true
    },

    // currently equipped armor
    currArmor: {
        type: Schemas.Armor,
        label: "Current Armor",
        optional: true
    },

    // list of all owned armors
    purcArmors: {
        type: [Schemas.Armor],
        label: "Purchased Armors",
        optional: true
    }
});

Heroes.attachSchema(Schemas.Hero);

Meteor.methods({
    addHero: function(hero) {
        Heroes.insert({
            // TODO add Hero ID using Meteor ID once login is enabled
            username: hero.username,
            xpos: hero.xpos,
            ypos: hero.ypos,
            width: hero.width,
            height: hero.height
        })
    },
    //adjustBalance(delta) {
    //    Hero.gold += delta;
    //},
    //
    //changeArmor(armor) {
    //    Hero.currArmor = armor;
    //},
    //
    //changeWeapon(weapon) {
    //    Hero.currWeapon = weapon;
    //},

    // moves hero in horizontal direction
    moveHeroLaterally: function(delta) {
        var validMove = true;
        var hero = Heroes.findOne({});
        newXPos = hero.xpos + delta;
        hero.xpos = newXPos;

        var level = Levels.findOne({active: true});

        if (level) {
            // initially, only do the check when level is active
            var villains = Villains.find({}).fetch();
            var obstacles = level.obstacles;

            for (var i = 0; i < villains.length; i++) {
                if (villains[i].xpos < hero.xpos + hero.width && villains[i].xpos + villains[i].width > hero.xpos &&
                    villains[i].ypos < hero.ypos + hero.height && villains[i].ypos + villains[i].height > hero.ypos) {
                    validMove = false;
                }
            }
            for (var j = 0; j < obstacles.length; j++) {
                if (obstacles[j].xpos < hero.xpos + hero.width && obstacles[j].xpos + obstacles[j].width > hero.xpos &&
                    obstacles[j].ypos < hero.ypos + hero.height && obstacles[j].ypos + obstacles[j].height > hero.ypos) {
                    validMove = false;
                }
            }
        }

        if (validMove) {
            Heroes.update({}, {$inc: {xpos: delta}});
        }
    },

    // moves hero in vertical direction
    moveHeroVertically: function(delta) {
        var validMove = true;
        var hero = Heroes.findOne({});
        newYPos = hero.ypos + delta;
        hero.ypos = newYPos;

        var level = Levels.findOne({active: true});

        if (level) {
            // initially, only do the check when level is active
            var villains = Villains.find({}).fetch();
            var obstacles = level.obstacles;

            for (var i = 0; i < villains.length; i++) {
                console.log(villains[i]);
                if (villains[i].xpos < hero.xpos + hero.width && villains[i].xpos + villains[i].width > hero.xpos &&
                    villains[i].ypos < hero.ypos + hero.height && villains[i].ypos + villains[i].height > hero.ypos) {
                    validMove = false;
                }
            }
            console.log("Completed checking villains");
            for (var j = 0; j < obstacles.length; j++) {
                if (obstacles[j].xpos < hero.xpos + hero.width && obstacles[j].xpos + obstacles[j].width > hero.xpos &&
                    obstacles[j].ypos < hero.ypos + hero.height && obstacles[j].ypos + obstacles[j].height > hero.ypos) {
                    validMove = false;
                }
            }
        }

        if (validMove) {
            Heroes.update({}, {$inc: {ypos: delta}});
        }
    },

    removeHero() {
        Heroes.remove({});
    }

    // TODO add additional methods to modify Hero
});