const logger = require('../../logger/index');

function connection(mongoose, config, options) {
    function connectToMongo() {
        // mongoose.connect(`${mongoose_db.URI}/${mongoose_db.DB}`, { useNewUrlParser: true });
        mongoose
        .connect(config.mongoose.uri, options)
        .then(
          () => {},
          (err) => {
            console.error('Mongodb error', err);
          }
        )
        .catch((err) => {
          console.error('ERROR:', err);
        });
    }
  
    mongoose.connection.on('connected', () => {
      console.info('Connected to MongoDB!');
    });
  
    mongoose.connection.on('reconnected', () => {
      console.info('MongoDB reconnected!');
    });
  
    mongoose.connection.on('error', (error) => {
      console.error(`Error in MongoDb connection: ${error}`);
      mongoose.disconnect();
    });
  
    mongoose.connection.on('disconnected', () => {
      console.error(
        `MongoDB disconnected! Reconnecting in ${
          options.reconnectInterval / 1000
        }s...`
      );
      setTimeout(() => connectToMongo(), options.reconnectInterval);
    });
  
    return {
      connectToMongo
    };
  }
  
module.exports = connection;