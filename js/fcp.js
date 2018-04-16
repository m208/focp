// jquery-deparam/jquery-deparam.min.js
!function(deparam){if(typeof require==="function"&&typeof exports==="object"&&typeof module==="object"){var jquery=require("jquery");module.exports=deparam(jquery)}else if(typeof define==="function"&&define.amd){define(["jquery"],function(jquery){return deparam(jquery)})}else{var global=(false||eval)("this");global.deparam=deparam(jQuery)}}(function($){return function(params,coerce){var obj={},coerce_types={"true":!0,"false":!1,"null":null};$.each(params.replace(/\+/g," ").split("&"),function(j,v){var param=v.split("="),key=decodeURIComponent(param[0]),val,cur=obj,i=0,keys=key.split("]["),keys_last=keys.length-1;if(/\[/.test(keys[0])&&/\]$/.test(keys[keys_last])){keys[keys_last]=keys[keys_last].replace(/\]$/,"");keys=keys.shift().split("[").concat(keys);keys_last=keys.length-1}else{keys_last=0}if(param.length===2){val=decodeURIComponent(param[1]);if(coerce){val=val&&!isNaN(val)?+val:val==="undefined"?undefined:coerce_types[val]!==undefined?coerce_types[val]:val}if(keys_last){for(;i<=keys_last;i++){key=keys[i]===""?cur.length:keys[i];cur=cur[key]=i<keys_last?cur[key]||(keys[i+1]&&isNaN(keys[i+1])?{}:[]):val}}else{if($.isArray(obj[key])){obj[key].push(val)}else if(obj[key]!==undefined){obj[key]=[obj[key],val]}else{obj[key]=val}}}else if(key){obj[key]=coerce?undefined:""}});return obj}});

var SPECIAL = { "ST": 0,
                "PE": 1,
                "EN": 2,
                "CH": 3,
                "IN": 4,
                "AG": 5,
                "LK": 6 };

var TRAITS = [  "FastMet",
                "Bruiser",
                "SmallFrame",
                "OneHand",
                "Finesse",
                "Kamikaze",
                "HeavyHand",
                "FastShot",
                "BloodyMess",
                "Jinxed",
                "GoodNatured",
                "ChemReliant",
                "ChemResistant",
                "Bonehead",
                "Mutant",
                "Evader" ];

var CARRYWEIGHT = {0: [0, 0],
                   1: [31, 27],
                   2: [43, 33],
                   3: [54, 40],
                   4: [65, 47],
                   5: [77, 54],
                   6: [88, 61],
                   7: [99, 67],
                   8: [110, 74],
                   9: [122, 81],
                   10: [133, 88]};

var SKILLS_RAW = [ "SG", "BG", "EW", "CC", "Scavenging", "Throwing", "FA", "Doc", "Sneak", "LP", "Steal", "Traps", "Science", "Repair", "Speech", "Barter", "Gambling", "ODM" ];
var SKILLS_NAMES = SKILLS_RAW;

var SKILLS = {};
for (var i = 0; i < SKILLS_RAW.length; i++) {
    SKILLS[SKILLS_RAW[i]] = i;
}

var PERKS_RAW = [
        "Anticritical",
        "Bonus HtH Damage",
        "Cautious Nature",
        "Earlier Sequence",
        "Healer",
        "Quick Hands",
        "Quick Recovery",
        "Stonewall",
        "Thief",
        "Toughness",
        "Harmless",
        "Ghost",
        "Educated",
        "Adrenaline Rush",
        "Bonus Ranged Dmg",
        "More Critical",
        "Magnetic Personality",
        "Silent Running",
        "Dodger",
        "Light Step",
        "Sharpshooter",
        "Weapon Handling",
        "Gain Strength",
        "Gain Perception",
        "Gain Endurance",
        "Gain Charisma",
        "Gain Intelligence",
        "Gain Agility",
        "Gain Luck",
        "Better Criticals",
        "Action Boy",
        "Mr. Fixit",
        "Master Thief",
        "Medic",
        "HtH Evade",
        "Lifegiver",
        "Living Anatomy",
        "Bonus HtH Attacks",
        "Bonus Rate of Fire",
        "Pickpocket",
        "Silent Death"]

var PERKS_NAMES = PERKS_RAW;
		

var SKILLS_RELATED_THINGS = {	
	"Accuracy"	:	{
					"SG"	: [40, 0],			// [ bonus, taken at]
					"BG"	: [40, 0],
					"EW"	: [40, 0]
					},
	"Medical"	:	{
					"FA"	: [50, 0],
					"Doc"	: [50, 0]
					},
	"Scouting"	:	{
					"Sneak"	: [50, 0]
					},
	"Survival"	:	{
					"ODM"	: [100, 0]			
					},
	"Medic"	:		{
					"FA"	: [25, 0],			
					"Doc"	: [25, 0]
					},
"Living Anatomy":	{
					"Doc"	: [20, 0]
					},						
	"Harmless"	:	{
					"Steal"	: [40, 0]
					},	
"Master Thief"	:	{
					"Steal"	: [20, 0],		
					"LP"	: [20, 0]
					},	
	"Mr. Fixit":	{
					"Repair" : [10, 0],
					"Science": [10, 0]
					}

};	
	
var PERKS_MAX_RANKS = {
    'Anticritical' : 1, 
    'Bonus HtH Damage' : 1, 
    'Cautious Nature' : 1,
    'Earlier Sequence' : 1,
    'Healer' : 2,
    'Quick Hands' : 1,
    'Quick Recovery' : 1,
    'Stonewall' : 1,
    'Thief' : 1,
    'Toughness' : 2,
    'Harmless' : 1,
    'Ghost' : 1,
    'Educated' : 1,
    'Adrenaline Rush' : 1,
    'Bonus Ranged Dmg' : 2,
    'More Critical' : 2,
    'Magnetic Personality' : 1,
    'Silent Running' : 1,
    'Dodger' : 1,
    'Light Step' : 1,
    'Sharpshooter' : 1,
    'Weapon Handling' : 1,
    'Gain Strength' : 1,
    'Gain Perception' : 1,
    'Gain Endurance' : 1,
    'Gain Charisma' : 1,
    'Gain Intelligence' : 1,
    'Gain Agility' : 1,
    'Gain Luck' : 1,
    'Better Criticals' : 1,
    'Action Boy' : 2,
    'Mr. Fixit' : 1,
    'Master Thief' : 1,
    'Medic' : 1,
    'HtH Evade' : 1,
    'Lifegiver' : 2,
    'Living Anatomy' : 1,
    'Bonus HtH Attacks' : 1,
    'Bonus Rate of Fire' : 1,
    'Pickpocket' : 1,
    'Silent Death' : 1 }

var PERKS_SPECIAL_REQ = {
    'Anticritical' 		: [0, 0, 0, 0, 0, 0, 0],
    'Bonus HtH Damage'  : [6, 0, 0, 0, 0, 6, 0],
    'Cautious Nature' : [0, 6, 0, 0, 0, 0, 0],
    'Earlier Sequence' : [0, 6, 0, 0, 0, 0, 0],
    'Healer' : [0, 7, 0, 0, 5, 6, 0],
    'Quick Hands' : [0, 0, 0, 0, 0, 5, 0],
    'Quick Recovery' : [0, 0, 0, 0, 0, 5, 0],
    'Stonewall' : [6, 0, 0, 0, 0, 0, 0],
    'Thief' : [0, 0, 0, 0, 0, 0, 0],
    'Toughness' : [0, 0, 6, 0, 0, 0, 0],
    'Harmless' : [0, 0, 0, 0, 0, 0, 0],
    'Ghost' : [0, 0, 0, 0, 0, 0, 0],
    'Educated' : [0, 0, 0, 0, 6, 0, 0],
    'Adrenaline Rush' : [-10, 0, 0, 0, 0, 0, 0],
    'Bonus Ranged Dmg' : [0, 0, 0, 0, 0, 6, 6],
    'More Critical' : [0, 0, 0, 0, 0, 0, 6],
    'Magnetic Personality' : [0, 0, 0, 0, 0, 0, 0],
    'Silent Running' : [0, 0, 0, 0, 0, 6, 0],
    'Dodger' : [0, 0, 0, 0, 0, 6, 0],
    'Light Step' : [0, 0, 0, 0, 0, 5, 5],
    'Sharpshooter' : [0, 7, 0, 0, 6, 0, 0],
    'Weapon Handling' : [0, 0, 0, 0, 0, 5, 0],
    'Gain Strength' : [-9, 0, 0, 0, 0, 0, 0],
    'Gain Perception' : [0, -9, 0, 0, 0, 0, 0],
    'Gain Endurance' : [0, 0, -9, 0, 0, 0, 0],
    'Gain Charisma' : [0, 0, 0, -9, 0, 0, 0],
    'Gain Intelligence' : [0, 0, 0, 0, -9, 0, 0],
    'Gain Agility' : [0, 0, 0, 0, 0, -9, 0],
    'Gain Luck' : [0, 0, 0, 0, 0, 0, -9],    
    'Better Criticals' : [0, 7, 0, 0, 0, 4, 7],
    'Action Boy' : [0, 0, 0, 0, 0, 5, 0],
    'Mr. Fixit' : [0, 0, 0, 0, 0, 0, 0],
    'Master Thief' : [0, 0, 0, 0, 0, 0, 0],
    'Medic' : [0, 0, 0, 0, 0, 0, 0],
    'HtH Evade' : [0, 0, 0, 0, 0, 0, 0],
    'Lifegiver' : [0, 0, 4, 0, 0, 0, 0],
    'Living Anatomy' : [0, 0, 0, 0, 0, 0, 0],
    'Bonus HtH Attacks' : [0, 0, 0, 0, 0, 6, 0],
    'Bonus Rate of Fire' : [0, 6, 0, 0, 6, 7, 0],
    'Pickpocket' : [0, 0, 0, 0, 0, 8, 0],
    'Silent Death' : [0, 0, 0, 0, 0, 10, 0]
}

//"SG", "BG", "EW", "CC", "Scavenging", "Throwing", "FA", "Doc", "Sneak", "LP", "Steal", "Traps", "Science", "Repair", "Speech", "Barter", "Gambling", "ODM"
//						  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
var PERKS_SKILL_REQ = {
    'Healer' 			: [0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0],
    'Harmless' 			: [0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 50,  0,  0,  0,  0,  0,  0,  0],
    'Ghost' 			: [0, 0, 0, 0, 0, 0, 0,  0, 60, 0, 0,  0,  0,  0,  0,  0,  0,  0],
    'Silent Running' 	: [0, 0, 0, 0, 0, 0, 0,  0, 50, 0, 0,  0,  0,  0,  0,  0,  0,  0],
    'Mr. Fixit' 		: [0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 0,  0,  40,  40,  0,  0,  0,  0],
    'Master Thief' 		: [0, 0, 0, 0, 0, 0, 0,  0, 0, 50, 50,  0,  0,  0,  0,  0,  0,  0],
    'Medic' 			: [0, 0, 0, 0, 0, 0, 40, 40, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0],
    'HtH Evade' 		: [-110, -100, -100, 200, 0, 0, 0,  0, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0],
    'Living Anatomy'	: [0, 0, 0, 0, 0, 0, 0,  60, 0, 0, 0,  0,  0,  0,  0,  0,  0,  0],
    'Pickpocket' 		: [0, 0, 0, 0, 0, 0, 0,  0, 0, 0, 80,  0,  0,  0,  0,  0,  0,  0],
    'Silent Death' 		: [0, 0, 0, 80, 0, 0, 0,  0, 80, 0, 0,  0,  0,  0,  0,  0,  0,  0]
}


