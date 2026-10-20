import { Axios } from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";

const Tarefas = () => {

    const [tarefas, setTarefas] = useState([]);
    const [formCriar, setFormCriar] = useState([]);
    const usuario = JSON.parse(sessionStorage.getItem("usuario")) || null;
    const tituloCriar = useRef(null);
    const descricaoCriar = useRef(null);
    const idEditar = useRef(null);
    const tituloEditar = useRef(null);
    const descricaoEditar = useRef(null);

    //Use esta constante para que o usuário vá para uma navegação.
    const navigate = useNavigate();
    //Use para Editar as tarefas.


async function editarTarefa() {
    event.preventDefault();

    
}
    

async function criarTarefa(){
    event.preventDefault();
    
    try{
    if (!usuario) {
        navigate("/");
    }

    const resposta = await Axios.get(`/tarefas/${usuario.id}`);
    setTarefas(resposta.data);

    } catch (error) {
        console.log("Error: ", error.mensage);
    }
    
    
    
    
       try {
       let dados = {
        titulo: tituloCriar.current.value,
        descricao
       }

       

       const resposta = await AXIOS.post("/tarefas", dados);
       alert(resposta.data.message);
       buscarTarefas();

        fetch("https://js-lista-de-tarefas-api.onrender.com/tarefas",{
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(dados)
        })
        .then(resposta => resposta.json())
        .then(json => {
            alert(json.mensagem);
            fecharFormCriar();
            buscarTarefas();
        })
    } catch (error) {
        alert("Error: ", error.message);
    }
}

    function pesquisarTarefa(palavra) {
        if (palavra.length == 0) {
            setTarefas(tarefas);
            return;
        }
        if (palavra.length >= 3) {
            let tarefasFiltradas = tarefas.filter(tarefa => tarefa.titulo.toLowerCase().includes(palavra.toLowerCase()))
            setTarefas(tarefasFiltradas);
        }
    }

    return (
        <div>
            <header className="flex justify-between items-center py-4 px-15 bg-linear-to-r from-purple-900 via-purple-600 to-purple-900">
                <input
                    onChange={(event) => pesquisarTarefa(event.target.value)}
                    type="text"
                    placeholder="Pesquisar"
                    className="w-100 h-10 pl-4 rounded bg-white"
                />
                <button
                    onClick={() => setFormCriar(true)}
                    className="leading-10 bg-purple-800 rounded px-4 font-bold text-white duration-200 cursor-pointer hover:bg-purple-400 hover:text-black">Nova
                    Tarefa</button>
            </header>

            <main className="p-15 bg-slate-200">
                <h1 className="text-3xl font-bold mb-6">Tarefas</h1>
                <div id="tarefas" className="grid grid-cols-3 gap-4"></div>
                <div id="overlay"
                onClick={() => {
                    setFormCriar(false);
                }}
                className={`w-full h-screen bg-black/70 fixed top-0 left-0 ${formCriar ? "" : "opacity-0 invisible"} duration-200`}>
                </div>
                <div id="form-criar"
                    className="w-100 p-4 rounded-lg bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 invisible duration-200 delay-200">
                    <div className="flex justify-end">
                        <box-icon name='x' className="cursor-pointer" onclick="fecharFormCriar()"></box-icon>
                    </div>
                    <form onsubmit="criarTarefa()" className="flex flex-col">
                        <label for="titulo" className="uppercase text-xs font-bold mb-2 block">Titulo</label>
                        <input id="titulo" type="text" placeholder="Titulo da tarefa"
                            className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4"
                            required />
                        <label for="descricao" className="uppercase text-xs font-bold mb-2 block">Descrição</label>
                        <textarea
                            id="descricao"
                            className="pl-3 h-30 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4"
                            required></textarea>
                        <button type="submit"
                            className="w-full h-10 rounded bg-purple-400 hover:bg-purple-600 duration-200 hover:text-white font-bold">Criar</button>
                    </form>
                </div>

                <div id="form-editar"
                    className="w-100 p-4 rounded-lg bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 invisible duration-200 delay-200">
                    <div className="flex justify-end">
                        <box-icon name='x' className="cursor-pointer" onclick="fecharFormEditar()"></box-icon>
                    </div>
                    <form 
                    onSubmit=(editarTarefa())
                    className="flex flex-col">
                        <input type="hidden" id="idEdicao" />
                        <label for="tituloEdicao" className="uppercase text-xs font-bold mb-2 block">Titulo</label>
                        <input id="tituloEdicao" type="text" placeholder="Titulo da tarefa"
                            className="pl-3 h-10 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4"
                            required />
                        <label for="descricaoEdicao" className="uppercase text-xs font-bold mb-2 block">Descrição</label>
                        <textarea
                            id="descricaoEdicao"
                            className="pl-3 h-30 border-2 border-slate-400 focus:border-purple-600 duration-150 rounded outline-none mb-4"
                            required></textarea>
                        <button type="submit"
                            className="w-full h-10 rounded bg-purple-400 hover:bg-purple-600 duration-200 hover:text-white font-bold">Criar</button>
                    </form>

                    tarefas.length == 0 ? {}
                </div>

                tarefas.length == 0 ? (
                    <div>Crie sua primeira tarefa.</div>
                )

        async function deletarTarefa(id){
            event.preventDefault();
        try{
            const resposta = await AXIOS.delete(`/tarefas/${id}`);

            alert(resposta.data.mensagem);
            buscarTarefas();
        } catch (error) {
            alert("Error: ", error.mensage);
        }

        if(confirm("Deseja realmente apagar?")){
        fetch(`https://js-lista-de-tarefas-api.onrender.com/tarefas/${id}`,{
            method: "delete",
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(resposta => resposta.json())
        .then(json => {
            alert(json.mensagem);
            buscarTarefas();
        })
    }
}



            </main>

        </div>
    );
}

export default Tarefas;