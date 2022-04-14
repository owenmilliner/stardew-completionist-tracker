import React, { useState, useContext } from 'react';
import { FileContext } from '../contexts/FileContext';
import { achievementReference } from '../data/achievementReference';

const CookingCard = () => {
  const [isActive, setIsActive] = useState(false);
  const { selectedFileData } = useContext(FileContext);

  const cooking = selectedFileData.player[0];

  const friendshipRecipeList = {
    'Pumpkin Soup': 'Robin',
    'Fried Mushroom': 'Demetrius',
    'Sashimi': 'Linus',
    'Blueberry Tart': 'Pierre',
    'Parsnip Soup': 'Caroline',
    'Fried Eel': 'George',
    'Rice Pudding': 'Evelyn',
    'Stuffing': 'Pam',
    'Spaghetti': 'Lewis',
    'Salmon Dinner': 'Gus',
    'Algae Soup': 'Clint',
    'Fried Calamari': 'Jodi',
    'Crispy Bass': 'Kent',
    'Salad': 'Emily',
    'Pale Broth': 'Marnie',
    'Pepper Poppers': 'Shane',
    'Tom Kha Soup': 'Sandy',
    'Escargot': 'Willy',
    'Poi': 'Leo'
  };

  let villagerRecipesNotKnown = '';

  for (const friendshipRecipe in friendshipRecipeList) {
    let isKnown = false;
    cooking.cookingRecipes[0].item.forEach((knownRecipe) => {
      const recipeName = knownRecipe.key[0].string[0];
      if (recipeName === friendshipRecipe) isKnown = true;
    });

    if (!isKnown) villagerRecipesNotKnown += `${friendshipRecipeList[friendshipRecipe]}, `;
  }

  const cookingData = [
    {
      key: 'Recipes known.',
      value: cooking.cookingRecipes[0].item.length
    },
    {
      key: 'Recipes not known.',
      value: 80 - cooking.cookingRecipes[0].item.length
    },
    {
      key: 'Unique items cooked.',
      value: cooking.recipesCooked[0].item.length
    },
    {
      key: 'Total items cooked',
      value: cooking.stats[0].ItemsCooked[0]
    },
    {
      key: 'Villager recipes not known',
      value: villagerRecipesNotKnown.slice(0, -2) || '-'
    },
  ];

  const cookingTableData = (key, value) =>
    (
      <tr>
        <td>
          {key}
        </td>
        <td>
          {value}
        </td>
      </tr>
    );

  const cookingAchievements = [
    {
      index: 15,
      goal: 10
    }, 
    {
      index: 16, 
      goal: 25
    }, 
    {
      index: 17, 
      goal: 80
    }
  ];

  const achievementListItem = (name, description, goal) => {
    const unlocked = cooking.recipesCooked[0].item.length >= goal;
    return (
      <li key={name} className={`stats__achievement--unlocked-${unlocked}`}>
        {unlocked ? '✔' : '✘'}{name}: {description}
      </li>
    );
  };

  return (
    <div className='content__section content__panel'>
      <h2 className='content__section__header'>Cooking.</h2>
      <button className='content__section__toggle' onClick={() => setIsActive(!isActive)}>{isActive ? 'Hide' : 'Show'}</button>
      {isActive ? 
        <div className='content__section__body'>
          <h3>
            Cooking stats.
          </h3>
          <table className='cooking__table stats__table'>
            <thead>
              <tr>
              </tr>
            </thead>
            <tbody>
              {cookingData.map((stat) => cookingTableData(stat.key, stat.value))}
            </tbody>
          </table>

          <h3>
            Cooking achievements.
          </h3>
          <ul>
            {cookingAchievements.map((achievement) => achievementListItem(achievementReference[achievement.index].name, achievementReference[achievement.index].description, achievement.goal))}
          </ul>
        </div>
        : null}
    </div> 
  );
};

export default CookingCard;
