class welomeController{
    static async welcome(req,res){
        return res.status(200).send({message:"welcome to my web"});
    }
}
export default welomeController;