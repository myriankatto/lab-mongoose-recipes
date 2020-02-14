const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data'); // Import of the data from './data.json'

const MONGODB_URI = 'mongodb://localhost/recipeApp';

// Connection to the database "recipeApp"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    //before adding any docuemnts to the database, deleteall previous entries
    return self.connection.dropDatabase();
  })

  .then(() => {
    // Run your code here, after you have insured that the connection was made

    return Recipe.create({
      title: 'Spring Herb Frittata',
      level: 'Amateur Chef',
      ingredients: [
        ' 1/4 c. crème fraîche, at room temperature',
        '2 tbsp. chopped chives',
        '6 large eggs',
        '6 scallions, cut into 1-in. pieces',
        '2 c. flat-leaf parsley leaves, plus more for sprinkling',
        '2 c. cilantro leaves and tender stems, plus more for sprinkling',
        '1/2 c. dill fronds, plus more for sprinkling',
        '2 tbsp. tarragon leaves, plus more for sprinkling',
        '4 tbsp. olive oil, divided',
        'Kosher salt and pepper '
      ],
      cuisine: 'Vegan',
      dishType: 'Dish',
      image:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spring-herb-frittata-ghk-0519-1556562555.jpg',
      duration: 40,
      creator: 'THE GOOD HOUSEKEEPING TEST KITCHEN',
      created: new Date()
    });
  })

  .then(recipeDocument => {
    console.log(recipeDocument.title);
  })

  .then(() => {
    return Recipe.insertMany(data);
  })

  .then(() => {
    return Recipe.find({}, { title: 1, _id: 0 });
  })

  .then(allRecipes => {
    console.log(allRecipes);
  })

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { $set: { duration: 100 } }
    );
  })

  .then(() => {
    console.log('Rigatoni alla Genovese duration updated');
  })

  .then(() => {
    return Recipe.findOneAndDelete({ title: 'Carrot Cake' });
  })

  .then(() => {
    console.log('Carrot Cake is deleted');
  })

  .catch(error => {
    console.error('Error connecting to the database', error);
  })

  .finally(() => {
    return mongoose.disconnect();
  })

  .then(() => {
    console.log('Disconnected to the database');
  });
