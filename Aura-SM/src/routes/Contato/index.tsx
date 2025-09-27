export default function Contato() {
    return (
        <main>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6"> 
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Contato</h1>
                <p className="text-lg text-gray-600 mb-4 text-center max-w-2xl">
                    Se você tiver alguma dúvida, sugestão ou precisar de assistência, não hesite em entrar em contato conosco. Estamos aqui para ajudar!
                </p>
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Formulário de Contato</h2>
                    <form className="space-y-4">    
                        <div>   
                            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Nome:</label>
                            <input
                                type="text" 
                                id="name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-150"
                                placeholder="Seu nome completo"
                                required
                                />
                        </div>  
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
                            <input  
                                type="email"    
                                id="email"  
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-150"
                                placeholder="Seu email"
                                required
                                />
                        </div>  
                        <div>   
                            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">Mensagem:</label>
                            <textarea   
                                id="message"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 transition duration-150"
                                placeholder="Escreva sua mensagem aqui..."
                                rows={4}
                                required
                                ></textarea>
                        </div>  
                        <div>
                            <button 
                                type="submit"
                                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline transition duration-150 shadow-md hover:shadow-lg"
                                >   
                                Enviar Mensagem 
                            </button>   
                        </div>  
                    </form> 
                </div>
            </div> 
        </main>
    );  
                                                        
}