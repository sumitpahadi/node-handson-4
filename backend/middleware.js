const jwt=require('jsonwebtoken')
const userauth=(req,res,next)=>{
    const bearer=req.headers['authorization']
    if (bearer===undefined) {
        return res.send({msg:"No token"})
        
    }
    const token=bearer.split(" ")[1]
    console.log(token)
    if (token===undefined) {
        return res.send({msg:"user not aithorised  person pr session expired"})
        
    }

    const virify=jwt.verify(token,process.env.secretkey)
    if (virify) {
        return next()
        
    }
    console.log("not verify")
    return res.send({msg:"notauthorised for the particular resource"})
}

module.exports=userauth