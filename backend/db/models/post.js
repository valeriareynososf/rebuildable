"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: DataTypes.STRING,
      imgUrl: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      details: DataTypes.TEXT,
      instructions: DataTypes.TEXT,
    },
    {}
  );
  Post.associate = function (models) {
    // associations can be defined here
    Post.belongsTo(models.User, { foreignKey: "userId" });
    Post.hasMany(models.Comment, { foreignKey: "postId" });
  };
  return Post;
};