var IMPLANTS_RAW = ["Enviromental",
                    "Accuracy",
                    "Defense",
                    "Medical",
                    "Speed",
                    "Survival",
                    "Marksmanship",
                    "Scouting",
                    "Enhancement",
                    "Chem Control"
]

var QUESTS_RAW = [	"Repair +20%",
                    "Charisma +1",
                    "Pack Rat",
                    "Pathfinder"
]
var DRUGS_RAW = [	"Jet",
                    "Nuca Cola",
                    "Cigarettes",
                    "Buffout",
					"Psycho"
]
var grugAffects = {			//used only to highlight interface
				"Jet" : 		["actionPoints"],
                "Nuca Cola":	["actionPoints"],
                "Cigarettes":	["sight"],
                "Buffout":		["specialTxt_0", "specialTxt_2", "carryWeight", "meleeDamage", "poisonRes", "radRes"],
				"Psycho":		["specialTxt_1", "specialTxt_4", "sight", "damageRes", "sequence"]
}

var SKILL_CAPS = [  300,
                    300,
                    300,
                    200,
                    0,
                    300,
                    300,
                    300,
                    300,
                    200,
                    300,
                    300,
                    160,
                    160,
                    5,
                    4,
                    5,
                    95]



					
// interface
var current_lang = 'Eng';					
	// data from ajax					
var info = {'outputPerks1':[], 'outputPerks2' :[] };		
var perkReqInfo = {'outputPerks1':[], 'outputPerks2' :[] };	
var iFaceMsg = [];
var spSmallDescr = [];	
var dmgTypes = [];



// variables
var traitPoints;
var tagpoints;
var SP;
var basicInt; 
var maxBooks;

var dmgTr = [];
var dmgRes = [];
var missedPerk = [];

var build_name = 'Unnamed';
var level = 99;
var spoints = 0;
var maxPerks = 8;

var glowQuestTaken = -1;

var takenImplant = false;
var chaQuest = false;
var prev_imp = false;

var special = [6,1,10,1,6,10,6];
var gainedSpecial = [0,0,0,0,0,0,0];
var buffedSpecial = [];
//                3  6  9 12 15 18 21 24
// var takenPerks = [0, 0, 0, 0, 0, 0, 0, 0]	//Reworked takenPerksOnLvls now
var perksTakingQuee = new Array();
var curSkills = Array.apply(null, new Array(SKILLS_RAW.length)).map(Number.prototype.valueOf,0);
var investedSkills = Array.apply(null, new Array(SKILLS_RAW.length)).map(Number.prototype.valueOf,0);
var takenTraits = Array.apply(null, new Array(TRAITS.length)).map(Number.prototype.valueOf,0);
var taggedSkills = Array.apply(null, new Array(SKILLS_RAW.length)).map(Number.prototype.valueOf,0);
var quests = Array.apply(null, new Array(QUESTS_RAW.length)).map(Number.prototype.valueOf,0);
var drugs = Array.apply(null, new Array(DRUGS_RAW.length)).map(Number.prototype.valueOf,0);
var flatBonuses = Array.apply(null, new Array(SKILLS_RAW.length)).map(Number.prototype.valueOf,0);
var perks = Array.apply(null, new Array(PERKS_RAW.length)).map(Number.prototype.valueOf,0);

var takenBooks = {  'SG': 0,
                    'FA': 0,
                    'Repair': 0,
                    'Science': 0,
                    'ODM': 0 }

var PERKS_ON_LEVELS = [10, 8, 4, 15, 3, 1]; 
var takenPerksOnLvls = Array.apply(null, new Array(PERKS_ON_LEVELS.length)).map(Number.prototype.valueOf,0);
var QUANTITY_PERKS_1COL = PERKS_ON_LEVELS[0] + PERKS_ON_LEVELS[1] + PERKS_ON_LEVELS[2];
var namePerkCol1 = "Anticritical"
var namePerkCol2 = "Gain Strength"
var skillOver = 0;

var buildCritChance = 0;
var buildCritRoll = 0;
var buildSight = 0;
var buildMelee = 0;

// DMGP wip
//var enemySpecial = [1,10,10,1,7,10,1];
//var espoints = 0;

function pad(num, size) {
    var s = num + "";
    while (s.length < size) { s = "0" + s; }
    return s;
}

var getSpecialNum = function(elem) {
	return [elem.parents('.plusminusSpecial').prop('id'), elem.parent().index()] ;
};

function outputSpecial() {

    var badSpecial = 'badSpecial';
    var badSpecials = [0,0,0,0,0,0,0]
	
	if (takenTraits[TRAITS.indexOf("Bruiser")] && special[SPECIAL["ST"]] < 3) {	
    badSpecials[SPECIAL["ST"]] = 1
    }

    if (takenTraits[TRAITS.indexOf("Bonehead")] && special[SPECIAL["IN"]] > 9) {
        badSpecials[SPECIAL["IN"]] = 1
    }
    
    if (takenTraits[TRAITS.indexOf("Evader")] && special[SPECIAL["EN"]] > 8) {
        badSpecials[SPECIAL["EN"]] = 1
    }
	
	if (quests[1] == 1 && special[SPECIAL["CH"]] < 2) {
        badSpecials[SPECIAL["CH"]] = 1
    }

    for (var i = 0; i < special.length; i++) {
        var div = $("#outputSpecialNum").find("div").eq(i);
        
        div.text(pad(buffedSpecial[i], 2));
        
        if (buffedSpecial[i] > 10 || buffedSpecial[i] < 1) {
            badSpecials[i] = 1
        }

        if (badSpecials[i]) {
            div.addClass(badSpecial);
        } else {
            div.removeClass(badSpecial);
        }
    }

    $("#outputCharpoints").text(spoints);
};

function calcUsedSkillpoints() {
    var total = 0;
    $.each(investedSkills,function() {
        total += this;
    });

    return total;
}

function getRelatedBonus(num)	{
	var skill_name = SKILLS_RAW[num];
	var bonus = [];			// example ["Medic", 25, 41, "Living Anatomy", 20, 104, "Medical", 100, 140] sorted by lowest taken level
	var i = 0;
		$.each(SKILLS_RELATED_THINGS, function(index, value) {
		if (index == takenImplant || perks[PERKS_RAW.indexOf(index)] > 0)	{			// taken implant or perks which related to skills
			$.each(SKILLS_RELATED_THINGS[index], function(ind, val) {					// check related to this perk skills
				if (ind == SKILLS_RAW[num]){											// if current skill is related	
					bonus[i] = index;													// save name of thing (perk or imp)
					i++;		
					bonus[i] = val[0];													// save thing bonus
					i++;
					bonus[i] = SKILLS_RELATED_THINGS[index][ind][1] - flatBonuses[num];  //save value of skill, thing taken at 
					//console.log(num, bonus[i]);
					i++;
				}
			}); 
		}	
	}); 
	//console.log(num, bonus);

	// range bonuses at arrays by lowest taken level (if we had 2 or more perks related to one skill)
	if (bonus.length>3){
		bonus = BubbleSortBonus(bonus);
	}
	
	return bonus;	// return values as array
}

function BubbleSortBonus(arr) { 
  var n = arr.length ;
  for (var i = 2; i < n - 1; i+=3) {
    for (var j = 2; j < n - 1 - i; j+=3) {
      if (arr[j + 3] < arr[j]) {
      
        var taken = arr[j + 3];
        arr[j + 3] = arr[j];
        arr[j] = taken;
                
        var name = arr[j + 1];
        arr[j + 1] = arr[j-2];
        arr[j-2] = name;
                        
        var bonus = arr[j + 2];
        arr[j + 2] = arr[j-1];
        arr[j-1] = bonus;
      }
    }
  }
  return arr; 
}

function calcSkillWithInvestment(num, val) {
	
	var investPointsLeft = investedSkills[num];
    var skillTaggedPoints = taggedSkills[num] ? 2 : 1 

	var bonusIsReal = false;
	var applyedPerks = [];				// list of currently applyed perks

	var perkBonus = getRelatedBonus(num); 	// get bonus from related perks	
											//example perkBonus ["Medic", 25, 100, "Living Anatomy", 20, 160] ranged by lowest taken lvl

	if (perkBonus.length>0){
		bonusIsReal = true;
	//		console.log("skill num:", num, perkBonus);
	}

		// if no invested points yet, and we click on perk on start 
		
			if (investPointsLeft == 0 && (bonusIsReal) ){
			var n = 0;
			for (var j = 0; j<perkBonus.length; j+=3 ){
				var prev_val = val;
				val += parseInt (perkBonus[j+1]); // parse int. Cuz can read it as string 
				applyedPerks[applyedPerks.length] = perkBonus[j];
				
				var name = SKILLS_RAW[perkBonus[j]];
				saveCurrentSkills(name, prev_val);
				
				n++;
			//	console.log ("applyed perk N:" , perkBonus[j], "at skill level", prev_val, "bonus:", perkBonus[j+1] , "new val:", val);
			}
	
		}
	
		// calc skill value ranged by skill level
		
		  var investment = 1;
		  while (investPointsLeft > 0 && investment <= investPointsLeft && val < 300)	{
			
			if (val > 100) {
                if (val < 126) {
                    investment = 2;
                } else if (val < 151) {
                    investment = 3;
                } else if (val < 176) {
                    investment = 4;
                } else if (val < 201) {
                    investment = 5;
                } else {
                    investment = 6;
                }
            }			  
			
			val += 1 * skillTaggedPoints; 
			investPointsLeft -= investment;
			
			// applying perks inside of some value of skill
			
			if (bonusIsReal  ){
				
				for (var i = 0; i<perkBonus.length; i+=3 ){
										
					// here goes check did we calc this perk already?
					
					var perkAlreadyTaken = false;
					for (var j = 0; j<=applyedPerks.length; j++){
						if (applyedPerks[j] == perkBonus[i]){
							var perkAlreadyTaken = true;
							//console.log("cant pick ", perkBonus[i] , "perk taken already");
						}
					}
			
					// apply perk bonus here
					
					if(val >= perkBonus[i+2] && (!perkAlreadyTaken)){	// >= cuz skill can variate of stats or smthing
						var prev_val = val;
						val += parseInt(perkBonus[i+1]);				// parse int. Cuz can read it as string
						applyedPerks[applyedPerks.length] = perkBonus[i];
						//console.log (num, "applyed perk N:" , n, "perk name:", perkBonus[i], "at skill level", prev_val, "bonus:", perkBonus[i+1] , "new val:", val);
					}
				}
			}
			
		}
				
	if (investPointsLeft) {
		investedSkills[num] -= investPointsLeft;
	}
	
	unPickRelatedThing(val, perkBonus);	//if after investment pnts, skill value is lower, than it was at taking perk, remove this perk
	
	return val;
}



