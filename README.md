## Objetivo

Este repositório é parte de uma arquitetura de catálogo, projeto que faz parte de uma ação de PDI para aprimorar os conhecimentos de profundidade técnica utilizando tecnologias frontend e backend.
O objetivo é construir um produto responsável pela gestão do catálogo e também permitir o compartilhamento deste catálogo com clientes.
O projeto deverá ter ao menos 2 microserviços em tecnologias distintas, 2 clients frontend, banco de dados, deverá utilizar alguma plataforma de stream de eventos. [Esta aplicação encontra-se em construção]

## Serviço Catálogo

Serviço Catalog: este é o serviço responsável pela gestão do catálogo. Desenvolvido utilizando Nodejs e Express.

## Padrão Arquitetural

Com o objetivo de organizar o código definindo limites entre camadas, favorecendo coesão, testabilidade e o reuso eu utilizei o padrão arquitetural Clean Architecture. Este padrão diz que as dependências devem sempre apontar para o nível mais alto da aplicação, sempre para as camadas mais internas.  
Ex: as entidades não podem saber o que acontece na camada de casos de uso, que por sua vez, não deve saber nada que acontece na camada de adaptadores. Ex: uma alteração em um controller não deve afetar nada que esteja na camada de caso de uso e nem na de entidades.<br><br>

![The Clean Architecture](https://github.com/erusferreira/catalog/assets/16649162/9c6aa02d-470b-45ec-8bc4-786232983e36)

## Estrutura de pastas

Com base no modelo arquitetural escolhido, separei os elementos da aplicação nas seguintes pastas:

**src/core**: pasta composta pelos elementos principais do negócio. Nesta pasta encontram-se as entidades, casos de uso e interfaces dos repositórios.

**src/adapter**: nesta pasta mantive os adaptadores de interface, por exemplo, routes, controllers, mappers, implementações dos repositórios, etc.

```bash
├── adapter
│   ├── config
│   ├── controller
│   ├── database
│   ├── enums
│   ├── mapper
│   ├── repository
│   ├── routes
│   ├── types
│   └── utils
├── core
│   ├── entity
│   ├── repository
│   └── usecase
├── external
```

## Requisitos do sistema

NodeJS >= 20.9.0  
npm >= v10.1.0

## Instalação

Na pasta raíz execute o comando: `npm install`

## Executar banco de dados

Com o docker compose instalado, na pasta raíz execute o comando: `docker compose up`

## Executar aplicação

Na pasta raíz execute o comando: `npm run dev`
