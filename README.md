# Formulário com consulta de CEP

Exercício de formulários, fetch e tratamento de respostas do ViaCEP com a identidade educacional AluraBooks.

## Tecnologias

HTML, CSS e JavaScript. Sem framework de interface.

## Executar

Na raiz do repositório, com Python 3 instalado:

```sh
python -m http.server 8000
```

Abra http://localhost:8000/. Informe oito dígitos no CEP, com ou sem hífen.

## Recursos e melhorias

- Validação antes da consulta, estados de carregamento e erro legíveis.
- Consultas anteriores são canceladas; respostas antigas não sobrescrevem o endereço atual.
- Mudanças no CEP limpam endereço desatualizado; preenchimento manual continua possível.
- Envio demonstrativo navega sem expor os campos em query strings.

## Testes

Com Node.js 18 ou superior, execute na raiz:

```sh
node --test tests/*.test.cjs
```

Os testes de regressão usam o test runner nativo, DOM e serviços simulados, sem instalar dependências. Cobrem fluxos específicos de lógica, não substituem testes visuais, de acessibilidade ou integração em navegador real.

## Escopo e limitações

Use dados fictícios. Apenas o CEP é enviado ao ViaCEP (https://viacep.com.br/). Nenhum cadastro é enviado ou persistido. A disponibilidade externa não foi validada pelos testes, que simulam respostas.

## Contexto

Projeto de estudos de Eduardo (EduT3). A proposta e os recursos originais foram preservados; as melhorias priorizam correção, uso por teclado, adaptação de layout e documentação.

### Links registrados na versão original

- https://api-formulario-cep.vercel.app/

Esses links foram preservados como referência e não representam publicação desta revisão.