function unPickRelatedThing(val, perkBonus)	{
	
	if (perkBonus.length>0){
		for (var i = 0; i<perkBonus.length; i+=3 ){
			var taken_at = perkBonus[i+2];
			var thing_name = perkBonus[i];
			if (val < taken_at ){
				
				// check perk it or implant
				
				if (PERKS_RAW.indexOf(thing_name) >= 0 && perks[PERKS_RAW.indexOf(thing_name)] > 0)	{
					unpickPerk(0, thing_name);
				}
				else if (thing_name === takenImplant){
					prev_imp = takenImplant;
					takenImplant = false;
				}
				// console.log(thing_name, "removed", "cuz taken at:" , taken_at, "now:", val);
			}
			else {
				// console.log ("not removed", val, perkBonus);
			}
		}
	}
}


function decreseSkill() {
    index = skillOver;
    if (investedSkills[index] == 0) {return; }

    var borders = [ 101, 126, 151, 176, 201, 301 ]
    var tagged = taggedSkills[index]
    var curSkill = curSkills[index] - tagged

    var investment = 7
    for ( i=0; i<borders.length; i++ ) {
        if (curSkill <= borders[i]) {
            investment = i + 1
            break;
        }
    }

    investedSkills[index] -= investment;

    updateSkills();
    outputSkills();
    outputSkillpoints()
}

function increaseSkill() {
    index = skillOver;

    cap = 300;

    var curSkill = curSkills[index]

    if (curSkill >= cap) { return; }

    var investment = 1;
    if (curSkill > 100) {
        if (curSkill < 126) {
            investment = 2;
        } else if (curSkill < 151) {
            investment = 3;
        } else if (curSkill < 176) {
            investment = 4;
        } else if (curSkill < 201) {
            investment = 5;
        } else {
            investment = 6;
        }
    }
	
    investedSkills[index] += investment;

    updateSkills();
    outputSkills();
    outputSkillpoints();
}


function decreseLvl() {
	var lvl = parseInt ($('#plannedLevel').val());
		if (lvl == 1){
		return
	}
	lvl -=1;
	$('#plannedLevel').val(lvl);

	level = lvl;
    updateStats();
}

function increaseLvl() {
	var lvl = parseInt ($('#plannedLevel').val());
	
	if (lvl == 99){
		return
	}
	
	lvl += 1;
	$('#plannedLevel').val(lvl);
	
	level = lvl;
	updateStats();

}



function calcSkill(num, val) {
    if (taggedSkills[num]) {
        val += 20;
    }

    // adding books
    booksForThisSkill=takenBooks[SKILLS_RAW[num]]
    if (booksForThisSkill!=undefined) {
        for(var i=0; i<booksForThisSkill; i++) {
          var book_sp = 8;
		  var investment = 1;
		  var prev_val = val;
		  
		  while (book_sp > 0 && investment <= book_sp)
			{
						
            if (val > 100) {
                if (val < 126) {
                    investment = 2;
                } else if (val < 151) {
                    investment = 3;
                } else if (val < 176) {
                    investment = 4;
                } else if (val < 201) {
                    investment = 5;
                } else {
                    investment = 6;
                }
            }			  
			
			val += 1; 
			book_sp = book_sp - investment;
			  
			}
        }
    }

	
	//flatBonus = typeof flatBonus !== 'undefined' ? flatBonus : 0; 
	var flatBonus = flatBonuses[num];
	val = calcSkillWithInvestment(num, val); // calc vals of skills
//	console.log("skill", SKILLS_RAW[num], val);
	
	val += flatBonus; // apply flatbonus value to stats
	
	if (val > 300){
		val = 300;
	}
	
	curSkills[num] = val;
	
    outputSkills();
    outputSkillpoints();
	
	updateFaCd();
	updateDocCd();
};

function outputSkills() {
    for (var i = 0; i < SKILLS_RAW.length; i++) {
        $("#outputSkills").find("div").eq(i).find('span').eq(1).text(curSkills[i] + "% [" + investedSkills[i] + ']');
    }
}


function getPerkLvlGroup (name){
	var perk_index=PERKS_RAW.indexOf(name);
	var a =  PERKS_ON_LEVELS[0];
	for (var i = 0; i< PERKS_ON_LEVELS.length; i++ ){
		
		if (perk_index < a){
			//console.log(name, "belongs to", i)
			return i;
			break;
		}
		
		a += PERKS_ON_LEVELS[i+1];
	}
}


function pickPerk(param, name) {
	
 if (param == 0){					// if param != 0 we do not check avaialability for perk
	var available = perkAvailable(name);	
	if (available  != 1) {	
		return;
	}
 }	
	// but check perks max rank always
	var perk_index=PERKS_RAW.indexOf(name);
	if (perks[perk_index] == PERKS_MAX_RANKS[name]) {
    	return ;
	}
 

	perks[PERKS_RAW.indexOf(name)] += 1;
  
	var PerkLvlGroup = getPerkLvlGroup(name);
	takenPerksOnLvls[PerkLvlGroup] += 1;
  
  // save perk at taken queue
	var len = perksTakingQuee.length;
	perksTakingQuee[len] = PERKS_RAW.indexOf(name);

  // check is choosen perk a skill related or no and save params
	var request = isItSkillRelated(name);
	if (request.length >0){
		saveCurrentSkills(name, request);
	}

	updateStats();
	updateSkills();
}


function isItSkillRelated(name){ 
	var result = [];
	var i = 0;
	$.each(SKILLS_RELATED_THINGS, function(index, value) {
		if (index == name){
			$.each(SKILLS_RELATED_THINGS[index], function(ind, val) {
					result[i] = ind;
					i++;
			}); 
		}
	}); 

	return result;		// returns names of related skill if true
}	

function saveCurrentSkills(name, skills){
	
	$.each(SKILLS_RELATED_THINGS, function(index, value) {
		if (index == name){
			var n = 0;
				$.each(SKILLS_RELATED_THINGS[index], function(ind, val) {
				//console.log("index:", index, "value:", value, "i:", ind,"v:", val);
					if (ind == skills[n]){
						SKILLS_RELATED_THINGS[index][ind][1] = curSkills[SKILLS_RAW.indexOf(skills[n])];
						n++;
					}
				}); 
		}
	}); 	

}

function unpickPerk(col, name) {
    var perkIndex=PERKS_RAW.indexOf(name)

    if (!perks[perkIndex]) {
        return;
    }
	
	// if perk taken by implant, not remove him manually
	if (takenImplant === "Medical" && name === "Living Anatomy"){
		return;
	}

    perks[perkIndex] -= 1
	
	var PerkLvlGroup = getPerkLvlGroup(name);
	takenPerksOnLvls[PerkLvlGroup] -= 1;
		
	var len = perksTakingQuee.length;
	
	// remove perk from taken perks queue
	for (var i = len - 1; i>=0; i--){
		if (perksTakingQuee[i] == PERKS_RAW.indexOf(name)){
		
			var index = perksTakingQuee.indexOf(name);		
			perksTakingQuee.splice(i, 1);
			break;
		}
	}
	
    updateStats();
    updateSkills();
}

// not used anymore
function getPerkRequiredLeveldiv3m1(name) {
    perk_index=PERKS_RAW.indexOf(name)
    var foundIndex;
    for(index=0;index<PERKS_ON_LEVELS.length;index++) {
        element=PERKS_ON_LEVELS[index]
        if(perk_index < element) {
            return index
        }
        perk_index-=element
    }
    console.log("I'm broken! Something is too much")
    return PERKS_ON_LEVELS.length
}


function perkAvailableBySkill(name){
	var ret = true;
	$.each(PERKS_SKILL_REQ, function(index, value) {
		if (name == index){
			for(var index=0;index<PERKS_SKILL_REQ[name].length;index++) {
				var element=(PERKS_SKILL_REQ[name])[index]
				if(element > 0 && curSkills[index] < element || element < 0 && curSkills[index] >= -element) {
				ret = false;
				}
			}	
		}
	});
	return ret;
}

// more simple func, checking latest missing perk, dont allow take highers perks if no more free perks 
function checkPerkbyLvl(name){
	var free_perks = maxPerks - countTakenPerks();
	var perkLvlGroup = getPerkLvlGroup(name);
	var len = missedPerk.length;
	//console.log("missed perks:", len, "last:", missedPerk[len-1], "free:", free_perks);	
	if (len == free_perks && perkLvlGroup > missedPerk[len-1]){
		return false;
	} else {
		return true;
	}
}

// this func allow take perks only one ater other 3, 6, 9 etc
function checkPerkbyLvl_old(name){

	var perkLvlGroup = getPerkLvlGroup(name);
	var sum_prev = 0;

	for (var i = 0; i <= perkLvlGroup; i++){
		sum_prev += takenPerksOnLvls[i];
		var sum = 0;
		if (takenPerksOnLvls[i-1] == 0){
			
			for (var j = 0; j< i; j++){
				sum +=takenPerksOnLvls[j];
			}
			if (sum < i){
				return false;
			}
		}
	}
	
	if (sum_prev >= perkLvlGroup){
		return true;
	}
	else {
		return false;
	}
}

function perkAvailable(name, not_ranks) {				//	return : 0 = perk unavalaible, 1 = perk avaialble, 2 = missed perks on prev levels or all perks taken
    var perk_index=PERKS_RAW.indexOf(name);
	not_ranks = typeof not_ranks !== 'undefined' ? not_ranks : false;
	// not_ranks  argument used only at output taken perks div

	
	// checks skill requirements
	if(!perkAvailableBySkill(name)){
		 return 0;
	}

    // checks special
    for(var index=0;index<PERKS_SPECIAL_REQ[name].length;index++) {
        var element=(PERKS_SPECIAL_REQ[name])[index]
			if (not_ranks == 2){		// this used to highlight unavaial perks taken with +stat perks, before them
				if(element > 0 && (special[index] - gainedSpecial[index]) < element || element < 0 && (special[index] - gainedSpecial[index]) >= -element) {
					return 0;
				}
			} else {					// default
				if(element > 0 && special[index] < element || element < 0 && gainedSpecial >= -element) {
					return 0;
				}
			}
    }
	

	if (!not_ranks)	{	
		// check all perks already taken
	
		var taken_perks_sum = countTakenPerks();
		if (taken_perks_sum == maxPerks){
			return 2;
		}
	
	// Range perks by lvl's
	
		var perkAvailableByLvl = checkPerkbyLvl(name);
		if (!perkAvailableByLvl){
			return 2;	
		}
		
	// checks max perk ranks
		if (perks[perk_index] == PERKS_MAX_RANKS[name]) {
    		return 0;
		}	
	}	

	return 1;

    // when adding: perkAvailable(name) && PERKS_MAX_RANKS[PERKS_RAW.indexOf(name)] < new perk ranks
}

// STATS

function updateStats() {
    gainSpecial();
    applyImplants();
	buffSpecial();
	
    updateTraitPoints();
    updateSingleStat();
	updateHealth();
    updateHealingRate();
    updateSight();
    updateCarryWeight();
    updateMeleeDamage();
    updateArmorClass();
    updatePoisonRes();
    updateRadRes();
    updateCritRes();
    updateSequence();
    updateActionPoints();
    updateCritChance();
	updateCritRoll();
	updateDamageRes();
	updateDamageTr();

    calcMaxBooks();
    calcSkillpoints();
    
    updateGlowQuestAvailable();
	recalcBooks();
	
	
    
    // revokeUnavailablePerks();
	
    outputInterface();
	
	// DMGP();	wip
};

