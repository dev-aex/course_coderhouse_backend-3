import { usersService } from '../services/index.js';

const getAllUsers = async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.send({ status: 'success', payload: users });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user)
      return res.status(404).send({ status: 'error', error: 'User not found' });
    res.send({ status: 'success', payload: user });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const updateBody = req.body;
  const userId = req.params.uid;
  try {
    const user = await usersService.getUserById(userId);

    if (!user)
      return res.status(404).send({ status: 'error', error: 'User not found' });

    await usersService.updateUserById(userId, updateBody);
    const updatedUser = await usersService.getUserById(userId);

    res.send({
      status: 'success',
      message: 'User updated',
      payload: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;
  try {
    const result = await usersService.deleteUserById(userId);
    res.send({ status: 'success', message: 'User deleted', payload: result });
  } catch (error) {
    next(error);
  }
};

export default {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
};
