var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var schema = new Schema({
  user:{type:Schema.Types.ObjectId, ref:'User'},
  cart:{type:Object, required:true},
  date:{type:Date, required:true},
  total:{type:String, required:true},
  name:{type:String, required:true},
  address:{type: String,required:true},
    cardname:{type: String,required:true},
  cardnumber:{type: Number,required:true},
 expirationmonth:{type: Number,required:true},
  expirationyear:{type: Number,required:true},
  cvc:{type: Number,required:true} 
});

module.exports = mongoose.model('Order', schema);