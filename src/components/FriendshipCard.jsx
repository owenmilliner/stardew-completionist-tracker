import React, { useState, useContext } from 'react';
import { FileContext } from '../contexts/FileContext';
import { formatNumber } from '../utils/formatMoney';
import { achievementReference } from '../data/achievementReference';

const FriendshipCard = () => {
  const [isActive, setIsActive] = useState(false);
  const { selectedFileData } = useContext(FileContext);
  const heartCounters = {
    5: 0, 
    10: 0
  };

  const farmerFriendships = selectedFileData.player[0].friendshipData[0].item;
  const friendshipData = [];

  const villagerGifts = {
    'Abigail': ['Amethyst', 'Banana Pudding', 'Blackberry Cobbler', 'Chocolate Cake', 'Pufferfish', 'Pumpkin', 'Spicy Eel'],
    'Alex': ['Complete Breakfast', 'Salmon Dinner'],
    'Caroline': ['Fish Taco', 'Green Tea', 'Summer Spangle', 'Tropical Curry'],
    'Clint': ['Amethyst', 'Aquamarine', 'Artichoke Dip', 'Emerald', 'Fiddlehead Risotto', 'Gold Bar', 'Iridium Bar', 'Jade', 'Omni Geode', 'Ruby', 'Topaz'],
    'Demetrius': ['Bean Hotpot', 'Ice Cream', 'Rice Pudding', 'Strawberry'],
    'Dwarf': ['Amethyst', 'Aquamarine', 'Emerald', 'Jade', 'Lemon Stone', 'Omni Geode', 'Ruby', 'Topaz'],
    'Elliott': ['Crab Cakes', 'Duck Feather', 'Lobster', 'Pomegranate', 'Squid', 'Squid Ink', 'Tom Kha Soup'],
    'Emily': ['Amethyst', 'Aquamarine', 'Cloth', 'Emerald', 'Jade', 'Ruby', 'Survival Burger', 'Topaz', 'Wool'],
    'Evelyn': ['Beet', 'Chocolate Cake', 'Diamond', 'Fairy Rose', 'Stuffing', 'Tulip'],
    'George': ['Fried Mushroom', 'Leek'],
    'Gus': ['Diamond', 'Escargot', 'Fish Taco', 'Orange', 'Tropical Curry'],
    'Haley': ['Coconut', 'Fruit Salad', 'Pink Cake', 'Sunflower'],
    'Harvey': ['Coffee', 'Pickles', 'Super Meal', 'Truffle Oil', 'Wine'],
    'Jas': ['Fairy Rose', 'Pink Cake', 'Plum Pudding'],
    'Jodi': ['Chocolate Cake', 'Crispy Bass', 'Diamond', 'Eggplant Parmesan', 'Fried Eel', 'Pancakes', 'Rhubarb Pie', 'Vegetable Medley'],
    'Kent': ['Fiddlehead Risotto', 'Roasted Hazelnuts'],
    'Krobus': ['Diamond', 'Iridium Bar', 'Pumpkin', 'Void Egg', 'Void Mayonnaise', 'Wild Horseradish'],
    'Leah': ['Goat Cheese', 'Poppyseed Muffin', 'Salad', 'Stir Fry', 'Truffle', 'Vegetable Medley', 'Wine'],
    'Leo': ['Duck Feather', 'Mango', 'Ostrich Egg', 'Poi'],
    'Lewis': ['Autumn\'s Bounty', 'Glazed Yams', 'Green Tea', 'Hot Pepper', 'Vegetable Medley'],
    'Linus': ['Blueberry Tart', 'Cactus Fruit', 'Coconut', 'Dish O\' The Sea', 'Yam'],
    'Marnie': ['Diamond', 'Farmer\'s Lunch', 'Pink Cake', 'Pumpkin Pie'],
    'Maru': ['Battery Pack', 'Cauliflower', 'Cheese Cauliflower', 'Diamond', 'Gold Bar', 'Iridium Bar', 'Miner\'s Treat', 'Pepper Poppers', 'Radioactive Bar', 'Rhubarb Pie', 'Strawberry'],
    'Pam': ['Beer', 'Cactus Fruit', 'Glazed Yams', 'Mead', 'Pale Ale', 'Parsnip', 'Parsnip Soup', 'Piña Colada'],
    'Penny': ['Diamond', 'Emerald', 'Melon', 'Poppy', 'Poppyseed Muffin', 'Red Plate', 'Roots Platter', 'Sandfish', 'Tom Kha Soup'],
    'Pierre': ['Fried Calamari'],
    'Robin': ['Goat Cheese', 'Peach', 'Spaghetti'],
    'Sandy': ['Crocus', 'Daffodil', 'Mango Sticky Rice', 'Sweet Pea'],
    'Sam': ['Cactus Fruit', 'Maple Bar', 'Pizza', 'Tigerseye'],
    'Sebastian': ['Frozen Tear', 'Obsidian', 'Pumpkin Soup', 'Sashimi', 'Void Egg'],
    'Shane': ['Beer', 'Hot Pepper', 'Pepper Poppers', 'Pizza'],
    'Vincent': ['Cranberry Candy', 'Ginger Ale', 'Grape', 'Pink Cake', 'Snail'],
    'Willy': ['Catfish', 'Diamond', 'Iridium Bar', 'Mead', 'Octopus', 'Pumpkin', 'Sea Cucumber', 'Sturgeon'],
    'Wizard': ['Purple Mushroom', 'Solar Essence', 'Super Cucumber, Void Essence'],
  };

  farmerFriendships.forEach((villager, index) => {
    const villagerName = villager.key[0].string[0];
    const villagerPoints = villager.value[0].Friendship[0].Points[0];
    
    friendshipData.push({
      name: villagerName,
      friendshipPoints: villagerPoints,
      heartLevel: Math.floor(villagerPoints / 250),
      pointsUntilMax: villagerPoints <= 2500 ? formatNumber(2500 - villagerPoints) : 0,
      lovedItems: villagerGifts[villagerName]
    });
  });

  const friendshipTableData = (name, friendshipPoints, heartLevel, pointsUntilMax, lovedItems) => {
    if (heartLevel >= 5 && heartLevel < 10) heartCounters[5]++;
    else if (heartLevel >= 10) heartCounters[10]++;
    return villagerGifts[name] ? (
      <tr>
        <td>
          {(name)}
        </td>
        <td>
          <img 
            src={require(`../images/friendship-levels/${heartLevel}_heart.png`)}
            className='friendship__heart__level'
          />
        </td>
        <td>
          {pointsUntilMax}
        </td>
        <td>
          {lovedItems ? lovedItems.map(item => (<p className='friendship__item' key={item}>{item}</p>)) : 'Error finding loved items.'}
        </td>
      </tr>
    ) : null;
  };

  const friendshipAchievements = [
    {
      index: 6,
      goal: 5,
      count: 1
    }, 
    {
      index: 7, 
      goal: 10,
      count: 1
    }, 
    {
      index: 9, 
      goal: 10,
      count: 8
    }, 
    {
      index: 11, 
      goal: 5,
      count: 4
    }, 
    {
      index: 12, 
      goal: 5,
      count: 10
    },
    {
      index: 13, 
      goal: 5,
      count: 20
    }
  ];


  const achievementListItem = (name, description, goal, count) => {
    const unlocked = heartCounters[goal] >= count;
    return (
      <li className={`stats__achievement--unlocked-${unlocked}`}>
        {unlocked ? '✔' : '✘'}{name}: {description}
      </li>
    );
  };

  return (
    <div className='content__section content__panel'>
      <h2 className='content__section__header'>Friendship.</h2>
      <button className='content__section__toggle' onClick={() => setIsActive(!isActive)}>{isActive ? 'Hide' : 'Show'}</button>
      {isActive ? 
        <div className='content__section__body'>
          <h3>
            Friendship stats.
          </h3>
          <table className='friendship__table stats__table'>
            <thead>
              <tr>
                <th className='friendship__column__1'>
                  Name.
                </th>
                <th className='friendship__column__2'>
                  Friendship Level.
                </th>
                <th className='friendship__column__3'>
                  Points until max.
                </th>
                <th className='friendship__column__4'>
                  Loved items.
                </th>
              </tr>
            </thead>
            <tbody>
              {friendshipData.map((villager) => 
                friendshipTableData(
                  villager.name, 
                  villager.friendshipPoints, 
                  villager.heartLevel, 
                  villager.pointsUntilMax, 
                  villager.lovedItems
                ))}
            </tbody>
          </table>

          <h3>
            Friendship achievements.
          </h3>
          <ul>
            {friendshipAchievements.map((achievement) => achievementListItem(achievementReference[achievement.index].name, achievementReference[achievement.index].description, achievement.goal, achievement.count))}
          </ul>
        </div>
        : null}
    </div> 
  );
};

export default FriendshipCard;
