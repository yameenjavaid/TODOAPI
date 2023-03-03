const logger = require('../../infrastructure/logger/index');
const adapter = require('../../infrastructure/database/useradapter');
const User = require('../../domain/entities/user');
class userService{

    constructor(storeType) {
        //services have adapter
        this.store = new adapter(storeType);
    }

    async find() {
        try {
          return await this.store.find();
        } catch (error) {
          console.error(`Error finding records: ${error.message}`);
          throw new Error(`Error finding records: ${error.message}`);
        }
      }
      
      async findOne(params) {
        try {
          return await this.store.findByOne(params);
        } catch (error) {
          console.error(`Error finding record: ${error.message}`);
          throw new Error(`Error finding record: ${error.message}`);
        }
      }
      
      async findbyid(id) {
        try {
          return await this.store.findbyid(id);
        } catch (error) {
          console.error(`Error finding record by ID: ${error.message}`);
          throw new Error(`Error finding record by ID: ${error.message}`);
        }
      }
      
      async create(username, email, password, createdAt) {
        try {
          
          if (!username || !password || !email) {
            throw new Error('username, password and email fields cannot be empty');
          }
          const newUser = User.create(User.makeid(), username, password, email, false, null, 'email', createdAt);
          const userWithUsername = await this.store.findByProperty({ username });
          if (userWithUsername.length) {
            throw new Error(`User with username: ${username} already exists`);
          }
          const userWithEmail = await this.store.findByProperty({ email });
          if (userWithEmail.length) {
            throw new Error(`User with email: ${email} already exists`);
          }


          return await this.store.create(newUser);
        } catch (error) {
          console.error(`Error creating user: ${error.message}`);
          throw new Error(`Error creating user: ${error.message}`);
        }
      }
      
      async update() {
        try {
          throw new NotImplementedError();
        } catch (error) {
          console.error(`Error updating user: ${error.message}`);
          throw new Error(`Error updating user: ${error.message}`);
        }
      }
      
      async delete() {
        try {
          throw new NotImplementedError();
        } catch (error) {
          console.error(`Error deleting user: ${error.message}`);
          throw new Error(`Error deleting user: ${error.message}`);
        }
      }
      
}


module.exports = userService;