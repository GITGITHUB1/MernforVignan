const bcrypt=require('bcryptjs');

const hashPassword=async(password)=>{
    try{
        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    }
    catch(err){
        console.log(err);
        
    }

}

module.exports={
    hashPassword:hashPassword
}