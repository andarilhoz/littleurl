// Selecionar o banco de dados onde você deseja criar a API key
db = db.getSiblingDB('db');

// Verificar se a coleção 'apiKeys' já tem uma chave
const existingKey = db.apikeys.findOne({ key: "f26ba4a95c9aa3b60731b764ef542202" });

if (!existingKey) {
    db.apikeys.insertOne({
        key: "f26ba4a95c9aa3b60731b764ef542202",
        createdAt: new Date(),
        description: "Initial API Key"
    });
    print("API Key 'f26ba4a95c9aa3b60731b764ef542202' criada com sucesso.");
} else {
    print("API Key já existe.");
}