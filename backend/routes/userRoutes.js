const router=require('express').Router();
const {register, login}=require('../controllers/authController');
const{getAlluser, getOneUser, deleteUser}=require('../controllers/userController');

router.post('/register',register);
router.post('/login',login);
router.get('/getAllUser',getAlluser);
router.get('/getUser/:userId',getOneUser);
router.delete('/deleteuser/:userId',deleteUser);
module.exports=router;