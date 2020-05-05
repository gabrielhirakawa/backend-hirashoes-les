import Cupom from "../models/Cupom";
import CupomTroca from "../models/CupomTroca";

class CupomController {
    async store(req, res) {
        const { tipo } = req.body;

        if (tipo === 'promocional') {
            const { codigo, percentual_desconto, quantidade  } = req.body;

            const cupomExistis = await Cupom.findOne({
                where: {
                    codigo
                }
            });

            if (cupomExistis) {
                return res.status(401).json({ error: "Esse Cupom já cadastrado" })
            }


            const cupom = await Cupom.create({
                tipo,
                codigo,
                percentual_desconto: Number(percentual_desconto),
                quantidade,
                status: 'ativo',
            });

            return res.json(cupom);
        }

        if(tipo === 'troca'){
            const { user_id, codigo, valor  } = req.body;

            const cupomExistis = await CupomTroca.findOne({
                where: {
                    codigo
                }
            });

            if (cupomExistis) {
                return res.status(401).json({ error: "Esse Cupom já cadastrado" })
            }


            const cupomTroca = await CupomTroca.create({
                user_id,
                tipo,
                codigo,
                valor: Number(valor),
                utilizado: false,
            });

            return res.json(cupomTroca);

        }

    }

    async index(req, res) {

        const { codigo } = req.params;

        const cupom = await Cupom.findOne({
            where: {
                codigo
            }
        });

        if (!cupom) {
            return res.json({ error: "Cupom não encontrado" })
        }

        return res.json(cupom)
    }

    async show(req, res){
        const cupons = await Cupom.findAll();

        const cuponsTroca = await CupomTroca.findAll();

        return res.status(200).json({
            cupons,
            cuponsTroca
        })
        
    }
}


export default new CupomController();