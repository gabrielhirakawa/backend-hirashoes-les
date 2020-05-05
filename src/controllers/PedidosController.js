import uuid from 'uuid-random';
import Cliente from "../models/Cliente";
import Pedido from "../models/Pedido";
import Itens_pedidos from "../models/Itens_pedidos";
import Pedidos_Cartoes from '../models/Pedidos_Cartoes';
import Cartao from '../models/Cartao';
import Produto from '../models/Produto';
import Cupom from '../models/Cupom';
import CupomTroca from '../models/CupomTroca';


class PedidosController {
    async store(req, res) {
        const { user_id, endereco_id, produtos, frete, cartoes, total_com_desconto, tipo, total, desconto, cupom } = req.body;

        const user = await Cliente.findByPk(user_id);

        if (!user) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }


        const pedido = await Pedido.create({
            codigo: `${uuid()}`,
            status: 'aprovado',
            tipo: 'cartao',
            frete,
            desconto: cupom.desconto,
            total,
            total_com_desconto,
            user_id,
            endereco_id,
            status_entrega: 'pendente',
            data_pedido: new Date()

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
                    parcelas: item.parcelas,
                    cartao_id: item.cartao_id,
                    pedido_id: pedido.id,
                }).catch(e => {
                    return res.status(401).json({ error: "Erro ao cadastrar cartoes do pedido" });
                });
            });
        }

        if (cupom.tipo === 'promocional') {
            const { quantidade } = await Cupom.findByPk(cupom.id);
            await Cupom.update({
                quantidade: quantidade - 1,
            }, {
                where: { id: cupom.id }
            })
        }

        if (cupom.tipo === 'troca') {
            await CupomTroca.update({
                utilizado: true
            }, {
                where: { id: cupom.id }
            });
        }


        return res.status(200).json({ pedido });


    }

    async index(req, res) {

        const pedidos = await Pedido.findAll({
            include: [{
                model: Produto,
                as: 'produtos',
                through: {
                    model: Itens_pedidos,
                    attributes: ['id', 'quantidade']
                }
            }]
        });

        if (!pedidos) {
            return res.status(401).json({ error: "Ops.. nenhum pedido encontrado" });
        }

        return res.status(200).json(pedidos);
    }

    async show(req, res) {

        const { id } = req.params;

        const pedido = await Pedido.findOne({
            where: { id },

            include: [
                {
                    model: Produto,
                    as: 'produtos',
                    through: {
                        model: Itens_pedidos,
                        attributes: ['id', 'quantidade']
                    }

                },
                {
                    model: Cartao,
                    as: 'cartoes'
                }
            ]
        })

        if (!pedido) {
            return res.status(401).json({ error: "Ops.. nenhum pedido encontrado" });
        }

        // const cartoesBanco = await Pedidos_Cartoes.findAll({
        //     where: { pedido_id: id },
        // });

        // let cartoesbusca = [];

        // for (let i = 0; i < cartoesBanco.length; i++) {
        //     const card = await Cartao.findByPk(cartoesBanco[i].cartao_id);
        //     cartoesbusca.push(card)
        // }


        // const cartoes = cartoesbusca;

        return res.status(200).json({ pedido });
    }

    async update(req, res){
        const { id } = req.params;
        const { status_entrega } = req.body;

        const pedido = await Pedido.findByPk(id);
        if(!pedido){
            return res.status(401).json({ error: "Pedido não encontrado" });
        }

        await Pedido.update({ status_entrega }, {
            where: { id }
        });

        return res.status(200).json({message: "Status atualizado com sucesso!"});

    }
}

export default new PedidosController();