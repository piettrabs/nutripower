const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/nutripower',
{   useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS : 20000
});

const UsuarioSchema = new mongoose.Schema({
    email : {type : String, required : true},
    senha : {type : String}
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

app.post("/cadastrousuario", async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha


    const usuario = new Usuario({
        email : email,
        senha : senha
    })


    try{
        const newUsuario = await usuario.save();
        res.json({error : null, msg : "Cadastro ok", usuarioId : newUsuario._id});
    } catch(error){
        res.status(400).json({error});
    }


});

const ProdutoSuplementoSchema = new mongoose.Schema({
    id_produtossuplementos : {type : Number, required : true},
    descricao : {type : String},
    marca : { type : String},
    datavalidade : {type : Date},
    quantidadeestoque : {type : Number}
});

const ProdutoSuplemento = mongoose.model("ProdutoSuplemento", ProdutoSuplementoSchema);

app.post("/cadastroproduto", async(req, res)=>{
    const id_produtossuplementos = req.body.id_produtossuplementos;
    const descricao = req.body.descricao;
    const marca = req.body.marca;
    const datavalidade = req.body.datavalidade;
    const quantidadeestoque  = req.body.quantidadeestoque


    const ProdutoSuplemento = new ProdutoSuplemento({
        id_produtossuplementos : id_produtossuplementos,
        descricao : descricao,
        marca : marca,
        datavalidade : datavalidade,
        quantidadeestoque : quantidadeestoque
    })


    try{
        const newProdutoSuplemento = await ProdutoSuplemento.save();
        res.json({error : null, msg : "Produto ok", id_produtossuplementosId : newProdutoSuplemento._id});
    } catch(error){
        res.status(400).json({error});
    }


});

app.get("/", async(req, res)=>{
    res.sendFile(__dirname +"/index.html");
})

app.listen(port, ()=>{
    console.log(`Servidor rodando na porta ${port}`);
})
