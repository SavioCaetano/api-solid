# API para realizar check-in em academia (baseada na funcionalidade do GymPass)

# Sobre o projeto

Esse projeto foi desenvolvido durante o curso de Node ministrado pela [Rocketseat](https://www.rocketseat.com.br/ "Site da Rocketseat"). O principal foco é trabalhar com design patterns, testes automatizados (unitários e E2E) e o prícipio de programação SOLID.

O primeiro passo foi levantar todos os requisitos funcionais e não-funcionais para a construção dessa API, além de suas respectivas regras de negócio (essas informações estão disponíveis no arquivo "Requisitos.md"). Os testes foram realizados do começo ao fim da aplicação, começando nos testes unitários e terminando nos testes End-To-End.

A API conta com funcionalidades como: cadastro de usuário e academias, autenticação (JWT), realização de check-in (somente em academias próximas a localização do usuário), histórico de check-ins, validação de check-in e também buscas de academias pelo nome e/ou proximidade (raio de até 10km).

O ambiente da aplicação foi criado com Docker e banco de dados PostgreSQL. Outra caracteristica desse projeto é a utilização de 'Continuous Integration (CI)' com GitHub Actions, que executa determinadas ações quando ocorre um 'push' ou um 'pull_request' no repositório, rodando os testes unitários e os testes E2E respectivamente.

# Tecnologias Utilizadas

- Node
- TypeScript
- PostgreSQL
- Prisma ORM
- Docker
- Vitest
- CI (GitHub Actions)

# Dependências
- Node
- Docker

# Author

Sávio Cardoso Caetano

[![Linkedin Badge](https://img.shields.io/badge/-SavioCaetano-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/savio-c-caetano/)](https://www.linkedin.com/in/savio-c-caetano/)