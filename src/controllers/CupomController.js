import Cupom from "../models/Cupom";

class CupomController{
    async store(req, res){
     
    }

    async index(req, res){

        const { codigo } = req.params;
         
        const cupom = await Cupom.findOne({
            where: {
                codigo
            }
        });

        if(!cupom){
            return res.json({ error: "Cupom não encontrado" })  
        }

        return res.json(cupom)
    }
}


export default new CupomController();