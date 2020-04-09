import Cliente from "../models/Cliente";
import Telefone from "../models/Telefone";
import Endereco from "../models/Endereco";

class UserController{
    async store(req, res){
        const { nome, sobrenome, email, telefone, cpf, password } = req.body;
        const { cep, rua, numero, bairro, complemento, cidade, estado, pais } = req.body;

        // valida se ja existe usuario com esse email
        const emailExists = await Cliente.findOne({
            where: { email }
        });

        if (emailExists) {
            return res.status(401).json({ error: "Um usuário já cadastrado com esse e-mail" });
        }

        // valida se ja existe usuario com esse cpf
        const cpfExists = await Cliente.findOne({
            where: { cpf }
        });

        if (cpfExists) {
            return res.status(401).json({ error: "Um usuário já cadastrado com esse cpf" });
        }


        const user = await Cliente.create({
            nome,
            sobrenome,
            email,
            cpf,
            password,
            status: "ativo"
        });

        const { id } = user;

        const endereco = await Endereco.create({
            user_id: id,
            cep,
            rua, 
            numero, 
            bairro, 
            complemento, 
            cidade, 
            estado, 
            pais
        });

        const tel = await Telefone.create({
            user_id: id,
            numero: telefone, 
        });

        return res.status(200).json({user, tel, endereco});
    }
}

export default new UserController();