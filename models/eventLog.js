const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./coupon").sequelize;  // 기존의 sequelize 인스턴스를 재사용

const EventLog = sequelize.define("EventLog", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  eventType: {
    type: DataTypes.ENUM,
    values: ['start_click', 'save_click', 'rejoin_click'],
    allowNull: false,
  },
  eventTime: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
}, {
  tableName: 'EventLog',  // 이미 생성된 테이블과 연결
  timestamps: false,  // createdAt, updatedAt 칼럼 사용 안 함
});

module.exports = EventLog;