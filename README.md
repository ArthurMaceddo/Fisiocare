# FisioCare — Sistema de Clínica de Fisioterapia
> Projeto Integrador 3º Semestre - FATEC

---

## 📦 Estrutura do Projeto

```
fisiocare/
├── backend/                          ← Java puro (servidor HTTP na porta 8080)
│   ├── pom.xml
│   └── src/main/java/com/fisiocare/
│       ├── FisioCareServer.java       ← Classe principal (main)
│       ├── database/
│       │   └── DatabaseConnection.java
│       ├── model/
│       │   ├── Usuario.java
│       │   ├── Paciente.java
│       │   ├── Agendamento.java
│       │   └── Sessao.java
│       ├── dao/
│       │   ├── UsuarioDAO.java
│       │   ├── PacienteDAO.java
│       │   ├── AgendamentoDAO.java
│       │   └── SessaoDAO.java
│       ├── service/
│       │   └── AutenticacaoService.java
│       └── handler/
│           ├── BaseHandler.java
│           ├── AuthHandler.java
│           ├── PacienteHandler.java
│           ├── FuncionarioHandler.java
│           ├── AgendamentoHandler.java
│           ├── SessaoHandler.java
│           └── DashboardHandler.java
│
├── frontend/                         ← Electron (interface desktop)
│   ├── package.json
│   ├── main.js
│   └── public/
│       ├── index.html
│       ├── style.css
│       └── js/
│           ├── api.js
│           ├── app.js
│           └── pages/
│               ├── dashboard.js
│               ├── pacientes.js
│               ├── funcionarios.js
│               ├── agendamentos.js
│               └── evolucao.js
│
└── scripts/
    └── database.sql                  ← Script de criação do banco
```

---

## 🚀 Como Rodar

### Pré-requisitos
- Java JDK 17+
- Maven 3.6+
- PostgreSQL 13+
- Node.js 16+ e npm
- Electron (`npm install -g electron` ou local)

---

### Passo 1 — Banco de Dados

```bash
# Abra o terminal e execute:
psql -U postgres -f scripts/database.sql

# Verifica se o banco foi criado:
psql -U postgres -c "\l" | grep fisiocare
```

Se precisar alterar as credenciais, edite:
`backend/src/main/java/com/fisiocare/database/DatabaseConnection.java`

---

### Passo 2 — Backend Java

```bash
cd backend

# Compilar e gerar JAR
mvn clean package -DskipTests

# Rodar o servidor (porta 8080)
java -jar target/fisiocare.jar
```

Você verá:
```
=========================================
  FisioCare Backend rodando na porta 8080
  http://localhost:8080
=========================================
```

---

### Passo 3 — Frontend Electron

Abra **outro terminal**:

```bash
cd frontend

# Instalar dependências (apenas na primeira vez)
npm install

# Rodar a aplicação desktop
npm start
```

A janela do FisioCare abrirá automaticamente!

---

## 🔑 Credenciais de Teste

| Usuário          | E-mail                  | Senha      | Perfil         |
|------------------|-------------------------|------------|----------------|
| Administrador    | admin@fisiocare.com     | admin123   | ADMINISTRADOR  |
| Dr. João Silva   | joao@fisiocare.com      | fisio123   | FUNCIONARIO    |
| Maria Santos     | maria@email.com         | maria123   | PACIENTE       |

---

## 🖥️ Telas do Sistema

| Tela            | Descrição                                                 |
|-----------------|-----------------------------------------------------------|
| Login           | Autenticação com email e senha                            |
| Dashboard       | Boas-vindas + estatísticas + agendamentos do dia          |
| Pacientes       | CRUD completo de pacientes                                |
| Funcionários    | CRUD de funcionários (somente ADMINISTRADOR)              |
| Agendamentos    | Agendamento com busca por CPF + seleção de data/hora      |
| Evolução        | Histórico de sessões com gráfico de escala de dor         |

---

## 🔗 Endpoints da API

| Método | Endpoint                    | Descrição                        |
|--------|-----------------------------|----------------------------------|
| POST   | /api/auth/login             | Login (retorna token)            |
| POST   | /api/auth/logout            | Logout                           |
| GET    | /api/dashboard              | Estatísticas do sistema          |
| GET    | /api/pacientes              | Listar pacientes                 |
| POST   | /api/pacientes              | Criar paciente                   |
| GET    | /api/pacientes/{id}         | Buscar paciente por ID           |
| GET    | /api/pacientes/cpf/{cpf}    | Buscar paciente por CPF          |
| PUT    | /api/pacientes/{id}         | Atualizar paciente               |
| DELETE | /api/pacientes/{id}         | Desativar paciente               |
| GET    | /api/funcionarios           | Listar funcionários              |
| POST   | /api/funcionarios           | Criar funcionário (ADMIN)        |
| PUT    | /api/funcionarios/{id}      | Atualizar funcionário            |
| DELETE | /api/funcionarios/{id}      | Desativar funcionário            |
| GET    | /api/agendamentos           | Listar agendamentos              |
| GET    | /api/agendamentos/hoje      | Agendamentos de hoje             |
| POST   | /api/agendamentos           | Criar agendamento                |
| PUT    | /api/agendamentos/{id}      | Atualizar status                 |
| DELETE | /api/agendamentos/{id}      | Excluir agendamento              |
| GET    | /api/sessoes                | Listar sessões                   |
| GET    | /api/sessoes/paciente/{id}  | Sessões de um paciente           |
| POST   | /api/sessoes                | Registrar sessão                 |
| DELETE | /api/sessoes/{id}           | Excluir sessão                   |

---

## ⚙️ Tecnologias

| Camada      | Tecnologia                          |
|-------------|-------------------------------------|
| Backend     | Java 17, JDBC, HikariCP, Gson       |
| Banco       | PostgreSQL 13+                      |
| Frontend    | Electron, HTML5, CSS3, JavaScript   |
| Gráficos    | Chart.js (CDN)                      |
| Build       | Maven                               |

---

## 🔒 Permissões por Perfil

| Funcionalidade        | ADMINISTRADOR | FUNCIONARIO | PACIENTE |
|-----------------------|:---:|:---:|:---:|
| Ver Dashboard         | ✅  | ✅  | ✅  |
| Cadastrar Paciente    | ✅  | ✅  | ❌  |
| Editar Paciente       | ✅  | ✅  | ❌  |
| Deletar Paciente      | ✅  | ❌  | ❌  |
| Cadastrar Funcionário | ✅  | ❌  | ❌  |
| Criar Agendamento     | ✅  | ✅  | ❌  |
| Registrar Sessão      | ✅  | ✅  | ❌  |
| Ver Evolução          | ✅  | ✅  | ✅  |

---

## 🐞 Problemas Comuns

**Erro: "Não foi possível conectar ao banco"**
```bash
# Verifique se o PostgreSQL está rodando
sudo service postgresql status
# ou no Windows: abra o pgAdmin e verifique o servidor
```

**Erro: "Port 8080 already in use"**
```bash
# Linux/Mac
lsof -i :8080 | grep LISTEN
kill -9 <PID>
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Electron não abre (blank screen)**
- Verifique se o backend está rodando na porta 8080
- Abra o DevTools (Ctrl+Shift+I) e verifique erros no console
