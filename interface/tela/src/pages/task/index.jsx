import styles from "./Tasks.module.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Tasks(){
    const [tarefas, setTarefas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState("");
    const [form, setForm] = useState({
        titulo: "",
        descricao: "",
        prioridade: "Baixa",
        status: "Pendente",
        data: ""
    });
    const [criando, setCriando] = useState(false);
    const [deletando, setDeletando] = useState(false);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    // Proteger rota
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
    }, [navigate]);

    // Função para buscar tarefas
    async function fetchTarefas() {
        setLoading(true);
        setErro("");
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch("http://localhost:3000/tarefas/listartarefas", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!resp.ok) throw new Error("Erro ao buscar tarefas");
            const data = await resp.json();
            setTarefas(Array.isArray(data) ? data : []);
        } catch (e) {
            setErro("Não foi possível carregar as tarefas.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTarefas();
    }, []);

    // Handler do formulário
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setCriando(true);
        setMsg("");
        try {
            const token = localStorage.getItem('token');
            const payload = { ...form };
            if (!payload.data) {
                delete payload.data;
            }
            const resp = await fetch("http://localhost:3000/tarefas/criartarefa", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            if (!resp.ok) throw new Error("Erro ao criar tarefa");
            setMsg("Tarefa criada com sucesso!");
            setForm({ titulo: "", descricao: "", prioridade: "Baixa", status: "Pendente", data: "" });
            await fetchTarefas();
        } catch (e) {
            setMsg("Erro ao criar tarefa.");
        } finally {
            setCriando(false);
        }
    }

    async function handleDeleteTarefa(id) {
        setDeletando(true);
        setMsg("");
        try {
            const token = localStorage.getItem('token');
            const resp = await fetch(`http://localhost:3000/tarefas/deletartarefa/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!resp.ok) throw new Error("Erro ao deletar tarefa");
            setMsg("Tarefa deletada com sucesso!");
            await fetchTarefas();
        } catch (e) {
            setMsg("Erro ao deletar tarefa.");
        } finally {
            setDeletando(false);
        }
    }

    return(
        <>
        <h1>Task Manager</h1>
        <h2 style={{textAlign:"center"}}>Crie e gerencie suas tasks.</h2>
        <div className={styles.mainDiv}>
            <aside className={styles.asideBlock}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input className={styles.inputDiv} type="text" name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required/>
                        <input className={styles.inputDiv} type="text" name="descricao" placeholder="Descrição" value={form.descricao} onChange={handleChange} />
                    </div>
                    <div className={styles.formDiv}>
                        <label className={styles.formLabelPriority} htmlFor="prioridade">Prioridade:</label>
                            <select className={styles.formSelection} name="prioridade" id="prioridade" value={form.prioridade} onChange={handleChange}>
                                <option value="Baixa">Baixa</option>
                                <option value="Media">Media</option>
                                <option value="Alta">Alta</option>
                            </select>
                        
                        <label className={styles.formLabelStatus} htmlFor="status">Status:</label>
                            <select className={styles.formSelection} name="status" id="status" value={form.status} onChange={handleChange}>
                                <option value="Pendente">Pendente</option>
                                <option value="Andamento">Andamento</option>
                                <option value="Concluido">Concluido</option>
                            </select> 
                    </div>
                    <div>
                        <input className={styles.inputDate} type="date" name="data" value={form.data} onChange={handleChange} />
                        <button className={styles.buttonTask} type="submit" disabled={criando}>{criando ? "Criando..." : "Criar tarefa"}</button>
                    </div>
                    {msg && <div style={{marginTop:8, color: msg.includes('sucesso') ? 'green' : 'red'}}>{msg}</div>}
                </form>
            </aside>
            <section className={styles.tarefasBox}>
                <h3 className={styles.tarefasTitulo}>Suas tarefas</h3>
                <div className={styles.tarefasLista}>
                    {loading && <div>Carregando tarefas...</div>}
                    {erro && <div style={{color: 'red'}}>{erro}</div>}
                    {!loading && !erro && tarefas.length === 0 && <div>Nenhuma tarefa encontrada.</div>}
                    {!loading && !erro && tarefas.map(tarefa => (
                        <div key={tarefa._id || tarefa.id} className={styles.tarefaCard}>
                            <div className={styles.tarefaTitulo}>{tarefa.titulo}</div>
                            <div className={styles.tarefaDescricao}>{tarefa.descricao}</div>
                            <div className={styles.tarefaInfo}>
                                <span>Prioridade: <b>{tarefa.prioridade}</b></span>
                                <span>Status: <b>{tarefa.status}</b></span>
                                <span>Data: <b>{tarefa.data ? new Date(tarefa.data).toLocaleDateString() : ""}</b></span>
                            </div>
                            <button 
                                className={styles.buttonDelete} 
                                onClick={() => handleDeleteTarefa(tarefa._id || tarefa.id)}
                                disabled={deletando}
                            >
                                {deletando ? "Deletando..." : "Deletar"}
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
        </>
    );
}