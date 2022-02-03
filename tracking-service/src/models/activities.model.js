module.exports = function (app) {
  const modelName = 'activities';
  const mongooseClient = app.get('mongooseClient');
  const Schema = mongooseClient.Schema;
  const schema = new mongooseClient.Schema(
    {
      actionType: String,
      data: [Schema.Types.Mixed]
    },
    {
      timestamps: true
    }
  );

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
