/* eslint-disable no-case-declarations */
let progress = {};

const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const handleAchievementProgress = (name, saveGame) => {
  switch(name) {
  case 'Greenhorn':
  case 'Cowpoke':
  case 'Homesteader':
  case 'Millionaire':
  case 'Legend':
    progress.valueOne = Number(saveGame.player[0].totalMoneyEarned[0]);
    break;
  case 'A Complete Collection':
    const museumPieces = saveGame.locations[0].GameLocation[31].museumPieces[0].item;
    if (museumPieces) {
      progress.valueOne = museumPieces.length;
    } else {
      progress.valueOne = 0;
    }
    break;
  }

  const achievementProgress = {
    'Greenhorn': {progressDetail: `${formatNumber(15000 - progress.valueOne)}g remaining.`},
    'Cowpoke': {progressDetail: `${formatNumber(50000 - progress.valueOne)}g remaining.`},
    'Homesteader': {progressDetail: `${formatNumber(250000 - progress.valueOne)}g remaining.`},
    'Millionaire': {progressDetail: `${formatNumber(1000000 - progress.valueOne)}g remaining.`},
    'Legend': {progressDetail: `${formatNumber(10000000 - progress.valueOne)}g remaining.`},
    'A Complete Collection': {progressDetail: `${formatNumber(95  - progress.valueOne)} items remaining.`},
    'A New Friend': {progressDetail: '-'},
    'Best Friends': {progressDetail: '-'},
    'The Beloved Farmer': {progressDetail: '-'},
    'Cliques': {progressDetail: '-'},
    'Networking': {progressDetail: '-'},
    'Popular': {progressDetail: '-'},
    'Cook': {progressDetail: '-'},
    'Sous Chef': {progressDetail: '-'},
    'Gourmet Chef': {progressDetail: '-'},
    'Moving Up': {progressDetail: '-'},
    'Living Large': {progressDetail: '-'},
    'D.I.Y': {progressDetail: '-'},
    'Artisan': {progressDetail: '-'},
    'Craft Master': {progressDetail: '-'},
    'Fisherman': {progressDetail: '-'},
    'Ol\' Mariner': {progressDetail: '-'},
    'Master Angler': {progressDetail: '-'},
    'Mother Catch': {progressDetail: '-'},
    'Treasure Trove': {progressDetail: '-'},
    'Gofer': {progressDetail: '-'},
    'A Big Help': {progressDetail: '-'},
    'Polyculture': {progressDetail: '-'},
    'Monoculture': {progressDetail: '-'},
    'Full Shipment': {progressDetail: '-'},
    'Prairie King': {progressDetail: '-'},
    'The Bottom': {progressDetail: '-'},
    'Local Legend': {progressDetail: '-'},
    'Joja Co. Member Of The Year': {progressDetail: '-'},
    'Mystery Of The Stardrops': {progressDetail: '-'},
    'Full House': {progressDetail: '-'},
    'Singular Talent': {progressDetail: '-'},
    'Master Of The Five Ways': {progressDetail: '-'},
    'Protector Of The Valley': {progressDetail: '-'},
    'Fector\'s Challenge': {progressDetail: '-'},
  };

  return achievementProgress[name].progressDetail;
};

