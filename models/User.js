import { DataTypes } from "sequelize";
import sequelize from "../db/index.js";

const User = sequelize.define("User", {
	firstName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
});

User.sync(); //create table if not existing

export default User;
