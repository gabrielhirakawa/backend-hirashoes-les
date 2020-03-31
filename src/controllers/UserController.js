import Cliente from "../models/Cliente";

class UserController{
    async store(req, res){
        const { nome, sobrenome, email, cpf, password } = req.body;

        const user = await Cliente.create({
            nome,
            sobrenome,
            email,
            cpf,
            password,
            status: "ativo"
        });

        return res.json(user);
    }
}

export default new UserController();