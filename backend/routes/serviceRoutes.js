const router=require('express').Router();
const{addService,updateService,deleteService,getService}=require('../controllers/serviceController');

router.post('/addservice',addService);
router.patch('/updateservice/:id',updateService);
router.delete('/deleteservice/:id',deleteService);
router.get('/getservice',getService);

module.exports=router;

