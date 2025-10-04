db = db.getSiblingDB("user-service");

db.createCollection("users");

db.users.insertOne({
  username: "admin",
  password: "$2b$10$Y3TyKRUr3W8u/dCw2826fu.v6xMWy/XAd/AA608USjnFO/IuQ.xm2",
});

print("✅ Database initialized successfully for user-service");
