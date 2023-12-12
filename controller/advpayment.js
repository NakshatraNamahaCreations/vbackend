const advPaymentModal = require("../model/advpayment");

class advPayment {
  async advPayment(req, res) {
    try {
      let {
        paymentDate,
        paymentMode,
        amount,
        Comment,
        userID,
        EnquiryId,
      } = req.body;
      if (!paymentDate || !paymentMode || !amount) {
        return res.status(500).json({ error: "Field must not be empty" });
      } else {
        let add = new advPaymentModal({
          paymentDate,
          paymentMode,
          amount,
          Comment,
          userID,
          EnquiryId,
        });
        let savedPayment = add.save();
        if (savedPayment) {
          return res
            .status(200)
            .json({ success: "Payment added successfully" });
        }
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: "An error occurred while adding payment" });
    }
  }

  async getPaymentByCustomerId(req, res) {
    try {
      const customerId = req.params.customerId;

      // Check if the customerId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(customerId)) {
        return res.status(400).json({ error: 'Invalid customer ID' });
      }

      // If it's a valid ObjectId, convert it to ObjectId type
      const customerIdObjectId = mongoose.Types.ObjectId(customerId);

      const payments = await advPaymentModal.find({ userID: customerIdObjectId });

      if (!payments || payments.length === 0) {
        return res.status(404).json({ error: 'Payment details not found' });
      }

      return res.status(200).json({ payments });
    } catch (error) {
      console.error('An error occurred:', error);
      return res
        .status(500)
        .json({ error: 'An error occurred', message: error.message });
    }
  }
}

const advpaymentController = new advPayment();
module.exports = advpaymentController;
