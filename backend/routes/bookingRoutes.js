const { addBooking, getBooking ,getOneUserBooking, deleteBooking, statusUpdate, filterStatus, filterUser} = require('../controllers/bookingController');

const router=require('express').Router();

router.post('/addbooking',addBooking);
router.get('/getbooking',getBooking);
router.get('/getOneuserbooking/:userId',getOneUserBooking);
router.delete('/deletebooking/:userId',deleteBooking);
router.patch('/updatestatus/:id',statusUpdate);
router.get('/filter/status',filterStatus);
router.get('/filter/status/:userId',filterUser);

module.exports=router;