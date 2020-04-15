import Cliente from "../models/Cliente";
import Telefone from "../models/Telefone";
import Endereco from "../models/Endereco";
import Cartao from "../models/Cartao";
import Pedido from '../models/Pedido';
import Produto from '../models/Produto';

class UserController {
    async store(req, res) {
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

        return res.status(200).json({ user, tel, endereco });
    }

    async index(req, res) {
        const { user_id } = req.params;

        const user = await Cliente.findByPk(user_id, {
            include: [{
                model: Endereco,
                as: 'enderecos'
            },
            {
                model: Telefone,
                as: 'telefones'
            },
            {
                model: Cartao,
                as: 'cartoes'
            },
            {
                model: Pedido,
                as: 'pedidos',
                include: [
                    {
                        model: Produto,
                        as: 'itens'
                    },
                    {
                        model: Cartao,
                        as: 'cartoes'
                    }
                ]
            }
            ]
        });

        if (!user) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        return res.status(200).json(user);
    }
}

export default new UserController();