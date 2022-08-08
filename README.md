# Portal de videos Raro Academy - Raro Tube

Projeto final da turma de nodejs da Raro Academy

Membros: https://github.com/JohnnHere
         https://github.com/anapaula-noleto
         https://github.com/patr0ci
         https://github.com/SantosMatheus8

## Instalação

Clonar o repositório :

```bash
git clone https://gitlab.com/SantosMatheus8/trabalho-final-grupo02.git
```

Trocar para o arquivo do repositório :

```bash
cd trabalho-final-grupo02
```

Instalas as dependencias :

```bash
npm install
```

## dev

Comando utilizado para iniciar o projeto em modo de desenvolvimento

```bash
npm run dev
```

## typeorm

Este comando é um atalho para o typeorm, que está instalado localmente, no projeto, os comandos podem ser diferentes dependendo do sistema operacional.

```bash
npm run typeorm migration:create -- -n nomeDaMigration
npm run typeorm -- migration:run
```

## test

Este comando é um atalho para o jest, que está instalado localmente no projeto, ele pode ser usado para rodar os testes de unidade.

```bash
npm run test
```

## Cobertura de testes

Atualmente a cobertura de testes está em 80%

## Pacotes

Principais pacotes do projeto :

- typeorm
- jsonwebtoken
- express
- sendgrid
- typedi
- multer
- class-validator

## Modelo Conceitual: Modelo Entidade-Relacionamento

![ModeloEntidadeRelacionamento](modeloEntidadeRelacionamento.png)

## Modelo Lógico: Modelo Relacional

![ModeloLogico](modeloLogico.png)

## Colaboração

As funcionalidades de autenticação, envio de email, upload e donwload de arquivos foram desenvolvidas em conjunto pelos membros do projeto, utilizando a extensão "Live Share".

## API externa utilizada :

- sendgrid