function twoDigits(str,pad,length) {
    return (new Array(length+1).join(pad)+str).slice(-length);
}

function buffSpecial(){ 
	buffedSpecial = special.slice(0);	//clone array
	
	if (drugs[DRUGS_RAW.indexOf("Buffout")] == 1) {
		buffedSpecial[SPECIAL['ST']] += 2;
		buffedSpecial[SPECIAL['EN']] += 1;
	}
	if (drugs[DRUGS_RAW.indexOf("Psycho")] == 1) {
		buffedSpecial[SPECIAL['PE']] -= 7;
		buffedSpecial[SPECIAL['IN']] -= 2;
	}
	
	for (var i = 0; i<buffedSpecial.length; i++){
		if (buffedSpecial[i]>10){buffedSpecial[i] = 10;}
		if (buffedSpecial[i]<1){buffedSpecial[i] = 1;}
	}
	
}

function updateFaCd() {
    var skill = curSkills[SKILLS_RAW.indexOf("FA")];
	var modifier = 1;
	if(perks[PERKS_RAW.indexOf("Medic")]){
		modifier = 0.6;
	}

	var cd = Math.round (9000 / skill * modifier);

	var mins = Math.floor(cd / 60);
	var secs = cd - mins * 60;
	
	var timeout = mins+':'+twoDigits(secs,'0',2);
	
	$("#faCd").text(timeout); 
}

function updateDocCd() {
    var skill = curSkills[SKILLS_RAW.indexOf("Doc")];
	var modifier = 1;
	if(perks[PERKS_RAW.indexOf("Medic")]){
		modifier = 0.59
	}
	
	var cd = Math.round (9000 / skill * modifier);
		
	var mins = Math.floor(cd / 60);
	var secs = cd - mins * 60;
	
	var timeout = mins+':'+twoDigits(secs,'0',2);
		
	$("#docCd").text(timeout); 
}




function applyImplants() {
//console.log(takenImplant, prev_imp)
    if (takenImplant === "Enhancement") {
		if (maxPerks === 8){
			maxPerks += 1;
		}
    } else if (takenImplant === "Medical") {
		if (maxPerks === 8 && perks[PERKS_RAW.indexOf("Living Anatomy")] == 0){
			maxPerks += 1;
			pickPerk(1, "Living Anatomy"); // param = 1 here
			}	
    }
	
	if (takenImplant == false || takenImplant != prev_imp){
		if (prev_imp === "Enhancement" ) {
			if (maxPerks === 9){
				maxPerks -=1;
				var taken_perks_sum = countTakenPerks();
				if ( taken_perks_sum > maxPerks){
					for (var i = perks.length; i >= 0; i -= 1) {
						if (perks[i]) {
							unpickPerk(0, PERKS_RAW[i])
							break;
						}
					}	
				}		
		
			}	
		} else if (prev_imp === "Medical") {
			if (maxPerks === 9){
				maxPerks -=1;
				unpickPerk(0, "Living Anatomy");
			}
		}
	}
	
    // console.log(takenImplant,takenPerks,takenPerks.length, perks)
}

function updateTagPoints() {
    var total = 0;
    $.each(taggedSkills,function() {
        total += this;
    });
    tagpoints = 3 - total;
}

function updateTraitPoints() {
    var total = 0;
    $.each(takenTraits,function() {
        total += this;
    });
    traitPoints = 2 - total;
}

// function revokeUnavailablePerks() {
//      for (var i = 0; i < PERKS_RAW.length; i++) {
        
//         var j = i;
//         var col = 1;
//         if (i >= QUANTITY_PERKS_1COL) {
//             j = i - QUANTITY_PERKS_1COL;
//             col = 2;
//         }

//         if (perkAvailable(PERKS_RAW[i]) == false) {
//             $('#outputPerks'+col).find("div").eq(j).find("span").eq(0).addClass( "N_A" );
//         } else {
//             $('#outputPerks'+col).find("div").eq(j).find("span").eq(0).removeClass( "N_A" );
//         }

//         if (perks[i]) {
//             $('#outputPerks'+col).find("div").eq(j).find("span").eq(1).text(perks[i])
//         } else {
//             $('#outputPerks'+col).find("div").eq(j).find("span").eq(1).text("")
//         }
//     }
// }

function updateGlowQuestAvailable() {
    var className = 'N_A'
    for (var i = 0; i <= 3; i++) {
        var out = $("#GlowQuests").find("div").eq(i);
        if (special[SPECIAL['IN']] < 6) {
            out.addClass(className)
        } else {
            out.removeClass(className);
        }
    }
}

function calcMaxBooks() {
    maxBooks = special[SPECIAL["IN"]] + 2;
    if (maxBooks > 10) {
        maxBooks = 10;
    }
}

function gainSpecial() {
    var gainIndexStartWith = PERKS_RAW.indexOf("Gain Strength")
    for (var i=0; i<7; i++) {
        if (perks[gainIndexStartWith+i] && gainedSpecial[i]<2) {
            special[i] += 2
            gainedSpecial[i] += 2
			
        } else if ((gainedSpecial[i]>=2) && !perks[gainIndexStartWith+i]) {
            special[i] -= 2
            gainedSpecial[i] -= 2
        }
    }

	
    outputSpecial();
} 

function updateSingleStat() { // used for cha quest

        if (quests[1] && !chaQuest) {
            special[3] += 1;
			chaQuest = true;

        } else if (chaQuest && !quests[1]) {
            special[3] -= 1
            chaQuest = false;
        }
	updateSkills();
    outputSpecial();
} 

function applyPerks() {
    var gainIndexStartWith = perks[PERKS_RAW.indexOf("Gain Strength")]
    var gainIndexEndWith = perks[PERKS_RAW.indexOf("Gain Endurance")]
    for (var i=0; i<7; i++) {
        if (special[gainIndexStartWith+i]) {
            special[gainIndexStartWith+i] += 2
        }
    }
}


function rangePerksOrder(){	
	
	var rangedPerksArr = []; // here will be result
	var adjPerksArr = [];	//tmp arr
	var tmpArr = [];		//tmp arr
	
	var Quee = [];			//tmp arr
	
	for (var i =0; i<perksTakingQuee.length; i++){
		Quee[i] = PERKS_RAW[perksTakingQuee[i]];
	}
	
	var Quee_BackUp = Quee;
	//Quee = perksTakingQuee;	// fill it with perksTakingQuee
	
	var check = isQueeGood(Quee);						//check do we need some adj's, or it ok as is
		if (!check){									//if need adjustments
			var n=0;									// search at quee perks avaialable on each lvl, or add lexem "MISSED_PERK"
			for (var i = 0; i< maxPerks; i++){
				var PerkLvlGroup = getPerkLvlGroup(Quee[n]);
					if (PerkLvlGroup > i){
						adjPerksArr[i] = "MISSED_PERK";
						
						for (var j = n; j<Quee.length; j++){
						PerkLvlGroup = getPerkLvlGroup(Quee[j]);
						
						if (PerkLvlGroup <= i){
							adjPerksArr[i] = Quee[j];
							var tmp = Quee[j]; 
							Quee[j] = Quee[n];
							Quee[n] = tmp;
							n++;
							break;
						}
						}
					} else {
					adjPerksArr[i] = Quee[n];
					n++;
					}
			}
		//	console.log("adj" , adjPerksArr);
			tmpArr = adjPerksArr;					//save rusult with adjusted queue
		} else {									// if no need adjustments
		//	console.log("svd", perksTakingQuee);
			tmpArr =  Quee_BackUp;				// save original queue as result
		}

	//	removing undefined elements from tmp array and saving them to result array
	//  undefined el-s appears after loop with maxPerks var. At each moment of time number of taken perks can variate
	
	var n = 0;
	for (var i = 0; i < tmpArr.length; i++) {
		if (tmpArr[i] !=undefined){
			rangedPerksArr[n] = tmpArr[i];
			n++;
		}
	}
	
	// perk given by implant, move him at end of queue
	
	if (takenImplant === "Medical"){
		var len = rangedPerksArr.length;
		for (var i = 0 ; i< len ;i++){
			if (rangedPerksArr[i] === "Living Anatomy"){
				var tmp = rangedPerksArr[i];
				rangedPerksArr[i] = rangedPerksArr[len-1];
				rangedPerksArr[len-1] = tmp;
				break;
			}
		}
	}

	//console.log(rangedPerksArr);

	return rangedPerksArr;

}

function isQueeGood(Quee){
	for (var i = 0; i<Quee.length; i++)	{				// loop quee arr
		var PerkLvlGroup = getPerkLvlGroup(Quee[i]);	// if on any lvl, taken perk	
		if (PerkLvlGroup > i ){							// belongs to higher lvl tier
			return false;								// quee wrong, need adjustments
		}
	}
	return true; 										//ret true if all perks arranged at normal way
}


function outputTakenPerks() {

	var rangedPerksArr = rangePerksOrder();
	missedPerk = [];
	
    var output = "";
	var txt1 = "";
	var txt2 = "";
	var CSSclass1 = "";
	var tip = "";	
	
	var perk_name_txt = "";
	var num = 3;
	var s = 0;
			
	var sum = countTakenPerks();		
    var gainIndexStartWith = PERKS_RAW.indexOf("Gain Strength");

    
	rangedPerksArr.forEach(function(element, ind, array) {
		var index = PERKS_RAW.indexOf(element);
		
		if (element == "MISSED_PERK"){
		
		perk_name_txt = iFaceMsg[3];
		CSSclass1 = "warning";
		txt1 ="";
		tip = iFaceMsg[2];
		
		var len = missedPerk.length;
		missedPerk[len] = s;
			
		}
        else if(perks[index]) {
						
			var j = index;
			var col = 1;
			if (index >= QUANTITY_PERKS_1COL) {
				j = index - QUANTITY_PERKS_1COL;
				col = 2;
			}
				
			var info_outputPerks = 'outputPerks'+col+'';
			tip = info[info_outputPerks][j];
			
			CSSclass1 = "";
			
            // do not check for gain special perks
            if (!(index > gainIndexStartWith && index <= gainIndexStartWith + 7)) {
				if (perkAvailable(PERKS_RAW[index], 1) != 1) {
                    CSSclass1 = "warning";
					tip = iFaceMsg[5];
				}
				if (num < 15 && perkAvailable(PERKS_RAW[index], 2) != 1){			// if showed perk taken before 15 lvl check him with (stats - gained by perks stats)
					CSSclass1 = "warning";	
					tip = iFaceMsg[5];		
				}
            }
            
			perk_name_txt = PERKS_NAMES[index];
						
			var perk_request = isItSkillRelated(element);		// if this perk is related to skill 
			if (perk_request.length >0){						// example perk_request: [FA, Doc]
			var related_skill, taken_at;
			
				if (perk_request.length > 1){	
					related_skill = SKILLS_NAMES[SKILLS_RAW.indexOf(perk_request[1])];
					taken_at = SKILLS_RELATED_THINGS[element][perk_request[1]][1];
					txt2 = (', '+related_skill+': '+taken_at+'')
				}

			related_skill = SKILLS_NAMES[SKILLS_RAW.indexOf(perk_request[0])];
			taken_at = SKILLS_RELATED_THINGS[element][perk_request[0]][1];
			txt1 = ('<span title = "'+iFaceMsg[4]+'" class ="skills_to_perks">('+related_skill+': '+taken_at+''+txt2+')</span>');		
	
			}

        }
		output += ('<div id = "" class = "' + CSSclass1 + '"><span title = "'+tip+'">'+ num +') ' + perk_name_txt + '</span>' + txt1 +'</div>');
		txt1 ="";
		txt2 = "";
		
		if (num != 24){
			num +=3;
		} else {num = 99;}
		s++;
    });

	
	$("#numbers_of_taken_perks").html(' '+sum+'/'+maxPerks+'');
	$("#outputTakenPerks").html(output);
}


