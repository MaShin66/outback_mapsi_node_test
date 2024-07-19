const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("db", "user", "user", {
  host: "db",
  dialect: "mysql",
  logging: false,
});

const Coupon = sequelize.define("Coupon", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  isIssued: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  issuedAt: {
    type: DataTypes.DATE,
  },
  usedAt: {
    type: DataTypes.DATE,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  couponType: {
    type: DataTypes.ENUM,
    values: ['type1', 'type2', 'type3', 'type4'],
    allowNull: false,
  },
}, {
  tableName: 'Coupon',  // 이미 생성된 테이블과 연결
  timestamps: false,  // createdAt, updatedAt 칼럼 사용 안 함
});

module.exports = { Coupon, sequelize };
