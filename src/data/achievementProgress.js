/* eslint-disable no-prototype-builtins */
/* eslint-disable no-case-declarations */
import { crops } from './cropsReference';
import { monsters } from './monsterSlayerReference';
import { fullShipmentCodes } from './fullShipmentReference';
import { formatNumber } from '../utils/formatMoney';

let progress = {};

export const handleAchievementProgress = (name, saveGame, setUnlocked) => {
  const friends = saveGame.player[0].friendshipData[0].item;
  let counter = 0;
  const itemsShipped = saveGame.player[0].basicShipped[0].item;
  const mailReceived = saveGame.player[0].mailReceived[0].string;
  const skills = saveGame.player[0].experiencePoints[0].int;

  switch(name) {
  case 'Greenhorn':
  case 'Cowpoke':
  case 'Homesteader':
  case 'Millionaire':
  case 'Legend':
    progress.valueOne = Number(saveGame.player[0].totalMoneyEarned[0]);
    break;

  case 'Treasure Trove':
  case 'A Complete Collection':
    const museumPieces = saveGame.locations[0].GameLocation[31].museumPieces;
    progress.valueOne = museumPieces ? museumPieces.length : 0;
    break;

  case 'A New Friend':
  case 'Best Friends':
    let closestFriend = '';
    let closestFriendPoints = 0;

    friends.forEach(friend => {
      const friendName = friend.key[0].string[0];
      const friendshipPoints = friend.value[0].Friendship[0].Points[0];

      if (friendshipPoints >= closestFriendPoints) {
        closestFriend = friendName;
        closestFriendPoints = friendshipPoints;
      }
    });

    progress.valueOne = closestFriend;
    progress.valueTwo = closestFriendPoints;
    break;

  case 'The Beloved Farmer':
    counter = 0;

    friends.forEach(friend => {
      const friendshipPoints = friend.value[0].Friendship[0].Points[0];
      if (friendshipPoints >= 2500) counter++;
    });

    progress.valueOne = counter;
    break;

  case 'Cliques':
  case 'Networking':
  case 'Popular':
    counter = 0;

    friends.forEach(friend => {
      const friendshipPoints = friend.value[0].Friendship[0].Points[0];
      if (friendshipPoints >= 1250) counter++;
    });

    progress.valueOne = counter;
    break;

  case 'Cook':
  case 'Sous Chef':
  case 'Gourmet Chef':
    const recipesCooked = saveGame.player[0].recipesCooked[0].item;
    progress.valueOne = recipesCooked ? recipesCooked.length : 0;
    break;

  case 'D.I.Y':
  case 'Artisan':
  case 'Craft Master':
    counter = 0;
    const craftingRecipes = saveGame.player[0].craftingRecipes[0].item;

    craftingRecipes.forEach(item => {
      const timesCrafted = item.value[0].int[0];
      if(timesCrafted > 0) counter++;
    });

    progress.valueOne = true;
    progress.valueTwo = counter;
    progress.valueThree = craftingRecipes.length;
    break;

  case 'Fisherman': 
  case 'Ol\' Mariner': 
  case 'Master Angler':
    const differentFish = saveGame.player[0].fishCaught[0].item;
    progress.valueOne = differentFish ? differentFish.length : 0;
    break;

  case 'Mother Catch':
    counter = 0;
    const fishCaught = saveGame.player[0].fishCaught[0].item;

    if(fishCaught) {
      fishCaught.forEach(fish => {
        const timesCaughtArray = fish.value[0].ArrayOfInt[0].int;
        timesCaughtArray.forEach(value => {
          counter += value;
        });
      });
    }

    progress.valueOne = counter;
    break;

  case 'Gofer': 
  case 'A Big Help':
    const questsCompleted = Number(saveGame.player[0].stats[0].questsCompleted[0]);
    progress.valueOne = questsCompleted;
    break;

  case 'Polyculture':
    counter = 0;

    if (itemsShipped) {      
      itemsShipped.forEach(item => {
        const itemCode = item.key[0].int[0];
        const amountShipped = item.value[0].int[0];
        if (crops.hasOwnProperty(itemCode) && amountShipped < 15) counter++;
      });
    }

    progress.valueOne = counter;
    break;

  case 'Monoculture':
    let closestCrop = '';
    let closestCropCount = 0;

    if (itemsShipped) {      
      itemsShipped.forEach(item => {
        const itemCode = item.key[0].int[0];
        const amountShipped = item.value[0].int[0];
        if (crops.hasOwnProperty(itemCode) && amountShipped >= closestCropCount) {
          closestCrop = crops[itemCode];
          closestCropCount = amountShipped;
        }
      });
    }

    progress.valueOne = closestCrop;
    progress.valueTwo = closestCropCount;
    break;

  case 'Full Shipment':
    counter = 0;

    if (itemsShipped) {      
      itemsShipped.forEach(item => {
        const itemCode = item.key[0].int[0];
        if (fullShipmentCodes.includes(Number(itemCode))) counter++;
      });
    }

    progress.valueOne = counter;
    break;

  case 'Prairie King':
    const prairieDefeated = saveGame.player[0].mailReceived[0].string.includes('Beat_PK');

    if (prairieDefeated) {
      progress.valueOne = undefined;
      setUnlocked(true);
    } else {
      const currentPrairieProgress = saveGame.player[0].JOTPKProgress;
      progress.valueOne = false;

      if (currentPrairieProgress) {
        const currentWorld = currentPrairieProgress[0].world[0].int[0];
        const currentRound = currentPrairieProgress[0].whichRound[0].int[0];
        const worlds = {0: ['Prairie', 5], 1: ['Forest', 4], 2: ['Graveyard', 4]};

        progress.valueOne = true;

        if(worlds[currentWorld][0] === 'Prairie') progress.valueTwo = (5 - currentRound) + 8;
        else if (worlds[currentWorld][0] === 'Forest') progress.valueTwo = (4 - currentRound) + 4;
        else progress.valueTwo = (4 - currentRound);
      }
    }
    break;

  case 'The Bottom':
    const timesReachedBottom = Number(saveGame.player[0].timesReachedMineBottom[0]);

    if (timesReachedBottom > 0) {
      progress.valueOne = undefined;
      setUnlocked(true);
    } else {
      const deepestLevel = Number(saveGame.player[0].deepestMineLevel[0]);
      progress.valueOne = true;
      progress.valueTwo = deepestLevel;
    }
    break;

  case 'Local Legend':
    if (mailReceived.includes('ccMovieTheaterJoja')) {
      setUnlocked(undefined);
      progress.valueOne = undefined;
    } else if (mailReceived.includes('ccMovieTheater') || mailReceived.includes('abandonedJojaMartAccessible')) {
      setUnlocked(true);
      progress.valueOne = true;
    } else {
      progress.valueOne = false;
      const bundles = saveGame.locations[0].GameLocation[45].bundles[0].item;
      counter = 0;
      
      bundles.forEach(bundle => {
        let missingItems = false;
        const requiredItems = bundle.value[0].ArrayOfBoolean[0].boolean;

        requiredItems.forEach(item => {
          if(item === 'true') missingItems = true;
        });

        if (missingItems) counter++;
      });

      progress.valueTwo = counter;
    }
    break;

  case 'Joja Co. Member Of The Year':
    if (mailReceived.includes('ccMovieTheaterJoja')) {
      setUnlocked(true);
      progress.valueOne = true;
    } else if (mailReceived.includes('ccMovieTheater')) {
      setUnlocked(undefined);
      progress.valueOne = undefined;
    } else {
      progress.valueOne = false;
    }
    break;

  case 'Mystery Of The Stardrops':
    progress.valueOne = false;
    const maxStamina = Number(saveGame.player[0].maxStamina[0]);

    if (maxStamina === 508) {
      setUnlocked(true);
      progress.valueOne = true;
    } else {
      progress.valueTwo = (508 - maxStamina) / 34;
    }
    break;

  case 'Full House': 
    const hasSpouse = saveGame.player[0].spouse;
    if (hasSpouse) progress.valueOne = true;
    else progress.valueOne = false;
    break;

  case 'Singular Talent':
    counter = 0;
    let skillNames = ['Farming', 'Mining', 'Foraging', 'Fishing', 'Combat'];
    let closestSkill = '';
    let closestSkillPoints = 0;
    
    skills.forEach((skill, index) => {
      if (index < 5) {
        if (Number(skill) >= 15000) {
          counter++;
        } else if (Number(skill) >= closestSkillPoints) {
          closestSkill = skillNames[index];
          closestSkillPoints = skill;
        }
      }
    });

    if (counter > 0) {
      setUnlocked(true);
      progress.valueOne = true; 
    } else {
      progress.valueOne = false; 
      progress.valueTwo = closestSkill;
      progress.valueThree = closestSkillPoints;
    }
    break;

  case 'Master Of The Five Ways':
    counter = 0;
    
    skills.forEach((skill) => {
      if (Number(skill) >= 15000) {
        counter++;
      }
    });

    if (counter === 5) {
      setUnlocked(true);
      progress.valueOne = true; 
    } else {
      progress.valueOne = false; 
      progress.valueTwo = counter;
    }
    break;
    
  case 'Protector Of The Valley':
    const specificMonsters = saveGame.player[0].stats[0].specificMonstersKilled[0].item;
    counter = 0;

    if (specificMonsters) {
      specificMonsters.forEach(monster => {
        const monsterName = monster.key[0].string[0];
        const numberKilled = Number(monster.value[0].int[0]);
        
        for (const monsterType in monsters) {
          if (monsters[monsterType].validMonsters.includes(monsterName)) {
            monsters[monsterType].count += numberKilled;
            break;
          }
        }
      });

      for (const monsterType in monsters) {
        if (monsters[monsterType].count >= monsters[monsterType].goal) {
          counter++;
        }
      }

      if (counter === 12) {
        setUnlocked(true);
        progress.valueOne = true;
      } else {
        progress.valueOne = false;
        progress.valueTwo = counter;
      }
    } else {
      progress.valueOne = false;
      progress.valueTwo = counter;
    }
    break;

  case 'Fector\'s Challenge':
    progress.valueOne = false;
    //TODO: Cannot find a way to do this currently.
    break;
  }
  
  const achievementProgress = {
    'Greenhorn': 
      {progressDetail: 
        `${formatNumber(15000 - progress.valueOne)}g remaining.`},
    'Cowpoke': 
      {progressDetail: 
        `${formatNumber(50000 - progress.valueOne)}g remaining.`},
    'Homesteader': 
      {progressDetail: 
        `${formatNumber(250000 - progress.valueOne)}g remaining.`},
    'Millionaire': 
      {progressDetail: 
        `${formatNumber(1000000 - progress.valueOne)}g remaining.`},
    'Legend': 
      {progressDetail: 
        `${formatNumber(10000000 - progress.valueOne)}g remaining.`},
    'A Complete Collection': 
      {progressDetail: 
        `${formatNumber(95  - progress.valueOne)} items remaining.`},
    'A New Friend': 
      {progressDetail: 
        `Closest friend is ${progress.valueOne}. ${(1250) - progress.valueTwo} friendship points away.`},
    'Best Friends': 
      {progressDetail: 
        `Closest friend is ${progress.valueOne}. ${(2500) - progress.valueTwo} friendship points away.`},
    'The Beloved Farmer': 
      {progressDetail: 
        `${8 - progress.valueOne} friends remaining.`},
    'Cliques': 
      {progressDetail: 
        `${4 - progress.valueOne} friends remaining.`},
    'Networking': 
      {progressDetail: 
        `${10 - progress.valueOne} friends remaining.`},
    'Popular': 
      {progressDetail: 
        `${20 - progress.valueOne} friends remaining.`},
    'Cook': 
      {progressDetail: 
        `${10 - progress.valueOne} recipes remaining.`},
    'Sous Chef': 
      {progressDetail: 
        `${25 - progress.valueOne} recipes remaining.`},
    'Gourmet Chef': 
      {progressDetail: 
        `${80 - progress.valueOne} recipes remaining.`},
    'Moving Up': 
      {progressDetail: 
        'Requires 10,000g and 450 Wood'},
    'Living Large': 
      {progressDetail: 
        'Requires 50,000g and 150 Hardwood'},
    'D.I.Y': 
      {progressDetail: 
        `${15 - progress.valueTwo} items remaining.`},
    'Artisan': 
      {progressDetail: 
        `${30 - progress.valueTwo} items remaining.`},
    'Craft Master': 
      {progressDetail: 
        `${129 - progress.valueOne} items remaining. ${progress.valueOne ? `${129 - progress.valueThree} recipes not learnt.` : ''}`},
    'Fisherman': 
      {progressDetail: 
        `${10 - progress.valueOne} different fish remaining.`},
    'Ol\' Mariner': 
      {progressDetail: 
        `${24 - progress.valueOne} different fish remaining.`},
    'Master Angler': 
      {progressDetail: 
        `${67 - progress.valueOne} different fish remaining.`},
    'Mother Catch': 
      {progressDetail: 
        `${100 - progress.valueOne} fish remaining.`},
    'Treasure Trove': 
      {progressDetail: 
        `${formatNumber(40 - progress.valueOne)} items remaining.`},
    'Gofer': 
      {progressDetail: 
        `${formatNumber(10 - progress.valueOne)} quests remaining.`},
    'A Big Help': 
      {progressDetail: 
        `${formatNumber(40 - progress.valueOne)} quests remaining.`},
    'Polyculture': 
      {progressDetail: 
        `${formatNumber(28 - progress.valueOne)} crops remaining.`},
    'Monoculture': 
      {progressDetail: 
        `${progress.valueOne ? `Closest crop is ${progress.valueOne}.` : ''} ${formatNumber(300  - progress.valueTwo)} crops remaining.`},
    'Full Shipment': 
      {progressDetail: 
        `${formatNumber(145 - progress.valueOne)} items remaining.`},
    'Prairie King': 
      {progressDetail: 
        progress.valueOne === undefined 
          ? '' 
          : progress.valueOne 
            ? `${progress.valueTwo} round(s) remaining on current prairie game save.` 
            : '13 total levels to complete.'},
    'The Bottom': 
      {progressDetail: 
        progress.valueOne === undefined ? '' : `${120 - progress.valueTwo} floors remaining.`},
    'Local Legend': 
      {progressDetail: 
        progress.valueOne === undefined 
          ? 'Joja warehouse developed.' 
          : progress.valueOne 
            ? '' 
            : `${30 - progress.valueTwo} bundles remaining.`},
    'Joja Co. Member Of The Year': 
      {progressDetail: 
        progress.valueOne === undefined ? 'Community Centre restored.' : progress.valueOne ? '' : '135,000g total cost.'}, 
    'Mystery Of The Stardrops': 
      {progressDetail: 
        progress.valueOne ? '' : `${progress.valueTwo} Stardrops remaining.`},
    'Full House': 
      {progressDetail: 
        progress.valueOne 
          ? 'Farmer is married. 1/20 chance of being asked to have a child each night.' 
          : 'Farmer is not married - cannot have children.'},
    'Singular Talent': 
      {progressDetail: 
        progress.valueOne ? '' : `Closest skill is ${progress.valueTwo}. ${(15000) - progress.valueThree} experience points away.`},
    'Master Of The Five Ways': 
      {progressDetail: 
        progress.valueOne ? '' : `${5 - progress.valueTwo} skills remaining.`},
    'Protector Of The Valley': 
      {progressDetail: 
        progress.valueOne ? '' : `${12 - progress.valueTwo} monster slayer goals remaining.`},
    'Fector\'s Challenge': 
    {progressDetail: 
      progress.valueOne 
        ? 'Maximum luck (TV, Lucky Rings, Food). One level a day to save progress. Close game (don\'t save) and retry if you die.' 
        : 'Currently unable to automatically detect. Click on the icon to toggle completion.'},
  };

  return achievementProgress[name].progressDetail;
};