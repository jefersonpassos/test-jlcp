# Test JLCP

### Configuração

##### Configurar vaiáveis de ambiente

> Necessário **Docker** e **Docker Compose** instalado na maquina

+ Linux
```bash
export DB_CONNECTION_STRING=<string de conexao com o banco de dados>
export APP_KEY=<chave da aplicacao>
```
+ Windows
```bash
set DB_CONNECTION_STRING=<string de conexao com o banco de dados>
set APP_KEY=<chave da aplicacao>
```
> Exemplo DB_CONNECTION_STRING **mongodb://user:pass@ds115154.mlab.com:15154/testjlcp**

> Exemplo APP_KEY **dSgVkYp3s6v9y$B&E(H+MbQeThWmZq4t**

### Instalação

Use the adonis command to install the blueprint

```bash
sh install.sh
```