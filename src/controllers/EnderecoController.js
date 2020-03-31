import Endereco from "../models/Endereco";
import Cliente from "../models/Cliente";

class EnderecoController{
    async store(req, res){
        const { user_id } = req.params;

        const { cep, rua, numero, bairro, complemento, cidade, estado, pais } = req.body;

        const user = await Cliente.findByPk(user_id);

        if(!user){
            return res.status(400).json({ error: "User not found"});
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

        return res.json(endereco);
    }
}

export default new EnderecoController();