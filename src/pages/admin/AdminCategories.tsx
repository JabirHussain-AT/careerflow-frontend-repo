import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCategories, fetchCategories ,deleteCategory } from '@/redux/actions/adminActions';
import { AppDispatch } from '@/redux/store';

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [adding, setAdding] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    fetchCategoriesData();
  }, []);

  const fetchCategoriesData = async () => {
    setLoading(true);
    try {
      const data = await fetchCategories();
      setCategories(data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() !== '') {
      try {
        setAdding(true);
        await dispatch(addCategories({ category: newCategory }));
   
        setNewCategory('');
        fetchCategoriesData();
      } catch (error) {
        console.error('Error adding category:', error);
      } finally {
        setAdding(false);
      }
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await dispatch(deleteCategory(categoryId));
      fetchCategoriesData();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="max-w-3xl min-h-screen mx-auto">
      <div className="flex-col mt-5 gap-5 ">
        {/* Add Category Card */}
        <div className="bg-white p-4 rounded shadow border-b-2 ">
          <h2 className="text-2xl font-bold mb-4">Add Category</h2>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full px-2 py-1 border rounded mr-2"
            />
            {/* Icon Image File (Optional) */}
            {/* Include your input field for the icon image file here */}
          </div>
          <button
            onClick={handleAddCategory}
            className={`bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded ${
              adding ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={adding}
          >
            {adding ? 'Adding...' : 'Add'}
          </button>
        </div>

        {/* Available Categories Card */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Available Categories</h2>
          {loading ? (
            <p>Loading categories...</p>
          ) : (
            <div>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <span>{category.category}</span>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p>No categories available</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
