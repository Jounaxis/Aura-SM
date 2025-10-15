import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import type { UsuarioType } from "../../types/usuario";

// URL base da API simulada (json-server)
const API_URL = "http://localhost:3001";
// Domínio específico para "Usuários Especiais"
const SPECIFIC_DOMAIN = "@auraclinicas.com.br";

// Função assíncrona para buscar usuários da API/JSON Server
async function fetchUsuarios(): Promise<UsuarioType[]> {
  try {
    const response = await fetch(`${API_URL}/usuarios`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar usuários: ${response.statusText}`);
    }
    const data: UsuarioType[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na busca de usuários pela API. Certifique-se de que o json-server está rodando.", error);
    return [];
  }
}

/**
 * Função para registrar um novo usuário na API (json-server).
 * @param novoUsuario O objeto UsuarioType a ser criado.
 * @returns O objeto UsuarioType criado, incluindo o ID gerado.
 */
async function registerUser(novoUsuario: Omit<UsuarioType, 'id'>): Promise<UsuarioType> {
    const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoUsuario),
    });

    if (!response.ok) {
        throw new Error("Falha ao registrar o usuário na API.");
    }
    return response.json() as Promise<UsuarioType>;
}

export default function Cadastro() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [corMensagem, setCorMensagem] = useState<"red" | "green">("red");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = "Cadastro - Saúde Digital";
    }, []);

    async function handleCadastro(e: React.FormEvent) {
        e.preventDefault();
        setMensagem("");
        setIsLoading(true);

        try {
            if (senha !== confirmarSenha) {
                setMensagem("As senhas não coincidem.");
                setCorMensagem("red");
                return;
            }

            const usuarios = await fetchUsuarios();

            if (usuarios.length === 0 && email.endsWith(SPECIFIC_DOMAIN)) {
  
                console.warn("Nenhum usuário existente, permitindo o registro de usuário especial.");
            } else if (usuarios.length === 0) {

                 console.warn("Nenhum usuário existente, permitindo o registro de usuário normal.");
            }

            const emailExistente = usuarios.some(user => user.email === email);
            if (emailExistente) {
                setMensagem("Este e-mail já está cadastrado.");
                setCorMensagem("red");
                return;
            }

            let tipoUsuario = "normal";
            if (email.endsWith(SPECIFIC_DOMAIN)) {
                tipoUsuario = "especial";
            }



            const novoUsuario: Omit<UsuarioType, 'id'> = {
                email: email, 
                senha: senha,
                tipo: tipoUsuario
            }
            
            await registerUser(novoUsuario);

            setMensagem(`Cadastro (${tipoUsuario}) realizado com sucesso! Redirecionando para o Login...`);
            setCorMensagem("green");
            

            setTimeout(() => {
                navigate("/"); 
            }, 1500);

        } catch (error) {
            console.error("Erro durante o cadastro:", error);
            setMensagem("Ocorreu um erro inesperado ao tentar cadastrar. Verifique a conexão com a API.");
            setCorMensagem("red");
        } finally {

            if (corMensagem !== "green") {
                setIsLoading(false);
            }
        }
    }

    return (
        <main className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <section className="w-full max-w-sm bg-white rounded-xl shadow-2xl p-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Cadastro</h2>
                    <p className="text-gray-500 text-center">
                        Crie sua conta para começar
                    </p>
                </div>

                <form onSubmit={handleCadastro}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">E-mail</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu.email@exemplo.com"
                            required
                            disabled={isLoading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-150"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="senha" className="block text-gray-700 font-bold mb-2">Senha</label>
                        <input
                            id="senha"
                            name="senha"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Mínimo 6 caracteres"
                            required
                            minLength={6}
                            disabled={isLoading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-150"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="confirmarSenha" className="block text-gray-700 font-bold mb-2">Confirmar Senha</label>
                        <input
                            id="confirmarSenha"
                            name="confirmarSenha"
                            type="password"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            placeholder="Repita sua senha"
                            required
                            minLength={6}
                            disabled={isLoading}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-150"
                        />
                    </div>

                    {mensagem && (
                        <div
                            className={`mt-4 p-3 text-center rounded-lg font-semibold ${
                                corMensagem === "red" ? "bg-red-100 text-red-700 border border-red-300" : "bg-green-100 text-green-700 border border-green-300"
                            }`}
                        >
                            {mensagem}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:shadow-outline transition duration-150 shadow-md hover:shadow-lg mt-6 ${
                            isLoading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                    >
                        {isLoading ? "Cadastrando..." : "Cadastrar"}
                    </button>
                </form>

                <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-500">
                        Já tem uma conta?{" "}
                        <Link
                            to="/"
                            className="text-blue-600 font-medium hover:underline transition duration-150"
                        >
                            Fazer Login
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}
