'use client';
import { useState } from 'react';
import RecipePopup from '@/components/RecipePopup';
import CategoriesSlider from '@/components/CategoriesSlider';
import RecipeList from '@/components/RecipeList';

const initialRecipes = [
  {
    name: 'Mixed Tropical Fruit Salad',
    time: '30 Minutes',
    category: 'Healthy',
    image: '/Images/comida1.jfif',
    ingredients: ['Mango', 'Pineapple', 'Strawberry'],
    instructions: 'Mix all ingredients and serve chilled.',
  },  {
    name: 'Mixed Tropical Fruit Salad1',
    time: '30 Minutes',
    category: 'Healthy',
    image: '/Images/comida1.jfif',
    ingredients: ['Mango', 'Pineapple', 'Strawberry'],
    instructions: 'Mix all ingredients and serve chilled.',
  },  {
    name: 'Mixed Tropical Fruit Salad2',
    time: '30 Minutes',
    category: 'Healthy',
    image: '/Images/comida1.jfif',
    ingredients: ['Mango', 'Pineapple', 'Strawberry'],
    instructions: 'Mix all ingredients and serve chilled.',
  },  {
    name: 'Mixed Tropical Fruit Salad3',
    time: '30 Minutes',
    category: 'Healthy',
    image: '/Images/comida1.jfif',
    ingredients: ['Mango', 'Pineapple', 'Strawberry'],
    instructions: 'Mix all ingredients and serve chilled.',
  },
  // Otras recetas...
];

export default function MainPage() {
  const [recipes] = useState(initialRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleLike = (recipeName) => {
    console.log(`Liked recipe: ${recipeName}`);
  };

  const handleOpenPopup = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleClosePopup = () => {
    setSelectedRecipe(null);
  };

  const filteredRecipes = selectedCategory
    ? recipes.filter((r) => r.category === selectedCategory)
    : recipes;

  return (
    <div>
<CategoriesSlider
  categories={[
    { name: 'Breakfast', icon: '/Images/cat/breakfast.png' },
    { name: 'Lunch', icon: '/Images/cat/lunch.png' },
    { name: 'Dinner', icon: '/Images/cat/dinner.png' },
    { name: 'Vegetarian', icon: '/Images/cat/vegetarian.png' },
    { name: 'Beef', icon: '/Images/cat/beef.png' },
    { name: 'Seafood', icon: '/Images/cat/seafood.png' },
    { name: 'Dessert', icon: '/Images/cat/dessert.png' },
    { name: 'Snack', icon: '/Images/cat/snack.png' },
    {name: 'Chicken', icon: '/Images/cat/chicken.png' },
    {name: 'Pork', icon: '/Images/cat/pork.png' },
    { name: 'Mexican', icon: '/Images/cat/mexican.png' },
    {name: 'Healthy', icon: '/Images/cat/healthy.png' },
  ]}
  onSelect={setSelectedCategory}
/>

      <RecipeList
        recipes={filteredRecipes}
        onLike={handleLike}
        onOpenPopup={handleOpenPopup}
      />
      <RecipePopup recipe={selectedRecipe} onClose={handleClosePopup} />
    </div>
  );
}
