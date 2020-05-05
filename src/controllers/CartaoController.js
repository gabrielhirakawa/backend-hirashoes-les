import Cartao from "../models/Cartao";
import Cliente from "../models/Cliente";

class CartaoController{
    async store(req, res){
        const { numero, nome_impresso, cvv, data_expiracao, bandeira } = req.body;

        const { user_id } = req.params;

        const userExists = await Cliente.findByPk(user_id);

        if(!userExists){
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        const cartao = await Cartao.create({
           user_id,
           numero,
           nome_impresso,
           cvv,
           data_expiracao,
           bandeira,
           status: true
        });

        return res.status(200).json({ cartao });
    }

    async index(req, res){
        const { user_id } = req.params;

        const cartoes = await Cartao.findAll({
            where: { user_id, status: true }
        })

        if(!cartoes){
            return res.status(401).json({ error: "Nenhum cartão não encontrado" });
        }

        return res.status(200).json(cartoes);
    }

    async delete(req, res){
        // const { numero, nome_impresso, cvv, data_expiracao, bandeira, status } = req.body;

        const { user_id, cartao_id } = req.params;

        const userExists = await Cliente.findByPk(user_id);

        if(!userExists){
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        const cartao = await Cartao.update({
            status: false
         }, {
             where: { id: cartao_id }
         });
 
         return res.status(200).json({ cartao });

    }
}

export default new CartaoController();