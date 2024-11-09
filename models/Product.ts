import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelizeClient';

class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public description!: string;
}

Product.init(
  {
    id : {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Product',
  }
);

export default Product;
