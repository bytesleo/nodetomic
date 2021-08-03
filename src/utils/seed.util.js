/**
 * insert
 *
 * @param {*} model
 * @param {*} data
 */
export const insert = async (model, data) => {
  try {
    // If you don't need mongoose hooks
    // await model.insertMany(data);
    // For being able to use mongoose hooks
    for (const x of data) await model.create(x);
    console.log('->Seed Success: ', model.collection.collectionName);
  } catch (error) {
    console.error(new Error(error));
  }
};
