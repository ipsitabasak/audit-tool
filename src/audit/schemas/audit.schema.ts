import * as mongoose from 'mongoose';

export const AuditSchema = new mongoose.Schema({
  id: String,
  name: String, 
  projectName: String, 
  reviewerId: String,
  categoryId: String,
  status: String,
  progress: Number,
  priority: String,
  creatorId: String, 
  createdOn: Date,
  modifiedOn: Date, 
  collboratorsIds: Array
});