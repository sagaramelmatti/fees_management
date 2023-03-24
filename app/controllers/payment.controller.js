const db = require("../models");
const Payment = db.payments;
const Student = db.students;
const Op = db.Sequelize.Op;

// Create and Save a new Payment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.paymentAmount) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Payment
  const payment = {
    paymentDate: req.body.paymentDate,
    paymentAmount: req.body.paymentAmount,
    remAmt: req.body.remAmt,
    studentId: req.body.studentId,
  };

  // Save Payment in the database
  Payment.create(payment)
    .then(data => {
			const student = {
				paidAmt: req.body.paidAmt,
				remAmt: req.body.remAmt
			};
		
			Student.update(student, {
				where: { id: req.body.studentId }
			  })
			.then(num => {
			  if (num == 1) {
				  console.log("Student Paid & Remainng Amount updated successfully.");
			  } else {
				  console.log("Cannot update Student with id=${req.body.studentId}. Maybe Student was not found or req.body is empty!");
			  }
			})
			.catch(err => {
			  res.status(500).send({
				message: "Error updating Student with id=" + req.body.studentId
			  });
			});
  
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Payment."
      });
    });
};

// Retrieve all Payments from the database.
exports.findAll = (req, res) => {
  //const rollNo = req.query.studentId;
  //var condition = studentId ? { studentId: { [Op.like]: `%${studentId}%` } } : null;

  //Payment.findAll({ where: condition })
  Payment.findAll({
    include: [
      {
          model: Student,
          as: "student",
          attributes: ["name"]
      },
  ],
   })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving payments."
      });
    });
};

// Find a single Payment with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Payment.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Payment with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Payment with id=" + id
      });
    });
};

// Update a Payment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Payment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Payment was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Payment with id=${id}. Maybe Payment was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Payment with id=" + id
      });
    });
};

// Delete a Payment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Payment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Payment was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Payment with id=${id}. Maybe Payment was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Payment with id=" + id
      });
    });
};

// Delete all Payments from the database.
exports.deleteAll = (req, res) => {
  Payment.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Payments were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all payments."
      });
    });
};