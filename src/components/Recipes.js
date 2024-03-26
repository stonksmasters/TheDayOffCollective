// src/components/Recipes.js
import React from 'react';
import HeroSections from './HeroSections';

const recipesImages = ['/images/recipe.jpg', '/images/recipe.jpg'];
const mockRecipes = [
    {
        id: '1',
        name: 'Recipe 1',
        description: 'This is the description of Recipe 1.',
        imageUrl: '/images/recipe.jpg'
    },
    {
        id: '2',
        name: 'Recipe 2',
        description: 'This is the description of Recipe 2.',
        imageUrl: '/images/recipe.jpg'
    },
    // Add more recipes as needed
];

const Recipes = () => {
    return (
        <div className="recipes">
            <h1>Recipes</h1>
            <HeroSections
    images={recipesImages}
    title="Recipes Collection"
    text="Cook delicious meals with our easy-to-follow recipes."
/>

            <div className="recipes-list">
                {mockRecipes.map(recipe => (
                    <div key={recipe.id} className="recipe-item">
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        <h3>{recipe.name}</h3>
                        <p>{recipe.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Recipes;
