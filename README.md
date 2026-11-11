# Catálogo In House Apps

Índice curado de apps públicos da organização [In-House-Technology](https://github.com/In-House-Technology), com licença MIT, para instalar nas nuvens das empresas. Cada app tem seu próprio repositório de origem e versões em tags `vX.Y.Z`. O arquivo [`catalog.yaml`](catalog.yaml) fixa o commit aprovado de cada versão; versões aparecem em ordem semântica decrescente.

O índice, as origens dos apps e o [validador público](https://github.com/In-House-Technology/ihapp-tools) são MIT. O InHouseCloud é a plataforma proprietária e gerenciada onde os apps instalados rodam. O índice não contém a configuração da instalação nem os dados dos apps das empresas.

## Usar um app na sua empresa

Consulte o [catálogo](https://inhouse.technology/apps) e peça ao Claude para preparar a instalação pelo conector da InHouse. Revise a versão, a configuração e as permissões. Depois de aprovar a instalação, aguarde o link do app atrás do login da empresa.

Atualizações também exigem aprovação. A integração parte da versão instalada e tenta preservar as alterações locais; conflitos precisam ser resolvidos antes da implantação. A configuração da empresa permanece na instalação. Veja os guias de [instalação](https://inhouse.technology/cloud/docs/catalog) e [atualização](https://inhouse.technology/cloud/docs/update-an-app).

## Como uma versão entra

Para um app feito na sua empresa, siga o [guia de publicação pelo Claude](https://inhouse.technology/cloud/docs/publish-an-app). A preparação verifica a cópia candidata. A submissão aprovada torna o código público e abre o PR para curadoria. Os passos abaixo descrevem o que a curadoria confere antes de assinar o índice.

1. Publique o app em um repositório público `https://github.com/In-House-Technology/<nome>.git`, com `ihapp-catalog.yaml`, LICENSE MIT e a tag da versão. O manifesto descreve requisitos, permissões completas, pontos de configuração, changelog e migrações.
2. Abra um PR neste repositório alterando `catalog.yaml`. Fixe o commit completo de 40 caracteres da tag; não use branch, HEAD ou tag no campo `commit`. Não mova tags de versões já aprovadas.
3. Preencha o [checklist de curadoria](.github/pull_request_template.md): leitura do código, permissões compatíveis com as funções, ausência de segredos e dados reais de pessoas ou clientes, licença MIT, migrações e changelog revisados. Para a versão mais recente, nome, resumo, categorias e licença devem coincidir com o manifesto.
4. Aguarde a CI. O [workflow de validação](.github/workflows/validate.yml) usa a action pública `In-House-Technology/ihapp-tools`, fixada por commit, em modo `index`. Ela executa `validate-index catalog.yaml --fetch --org In-House-Technology`: busca as origens públicas, verifica tags e commits e valida os manifestos.
5. O proprietário `@cavaestoca`, definido em CODEOWNERS, revisa e aprova o PR. Registre o e-mail do aprovador em `approved_by` e a data ISO em `approved_at`. Somente depois da aprovação faça o merge.

Configure a proteção de `main` no GitHub para exigir a CI e revisão dos code owners. O arquivo CODEOWNERS identifica o responsável; a proteção da branch torna a aprovação obrigatória.

## Assinatura do índice

Depois de cada merge na `main` que muda o `catalog.yaml`, o workflow **Assinar índice**
(`.github/workflows/sign.yml`) assina os bytes exatos do arquivo com a chave ed25519 da
InHouse e publica `catalog-<sha256>.sig` no release `signatures`. O job roda no ambiente
`catalog-signing`, que exige a aprovação do dono: sem ela, nada é assinado.

- O iht só passa adiante um índice assinado. Enquanto a versão nova não tem assinatura, as
  empresas continuam vendo o último índice assinado.
- O ihc confere a assinatura com as chaves públicas fixadas no próprio código antes de
  confiar em qualquer versão.
- Chave nova ou rotação: `node scripts/new-signing-key.mjs <key-id> [--backup <arquivo>]`
  grava a chave privada direto no segredo do ambiente (sem mostrá-la) e imprime a chave
  pública, que entra na lista do ihc e do iht antes de a antiga sair.

Licença [MIT](LICENSE), Copyright (c) 2026 Estoca.
