const express = require('express');
const Asset = require('../model/Asset');
const mongoose = require('mongoose')
const router = express.Router();
const User = require('../model/User');
const Transaction = require('../model/Transaction');

var ObjectId = mongoose.Types.ObjectId;

router.post('/get-dashboard', async (req, res) => {

    const { userid } = req.body;

    try {

        // if (!name || !email || !password) { return res.status(400).json({ success: false, message: 'All field is required' }) };

        const user = await User.findById(userid);

        if (user.isactive === '0') {
            return res.status(202).json({ success: true, status: 0 });
        }
        else {
            const asst = await Asset.find({ userid: new ObjectId(userid) })
            return res.status(200).json({ success: true, assets: asst });
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: 'Something went wrong!' });
    }
})


router.post('/add-assets', async (req, res) => {

    const { cash, savings, bank, userid } = req.body;

    try {

        if (!cash || !savings || !bank || !userid) { return res.status(400).json({ success: false, message: 'All field is required' }) };
        if (Number.isInteger(cash) || Number.isInteger(savings) || Number.isInteger(bank)) { return res.status(400).json({ success: false, message: 'All field must be an integer' }) };

        const user = await User.findById(userid);

        if (!user) {
            return res.status(400).json({ success: false, message: 'Something went wrong!' });
        }

        const data = new Asset({ bank, cash, savings, userid: userid });

        data.save();

        if (data) {
            const updatedUser = await User.findByIdAndUpdate(userid, { isactive: '1' });
            // updatedUser.save()
            return res.status(200).json({ success: true, data: data, user: updatedUser });
        }

        return res.status(400).json({ success: false, message: 'Something went wrong!' });

    } catch (error) {
        // console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }
})


router.post('/edit-assets', async (req, res) => {

    const { cash, savings, bank, userid } = req.body;

    try {

        if (!cash || !savings || !bank || !userid) { return res.status(400).json({ success: false, message: 'All field is required' }) };
        // if (Number.isInteger(cash) || Number.isInteger(savings) || Number.isInteger(bank)) { return res.status(400).json({ success: false, message: 'All field must be an integer' }) };

        const user = await User.findById(userid);

        if (!user) {
            return res.status(400).json({ success: true, message: 'Something went wrong!' });
        }

        const asst = await Asset.findOneAndUpdate({ userid: new ObjectId(userid) }, { cash, savings, bank });
        // const assets = await Asset.findByIdAndUpdate(new ObjectId(asst[0]._id), { cash, savings, bank });
        // const data = new Asset({ bank, cash, savings, userid: userid });


        if (asst) {
            return res.status(200).json({ success: true, data: asst, message: 'Assets updated successfully!' });
        }

        return res.status(400).json({ success: false, message: 'Something went wrong!' });

    } catch (error) {
        // console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }
})



router.post('/make-transaction', async (req, res) => {

    const { amount, category, description, from, userid } = req.body;

    try {

        if (!amount || !category || !description || !from) { return res.status(400).json({ success: false, message: 'All field is required' }) };

        const user = await User.findById(userid);

        if (!user) {
            return res.status(400).json({ success: true, message: 'Something went wrong!' });
        }

        if (!user.categories.includes(category)) {
            user.categories.push(category);
            user.save();
        }

        const asst = await Asset.findOne({ userid: new ObjectId(userid) });

        if (asst[from] < amount) {
            return res.status(400).json({ success: false, message: 'Insufficient Balance!' });
        }

        asst[from] -= amount;

        asst.save();

        const data = new Transaction({ amount, category, description, paid_from: from, userid: userid });

        data.save();

        // const asst = await Asset.findOneAndUpdate({ userid: new ObjectId(userid) }, { cash, savings, bank });

        // if (asst) {
        //     return res.status(200).json({ success: true, data: asst, message: 'Assets updated successfully!' });
        // }

        return res.status(200).json({ success: true, message: 'Transaction Successfully!', user, assets: asst });

    } catch (error) {
        // console.log(error);
        res.status(400).json({ success: false, message: error.message });
    }
})



router.post('/edit-transaction', async (req, res) => {

    const { amount, category, description, from, userid, transactionid } = req.body;

    try {

        if (!amount || !category || !description || !from) { return res.status(400).json({ success: false, message: 'All field is required' }) };

        const user = await User.findById(userid);

        if (!user) {
            return res.status(400).json({ success: true, message: 'Something went wrong!' });
        }

        if (!user.categories.includes(category)) {
            user.categories.push(category);
            user.save();
        }

        const asst = await Asset.findOne({ userid: new ObjectId(userid) });

        if (asst[from] < amount) {
            return res.status(400).json({ success: false, message: 'Insufficient Balance!' });
        }

        asst[from] -= amount;

        asst.save();

        await Transaction.findByIdAndUpdate(transactionid, { amount, category, description, paid_from: from, userid: userid });

        return res.status(200).json({ success: true, message: 'Transaction Successfully!', user, assets: asst });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
})


router.post('/get-transactions', async (req, res) => {

    const { userid } = req.body;

    try {

        const user = await User.findById(userid);

        if (!user) {
            return res.status(400).json({ success: true, message: 'Something went wrong!' });
        }

        const data = await Transaction.find({ userid: new ObjectId(userid) });

        return res.status(200).json({ success: true, data });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
})

router.post('/delete-transaction', async (req, res) => {

    const { data } = req.body;

    try {
        const deleted = await Transaction.findByIdAndRemove(new ObjectId(data));
        return res.status(200).json({ success: true, id: deleted._id });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
})




module.exports = router