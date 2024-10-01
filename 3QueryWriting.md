
## Query For MongoDb

### **01. Insert Document/Data Query**

- **Insert One Document**:
  Inserts a single document into the collection.
  ```js
  db.collectionName.insertOne({
    "_id": 1,
    "name": "Alice",
    "age": 22,
    "courses": ["Math", "Physics"]
  });
  ```
  *Use case*: Useful when you need to add a single user profile or a record into the database.

- **Insert Many Documents**:
  Inserts multiple documents in one go.
  ```js
  db.collectionName.insertMany([
    { "_id": 2, "name": "Bob", "age": 25, "courses": ["Math", "Chemistry"] },
    { "_id": 3, "name": "Charlie", "age": 20, "courses": ["Physics", "Biology"] }
  ]);
  ```
  *Use case*: Best when importing data in bulk, like adding a batch of users.

---

### **02. Find Query**

- **Find All Documents**:
  Retrieves all documents from a collection.
  ```js
  db.collectionName.find({});
  ```
  *Use case*: Often used for getting all records, such as retrieving a list of all users.

- **Find with Condition**:
  Finds documents that match a certain condition (e.g., age ≥ 21).
  ```js
  db.collectionName.find({ "age": { $gte: 21 } });
  ```
  *Use case*: Used when filtering data based on conditions, such as finding all users over a certain age.

---

### **03. Projection**

- **Include Specific Fields**:
  Retrieves only specified fields from matched documents.
  ```js
  db.collectionName.find(
    { "age": { $gte: 21 } },
    { "name": 1, "age": 1 }  // Only include "name" and "age"
  );
  ```
  *Use case*: When you only need specific information, like just names and ages, instead of all fields.

- **Exclude Specific Fields**:
  Omits specific fields from the result set.
  ```js
  db.collectionName.find(
    { "age": { $gte: 21 } },
    { "courses": 0 }  // Exclude "courses" field
  );
  ```
  *Use case*: When certain fields, like sensitive or large data, should be excluded.

---

### **04. Comparison Operator**

- **Greater Than ($gt)**:
  Finds documents where the value of a field is greater than a given number.
  ```js
  db.collectionName.find({ "age": { $gt: 20 } });
  ```
  *Use case*: For scenarios like finding people over a specific age.

- **Less Than or Equal ($lte)**:
  Finds documents where a field is less than or equal to a value.
  ```js
  db.collectionName.find({ "age": { $lte: 25 } });
  ```
  *Use case*: Often used in filtering data within a particular range, e.g., under a specific budget.

---

### **05. Logical Query Operator**

- **AND Condition ($and)**:
  Retrieves documents that match all conditions in an array.
  ```js
  db.collectionName.find({
    $and: [
      { "age": { $gte: 20 } },
      { "courses": "Math" }
    ]
  });
  ```
  *Use case*: To get results that meet multiple criteria, like age and course enrolled.

- **OR Condition ($or)**:
  Retrieves documents that match at least one condition.
  ```js
  db.collectionName.find({
    $or: [
      { "age": { $gte: 25 } },
      { "courses": "Physics" }
    ]
  });
  ```
  *Use case*: Useful when you want to fetch documents that meet one or more conditions.

---

### **06. Element Query Operator**

- **Exists Operator ($exists)**:
  Checks whether a field exists in documents.
  ```js
  db.collectionName.find({ "courses": { $exists: true } });
  ```
  *Use case*: Useful when filtering documents that have or don't have a specific field.

- **Type Operator ($type)**:
  Filters documents based on the data type of a field.
  ```js
  db.collectionName.find({ "age": { $type: "number" } });
  ```
  *Use case*: For ensuring that data is stored in the correct type, like numbers, strings, etc.

---

### **07. Evaluation Query Operator**

- **Regular Expression ($regex)**:
  Finds documents where a field matches a regular expression (e.g., names starting with 'A').
  ```js
  db.collectionName.find({ "name": { $regex: /^A/ } });
  ```
  *Use case*: For searching text patterns, such as filtering names starting with a specific letter.

- **Text Search ($text)**:
  Performs text search on indexed string fields.
  ```js
  db.collectionName.find({ $text: { $search: "Physics" } });
  ```
  *Use case*: When performing a full-text search, like finding documents that contain a keyword.

---

### **08. Sort, Limit, Distinct, and Row Count Operators**

- **Sort**:
  Sorts the documents based on a specified field (1 for ascending, -1 for descending).
  ```js
  db.collectionName.find().sort({ "age": 1 });
  ```
  *Use case*: Used to organize data, like sorting users by their age.

- **Limit**:
  Restricts the number of documents returned.
  ```js
  db.collectionName.find().limit(5);
  ```
  *Use case*: For retrieving a specific number of records, such as the top 5 newest users.

- **Distinct**:
  Returns unique values for a specific field.
  ```js
  db.collectionName.distinct("courses");
  ```
  *Use case*: Useful for getting a list of all unique courses offered.

- **Row Count**:
  Counts the total number of documents that match the query.
  ```js
  db.collectionName.countDocuments({ "age": { $gte: 20 } });
  ```
  *Use case*: To quickly determine how many documents match a given condition, such as all users over 20.

---

