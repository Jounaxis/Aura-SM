import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { UsuarioType } from "../../types/usuario";

const API_URL = "http://localhost:3001";

const SPECIFIC_DOMAIN = "@auraclinicas.com.br";

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

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [corMensagem, setCorMensagem] = useState<"red" | "green">("red");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "Login - Saúde Digital";
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMensagem(""); 
    setIsLoading(true);

    try {

      const usuarios = await fetchUsuarios(); 
      
      if (usuarios.length === 0) {

          setMensagem("Erro de conexão. Não foi possível carregar os usuários. Verifique o json-server.");
          setCorMensagem("red");
          return;
      }

      const usuarioValido = usuarios.find(
        (user) => user.email === email && user.senha === senha
      );

      if (!usuarioValido) {
        setMensagem("E-mail ou senha incorretos."); 
        setCorMensagem("red");
        return;
      }

      setMensagem("Login realizado com sucesso! Redirecionando...");
      setCorMensagem("green");

      localStorage.setItem('userToken', usuarioValido.email); 

      setTimeout(() => {
 
        navigate("/home"); 
      }, 1500);

    } catch (error) {

      setMensagem("Ocorreu um erro inesperado. Tente novamente.");
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
          <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Login</h2>
          <p className="text-gray-500 text-center">
            Acesse sua conta para gerenciar suas consultas
          </p>
        </div>

        <form onSubmit={handleLogin}>

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

          <div className="mb-6">
            <label htmlFor="senha" className="block text-gray-700 font-bold mb-2">Senha</label>
            <input
              id="senha"
              name="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
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
            className={`w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline transition duration-150 shadow-md hover:shadow-lg mt-6 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            Não tem uma conta?{" "}
            <Link
              to="/cadastro"
              className="text-blue-600 font-medium hover:underline transition duration-150"
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
