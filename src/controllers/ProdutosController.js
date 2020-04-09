import Produto from "../models/Produto";

class ProdutoController{
    async store(req, res){
     
    }

    async index(req, res){
         
        const produtos = await Produto.findAll();

        res.json(produtos)
    }
}


export default new ProdutoController();