function calcSkillpoints() {

    var SP_per_level = 5 + special[SPECIAL['IN']] * 2;
    var extraPoints = (level - 26 > 0) ? (2 + special[SPECIAL['IN']]) * (level - 26) + (level - 26) * perks[PERKS_RAW.indexOf("Educated")]: 0;
    var baseLevel = (level - 26 > 0) ? 26 : level;
    var basePoints = SP_per_level * (baseLevel - 1) + 2 * (baseLevel - 5) * perks[PERKS_RAW.indexOf("Educated")]

    SP = basePoints + extraPoints;
};

function outputSkillpoints() {
	var outputSP = SP - calcUsedSkillpoints();
	$("#outputSkillpoints").text(outputSP);
	if (outputSP < 0 ){
		$("#outputSkillpoints").addClass('warning');
	} else {
		$("#outputSkillpoints").removeClass('warning');
	}
}
function updateDamageTr() {	
    var bonus = [0, 0, 0, 0, 0, 0];	// norm, laser, fire, plasma, explode, electro
    if (takenTraits[TRAITS.indexOf("Mutant")]) { 
		bonus[0] += 2; 
		bonus[2] += 1; 
		bonus[4] += 5; 
		bonus[5] += 2; 
	}
    if (takenImplant === "Defense") { 
		for (var i = 0; i<bonus.length; i++){
			bonus[i] += 2
		}
	}

    var dt = bonus[0];
	dmgTr = bonus; 			 //this var used for showing tip for all types dmg

    $("#damageTr").text(dt); // here displays only normal dmg

};

function updateDamageRes() {	
    var bonus = [0, 0, 0, 0, 0, 0];	// norm, laser, fire, plasma, explode, electro
    var bonus_all = 0;
	if (takenTraits[TRAITS.indexOf("Mutant")]) { 
		bonus[0] += 5; 
		bonus[2] += 20; 
		bonus[4] += 15; 
		bonus[5] += 20; 
	}
	if (takenTraits[TRAITS.indexOf("Kamikaze")]) { bonus_all -= 10; }
    if (takenImplant === "Defense") { bonus_all += 4 }
	bonus_all += 8 * perks[PERKS_RAW.indexOf("Toughness")]
	
	if (drugs[DRUGS_RAW.indexOf("Psycho")] == 1) { bonus[0] += 20; }
	
	for (var i = 0; i<bonus.length; i++){
		bonus[i] += bonus_all;
	}
	
    var dr = bonus[0];
	dmgRes = bonus;		//this var used for showing tip for all types dmg

    $("#damageRes").text(dr + "%");	// here displays only normal dmg
};


function updateCarryWeight() {
  //var st = special[SPECIAL["ST"]];
    var st = buffedSpecial[SPECIAL["ST"]];
    if (takenTraits[TRAITS.indexOf("SmallFrame")]) { i = 1 }
    else { i = 0; }

	var bonus = 0;
	
	if (quests[2] == 1) {
    bonus += 20;
    }
    // console.log(level, CARRYWEIGHT, st, i, bonus)
    try {
        var cw = CARRYWEIGHT[st][i] + level-1 + bonus;    
    } catch(err) {
        console.log("probably no such weight in the table")
        var cw = 0;
    }
    
    $("#carryWeight").text(cw);
};

function updateCritChance() {
    var bonus = 0;
    if (takenTraits[TRAITS.indexOf("Finesse")]) { bonus += 10; }
	if (takenTraits[TRAITS.indexOf("Bruiser")]) { bonus -= 30; } 
    bonus += 8 * perks[PERKS_RAW.indexOf("More Critical")]
    if (glowQuestTaken === 0) { bonus += 3 }
    if (takenImplant === "Marksmanship") { bonus += 4 }

    var CC = special[SPECIAL["LK"]] + bonus;

    $("#critChance").text(CC + "%");
	buildCritChance = CC;
};
function updateCritRoll() {
    var bonus = 0;
    if (takenTraits[TRAITS.indexOf("HeavyHand")]) { bonus -= 30; }
	if (takenImplant === "Marksmanship") { bonus += 4 }
    bonus += 20 * perks[PERKS_RAW.indexOf("Better Criticals")]
    var cr = 0 + bonus;
    //$("#critRoll").text(cr + "%");
	buildCritRoll = cr;
};

function updateMeleeDamage() {
    var bonus = 0;
    if (takenTraits[TRAITS.indexOf("HeavyHand")]) { bonus += 4; }
    if (takenTraits[TRAITS.indexOf("Bruiser")]) { bonus += 8; }
    bonus += 10 * perks[PERKS_RAW.indexOf("Bonus HtH Damage")] 
    
    var MD = buffedSpecial[SPECIAL["ST"]] + bonus;

    $("#meleeDamage").text(MD);
	buildMelee = MD;
};

function updateHealth() {
    var st = special[SPECIAL["ST"]]
    var en = special[SPECIAL["EN"]]
    
    var bonus = 0;
    if (takenTraits[TRAITS.indexOf("Mutant")]) { bonus += 100; }
    bonus += 40 * perks[PERKS_RAW.indexOf("Lifegiver")]
    if (glowQuestTaken == 2) { bonus += 10 }
    if (takenImplant === "Survival") { bonus += 30 }
    
    var baseLevel = level;
    var bonus_for_level = 0;
    
    if (level > 26) { 
        baseLevel = 26; 
        bonus_for_level = Math.floor ((level - 26) / 2); 
    }
    
    hp_per_lvl = 2 + en / 2;

    var health = 55 + st + en * 2 + 
        Math.floor(hp_per_lvl * (baseLevel - 1)) + 
        bonus_for_level + bonus;

    $("#health").text(health);
};

function updateHealingRate() {
    var en =special[SPECIAL["EN"]]
    
    var basesHR;
    if (en < 6) {
         baseHR = 1;
    } else if (en < 9) {
         baseHR = 2;
    } else {
         baseHR = 3;
    }
    
    var bonus = 0;
    if (takenTraits[TRAITS.indexOf("FastMet")]) { bonus += 10; }
    if (glowQuestTaken == 2) { bonus += 4}
    if (takenImplant === "Enviromental") {bonus += 10}
    
    var HR = baseHR + bonus;
    
    $("#healRate").text(HR);
};

function updateActionPoints() {
    var bonus = 0;
  
    bonus += perks[PERKS_RAW.indexOf("Action Boy")]
    if (takenImplant === "Speed") { bonus += 1 }
    if (drugs[DRUGS_RAW.indexOf("Nuca Cola")] == 1) {    bonus += 1;    }
	if (drugs[DRUGS_RAW.indexOf("Jet")] == 1) {    bonus += 3;    }
	
    var AP = 5 + Math.floor(special[SPECIAL["AG"]] / 2) + bonus;

    $("#actionPoints").text(AP);
};

function updateSight() {
    var bonus = 0;
    if (glowQuestTaken == 1) { bonus += 1 }
    if (takenImplant === "Accuracy") { bonus += 5 }
    else if (takenImplant === "Marksmanship") { bonus += 2 }
	
	if (drugs[DRUGS_RAW.indexOf("Cigarettes")] == 1) {    bonus += 3;    }
    
    var sight = 20 + buffedSpecial[SPECIAL["PE"]] * 3 + bonus + 6 * perks[PERKS_RAW.indexOf("Sharpshooter")];
    
    $("#sight").text(sight);
	buildSight = sight;
};

function updateArmorClass() {
    var bonus = 0;
    bonus += 40 * perks[PERKS_RAW.indexOf("Dodger")]
    if (takenImplant === "Scouting") { bonus += 30 }
    
    var AC = special[SPECIAL["AG"]] + bonus;
    
    $("#armorClass").text(AC);
};

function updatePoisonRes() {
    
    var bonus = 0;
    if (takenImplant === "Enviromental") { bonus += 40; }
    var en = takenTraits[TRAITS.indexOf("FastMet")] ? 0 : buffedSpecial[SPECIAL['EN']];
    
    var PR = 5 * en + bonus;

    $("#poisonRes").text(PR + "%");
};

function updateRadRes() {

    var bonus = 0;
    if (takenImplant === "Enviromental") { bonus += 50;}
    var en = takenTraits[TRAITS.indexOf("FastMet")] ? 0 : buffedSpecial[SPECIAL['EN']];
    
    var RR = 2 * en + bonus;

    $("#radRes").text(RR + "%");
};
        
function updateCritRes() {
    var result = 18 * perks[PERKS_RAW.indexOf("Anticritical")] 

    $("#critRes").text(result + "%");
};

function updateSequence() {
    var bonus = 0;
    bonus += 6 * perks[PERKS_RAW.indexOf("Earlier Sequence")]
    if (takenImplant === "Speed") { bonus += 6 }
    
    var seq = 2 * buffedSpecial[SPECIAL["PE"]] + bonus;

    $("#sequence").text(seq);
};

// SKILLS


function updateSkills() {
    basicInt = special[SPECIAL["IN"]] 
    updateTagPoints();
    updateSG();
    updateBG();
    updateEW();
    updateCC();
    updateScavenging();
    updateThrowing();
    updateFA();
    updateDoc();
    updateSneak();
    updateLP();
    updateSteal();
    updateTraps();
    updateScience();
    updateRepair();
    updateSpeech();
    updateBarter();
    updateGambling();
    updateODM();
	

	
    outputInterface();
	//	DMGP();	wip
}





function calcFlatBonus(val, perkName) {
    var flatBonus = 0;
    var index = PERKS_RAW.indexOf(perkName); 
    flatBonus += val * perks[index]
    return flatBonus;
}

function updateSG() {
    var bonus = takenTraits[TRAITS.indexOf("GoodNatured")] ? -10 : 0;
    
    var res = 5 + 4 * special[SPECIAL["AG"]];

    var flatBonus = 0 ;
	if (glowQuestTaken == 1) {
        flatBonus += 5;
    }
	flatBonuses[0] = flatBonus; 

    calcSkill(0, res + bonus); 
};
    
function updateBG() {
    var bonus = takenTraits[TRAITS.indexOf("GoodNatured")] ? -10 : 0;
    
    var res = 2 * special[SPECIAL["AG"]];

    var flatBonus = 0 ;
	if (glowQuestTaken == 1) {
        flatBonus += 5;
    }
	flatBonuses[1] = flatBonus; 

    calcSkill(1, res + bonus); 
};

function updateEW() {
    var bonus = takenTraits[TRAITS.indexOf("GoodNatured")] ? -10 : 0;
    
    var res = 2 * special[SPECIAL["AG"]];

    var flatBonus = 0 ;
	if (glowQuestTaken == 1) {
        flatBonus += 5;
		
    }
	flatBonuses[2] = flatBonus; 
	
    calcSkill(2, res + bonus); 
};

