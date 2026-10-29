# Contexto da modernização

Repositório: `api_boleto`. Revisão em 28/10/2026. O objetivo é tornar o clone reproduzível e o comportamento compreensível em uma entrevista técnica, preservando o contexto histórico de exercício/protótipo.

## Decisões e validação

- Extração correta dos dez dígitos do valor, usando centavos e formato decimal estável.
- Datas calculadas em UTC, sem depender de timezone ou parsing de data ambíguo.
- Ciclo de vencimento explícito para distinguir os fatores anteriores e posteriores a fevereiro de 2025.
- Timeout de cinco segundos na integração e erro controlado quando o banco remoto falha.
- Testes unitários/HTTP determinísticos com a integração externa simulada; sem acesso à internet durante a suíte.


Consulte os scripts reais em `package.json` (ou nos módulos do monorepo). Build, teste unitário e teste com serviços externos são evidências diferentes. A CI não valida credenciais de terceiros nem garante comportamento em produção. O README informa dependências externas e funcionalidades ainda não implementadas.

## Segurança de configurações antigas

Configurações locais e segredos foram retirados da versão atual quando presentes. Isso não remove conteúdo de commits antigos. Se algum segredo histórico ainda estiver ativo, revogue-o no provedor e gere outro; não reutilize credenciais publicadas. A revisão preserva o histórico Git e não faz force push.
