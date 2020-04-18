import Cupom from "../models/Cupom";

class CupomController{
    async store(req, res){

        const { tipo, codigo, valor } = req.body;

        const cupom = await Cupom.create({
            tipo,
            codigo,
            valor: Number(valor),
            status: 'ativo'
        });

        return res.json(cupom);
     
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