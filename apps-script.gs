// ─── CONFIGURAÇÃO ────────────────────────────────────────────────────────────
// Substitua pelo ID da sua planilha Google (está na URL: /spreadsheets/d/ESTE_ID/edit)
const SHEET_ID = '1DKcKNbgIvjw2_Zwe88T3MOnktPX64VACDrPyLsR7vRM/edit?gid=0#gid=0';

// ─── RECEBER RESPOSTAS DO FORMULÁRIO ─────────────────────────────────────────
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

    // Linha base: identificação + scores + perfis
    const row = [
      new Date().toISOString(),
      data.nome      || '',
      data.email     || '',
      data.empresa   || '',
      data.funcao    || '',
      data.scoreD    || 0,
      data.scoreI    || 0,
      data.scoreS    || 0,
      data.scoreC    || 0,
      data.dominante  || '',
      data.secundario || ''
    ];

    // Respostas individuais: Q1_D, Q1_I, Q1_S, Q1_C … Q20_D, Q20_I, Q20_S, Q20_C
    if (Array.isArray(data.answers)) {
      data.answers.forEach(ans => {
        row.push(
          ans.D || 0,
          ans.I || 0,
          ans.S || 0,
          ans.C || 0
        );
      });
    }

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ─── CRIAR CABEÇALHOS (rode uma vez manualmente) ──────────────────────────────
// No Apps Script: selecione esta função e clique em "Executar"
function setupHeaders() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

  const headers = [
    'Timestamp', 'Nome', 'Email', 'Empresa', 'Função',
    'Score D', 'Score I', 'Score S', 'Score C',
    'Perfil Dominante', 'Perfil Secundário'
  ];

  for (let i = 1; i <= 20; i++) {
    headers.push(`Q${i}_D`, `Q${i}_I`, `Q${i}_S`, `Q${i}_C`);
  }

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Formata cabeçalho
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#e50914');
  headerRange.setFontColor('#ffffff');
  sheet.setFrozenRows(1);

  SpreadsheetApp.flush();
  Logger.log('Cabeçalhos criados: ' + headers.length + ' colunas');
}

// ─── TESTE LOCAL (opcional) ───────────────────────────────────────────────────
// Rode para verificar se a conexão com a planilha está funcionando
function testConnection() {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  Logger.log('Conectado à planilha: ' + sheet.getName());
  Logger.log('Linhas existentes: ' + sheet.getLastRow());
}
