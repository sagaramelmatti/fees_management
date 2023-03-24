module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payment", {

        id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
        paymentDate: {
            allowNull: false,
            type: Sequelize.DATEONLY
        },
		paymentAmount: {
            type: Sequelize.INTEGER
        },
		remAmt: {
            type: Sequelize.INTEGER
        },
        studentId: {
            type: Sequelize.INTEGER
        }
    });
  
    return Payment;
  };