const { Schema, model } = require('mongoose');

const siteSchema = new Schema({
  name: String,
  featured: {
    required: true,
    type: Array,
    default: []
  },
  siteInfo: {
    required: true,
    type: Array,
    default: []
  }
});
const Site = model('Site', siteSchema);
module.exports = { Site };
