import express from 'express';
import { DataTypes, Sequelize } from 'sequelize';
const sequelize = new Sequelize(process.env.PG_URI);

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

User.sync();

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      body: { firstName, lastName, email }
    } = req;
    if (!firstName || !lastName || !email)
      return res.status(400).json({ error: 'firstName, lastName, and email are required' });
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      body: { firstName, lastName, email },
      params: { id }
    } = req;
    if (!firstName || !lastName || !email)
      return res.status(400).json({ error: 'firstName, lastName, and email are required' });
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const {
      params: { id }
    } = req;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.get('/users', getUsers);
app.post('/users', createUser);
app.get('/users/:id', getUserById);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

app.listen(port, () => console.log(`Server is running on port ${port}`));
