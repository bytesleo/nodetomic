/**
 * many
 *
 * @param {*} model
 * @param {*} data
 */
const many = async (model, data) => {
  try {
    await model.insertMany(data);
    console.log('->Seed Success: ', model.collection.collectionName);
  } catch (error) {
    console.error(new Error(error));
  }
};

/**
 * once
 *
 * @param {*} model
 * @param {*} data
 */
const once = async (model, data) => {
  try {
    await model.create(data);
    console.log('->Seed Success: ', model.collection.collectionName);
  } catch (error) {
    console.error(new Error(error));
  }
};

export { many, once };
