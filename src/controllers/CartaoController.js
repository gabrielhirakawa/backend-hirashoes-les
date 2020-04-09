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
           bandeira
        });

        return res.status(200).json({ cartao });
    }
}

export default new CartaoController();