function updateCC() {
    var bonus = takenTraits[TRAITS.indexOf("GoodNatured")] ? -10 : 0;
    
    var res = 30 + 2 * (special[SPECIAL["AG"]] + special[SPECIAL["ST"]]);
    
    calcSkill(3, res + bonus); 
};

function updateScavenging() {
    calcSkill(4, 0); 
};

function updateThrowing() {
    var bonus = takenTraits[TRAITS.indexOf("GoodNatured")] ? -10 : 0;
    
    var res = 4 * special[SPECIAL["AG"]];
    
    calcSkill(5, res + bonus); 
};

function updateFA() {
    var bonus = takenTraits[TRAITS.indexOf("GoodNatured")] ? 15 : 0;
    
    var res = 2 * (special[SPECIAL["PE"]] + basicInt);

    calcSkill(6, res + bonus); 
	
};

function updateDoc() {
    var bonus = takenTraits[TRAITS.indexOf("GoodNatured")] ? 15 : 0;
    
    var res = 5 + (special[SPECIAL["PE"]] + basicInt);

    calcSkill(7, res + bonus); 
};

function updateSneak() {
    var flatbonus = 0;

    var res = 5 + 3 * special[SPECIAL["AG"]];
    
    calcSkill(8, res); 
};

function updateLP() {
    var res = 10 + (special[SPECIAL["PE"]] + special[SPECIAL["AG"]]);

    calcSkill(9, res); 
};

function updateSteal() {
    var res = 3 * special[SPECIAL["AG"]];

    calcSkill(10, res); 
};

function updateTraps() {
    var res = 10 + (special[SPECIAL["PE"]] + special[SPECIAL["AG"]]);
    
    calcSkill(11, res); 
};

function updateScience() {
    var res = 4 * basicInt;

    calcSkill(12, res); 
};

function updateRepair() {
    var res = 3 * basicInt;

    var bonus = 0;
    if (quests[0] == 1) {
        bonus += 20;
    }

    calcSkill(13, res + bonus); 
};

function updateSpeech() {
    var bonus = takenTraits[TRAITS.indexOf("GoodNatured")] ? 15 : 0;
    
    var res = 5 * special[SPECIAL["CH"]];
    
    calcSkill(14, res + bonus);
};

function updateBarter() {
    var bonus = takenTraits[TRAITS.indexOf("GoodNatured")] ? 15 : 0;

    var res = 4 * special[SPECIAL["CH"]];
    
    calcSkill(15, res + bonus); 
};

function updateGambling() {
    var res = 5 * special[SPECIAL["LK"]];
    
    calcSkill(16, res); 
};

function updateODM() {
    var bonus = takenTraits[TRAITS.indexOf("Mutant")] ? 100 : 0;

    var res = 2 * (special[SPECIAL["EN"]] + basicInt);

	var flatBonus = 0 ;
	if (quests[3] == 1) {
        flatBonus += 30;
    }
	flatBonuses[17] = flatBonus; //pathfinder
    
    calcSkill(17, res + bonus); 
};
    
function applyTrait(num, status) {

    switch (num) {
        case TRAITS.indexOf('Bruiser'):

            changeSpecialByTrait("ST", (status ? 2 : -2));
            break;
            
        case TRAITS.indexOf('SmallFrame'):
            
            changeSpecialByTrait("AG", (status ? 1 : -1));
            break;

        case TRAITS.indexOf('Bonehead'): 
		
		changeSpecialByTrait("IN", (status ? -1 : 1));
	
            break;
            
        case TRAITS.indexOf('Evader'):
            
            changeSpecialByTrait("EN", (status ? -2 : 2));
            break;
    };
    takenTraits[num] = status ? 1 : 0;
    updateStats();
    updateSkills();
};

function changeSpecialByTrait(name, modifier) {
    special[SPECIAL[name]] += modifier;
    outputSpecial();
};

function applyQuest(num, status) {
	// 
}

function generatePerkText() {
    var perks_text = [];

    for (var i = 0, p = 0; i < PERKS_ON_LEVELS.length; i++) {
        if(perks_text[i] == undefined) { perks_text[i]=""; }
        perks_text[i] += '</br>'
        for (var j = 0; j < PERKS_ON_LEVELS[i]; j++, p++) {
            perks_text[i] += '<div name = "'+PERKS_RAW[p]+'"><span></span><span>'+PERKS_NAMES[p]+'</span><span class="Taken_Perk"></span></div>'
        }
        perks_text[i] += '</br>'
    }

    $('#outputPerks1').html("")
    $('#outputPerks2').html("")

    for (var i = 0; i < 3; i++) {
        $('#outputPerks1').append(perks_text[i]);
    }
    for (var i = 3; i < PERKS_ON_LEVELS.length; i++) {
        $('#outputPerks2').append(perks_text[i]);
    }
}

function regenPerkText() {

    for (var i = 0; i < QUANTITY_PERKS_1COL; i++) {
        $('#outputPerks1').find("div").eq(i).find("span").eq(1).text(PERKS_NAMES[i]);
    }
	
	for (var j = 0, i = QUANTITY_PERKS_1COL; i < PERKS_RAW.length; i++, j++) {
        $('#outputPerks2').find("div").eq(j).find("span").eq(1).text(PERKS_NAMES[i]);
    }

}

function highlightPerks() {

    for (var i = 0; i < PERKS_RAW.length; i++) {
        
		var available = perkAvailable(PERKS_RAW[i]);
		var perkAvailableByLvl = checkPerkbyLvl(PERKS_RAW[i]);
		var perks_sum = countTakenPerks();

		var j = i;
        var col = 1;

        if (i >= QUANTITY_PERKS_1COL) {
            j = i - QUANTITY_PERKS_1COL;
            col = 2;
        }
				
		var info_outputPerks = 'outputPerks'+col+'';
		var default_tip = info[info_outputPerks][j];
		var warning_tip = "";
		
		var perk_text_span = $('#'+info_outputPerks).find("div").eq(j).find("span").eq(1);
		var perk_div = $('#'+info_outputPerks).find("div").eq(j);
		
		perk_text_span.removeClass();
		
		if (available == 0 ) {											//not av by requirements
			var cssclass = "N_A";
			if (!perkAvailableByLvl){
				cssclass = "N_A_in_future";
			}

			perk_text_span.addClass( cssclass );
			warning_tip = ''+iFaceMsg[1]+' '+perkReqInfo[info_outputPerks][j]+'';
			perk_div.attr('title', warning_tip);
			
	
		} else if (available == 2)  {									// perk in another lvl group 
				
			perk_text_span.addClass( "No_more_free_perks" );

			warning_tip = iFaceMsg[2];
			perk_div.attr('title', warning_tip);
			
		} else if (available == 1)  {									// perk free to take
			
			perk_div.attr('title', default_tip);

		} else {	

        } 

		if(perks_sum == maxPerks){							// all possible perks taken
			perk_text_span.removeClass();
			perk_text_span.addClass( "No_more_free_perks" );
			perk_div.attr('title', default_tip);
		}
		if (perks[i] > 0){											// highlight taken perks at the end 
			perk_text_span.removeClass();
			perk_text_span.addClass( "Taken_Perk" );
		//	perk_div.attr('title', default_tip);
		}

		// show taken perks ranks 
        if (perks[i]) {
            $('#outputPerks'+col).find("div").eq(j).find("span").eq(2).text(perks[i])
        } else {
            $('#outputPerks'+col).find("div").eq(j).find("span").eq(2).text("")
        }
    }
}

function countTakenPerks (){
	var summ = 0;
	for (var i = 0; i <perks.length; i++){
		summ += perks[i];
	}
	return summ;
}

function highlightDruggedStats(){
	
	$(".druggedStat").removeClass();
	
	for (var i = 0; i<drugs.length; i++){
		if (drugs[i] == 1) {
			var affect =  grugAffects[DRUGS_RAW[i]];
			for (var n = 0; n<affect.length; n++){
				var span = affect[n];
				$('#'+affect[n]+'').addClass("druggedStat");
			}
		}		
	}

}
function generateSpecialText(){
	
	for (var i = 0; i < special.length; i++) {
        var div = $("#outputSpecialText").find("div").find("span").eq(i);
        var n = buffedSpecial[i];
		var txt = spSmallDescr[n];
        div.text(txt);
    }
}

function generateImplantText() {
    
    var implantText = [];

    var implantToggles = [];
    var cclass = "toggle smallToggle";
    IMPLANTS_RAW.forEach(function(value, index, array) {
        if(implantText[index] == undefined) { implantText[index]=""; }
        implantText[index] += "<div><span>"+value+"</span><span></span></div>"

        if(implantToggles[index] == undefined) { implantToggles[index]=""; }
        implantToggles[index] += '<div id="toggleImplant_'+(index+1)+'" class="'+cclass+'"></div>'
    })

    for (var i = 0; i < IMPLANTS_RAW.length; i++) {
        $('#implants').append(implantText[i]);
        $('#toggleImplants').append(implantToggles[i]);
    }
}



function generateQuestText() {
    
    var questText = [];

    var questToggles = [];
    var cclass = "toggle ";
    QUESTS_RAW.forEach(function(value, index, array) {
        if(questText[index] == undefined) { questText[index]=""; }
		var val = "quest_"
		val +=value
        questText[index] += "<div id = "+val+"><span>"+value+"</span><span></span></div>"

        if(questToggles[index] == undefined) { questToggles[index]=""; }
        questToggles[index] += '<div id="toggleQuest_'+(index+1)+'" class="'+cclass+'"></div>'
    })

    for (var i = 0; i < QUESTS_RAW.length; i++) {
        $('#quests').append(questText[i]);
        $('#toggleQuests').append(questToggles[i]);
    }
}

function generateJsonData() {
		
	var json = $.getJSON('fo2cp/ajax/languages.txt',  function(data) {	// get ajax json data
		info 		= data[current_lang]["tooltips"];
		perkReqInfo = data[current_lang]["warning_tips"];
		iFaceMsg = data[current_lang]["variables"]["iFaceMsg"];
		spSmallDescr = data[current_lang]["variables"]["spSmallDescr"];
		dmgTypes = data[current_lang]["variables"]["dmgTypes"];
	});

	json.complete(function() {
		for(var id in info) {
        info[id].forEach(function(element, index, array) {
            $('#' + id).find("div").eq(index).attr('title', info[id][index]) ;
        })
    }
		outputInterface(); // refresh 
	});

}

function outputBooks() {
		$("#books_eaten").text(takenBooks["FA"]);

//	for (var index in takenBooks) { 
//		$('#'+index+'Book').find('span').eq(1).text(takenBooks[index])
//    }

}

function init() {
    updateSkills();
    updateStats();
    outputInterface();
	
	

	
	
	
}

function outputInterface() {
    outputBooks();
    outputSpecial();
	generateSpecialText();

    outputSkillpoints();
    outputInputs();
    highlightTakenTraits();
    highlightPerks();
	highlightDrugs();
	highlightDruggedStats();
    outputTakenPerks();
    $("#outputTraitpoints").text(traitPoints);
    $("#outputTagpoints").text(tagpoints);
    highlightToggledArray(taggedSkills, "#outputSkills");
    highlightToggledImp(takenImplant, "#implants");
    highlightExcessSkills();
	highlightQuestsNew();
	dmgTrResTooltip();
	
	
	//WIP
	//outputEnemySpecial();
	//generateEnemySpecialText();
	//DMGP();
}

