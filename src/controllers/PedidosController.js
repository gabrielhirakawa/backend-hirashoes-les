import uuid from 'uuid-random';
import Cliente from "../models/Cliente";
import Pedido from "../models/Pedido";
import Itens_pedidos from "../models/Itens_pedidos";
import Pedidos_Cartoes from '../models/Pedidos_Cartoes';
import Cartao from '../models/Cartao';


class PedidosController {
    async store(req, res) {
        const { user_id, endereco_id, produtos, frete, cartoes, total_com_desconto, tipo, total, desconto } = req.body;

        const user = await Cliente.findByPk(user_id);

        if (!user) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }


        const pedido = await Pedido.create({
            codigo: `${uuid()}`,
            status: 'aprovado',
            tipo: 'cartao',
            frete,
            desconto,
            total,
            total_com_desconto,
            user_id,
            endereco_id,

        }).catch(e => {
            return res.status(401).json({ error: "Erro ao finalizar pedido" });
        });


        produtos.map(async (item) => {
            await Itens_pedidos.create({
                quantidade: item.quantidade,
                produto_id: item.produto_id,
                pedido_id: pedido.id,
            }).catch(e => {
                return res.status(401).json({ error: "Erro ao cadastrar produtos do pedido" });
            });
        });

        if (tipo === 'cartao') {

            cartoes.map(async (item) => {
                await Pedidos_Cartoes.create({
                    valor: item.valor,
                    cartao_id: item.cartao_id,
                    pedido_id: pedido.id,
                }).catch(e => {
                    return res.status(401).json({ error: "Erro ao cadastrar cartoes do pedido" });
                });
            });
        }

        return res.status(200).json({ pedido });


    }

    async index(req, res) {

        const pedidos = await Pedido.findAll();

        if (!pedidos) {
            return res.status(401).json({ error: "Ops.. nenhum pedido encontrado" });
        }

        return res.status(200).json(pedidos);
    }

    async show(req, res) {

        const { id } = req.params;

        const pedido = await Pedido.findOne({
            where: { id }
        })

        if (!pedido) {
            return res.status(401).json({ error: "Ops.. nenhum pedido encontrado" });
        }

        const cartoesBanco = await Pedidos_Cartoes.findAll({
            where: { pedido_id: id }
        });

        let cartoesbusca = [];

        for (let i = 0; i < cartoesBanco.length; i++) {
            const card = await Cartao.findByPk(cartoesBanco[i].cartao_id);
            cartoesbusca.push(card)
        }


        const cartoes = cartoesbusca;

        return res.status(200).json({ pedido, cartoes });
    }
}

export default new PedidosController();