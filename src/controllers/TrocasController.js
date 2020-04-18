import Troca from "../models/Troca";
import Pedido from "../models/Pedido";
import Cliente from "../models/Cliente";
import Produto from '../models/Produto';

class EnderecoController {

    async index(req, res) {
        const { user_id } = req.params;

        const trocas = await Troca.findAll({
            where: { user_id },
            include: [
                {
                    model: Produto,
                    as: 'produto'
                },
                {
                    model: Pedido,
                    as: 'pedido'
                }
            ]
        })

        if (!trocas) {
            return res.status(401).json({ error: "Nenhuma solicitação encontrado" });
        }

        return res.status(200).json(trocas);
    }

    async show(req, res) {
        const trocas = await Troca.findAll({
            include: [
                {
                    model: Produto,
                    as: 'produto'
                },
                {
                    model: Pedido,
                    as: 'pedido'
                }
            ]
        })

        if (!trocas) {
            return res.status(401).json({ error: "Nenhuma solicitação encontrado" });
        }

        return res.status(200).json(trocas);
    }

    async store(req, res) {
        const { tipo, motivo, status, descricao, produto_id, pedido_id } = req.body;

        const { user_id } = req.params;

        const userExists = await Cliente.findByPk(user_id);

        if (!userExists) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        const trocaExists = await Troca.findOne({ where: { produto_id, pedido_id } })

        if (trocaExists) {
            return res.status(400).json({ error: "Já existe uma solicitação para esse pedido" });
        }

        const troca = await Troca.create({
            user_id,
            produto_id,
            pedido_id,
            descricao,
            tipo,
            status: 'pendente',
            motivo
        }).catch(e => res.status(400).json({ error: 'erro ao processar' }))

        return res.status(200).json({ troca });
    }

    async update(req, res) {
        const { status } = req.body;

        const { user_id, troca_id } = req.params;

        const userExists = await Cliente.findByPk(user_id);

        if (!userExists) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        const troca = await Troca.update({
            status,
        }, {
            where: { id: troca_id }
        });

        return res.status(200).json({ troca });
    }
}

export default new EnderecoController();