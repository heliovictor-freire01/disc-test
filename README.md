# Teste DISC — V4 Company

Aplicação web de teste de perfil DISC hospedada no Vercel, com respostas salvas automaticamente em uma planilha Google.

**Arquitetura:** Vercel (HTML estático) → Google Apps Script (Web App) → Google Sheets

---

## Setup — passo a passo

### 1. Criar a planilha Google

1. Acesse [sheets.google.com](https://sheets.google.com) e crie uma planilha nova
2. Copie o **ID da planilha** da URL:
   ```
   https://docs.google.com/spreadsheets/d/ESTE_É_O_ID/edit
   ```

---

### 2. Configurar o Google Apps Script

1. Na planilha, vá em **Extensões → Apps Script**
2. Apague o código padrão e cole o conteúdo de `apps-script.gs`
3. Substitua `COLE_O_ID_DA_PLANILHA_AQUI` pelo ID copiado no passo anterior
4. Salve o projeto (Ctrl+S)
5. **Criar cabeçalhos:** selecione a função `setupHeaders` no menu e clique **Executar** (autorize as permissões quando solicitado)
6. **Publicar como Web App:**
   - Clique em **Implantar → Nova implantação**
   - Tipo: **App da Web**
   - Executar como: **Eu**
   - Quem tem acesso: **Qualquer pessoa**
   - Clique em **Implantar** e copie a URL gerada

---

### 3. Configurar o index.html

Abra `index.html` e substitua na linha do `APPS_SCRIPT_URL`:

```js
const APPS_SCRIPT_URL = 'COLE_SUA_URL_AQUI';
// troque por:
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/SEU_ID/exec';
```

---

### 4. Deploy no Vercel

1. Crie um repositório no GitHub e faça push dos arquivos:
   ```bash
   git init
   git add .
   git commit -m "feat: teste DISC v4 company"
   git remote add origin https://github.com/SEU_USUARIO/disc-test.git
   git push -u origin main
   ```
2. Acesse [vercel.com](https://vercel.com), clique em **Add New Project**
3. Importe o repositório GitHub
4. Clique em **Deploy** — sem nenhuma configuração extra
5. Sua URL ficará disponível em: `https://disc-test-xxx.vercel.app`

---

## Estrutura da planilha

| Colunas | Descrição |
|---------|-----------|
| A | Timestamp |
| B | Nome |
| C | Email |
| D | Empresa |
| E | Função |
| F–I | Score D / I / S / C |
| J | Perfil Dominante |
| K | Perfil Secundário |
| L–O | Q1_D / Q1_I / Q1_S / Q1_C |
| P–S | Q2_D / Q2_I / Q2_S / Q2_C |
| … | … (até Q20) |
| Total | **91 colunas** |

---

## Verificação

- [ ] Abrir a URL do Vercel no browser e no celular
- [ ] Preencher nome, email, empresa e função → clicar Iniciar
- [ ] Responder as 20 perguntas (testar arrastar e botões ↑↓)
- [ ] Ver tela de resultado com gráfico e descrição do perfil
- [ ] Conferir se a linha apareceu na planilha Google
- [ ] Fechar o browser no meio do teste, reabrir → deve retomar de onde parou
