import mongoose from 'mongoose';

const ServicesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  state: {
    type: Boolean,
    default: true
  }
});

const ServicesModel = mongoose.model('Service', ServicesSchema);

export default ServicesModel;
