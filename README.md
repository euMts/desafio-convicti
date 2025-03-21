<div align="center">
  <a href="https://github.com/euMts/desafio-convicti">
    <img src="/assets/app-logo.png" alt="Logo" width="81" height="52">
  </a>

  <h3 align="center">Desafio Técnico - Convicti</h3>

  <p align="center">
    Documentação para projeto do desafio da empresa Convicti.
  </p>
</div>

<details>
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o Projeto</a>
      <ul>
        <li><a href="#funcionalidades">Funcionalidades</a></li>
        <li><a href="#feito-com">Tecnologias Utilizadas</a></li>
      </ul>
    </li>
    <li>
      <a href="#comecando">Começando</a>
      <ul>
        <li><a href="#pre-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalacao">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#demonstracao">Demonstração do Sistema</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

## Sobre o Projeto

<div id="sobre-o-projeto"></div>

![Header](/assets/dashboard-preview.jpg)

O desenvolvimento deste projeto teve início em 17/03/2025, logo após o recebimento das instruções do desafio proposto pela empresa Convicti. Com o design disponibilizado pela empresa, iniciei o processo mapeando as necessidades do sistema e, em seguida, parti para a implementação utilizando Vue, com Tailwind CSS, Vite e TypeScript.

<div id="funcionalidades"></div>

### Funcionalidades

**Permissões de Usuário**

- Admin: Acesso total a todas as funcionalidades e estatísticas.
- Desenvolvedor: Acesso às seguintes informações:
- - Downloads
- - Avaliações
- - Erros
- - Novas funcionalidades
- Recursos Humanos: Acesso às avaliações dos usuários.<br>

  > ⚠️ **IMPORTANTE** ⚠️
  > Apenas usuários com perfil **ADMIN** (com todas as permissões ativadas) podem acessar a tela de Configurações. Usuários sem esse nível de permissão **não** terão acesso e o botão de navegação para essa tela **NÃO** será exibido.
  > <br>

- Gerenciamento de Perfis:
- - CRUD de Perfis (Nome, lista de permissões)<br><br>

- Gerenciamento de Usuários
- - CRUD de Usuários (Nome, email, perfil)

**Adicionadas Extras**

- Componentes reutilizáveis para otimizar a manutenção e escalabilidade do projeto.
- Estilos reutilizáveis, garantindo consistência visual e facilitando ajustes globais.

<div id="feito-com"></div>

### Feito com

Esta seção aponta as tecnologias utilizadas no desenvolvimento do sistema.

**Frontend:**

- ![Vue JS](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

<div id="comecando"></div>

## Começando

A utilização do sistema é fácil e intuitiva. Você pode seguir o passo a passo para instalação e configuração local.

<div id="pre-requisitos"></div>

### Pré-requisitos

Para executar o código no seu sistema é necessário ter uma versão recente do Node, também é necessário possuir as credenciais da API.

```sh
npm install npm@latest -g
```

Desative as restrições de **CORS** na API disponibilizada pela empresa. Para isso, execute o seguinte comando:

```sh
php artisan config:publish cors
```

Esse comando irá gerar o arquivo `cors.php` no diretório de configurações. Em seguida, edite esse arquivo e substitua os valores de permissões por `'*'`. Isso permitirá requisições de qualquer origem, com qualquer método e qualquer cabeçalho, tornando a API completamente acessível publicamente.

<div id="instalacao"></div>

### Instalação

Este repositório é referente ao frontend. Para testar e instalar você precisará do backend disponibilizado pela empresa.

1. Clone o repositório ou baixe manualmente:
   ```sh
   git clone https://github.com/euMts/desafio-convicti.git
   ```

#### Frontend

1. Acesse a pasta do projeto:

   ```sh
   cd desafio-convicti
   ```

2. Instale os pacotes NPM:

   ```sh
   npm install
   ```

3. Crie o arquivo `.env` e preencha com as informações:

   ```sh
    VITE_BASE_API_URL="base_api_url"
    VITE_BASE_URL="base_url"
    VITE_CLIENT_ID="client_id"
    VITE_CLIENT_SECRET="client_secret"
    VITE_ENV="dev" # dev | prod
   ```

4. Execute o servidor:

   ```bash
   npm run dev
   ```

<!-- USAGE EXAMPLES -->

<div id="demonstracao"></div>

## Demonstração do Sistema

Nesta seção você verá as principais telas do sistema por meio de vídeos e capturas de tela.

**Vídeo**<br>
<a href="https://www.youtube.com/watch?v=C4O8dzr4POk" target="_blank" rel="noopener noreferrer">
Caso o vídeo não esteja disponível, aperte aqui!
</a>

https://github.com/user-attachments/assets/57ae15be-02fc-42aa-a899-ceb9d8996644

<div align="center">

![Login](/assets/login-preview.jpg)
![Dashboard](/assets/dashboard-preview.jpg)
![Config](/assets/config-preview.jpg)
![New profile](/assets/new-profile-preview.jpg)
![New user](/assets/new-user-preview.jpg)

</div>

<div id="contato"></div>

## Contato

Matheus Pass - [matheusetp@hotmail.com](mailto:matheusetp@hotmail.com) | [Website](https://matheuspass.dev)

Link do Projeto: [https://github.com/euMts/desafio-convicti](https://github.com/euMts/desafio-convicti)
