import Endereco from "../models/Endereco";
import Cliente from "../models/Cliente";

class EnderecoController{

    async index(req, res){
        const { user_id } = req.params;

        const addresses = await Endereco.findAll({
            where: { user_id }
        })

        if(!addresses){
            return res.status(401).json({ error: "Nenhum endereço não encontrado" });
        }

        return res.status(200).json(addresses);
    }

    async store(req, res){
        const { cep, rua, numero, bairro, complemento, cidade, estado, pais } = req.body;

        const { user_id } = req.params;

        const userExists = await Cliente.findByPk(user_id);

        if(!userExists){
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        const endereco = await Endereco.create({
            user_id,
            cep,
            rua, 
            numero, 
            bairro, 
            complemento, 
            cidade, 
            estado, 
            pais
        });

        return res.status(200).json({ endereco });
    }
}

export default new EnderecoController();