import styles from './Login.module.css';
import '../../css/global.css';
import fundo from '../../img/fundo.jpg';
import { Link , useNavigate } from 'react-router-dom';
import { login as loginAuth } from '../../services/auth';
import { useState } from 'react';

export function Login() {
    const navigate = useNavigate();
    const [erro, setErro] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro("");
        setLoading(true);
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const senha = formData.get('senha');

        try {
            await loginAuth(email, senha);
            navigate('/task');
        } catch {
            setErro('Usuário ou senha inválidos');
        } finally {
            setLoading(false);
        }
    };

    const handleInscrevaSe = () => {
        navigate('/newuser');
    };

    return (
        <div>
            <h1 className={styles.title}>
              Task Manager
            </h1>
            <h2>
              Ajuste sua rotina facilmente com nosso produto!
            </h2>
            <h2>
              Inscreva-se ou realize seu login abaixo.
            </h2>
          <div className={styles.mainDiv}>
            <form className={styles.mainInputsDiv} onSubmit={handleLogin}>
              <input 
                className={styles.inputsText} 
                type="text" 
                name="email"
                placeholder='E-mail'
                required
              />
              <input 
                className={styles.inputsText} 
                type="password" 
                name="senha"
                placeholder='Senha'
                required
              />
              <button type="submit" disabled={loading}>{loading ? "Entrando..." : "Login"}</button>
              <Link to="/newuser">Sign up</Link>
              {erro && <div style={{color: 'red', marginTop: '10px'}}>{erro}</div>}
            </form>
          </div>
        </div>
    );
}