function outputInputs() {
    $("#name_input").val(build_name);
    $("#plannedLevel").val(level);
}

function highlightTakenTraits() {
    var className = "selectPerm";
    takenTraits.forEach(function(val, index) {
        if (index < 8) {
                var cal = 1;
            } else {
                var cal = 2;
            }
            var i = index - 8 * (cal - 1);

        var trait = $("#outputTraits" + cal).find("div").eq(i);
        if ( val ) {
            trait.addClass(className);
        } else {
            trait.removeClass(className)
        }
    })
}

function highlightDrugs() {
    var className = "selectPerm";

	for (var i = 0; i < drugs.length; i++){
		if (drugs[i] > 0) {
			$("#outputDrugs").find("div").eq(i).find("span").addClass(className);
		}
		else {
			$("#outputDrugs").find("div").eq(i).find("span").removeClass(className);
		}
	}
	
	
    takenTraits.forEach(function(val, index) {
        if (index < 8) {
                var cal = 1;
            } else {
                var cal = 2;
            }
            var i = index - 8 * (cal - 1);

        var trait = $("#outputTraits" + cal).find("div").eq(i);
        if ( val ) {
            trait.addClass(className);
        } else {
            trait.removeClass(className)
        }
    })
}

function highlightToggledArray(array, id) {
    var className = "selectPerm";
    array.forEach(function(val, index) {
        
        var div = $(id).find("div").eq(index);
        if ( val ) {
            div.addClass(className);
        } else {
            div.removeClass(className)
        }
    })
}

function highlightToggledImp(name, id) {
    
	index = IMPLANTS_RAW.indexOf(name);
	
	var className = "selectPerm";
    var div = $(id).find("div");

    for (var i=0; i<div.length; i++) {

        var elem = div.eq(i)
		
		elem.removeClass();
		
        if ( i === index ) {
			elem.addClass(className);
        } else {
			if (name != false){
            elem.addClass("No_more_free_perks");
			}
			
        }
    }
}

function  highlightQuestsNew() {
	for (var i = 0; i<QUESTS_RAW.length; i++){
		if (quests[i] == 1){
			$('#quests').find("div").eq(i).addClass("selectPerm");
		} else {
			$('#quests').find("div").eq(i).removeClass();
		}
	}
	if (glowQuestTaken > -1){
		for (i = 0; i<3; i++){
		$('#GlowQuests').find("div").eq(i).removeClass("selectPerm");
		$('#GlowQuests').find("div").eq(i).addClass("No_more_free_perks");
		}
		$('#GlowQuests').find("div").eq(glowQuestTaken).removeClass("No_more_free_perks");
		$('#GlowQuests').find("div").eq(glowQuestTaken).addClass("selectPerm");
	}	else	{
		for (i = 0; i<3; i++){
		$('#GlowQuests').find("div").eq(i).removeClass("No_more_free_perks");
		$('#GlowQuests').find("div").eq(i).removeClass("selectPerm");
		}
	}
	
}


function highlightExcessSkills() {
    var maxClass = "maxSkill"
    var excessClass = "excessSkill"
    var id = "#outputSkills"

    curSkills.forEach(function(val, index) {
        
        var div = $(id).find("div").eq(index);
        var span = div.find('span').eq(1);
        var cap = SKILL_CAPS[index]
        if ( val > cap ) {
            span.addClass(excessClass);
        } else if ( val == cap ) {
            span.removeClass(excessClass)
            span.addClass(maxClass);
        } else {
            span.removeClass(maxClass)
            span.removeClass(excessClass)
        }
    })
}
function dmgTrResTooltip(){
	
	var dmgTr_tip = "";
	for (i = 0; i< dmgTypes.length; i++){
		dmgTr_tip += ''+dmgTypes[i]+': '+dmgTr[i]+'; ';
	}
	var dmgRes_tip = "";
	for (i = 0; i< dmgTypes.length; i++){
		dmgRes_tip += ''+dmgTypes[i]+': '+dmgRes[i]+'; ';
	}

    $("#damageTr").attr('title', dmgTr_tip );
	$("#damageRes").attr('title', dmgRes_tip );
	
	
}

function restoreBuild() {

    if (!window.location.hash) { return }

    var encodedObject = deparam(window.location.hash.substring(1))

    // console.log(a, typeof(a), build, typeof(build))
    decodedObject = {}

    $.each(encodedObject, function(index, value) {
        if (value === 'false') {
            decodedObject[index] = false
        } else if (value === 'true') {
            decodedObject[index] = true
        } else if (typeof(value) === "string") {
            if (isNaN(value))
                {decodedObject[index] = value;}
            else {decodedObject[index] = +value;}
        } else if ($.isArray(value)) {
            decodedObject[index] = []
            value.forEach(function(v, i) {
             //  console.log("index:", index, "value:", value, "i:", i,"v:", v)
				decodedObject[index][i] = +v;
            })
        } else if (typeof value === 'object') {
            decodedObject[index] = {}
            $.each(value, function(i, v) {
				//console.log("index:", index, "value:", value, "i:", i,"v:", v);
				if(typeof v === 'object'){
					decodedObject[index] = value;
				}
				else {
					decodedObject[index][i] = +v;
				}
            })
        }
    })

    build_name = decodedObject.n === 'undefined' ? 'Unnamed' : decodedObject.n;
	var lang = decodedObject.l;
    level = decodedObject.lvl;
    spoints = decodedObject.sp;
    takenTraits = decodedObject.tt;
    takenPerksOnLvls = decodedObject.tp;
    takenBooks = decodedObject.tb;
    taggedSkills = decodedObject.ts;
    investedSkills = decodedObject.is;
    glowQuestTaken = decodedObject.gq;
    takenImplant = decodedObject.it;
    special = decodedObject.s;
    perks = decodedObject.p;
    gainedSpecial = decodedObject.gs;
	chaQuest = decodedObject.cq;
	SKILLS_RELATED_THINGS = decodedObject.rs;
	quests = decodedObject.q;
	perksTakingQuee = decodedObject.pq;
	
	if (decodedObject.d){drugs = decodedObject.d;}
	
	
	cureUndefined();
	
	translateIface(lang);
	window.location.hash = ""; 			// clear  url
    init();
}

function cureUndefined (){
	// when no perks taken, quee empty, and build linked
	if (perksTakingQuee == undefined){
		perksTakingQuee = [];
	}
}

function resetBuild() {
	
    build_name = 'Unnamed';
    level = 99;
    spoints = 0;
    special = [1,9,9,1,2,8,10];
    gainedSpecial = [0,0,0,0,0,0,0];

//    takenPerks = [0, 0, 0, 0, 0, 0, 0, 0];
	maxPerks = 8;
	perksTakingQuee = [];
    takenBooks = {  'SG': 0,
                    'FA': 0,
                    'Repair': 0,
                    'Science': 0,
                    'ODM': 0 }
    taggedSkills = Array.apply(null, new Array(SKILLS_RAW.length)).map(Number.prototype.valueOf,0);
    investedSkills = Array.apply(null, new Array(SKILLS_RAW.length)).map(Number.prototype.valueOf,0);
    perks = Array.apply(null, new Array(PERKS_RAW.length)).map(Number.prototype.valueOf,0);
    takenTraits = Array.apply(null, new Array(TRAITS.length)).map(Number.prototype.valueOf,0);
   
    takenPerksOnLvls = Array.apply(null, new Array(PERKS_ON_LEVELS.length)).map(Number.prototype.valueOf,0);
	flatBonuses = Array.apply(null, new Array(SKILLS_RAW.length)).map(Number.prototype.valueOf,0);
	quests = Array.apply(null, new Array(QUESTS_RAW.length)).map(Number.prototype.valueOf,0);	
    glowQuestTaken = -1;
    takenImplant = false;
	chaQuest = false;
    prev_imp = false;
    init();
}

function serialize() {

    var build = {
        n: build_name,
        lvl: level,
        s: special,
        sp: spoints,
        tt: takenTraits,
        tp: takenPerksOnLvls,
        tb: takenBooks,
        ts: taggedSkills,
        p: perks,
        is: investedSkills,
        gq: glowQuestTaken,
        it: takenImplant,
        gs: gainedSpecial,
		cq: chaQuest,
		rs: SKILLS_RELATED_THINGS,
		q: quests,
		pq: perksTakingQuee,
		d: drugs,
		l: current_lang

    }
    var url = $.param(build)
    return url;
}

function increaseSpecial(num) {

    if (special[num] < 10 && spoints > 0) {

		if (num === 2 && takenTraits[TRAITS.indexOf("Evader")] && special[num] === 8) {
        return; // not possible to have EN more than 8 with Evader
        }
		if (num === 4 && takenTraits[TRAITS.indexOf("Bonehead")] && special[num] === 9) {
        return; // not possible to have IN more than 9 with Bonehead
        }
		
		special[num] += 1;
        spoints -=1;
		
		if (num === 4) {
            recalcBooks();
        }

        updateStats();
        updateSkills();
    }
}

function decreaseSpecial(num) {

    if (num === 4 && special[num] === 6) {
        glowQuestTaken = -1; // not possible to have glow quest taken with IN less than 6
        updateStats();
    }

    if (special[num] > 1) {

        if (num === 5 && takenTraits[TRAITS.indexOf("SmallFrame")] && special[num] === 2) {
        return; // not possible to have AG less than 2 with Small Frame
        }
		if (num === 0 && takenTraits[TRAITS.indexOf("Bruiser")] && special[num] === 3) {
        return; // not possible to have ST less than 3 with Bruiser
        }
		if (num === 3 && (quests[1] == 1) && special[num] === 2) {
        return; // not possible to have CH less than 2 with Mary Ann Quest
        }

        special[num] -= 1;
        spoints += 1;

        if (num === 4) {
            recalcBooks();
        }
		
        updateStats();
        updateSkills();
    }
}

function toggleBooks() {
    // var indexes = [
    //             SKILLS_RAW.indexOf("SG"),
    //             SKILLS_RAW.indexOf("FA"),
    //             SKILLS_RAW.indexOf("Repair"),
    //             SKILLS_RAW.indexOf("Science"),
    //             SKILLS_RAW.indexOf("ODM") 
    //             ]
    var names = ["SG", "FA", "Repair", "Science", "ODM"]
    for (var i = 0; i < names.length; i++) {
        if (takenBooks[names[i]] === 0) {
            takenBooks[names[i]] = maxBooks;
        } else {
            takenBooks[names[i]] = 0;
        }
    }
	//console.log (maxBooks);
}

function recalcBooks() {
   // console.log(takenBooks, maxBooks)
    calcMaxBooks();
    var names = ["SG", "FA", "Repair", "Science", "ODM"]
    for (var i = 0; i < names.length; i++) {
        if (takenBooks[names[i]] != 0) {
            takenBooks[names[i]] = maxBooks;
        }
    }
    // console.log(takenBooks, maxBooks)
}


