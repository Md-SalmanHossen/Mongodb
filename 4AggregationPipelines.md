
MongoDB’s **aggregation pipeline** is a powerful way to perform advanced data analysis and manipulation directly in the database. The pipeline processes data in a sequence of stages where each stage performs an operation, transforming the documents and passing them to the next stage.

---

### **What is the Aggregation Pipeline?**
The aggregation pipeline allows you to run queries that modify, analyze, and transform data in **multiple steps**. Each step, called a **stage**, works on documents and passes the result to the next stage. This makes it possible to chain operations like filtering, grouping, and reshaping documents.

---

### Basic Structure of an Aggregation Pipeline

```javascript
db.collection.aggregate([
  { stage1: { /* Stage 1 details */ }},
  { stage2: { /* Stage 2 details */ }},
  { stage3: { /* Stage 3 details */ }}
]);
```
This structure defines the stages the data will go through. Let’s break down the most common stages used in aggregation pipelines.

---

### **1. $match** — Filter Documents

The **`$match`** stage filters documents based on specified criteria. It’s like the **WHERE** clause in SQL, selecting only the documents that match a condition.

#### Example:
**Use Case**: Find products with a price greater than $100.
```javascript
db.products.aggregate([
  { $match: { price: { $gt: 100 } } }
]);
```

- **What it does**: Filters the collection to include only products with a price greater than 100.
- **When to use**: When you need to filter documents based on some condition.
  
---

### **2. $group** — Group and Summarize Data

The **`$group`** stage groups documents together by a specific field and can perform operations like summing, averaging, or counting.

#### Example:
**Use Case**: Count how many products are in each category.
```javascript
db.products.aggregate([
  { $group: { _id: "$categoryID", totalProducts: { $sum: 1 } } }
]);
```

- **What it does**: Groups products by category and counts the number of products in each category.
- **When to use**: When you need to group data and apply calculations (sum, average, count).

---

### **3. $project** — Reshape Data

The **`$project`** stage reshapes the documents, allowing you to include or exclude certain fields. You can also create new fields based on calculations.

#### Example:
**Use Case**: Display only the product name, price, and a custom field for price range.
```javascript
db.products.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,
      price: 1,
      priceCategory: { $cond: { if: { $gt: ["$price", 500] }, then: "expensive", else: "affordable" } }
    }
  }
]);
```

- **What it does**: Projects the `name`, `price`, and creates a new field `priceCategory` to categorize products as "expensive" or "affordable".
- **When to use**: When you want to modify or limit the fields in your results.

---

### **4. $sort** — Sort Documents

The **`$sort`** stage sorts documents by one or more fields in ascending (1) or descending (-1) order.

#### Example:
**Use Case**: Sort products by price in descending order.
```javascript
db.products.aggregate([
  { $sort: { price: -1 } }
]);
```

- **What it does**: Sorts the products by price from highest to lowest.
- **When to use**: When you want to organize the results based on a field.

---

### **5. limit,skip** — Paginate Results

- **`$limit`**: Restricts the number of documents returned.
- **`$skip`**: Skips a specified number of documents.

#### Example:
**Use Case**: Get the next 10 products after skipping the first 5.
```javascript
db.products.aggregate([
  { $skip: 5 },
  { $limit: 10 }
]);
```

- **What it does**: Skips the first 5 products and limits the result to the next 10.
- **When to use**: When implementing pagination in APIs (e.g., displaying data in pages).

---

### **6. $lookup** — Join Collections

The **`$lookup`** stage joins documents from another collection, similar to a SQL **JOIN**.

#### Example:
**Use Case**: Get product details along with their brand information from the `brands` collection.
```javascript
db.products.aggregate([
  {
    $lookup: {
      from: "brands",
      localField: "brandID",
      foreignField: "_id",
      as: "brandDetails"
    }
  }
]);
```

- **What it does**: Joins each product with its corresponding brand information.
- **When to use**: When you need to combine data from multiple collections.

---

### **7. $unwind** — Flatten Arrays

The **`$unwind`** stage takes an array field and "unwinds" it, creating a new document for each element in the array.

#### Example:
**Use Case**: Split a product’s reviews (array) into individual documents.
```javascript
db.products.aggregate([
  { $unwind: "$reviews" }
]);
```

- **What it does**: For each product, creates a new document for each review, turning one document with an array into multiple documents.
- **When to use**: When you need to work with individual elements of an array field.

---

### Advanced Use Cases

#### **1. Combining Multiple Stages**
You can combine several stages to perform complex queries.

**Use Case**: Filter products, join with brands, group by category, and calculate the average price for each category.
```javascript
db.products.aggregate([
  { $match: { price: { $gt: 100 } } },
  { $lookup: { from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brandInfo' } },
  { $group: { _id: "$categoryID", avgPrice: { $avg: "$price" } } },
  { $sort: { avgPrice: -1 } }
]);
```

---
