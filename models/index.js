import sequelize from "../db/index.js";
import User from "./User.js";
import Post from "./Post.js";

User.hasMany(Post, {
	foreignKey: {
		allowNull: false,
		name: "userId", //change to "id" instead of "UserId" - automatic naming in neon
	},
});
Post.belongsTo(User, {
	foreignKey: { allowNull: false, name: "userId" }, //change to "id"
	onDelete: "CASCADE",
});

sequelize.sync();

export { Post, User };
