
import userSchema from '../Moduls/Auth.UserSchema.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const Register= async(req,res)=>{
    try{
    const{name,email,password,confirmPassword}=req.body.userData;
    // const{name,email,password,confirmPassword}=req.body;

    
    if(!name || !email || !password || !confirmPassword){
        return res.send("All fields are required ")
    }

       const emailisExist=await userSchema.find({email:email})

   if(emailisExist.length){
    return res.send("email is exist")
   }

    if(password != confirmPassword){
        return res.send("password and confirmpassword are not same")
    }
    
//    const hashpossword= await bcrypt.hashSync(password,10)

    const user =new userSchema({
        name:name,
        email:email,
        password: password
    })
    await user.save()
    return res.json({message:"userStore Successfully", success:true})

}catch(error){
    return res.status(500).json({error})
}

}

export const Login = async(req,res)=>{
    try{
        // const {email, password}=req.body;
        const {email, password}=req.body.data;


        if(!email || !password){
            return res.status(401).json({success:false, message:"email nad password is required"})
        }

        const user=await userSchema.findOne({email:email})
        if(!user){
            return res.status(404).json({success:false, message:"email is exist"})
        }

        // const iscorrectpassword=await bcrypt.compare(password,user.password)

        // if(!iscorrectpassword){
        //     return res.status(404).json({success:false , message:"Password are not match"})
        // }
        
        const token=await jwt.sign({userId:user._id},process.env.SECRET_KEY)
        console.log(token,"token")

        return res.status(200).json({success:true, message:"login successful" , token:token,user:{userId:user._id, name:user.name, email:user.email } })
    }catch(error){
        return res.status(500).json({error})
    }
}