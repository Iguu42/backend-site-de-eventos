# Site de Eventos

## Descrição
API para um site de eventos, permitindo a gestão de eventos, usuários e uploads de arquivos.

## Estrutura do Projeto

### prisma/
Contém o schema do banco de dados utilizado pelo Prisma.

### src/
#### src/db
Cliente do Prisma para interagir com o banco de dados.

#### src/interfaces
Definições de interfaces TypeScript utilizadas no projeto.

#### src/lib
Bibliotecas auxiliares:
- `multer` para upload de arquivos.
- `queue` usando Redis para gerenciamento de filas.

#### src/middlewares
Autenticação utilizando Clerk.

#### src/repositories
Implementação dos repositórios para acesso aos dados.

#### src/routes
Definição das rotas da API.

#### src/scripts
Scripts para teste de carga e outros utilitários.

#### src/usecases
Casos de uso da aplicação, contendo a lógica de negócios.

#### src/utils
Utilitários diversos:
- Funções para integração com o AWS S3.

#### src/index.ts
Ponto de entrada da aplicação, onde as rotas são exportadas.

#### src/env.ts
Configuração e validação das variáveis de ambiente utilizando Zod.

## Tecnologias
1. **NodeJS**: Plataforma para execução de código JavaScript no servidor.
2. **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
3. **Prisma**: ORM para interação com o banco de dados PostgreSQL. 
4. **Redis (Bull)**: Gerenciamento de filas para processamento assíncrono.
5. **aws-sdk**: Biblioteca para integração com o serviço de armazenamento da AWS S3.
6. **PostgreSQL**: Banco de dados relacional.
7. **Zod**: Biblioteca para validação e tipagem de esquemas.
8. **Fastify**: Framework web rápido e de baixa sobrecarga para Node.js.
9. **Multer**: Middleware para upload de arquivos.\
10. **Clerk**: Autenticação e gestão de usuários.
