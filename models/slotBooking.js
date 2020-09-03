const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SlotSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
});

module.exports = User = mongoose.model("slotsbooking", SlotSchema);