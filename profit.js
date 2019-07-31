require('./connection')
const mongoose = require('mongoose');
var Users = mongoose.model('user');

Users.find({ agent: '5cdecb9971faf51a09a8fc61', userType: 'SUBAGENTS' }).then(async response => {
    for (res of response) {
        var profitAmount = (0.22 * parseFloat(res.totalAmount));

        console.log(profitAmount);

        res.profitAmount = profitAmount;

        await res.save();
    }

}).catch(err => {
    console.log(err);
})