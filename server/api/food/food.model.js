'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './food.events';

var FoodSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  lastName:String
});

registerEvents(FoodSchema);
export default mongoose.model('Food', FoodSchema);
