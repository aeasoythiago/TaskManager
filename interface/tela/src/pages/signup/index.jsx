import styles from "./NewUser.module.css"
import '../../css/global.css';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signup } from '../../services/auth';

export function NewUser(){
    const navigate = useNavigate();
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setErro("");
        setLoading(true);
        const formData = new FormData(e.target);
        const nome = formData.get('nome');
        const email = formData.get('email');
        const senha = formData.get('senha');
        try {
            await signup(nome, email, senha);
            navigate('/task');
        } catch (err) {
            setErro("Erro ao cadastrar. Tente outro e-mail ou verifique os dados.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
          <h1>Task Manager</h1>
          <h2>Complete seu cadastro!</h2>
          <div className={styles.divForms}>
            <form className={styles.forms} onSubmit={handleSubmit}>
              <label htmlFor="nome" className={styles.formLabel}>Nome</label>
              <input type="text" id='nome' name='nome' className={styles.formInput} required/>
    
              <label htmlFor="email" className={styles.formLabel}>E-mail</label>
              <input type="email" id='email' name='email' className={styles.formInput} required/>
    
              <label htmlFor="senha" method="post" className={styles.formLabel}>Senha</label>
              <input type="password" id='senha' name='senha' className={styles.formInput} required />
              <button className={styles.submitButton} type="submit" disabled={loading}>{loading ? "Cadastrando..." : "Sign in"}</button>
              <Link to={"/"}>Menu</Link>
              {erro && <div style={{color: 'red', marginTop: '10px'}}>{erro}</div>}
            </form>
          </div>
        </div>
      )
}