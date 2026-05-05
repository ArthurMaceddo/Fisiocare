/* ================================================
   FisioCare - Página: Dashboard
   ================================================ */
const Pages = window.Pages || {};

Pages.dashboard = async function(container) {
  try {
    const stats = await Api.dashboard();

    container.innerHTML = `
      <div class="page-header">
        <h2>🏠 Dashboard</h2>
      </div>
      <div class="page-body">

        <p class="welcome-msg">
          Bem-vindo(a), <span>${stats.nomeUsuario}</span>! 👋
        </p>

        <!-- Cards de estatísticas -->
        <div class="stat-grid">
          <div class="stat-card">
            <div class="stat-icon">👥</div>
            <div class="stat-info">
              <label>Total de Pacientes</label>
              <strong>${stats.totalPacientes}</strong>
            </div>
          </div>
          <div class="stat-card green">
            <div class="stat-icon">📅</div>
            <div class="stat-info">
              <label>Consultas Hoje</label>
              <strong>${stats.consultasHoje}</strong>
            </div>
          </div>
          <div class="stat-card orange">
            <div class="stat-icon">📊</div>
            <div class="stat-info">
              <label>Sessões no Mês</label>
              <strong>${stats.sessoesMes}</strong>
            </div>
          </div>
        </div>

        <!-- Agendamentos do dia -->
        <div class="card">
          <div class="card-header">
            <h3>📅 Agendamentos de Hoje</h3>
            <button class="btn btn-secondary btn-sm" onclick="Pages.agendamentos(document.getElementById('page-container')); document.querySelectorAll('.nav-item').forEach(e=>e.classList.toggle('active',e.dataset.page==='agendamentos'))">
              Ver todos
            </button>
          </div>
          <div id="tabela-hoje" class="table-wrap">
            <div class="loader"><div class="spinner"></div> Carregando...</div>
          </div>
        </div>

      </div>
    `;

    // Carregar agendamentos do dia
    const hoje = await Api.agendamentos.hoje();
    const tbl = document.getElementById('tabela-hoje');

    if (!hoje || hoje.length === 0) {
      tbl.innerHTML = `
        <div class="empty-state">
          <div class="icon">📭</div>
          <p>Nenhum agendamento para hoje.</p>
        </div>`;
      return;
    }

    tbl.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Fisioterapeuta</th>
            <th>Horário</th>
            <th>Tratamento</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${hoje.map(a => `
            <tr>
              <td>${a.pacienteNome || '-'}</td>
              <td>${a.fisioNome || '-'}</td>
              <td>${formatarDataHora(a.dataHora)}</td>
              <td>${a.tratamento}</td>
              <td>${badgeStatus(a.status)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>`;

  } catch(e) {
    container.innerHTML = `
      <div class="page-header"><h2>Dashboard</h2></div>
      <div class="page-body">
        <div class="empty-state">
          <div class="icon">⚠️</div>
          <p>Não foi possível conectar ao servidor.<br>
          Verifique se o backend Java está rodando na porta 8080.</p>
        </div>
      </div>`;
  }
};
