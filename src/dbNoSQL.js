const mongoose = require('mongoose');
const connectdbNoSQL = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI, {
            //useUnifieldTopology:true,
            useNewUrlParser: true
        })
            .then(db => console.log("Database is connected to ", db.connection.name))
            .catch(err => console.log(err));
    } catch (error) {
        console.log(error);
    }
};


module.exports = {connectdbNoSQL};