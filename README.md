# Parser de linha digitável de boleto

API TypeScript/Express que interpreta linhas digitáveis bancárias de 47 dígitos e consulta a instituição via BrasilAPI. Exercício educativo; não autoriza pagamentos nem substitui validação bancária.

[![CI](https://github.com/JeffeMartins/api_boleto/actions/workflows/ci.yml/badge.svg)](https://github.com/JeffeMartins/api_boleto/actions/workflows/ci.yml)

## Melhorias de engenharia

- Extração correta dos dez dígitos do valor, usando centavos e formato decimal estável.
- Datas calculadas em UTC, sem depender de timezone ou parsing de data ambíguo.
- Ciclo de vencimento explícito para distinguir os fatores anteriores e posteriores a fevereiro de 2025.
- Timeout de cinco segundos na integração e erro controlado quando o banco remoto falha.
- Testes unitários/HTTP determinísticos com a integração externa simulada; sem acesso à internet durante a suíte.

## Executar localmente

Pré-requisitos: Node.js 24 LTS e npm; Docker Compose v2 para os serviços que usam banco.

```sh
npm ci
npm run build
npm test
npm start
```

A API usa `http://localhost:3003`. Exemplo preservado do ciclo antigo:

```sh
curl "http://localhost:3003/boleto/21290001192110001210904475617405975870000002000?cycle=legacy"
```

Resposta: `barCode`, `amount` e `expirationDate`. Use `cycle=2025` quando o boleto pertence ao ciclo iniciado em 22/02/2025 (fator 1000); o padrão `legacy` preserva exemplos antigos. O fator sozinho é ambíguo e não permite inferir o ciclo com segurança. [Especificação do Banco do Brasil, anexo IV](https://www.bb.com.br/docs/pub/emp/empl/dwn/Doc5175Bloqueto.pdf).

Alternativa: `docker compose up -d --build`. O parser não implementa a validação completa de todos os dígitos verificadores, boletos de arrecadação ou consultas ao registro bancário. Os testes simulam BrasilAPI; disponibilidade e payloads reais do provedor são uma dependência externa.

## Qualidade e limites da evidência

As mudanças preservam a proposta do exercício e corrigem problemas observados no código. A CI usa Node 24 e `npm ci`, executa o build quando disponível e os testes existentes. O lockfile é versionado; dependências e pastas de build não são. Dependabot acompanha atualizações semanais. Não há promessa de cobertura total, auditoria completa de segurança ou capacidade de produção.

Não publique `.env`, cookies, tokens ou dados reais de clientes. Antes de expor a aplicação à internet, revise autenticação/autorização, TLS, limites de chamadas, logs e backups conforme o domínio. Os exemplos são para execução local. Use `docker compose down` para parar os containers; volumes persistem e `down -v` apaga seus dados.
