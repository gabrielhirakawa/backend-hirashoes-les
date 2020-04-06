import uuid from 'uuid-random';
import Cliente from "../models/Cliente";
import Pedido from "../models/Pedido";
import Itens_pedidos from "../models/Itens_pedidos";


class PedidosController {
    async store(req, res) {
        const { user_id, cartao_id, endereco_id, produtos, total, desconto, cupom } = req.body;

        const user = await Cliente.findByPk(user_id);

        if (!user) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        const pedido = await Pedido.create({
            user_id,
            cartao_id,
            endereco_id,
            total,
            desconto,
            codigo: `${uuid()}`,
            status: 'aprovado'
        }).catch(e => {
            return res.status(401).json({ error: "Erro ao finalizar pedido" });
        });

        
        produtos.map(async (item) => {
            await Itens_pedidos.create({
                quantidade: item.quantidade,
                produto_id: item.produto_id,
                pedido_id: pedido.id,
            });
        });

        
        // if (error === true) {
        //     console.log('aqui')
        //     await Pedido.destroy({
        //         where: {
        //             id: pedido.id
        //         }
        //     })
        //     return res.status(401).json({ error: "Erro ao finalizar pedido" });
        // }

        return res.status(200).json({ pedido });


    }
}

export default new PedidosController();