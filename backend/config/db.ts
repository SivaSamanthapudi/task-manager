import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  const uri = process.env['MONGODB_URI'];
  if (!uri) throw new Error('MONGODB_URI is not defined in environment variables');

  await mongoose.connect(uri)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));;
};
