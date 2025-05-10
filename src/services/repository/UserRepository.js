import GenericRepository from './GenericRepository.js';

export default class UserRepository extends GenericRepository {
  constructor(dao) {
    super(dao);
  }

  getUserByEmail = (email) => {
    return this.getBy({ email });
  };
  getUserById = (id) => {
    return this.getBy({ _id: id });
  };
  updateUserById = (id, doc) => {
    return this.update(id, doc);
  };
  deleteUserById = (id) => {
    return this.delete({ _id: id });
  };
}
