// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('CraftShop');

// Create a new document in the collection.
db.getCollection('Monthly_Budget').insertMany(
   [
      {
        "category": "Groceries",
        "budget": 200,
        "spent": 180
      },
      {
        "category": "Transportation",
        "budget": 100,
        "spent": 95
      },
      {
        "category": "Entertainment",
        "budget": 50,
        "spent": 30
      },
      {
        "category": "Utilities",
        "budget": 150,
        "spent": 140
      },
      {
        "category": "Dining Out",
        "budget": 75,
        "spent": 60
      }
    ]
);
