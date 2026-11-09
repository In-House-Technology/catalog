# Catálogo In House Apps

Índice curado de apps públicos da organização [In-House-Technology](https://github.com/In-House-Technology), com licença MIT, para instalar nas nuvens das empresas. Cada app tem seu próprio repositório de origem e versões em tags `vX.Y.Z`. O arquivo [`catalog.yaml`](catalog.yaml) fixa o commit aprovado de cada versão; versões aparecem em ordem semântica decrescente.

O plano de controle `inhouse.technology` consulta e mantém uma cópia deste índice para oferecê-lo às nuvens das empresas. Instalar ou aceitar uma atualização cria mudanças no repositório da empresa; a origem preserva a configuração e as adaptações locais no processo de integração. O índice não armazena configuração de empresas nem dados dos apps.

## Como uma versão entra

1. Publique o app em um repositório público `https://github.com/In-House-Technology/<nome>.git`, com `ihapp-catalog.yaml`, LICENSE MIT e a tag da versão. O manifesto descreve requisitos, permissões completas, pontos de configuração, changelog e migrações.
2. Abra um PR neste repositório alterando `catalog.yaml`. Fixe o commit completo de 40 caracteres da tag; não use branch, HEAD ou tag no campo `commit`. Não mova tags de versões já aprovadas.
3. Preencha o [checklist de curadoria](.github/pull_request_template.md): leitura do código, permissões compatíveis com as funções, ausência de segredos e dados reais de pessoas ou clientes, licença MIT, migrações e changelog revisados. Para a versão mais recente, nome, resumo, categorias e licença devem coincidir com o manifesto.
4. Aguarde a CI. A action `Estoca/inhousecloud/.github/actions/ihapp-catalog-validate@77b5b92c4c000e75b86e9c088b93c8b87e55dc5d`, em modo `index`, executa `validate-index catalog.yaml --fetch --org In-House-Technology`: busca as origens, verifica tags e commits e valida os manifestos. A origem deve estar disponível publicamente e a action precisa ter sido publicada na plataforma.
5. O proprietário `@cavaestoca`, definido em CODEOWNERS, revisa e aprova o PR. Registre o e-mail do aprovador em `approved_by` e a data ISO em `approved_at`. Somente depois da aprovação faça o merge.

Configure a proteção de `main` no GitHub para exigir a CI e revisão dos code owners. O arquivo CODEOWNERS identifica o responsável; a proteção da branch torna a aprovação obrigatória.

## Primeira entrada

O índice começa com `inhouse/requisicao-compras` 1.0.0. O commit `0000000000000000000000000000000000000000` é um marcador temporário solicitado para o preparo local. Após publicar a origem e criar `v1.0.0`, substitua-o pelo commit real antes da aprovação e publicação do índice. A validação com busca remota deve falhar enquanto o marcador estiver presente ou a tag não existir. Os metadados iniciais de aprovação também devem corresponder à aprovação efetivamente registrada no PR.

Licença [MIT](LICENSE), Copyright (c) 2026 Estoca.
