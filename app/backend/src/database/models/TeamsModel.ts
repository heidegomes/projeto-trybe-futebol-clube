import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class TeamsModel extends Model<InferAttributes<TeamsModel>,
InferCreationAttributes<TeamsModel>> {
  declare id: CreationOptional<number>;
  declare teamName: CreationOptional<string>;
}

TeamsModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },

}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

// TeamsModel.hasMany(MatchesModel, { foreignKey: 'teamId', as: 'homeTeamId' });
// TeamsModel.hasMany(MatchesModel, { foreignKey: 'teamId', as: 'awayTeamId' });

export default TeamsModel;
/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });
