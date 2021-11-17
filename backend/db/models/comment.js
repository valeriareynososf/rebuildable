"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
    },
    {}
  );
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.User, { foreignKey: "user_Id" });
    Comment.belongsTo(models.Post, { foreignKey: "postId" });
  };
  return Comment;
};

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Comment extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   Comment.init({
//     userId: DataTypes.INTEGER,
//     postId: DataTypes.INTEGER,
//     content: DataTypes.TEXT
//   }, {
//     sequelize,
//     modelName: 'Comment',
//   });
//   return Comment;
// };
