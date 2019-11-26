const mongoose = require('mongoose');
const Recipe = mongoose.model('Recipe');
const { StringDecoder } = require('string_decoder');
const { parseRecipe } = require('./helpers/parsers');
require('isomorphic-fetch');

const decoder = new StringDecoder('utf8');

exports.findAll = function(req, res) {
  Recipe.find({}, function(err, results) {
    return res.send(results);
  });
};

exports.findById = (req, res) => {
  const { id, campbellsId } = req.params;
  Recipe.findOne({ _id: id }, (err, json) => {
    if (err) {
      return err
    };
    console.log(json)
    return res.send(json);
  });
};

exports.findOneAndUpdate = (recipe) => {
  const { id, campbellsId } = recipe;
  Recipe.findOneAndUpdate({campbellsId: campbellsId}, recipe, {upsert: true, new: true}, 
    (err, doc) => {

    })
}

exports.add = function(req, res) {
  console.log(req);
  Recipe.update(req.body, { upsert: true, new: true }, function(err, recipe) {
    if (err) return console.log(err);
    return res.send(recipe);
  });
};

exports.update = (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  Recipe.findByIdAndUpdate(id, req.body, { new: true }, (err, response) => {
    if (err) return console.log(err);
    res.send(response);
  });
};

exports.delete = function(req, res) {
  let id = req.params.id;
  console.log(req);
  Recipe.deleteOne({ _id: id }, (err, data) => {
    if (err) return console.log(err);
    return res.send(data)
  });
};

exports.killall = function(req, res) {
  Recipe.deleteMany({}, err => {
    if (err) return console.log(err);
    return res.status(200);
  });
};

exports.upload = function(req, res) {
  console.log(req.files);
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let file = req.files.file;
  file.mv(`./public/img/${req.body.filename}`, err => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ file: `public/img/${req.body.filename}` });
    console.log(res.json);
  });
};

const updateRecipe = (recipe) => {
  // console.log('recipe:', recipe) 
  const {id, campbellsId} = recipe;
  const update = Recipe.update ({campbellsId: campbellsId}, recipe, { upsert: true, new: true }, 
    (err, obj) => {
      if( err ) { console.log(err); }
      return obj;
    }
  )
  return update ? true : false;
  // .catch(() => false);
}
const fetchRecipes = (req, res) => {
  // console.log(req)
  // curl -X GET --header "Accept: application/json" --header "api-key: 123" "https://services.campbells.com/api/Recipes//recipe?pageIndex=0&limit=100"
  const { fetchLimit } = req.params
  fetch(
    `https://services.campbells.com/api/Recipes//recipe?pageIndex=0&limit=${fetchLimit || 20}&offset=50`,
    {headers: {Accept: 'application/json', 'api-key': 1}})
    .then(response => {
      if (response && response.status != 200) {
        // this.setState({ stories: [], isLoading: false })
        console.log('error')
        return;
      } 
      response.json().then(data => {
        // console.log('data', data)
        const result = data.Result.map((recipe => {
          const parsedRecipe = parseRecipe(recipe);
          // console.log('parsedRecipe:', parsedRecipe);
          const res = updateRecipe(parsedRecipe)
        }));
        return result
      })
      .catch(err => console.log(err))
      // response.json().then(data => this.setState({ stories: data.results, isLoading: false }))
    })
    .then((err, obj) => obj)
    .catch(error => console.log(error))
}

// const oldImport = function(req, res) {
//   Recipe.create(
//     {
//       title: 'Lasagna',
//       description:
//         'Lasagna noodles piled high and layered full of three kinds of cheese to go along with the perfect blend of meaty and zesty, tomato pasta sauce all loaded with herbs.',
//       image: 'lasagna.png',
//       ingredients: ['salt', 'honey', 'sugar', 'rice', 'walnuts', 'lime juice'],
//       preparation: [
//         { step: 'Boil water' },
//         { step: 'Fry the eggs' },
//         { step: 'Serve hot' },
//       ],
//     },
//     {
//       title: 'Pho-Chicken Noodle Soup',
//       description:
//         'Pho (pronounced "fuh") is the most popular food in Vietnam, often eaten for breakfast, lunch and dinner. It is made from a special broth that simmers for several hours infused with exotic spices and served over rice noodles with fresh herbs.',
//       image: 'pho.png',
//       ingredients: ['salt', 'honey', 'sugar', 'rice', 'walnuts', 'lime juice'],
//       preparation: [
//         { step: 'Boil water' },
//         { step: 'Fry the eggs' },
//         { step: 'Serve hot' },
//       ],
//     },
//     {
//       title: 'Guacamole',
//       description:
//         'Guacamole is definitely a staple of Mexican cuisine. Even though Guacamole is pretty simple, it can be tough to get the perfect flavor - with this authentic Mexican guacamole recipe, though, you will be an expert in no time.',
//       image: 'guacamole.png',
//       ingredients: ['salt', 'honey', 'sugar', 'rice', 'walnuts', 'lime juice'],
//       preparation: [
//         { step: 'Boil water' },
//         { step: 'Fry the eggs' },
//         { step: 'Serve hot' },
//       ],
//     },
//     {
//       title: 'Hamburger',
//       description:
//         'A Hamburger (often called a burger) is a type of sandwich in the form of  rounded bread sliced in half with its center filled with a patty which is usually ground beef, then topped with vegetables such as lettuce, tomatoes and onions.',
//       image: 'hamburger.png',
//       ingredients: ['salt', 'honey', 'sugar', 'rice', 'walnuts', 'lime juice'],
//       preparation: [
//         { step: 'Boil water' },
//         { step: 'Fry the eggs' },
//         { step: 'Serve hot' },
//       ],
//     },
//     function(err) {
//       if (err) return console.log(err);
//       return res.sendStatus(202);
//     },
//   );
// };


exports.import = fetchRecipes;