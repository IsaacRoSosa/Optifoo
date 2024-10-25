'use client';
import { useState } from 'react';
import RecipePopup from '@/components/RecipePopup';
import CategoriesSlider from '@/components/CategoriesSlider';
import RecipeList from '@/components/RecipeList';
import styles from '@/styles/recipesPage.module.css';

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
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLike = (recipeName) => {
    console.log(`Liked recipe: ${recipeName}`);
  };

  const handleOpenPopup = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleClosePopup = () => {
    setSelectedRecipe(null);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleSelectAllCategories = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]); 
    } else {
      setSelectedCategories(categories.map((cat) => cat.name));
    }
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(recipe.category);
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [ { name: 'Breakfast', icon: '/Images/cat/breakfast.png' },
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
    {name: 'Healthy', icon: '/Images/cat/healthy.png' },];

    return (
      <div className={styles.mainPageContainer}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchBar}
          />
          <button onClick={handleSelectAllCategories} className={styles.actionButton}>
            {selectedCategories.length === categories.length ? 'Deselect All Categories' : 'Select All Categories'}
          </button>
        </div>
  
        <CategoriesSlider
          categories={categories}
          onSelect={handleCategorySelect}
          selectedCategories={selectedCategories}
        />
  
        <RecipeList recipes={filteredRecipes} onLike={handleLike} onOpenPopup={handleOpenPopup} />
  
        {selectedRecipe && <RecipePopup recipe={selectedRecipe} onClose={handleClosePopup} />}
      </div>
    );
  }