function translateIface(new_lang){
	
	if (current_lang == new_lang){
		return;
	}
	
	current_lang = new_lang;

		// ajax json data
	
	var json = $.getJSON('fo2cp/ajax/languages.txt?v=1523042586',  function(data) {
		
		// translate existed txt
		var div_text = data[new_lang]["div_texts"];
		for(var id in div_text) {
			div_text[id].forEach(function(element, index, array) {
			$('#' + id).find("div").eq(index).find("span").eq(0).text(div_text[id][index]);
        });
		}
		// translate tooltips
		var tooltips = data[new_lang]["tooltips"];
		for(var id in tooltips) {
			tooltips[id].forEach(function(element, index, array) {
			$('#' + id).find("div").eq(index).attr('title', tooltips[id][index]);
		
        });
		}

		// Apply translate for variables
		
		info = data[new_lang]["tooltips"];
		perkReqInfo = data[new_lang]["warning_tips"];
		iFaceMsg = data[new_lang]["variables"]["iFaceMsg"];
		spSmallDescr = data[new_lang]["variables"]["spSmallDescr"];
		dmgTypes = data[new_lang]["variables"]["dmgTypes"];
		SKILLS_NAMES = data[new_lang]["variables"]["skills_names"];
		PERKS_NAMES = data[new_lang]["variables"]["perk_names"];
		
		
	});
	
	json.complete(function() {
		regenPerkText();	// regen perk names
		outputInterface();	// regen all
	});

}



$(document).ready(function() {
	generateSpecialText();
	generatePerkText();
    generateImplantText();
	generateQuestText();
    generateJsonData();
	
	
    init();

    try {
        restoreBuild();
    } catch (e) {
        alert("Link is broken!");
        window.location.hash = ""
        resetBuild();
    }

    $("#plannedLevel").on('input',function() {
        level = +$(this).val()
        updateStats();
    })

    $("#name_input").on('input',function() {
        build_name = $(this).val()
    })

    $("#outputSkills").find("div").mouseover( function() {
        skillOver = $(this).index()

        $("#plusminusSlider").css("top", 46+$(this).position()['top']);
    })

    $("#outputPerks1").find("div").mouseover( function() {
		namePerkCol1 = $(this).attr("name");
        $("#plusminusSliderA").css("top", 46+$(this).position()['top']);
    })

    $("#outputPerks2").find("div").mouseover( function() {
		namePerkCol2 = $(this).attr("name");
        $("#plusminusSliderB").css("top", 46+$(this).position()['top']);
    })

    $("#plusSliderA").mousedown( function() {
        pickPerk(0, namePerkCol1);
    })

    $("#plusSliderB").mousedown( function() {
        pickPerk(0, namePerkCol2);
    })

    $("#minusSliderA").mousedown( function() {
        unpickPerk(0, namePerkCol1);
    })

    $("#minusSliderB").mousedown( function() {
        unpickPerk(0, namePerkCol2);
    })

    var intervalSP;
    $("#plusSlider").mousedown( function() {
        clearInterval(intervalSP);
        intervalSP = setInterval(increaseSkill, 50);
		
    })

    $(document).mouseup( function() {
        clearInterval(intervalSP);
    })

    $("#minusSlider").mousedown( function() {
        clearInterval(intervalSP);
        intervalSP = setInterval(decreseSkill, 50);    
    })


    $(".plus").mousedown(function() {
        var s_num = getSpecialNum($(this));
		if (s_num[0] == 'enemySpecialplusminus'){
			// increaseEnemySpecial(s_num[1]);
		}
		else {
        increaseSpecial(s_num[1]);
		}
	});

    $(".minus").mousedown(function() {
        var s_num = getSpecialNum($(this));
		if (s_num[0] == 'enemySpecialplusminus'){
			// decreaseEnemySpecial(s_num[1]);
		}
		else {
			decreaseSpecial(s_num[1]);
		}
    });
    
	$("#pluslvl").mousedown(function() {
        clearInterval(intervalSP);
        intervalSP = setInterval(increaseLvl, 50);  
   });

    $("#minuslvl").mousedown(function() {
		clearInterval(intervalSP);
        intervalSP = setInterval(decreseLvl, 50);  
    });
	
    $(".toggle").mousedown(function() {
        var id = $(this).attr('id');
       
        var num = id.substr(id.length - 2);
        if (isNaN(num)) {
            num = id.substr(id.length - 1);
        } 

        var action = id.slice(0, id.length - (num+"").length - 1);
        num -= 1; // for using as an index
        
        var className = "selectPerm";
        // console.log("Toggle action is", action, "with num", num+1);
        if (action == "toggleSkill") {

            if (taggedSkills[num]) {
                taggedSkills[num] = 0
            } else if (tagpoints) {
                taggedSkills[num] = 1;
            }
            //console.log(taggedSkills)
			updateSkills();
			

        } else if (action == "toggleTrait") {
            if (num < 8) {
                var cal = 1;
            } else {
                var cal = 2;
            }
            var i = num - 8 * (cal - 1);

            if (takenTraits[num]) {
                applyTrait(num, 0);
            } else if (traitPoints > 0) {
                applyTrait(num, 1);
            }
            updateStats()

        } else if (action == "toggleQuest") {
			
            var out = $("#quests").find("div").eq(num);
			
            if (out.hasClass(className)) {
                out.removeClass(className);
				quests[num] = 0;
                
                
            } else {
                out.addClass("selectPerm");
                quests[num] = 1;

            }
            updateSkills();
			updateStats();
			
		} else if (action == "toggleDrug") {
			
            var out = $("#outputDrugs").find("div").eq(num).find("span").eq(0);
			
            if (out.hasClass(className)) {
                out.removeClass(className);
				drugs[num] = 0;
                
                
            } else {
                out.addClass("selectPerm");
                drugs[num] = 1;

            }
           	updateStats();

        } else if (action == "toggleGlowChoice") { 

            if (special[SPECIAL["IN"]] < 6) {
                return
            }
            if (glowQuestTaken === num) { 
                glowQuestTaken = -1;
            } else {
                glowQuestTaken = num;
            }
            updateStats()

        } else if (action == "toggleImplant") {

            var out = $("#implants").find("div").eq(num); // 1 == quantity of other quests

            if (takenImplant === IMPLANTS_RAW[num]) { 
                prev_imp = takenImplant;
				takenImplant = false;
            } else {
				prev_imp = takenImplant;
				takenImplant = IMPLANTS_RAW[num];
              	
				
				// check for related skills
				
				var request = isItSkillRelated(takenImplant);
				if (request.length >0){
					saveCurrentSkills(takenImplant, request);
				}
            }
		
            updateStats();
            updateSkills();
        } 
    });
	
    $('#drugsTitle').mousedown(function() {
		var n = 0;
		for (var i = 0; i< drugs.length; i++){
			n += drugs[i];
		}
		if (n > 0) {		// undrug all
			for (var i = 0; i< drugs.length; i++){
				drugs[i] = 0;
				$("#outputDrugs").find("div").eq(i).find("span").eq(0).removeClass("selectPerm");
			}
		}
		else {				//drug all
			for (var i = 0; i< drugs.length; i++){
				drugs[i] = 1;
				$("#outputDrugs").find("div").eq(i).find("span").eq(0).addClass("selectPerm");
			}
		}
		updateStats();
    });
   
   
   /*
    $('#buttonDone').mousedown(function() {
        var error = false;

        if (error) { 
            alert(error);
        }
    });
	*/

    $('#buttonBooks').mousedown(function() {
        toggleBooks();
        updateSkills();
    });

     $('#buttonSave').mousedown(function() {
        var url = serialize()
        window.location.hash = url;
     })

    $('#buttonRestore').mousedown(function() {
    
    try {
        restoreBuild();
    } catch (e) {
		console.log(e);
        alert("Link is broken!");
        window.location.hash = ""
        resetBuild();
    }
	
    })

    $('#buttonReset').mousedown(function() {
       resetBuild()
    })
    
    $('#buttonDirectLink').mousedown(function() {
       var url = serialize();
	   var llink = document.URL + "#" + url;
	   makeShort(llink);
    })

    $('#buttonDeleteLink').mousedown(function() {
        window.location.hash = "";
    })
	
	$('#buttonPic').mousedown(function() {
		ShareImg();
    });
	
	$('#buttonEng').mousedown(function() {
		translateIface("Eng");
    });
		$('#buttonRus').mousedown(function() {
		translateIface("Rus");
    });
	
		$('#buttonPl').mousedown(function() {
		//translateIface("Pol");
    });
	

	
});

	// imgur.com API
function ShareImg() {

  var clientId = 'b19b9b2040fb6f9';
  var authorize = 'Client-ID ' + clientId;
  var img;
  
  html2canvas($('#containerCreation'), {
    onrendered: function(canvas) {
      try {
        img = canvas.toDataURL('image/png', 1.0).split(',')[1];
		} catch (e) {
			img = canvas.toDataURL().split(',')[1];
		}
	
    $.ajax({
      url: 'https://api.imgur.com/3/image',
      type: 'POST',
      headers: {
        Authorization: authorize,
        Accept: 'application/json'
      },
      data: {
        image: img,
        type: 'base64'
      },

      success: function(result) {
        var id = result.data.id;
        var pic_url = 'http://i.imgur.com/' + id + ".png";
        window.prompt(iFaceMsg[0], pic_url);
      },
      error: function(result) {
        alert(iFaceMsg[6]);
      }
	});
    }
  });
}

 	// goo.gl API
 function makeShort(longURL) 
 {
	var clientKey = 'AIzaSyAMTVPm2GtPUIuO2_0qngwL9dfiGj5iumU';
	$.ajax({
        url: 'https://www.googleapis.com/urlshortener/v1/url?key='+clientKey+'',
		type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: '{ longUrl: "' + longURL +'"}',
        dataType: 'json',
        success: function(response) {
		if(response.id != null)
        {
			window.prompt (iFaceMsg[0], response.id);
        }
        },
		error: function(response) {
            alert(iFaceMsg[6]);
        }
     });
 }
 
	// ajax animation

$(document).ajaxStart(function() {
  $(".loadingImg").show();
  $(".overlay").show();
});

$(document).ajaxStop(function() {
  $(".overlay").hide();
  $(".loadingImg").hide();
});


 
 //-------------------------------------------------------------
 
 //				damage planner
 //					WIP
 

 /*
 function outputEnemySpecial() {

    for (var i = 0; i < enemySpecial.length; i++) {
        var div = $("#outputEnemySpecialNum").find("div").eq(i);
        div.text(pad(enemySpecial[i], 2));
    }
}
 
 
 


function generateEnemySpecialText(){
	for (var i = 0; i < enemySpecial.length; i++) {
        var div = $("#outputEnemySpecialText").find("div").find("span").eq(i);
        var n = enemySpecial[i];
		var txt = spSmallDescr[n];
		div.text(txt);
    }
}

function increaseEnemySpecial(num) {

    if (enemySpecial[num] < 10 && espoints > 0) {

		enemySpecial[num] += 1;
        espoints -=1;

        updateEnemyStats();
		outputEnemySpecial();
    }
}

function decreaseEnemySpecial(num) {

    if (enemySpecial[num] > 1) {

        enemySpecial[num] -= 1;
        espoints += 1;
        updateEnemyStats();
		outputEnemySpecial();
    }
}

function updateEnemyStats() {
	//	DMGP();
};



function updateArmorClass() {
    var bonus = 0;
    bonus += 40 * perks[PERKS_RAW.indexOf("Dodger")]
    if (takenImplant === "Scouting") { bonus += 30 }
    
    var AC = special[SPECIAL["AG"]] + bonus;
    
    $("#armorClass").text(AC);
};


*/

