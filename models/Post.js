import { DataTypes } from "sequelize";
import User from "./User.js"; // Import the User model
import sequelize from "../db/index.js";

const Post = sequelize.define("Post", {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: User, // Reference the User model
			key: 'id', // Foreign key referencing User.id
		}
	}
});

Post.sync();

export default Post;
