export default function Integrantes() {
    return (
        <main>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-blue-500">Integrantes</h1>
                <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center">
                        <img 
                            src="" 
                            alt="" 
                            className="rounded-full w-40 h-40 object-cover mb-4 shadow-lg"
                        />
                        <p className="text-gray-700 font-semibold">
                            Pedro Peres Benitez - RM: 561792
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img 
                            src="" 
                            alt="" 
                            className="rounded-full w-40 h-40 object-cover mb-4 shadow-lg"
                        />
                        <p className="text-gray-700 font-semibold">
                            Lucca Ramos mussumecci - RM: 562027
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <img 
                            src="" 
                            alt="" 
                            className="rounded-full w-40 h-40 object-cover mb-4 shadow-lg"
                        />
                        <p className="text-gray-700 font-semibold">
                            João Victor Gomes de Souza - RM: 560907
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
