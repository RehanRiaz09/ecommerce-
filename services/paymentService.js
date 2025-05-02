import Payment from '../model/payment.js';

class PaymentCrud {
  createPayment = async (query) => {
    return await Payment.create(query);
  };
  findAll = async (query) => {
    return await Payment.find(query).populate('user', 'name email');
  };
  findPayment = async (paymentId) => {
    return await Payment.findOne(paymentId).populate('user', 'name email');
  };
  updatePayment = async (query, data) => {
    return await Payment.findByIdAndUpdate(query, data);
  };
  deletePayment = async (query) => {
    return await Payment.findByIdAndDelete(query);
  };
}

export default new PaymentCrud();
