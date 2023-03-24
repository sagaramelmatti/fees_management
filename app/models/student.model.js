module.exports = (sequelize, Sequelize) => {
    const Student = sequelize.define("student", {

        id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},
        rollNo: {
            allowNull: false,
            type: Sequelize.STRING
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        contactNo: {
            allowNull: false,
            type: Sequelize.STRING
        },
        dob: {
            type: Sequelize.DATEONLY
        },
		paidAmt: {
            type: Sequelize.INTEGER
        },
		remAmt: {
            type: Sequelize.INTEGER
        }
    });
  
    return Student;
  };