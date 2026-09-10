/*
 * ============================================================
 * CALENDÁRIO DE AULAS
 * ============================================================
 *
 * As oficinas não têm data de início cadastrada (só dia da semana,
 * horário, duração e quantidade de encontros). Por isso o calendário
 * assume um início único, configurável abaixo.
 *
 * Se alguma oficina passar a ter data própria, basta adicionar
 * "startDate: '2026-09-16'" no item dela em WORKSHOPS.
 *
 * Regra de montagem:
 *   - cada oficina acontece 1x por semana;
 *   - no primeiro "dia possível" a partir da data de início;
 *   - repetindo pela "quantidade proposta" de encontros.
 *
 * Mantenha esta lista em sintonia com WORKSHOP_DETAILS de
 * assets/js/inscricao-nas-oficinas.js.
 */

const WORKSHOP_START_DATE = '2026-09-21';

// Sala usada por todas as oficinas.
const WORKSHOP_ROOM = 'SA10 - Explora';

// Segunda = 1 ... Sábado = 6 (padrão de Date.getDay()).
const WORKSHOPS = [
    {
        id: 'criando-jogos',
        title: 'Criando Jogos com MIT App Inventor',
        short: 'Criando Jogos',
        weekdays: [1],
        time: '14:00',
        durationMin: 120,
        sessions: 6,
        description: [
            'As crianças aprendem programação em blocos criando jogos no MIT App Inventor.',
            'A atividade trabalha variáveis, condições, raciocínio lógico, criatividade e autonomia na resolução de problemas.',
        ],
    },
    {
        id: 'detetives-ciencia',
        title: 'Detetives da Ciência: Investigação Forense e Dados',
        short: 'Detetives da Ciência',
        weekdays: [4],
        time: '16:00',
        durationMin: 120,
        sessions: 4,
        description: [
            'Os participantes investigam casos fictícios usando conceitos de ciência forense, química, biologia, física e lógica matemática.',
            'A oficina combina explicação teórica e aplicação prática em desafios investigativos.',
        ],
    },
    {
        id: 'mapa-cidade',
        title: 'Do Mapa à Cidade: Como projetar um bairro?',
        short: 'Do Mapa à Cidade',
        weekdays: [1],
        time: '14:00',
        durationMin: 120,
        sessions: 1,
        description: [
            'A partir de uma planta topográfica simplificada, as crianças planejam um pequeno bairro, definindo ruas, lotes, áreas verdes e soluções para o escoamento da água da chuva.',
            'A atividade trabalha interpretação do relevo, raciocínio espacial, criatividade e tomada de decisões.',
        ],
    },
    {
        id: 'missao-ingles',
        title: 'Missão Inglês: Uma jornada de diversão',
        short: 'Missão Inglês',
        weekdays: [4, 5],
        time: '16:00',
        durationMin: 120,
        sessions: 4,
        description: [
            'Atividades como caça-palavras, dublagens, jogos e curiosidades aproximam as crianças da língua inglesa de forma leve e divertida.',
            'A oficina ajuda a desenvolver vocabulário, compreensão e confiança para se expressar.',
        ],
    },
    {
        id: 'ferrovias',
        title: 'Workshop de Trens e Ferrovias',
        short: 'Trens e Ferrovias',
        weekdays: [1, 2, 3, 4, 5, 6],
        time: '17:00',
        durationMin: 120,
        sessions: 2,
        description: [
            'As crianças assumem o papel de engenheiros para conhecer trens, infraestrutura e os princípios de um projeto ferroviário.',
            'Experimentos e desafios exploram força, atrito, velocidade, frenagem, inclinação, curvas, rampas, pontes e operação ferroviária. Ao final, os participantes constroem e testam uma solução.',
        ],
    },
    {
        id: 'logica-programacao',
        title: 'Introdução a Lógica de Programação e Algoritmos',
        short: 'Lógica de Programação',
        weekdays: [1, 2],
        time: '08:00',
        durationMin: 120,
        sessions: 2,
        description: [
            'Uma introdução objetiva aos conceitos fundamentais de lógica de programação e algoritmos.',
            'As atividades são voltadas a desenvolver e consolidar o raciocínio lógico das crianças.',
        ],
    },
    {
        id: 'explorar-habilidades',
        title: 'Explorar Habilidades a partir de Card Games Modernos',
        short: 'Card Games Modernos',
        weekdays: [3],
        time: '14:00',
        durationMin: 60,
        sessions: 6,
        description: [
            'Nas oficinas usaremos jogos de cartas modernos para explorar habilidades lógicas, sociais e cognitivas.',
        ],
    },
    {
        id: 'ia',
        title: 'Introdução a IA / Letramento em IA',
        short: 'Introdução a IA',
        weekdays: [1, 2, 3, 4, 5, 6],
        time: '08:00',
        durationMin: 90,
        sessions: 8,
        description: [
            'Uma introdução lúdica aos conceitos e à história da inteligência artificial, explicando como ela funciona e como escrever bons comandos.',
            'As crianças exploram diferentes ferramentas de IA e criam uma árvore de decisão no Scratch. O conteúdo é ajustado conforme a idade da turma.',
        ],
    },
    {
        id: 'historias',
        title: 'Criando Histórias de uma forma lógica',
        short: 'Criando Histórias',
        weekdays: [2],
        time: '17:00',
        durationMin: 120,
        sessions: 5,
        description: [
            'As crianças usam o Scratch para aprender lógica e criar histórias por meio de programação em blocos, sem precisar escrever código.',
        ],
    },
    {
        id: 'calculo',
        title: 'Cálculo',
        short: 'Cálculo',
        weekdays: [3],
        time: '14:00',
        durationMin: 90,
        sessions: 10,
        description: [
            'Uma oficina de introdução aos conceitos de cálculo.',
        ],
    },
];

// Cores fixas por oficina (todas escuras o bastante para texto branco).
const PALETTE = [
    '#1b5fb0',
    '#bd1e20',
    '#1e7e34',
    '#c77700',
    '#6f42c1',
    '#0c8599',
    '#d63384',
    '#e8590c',
    '#3d4f66',
    '#7d5a29',
];

const WEEKDAY_LABELS = [
    'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
    'Quinta-feira', 'Sexta-feira', 'Sábado',
];

const WEEKDAY_PLURAL = [
    'Domingos', 'Segundas', 'Terças', 'Quartas',
    'Quintas', 'Sextas', 'Sábados',
];

const WEEKDAY_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];


/*
 * ============================================================
 * UTILIDADES DE DATA
 * ============================================================
 */

function parseISO(str) {
    const [year, month, day] = str.split('-').map(Number);
    return new Date(year, month - 1, day);
}

function addDays(date, amount) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

function isoKey(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}/${date.getFullYear()}`;
}

function formatShortDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}/${month}`;
}

function durationLabel(minutes) {
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return rest ? `${hours}h${String(rest).padStart(2, '0')}` : `${hours}h`;
}

function addMinutesToTime(time, minutes) {
    const [hour, minute] = time.split(':').map(Number);
    const total = hour * 60 + minute + minutes;
    const hh = Math.floor(total / 60) % 24;
    const mm = total % 60;
    return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function weekdaysLabel(weekdays) {
    const sorted = [...weekdays].sort((a, b) => a - b);
    const contiguous = sorted.every((value, index) => index === 0 || value === sorted[index - 1] + 1);

    if (contiguous && sorted.length > 2) {
        const first = WEEKDAY_LABELS[sorted[0]].replace('-feira', '');
        const last = WEEKDAY_LABELS[sorted[sorted.length - 1]].replace('-feira', '').toLowerCase();
        return `${first} a ${last}`;
    }

    return sorted.map((day) => WEEKDAY_SHORT[day]).join(', ');
}


/*
 * ============================================================
 * MONTAGEM DA AGENDA
 * ============================================================
 */

function firstOccurrence(startDate, weekdays) {
    let date = startDate;

    for (let i = 0; i < 7; i += 1) {
        if (weekdays.includes(date.getDay())) return date;
        date = addDays(date, 1);
    }

    return startDate;
}

function buildSchedule() {
    const sessions = [];
    const legend = [];

    WORKSHOPS.forEach((workshop, index) => {
        const color = PALETTE[index % PALETTE.length];
        const start = parseISO(workshop.startDate || WORKSHOP_START_DATE);
        const first = firstOccurrence(start, workshop.weekdays);
        const dates = [];

        for (let i = 0; i < workshop.sessions; i += 1) {
            const date = addDays(first, i * 7);
            dates.push(date);

            sessions.push({
                workshopId: workshop.id,
                title: workshop.title,
                short: workshop.short,
                color,
                date,
                key: isoKey(date),
                time: workshop.time,
                endTime: addMinutesToTime(workshop.time, workshop.durationMin),
                duration: durationLabel(workshop.durationMin),
                number: i + 1,
                total: workshop.sessions,
            });
        }

        legend.push({
            ...workshop,
            color,
            duration: durationLabel(workshop.durationMin),
            classWeekday: WEEKDAY_PLURAL[first.getDay()],
            possibleDays: weekdaysLabel(workshop.weekdays),
            firstDate: dates[0],
            lastDate: dates[dates.length - 1],
        });
    });

    sessions.sort((a, b) => a.date - b.date);

    return { sessions, legend };
}


/*
 * ============================================================
 * ESTADO E RENDERIZAÇÃO
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // Mesmo padrão das telas de inscrição: header e footer visíveis,
    // mas com a navegação inerte.
    disableLinksAndButtonsWhenReady('header-placeholder', '.mobile-menu-btn');
    disableLinksAndButtonsWhenReady('footer-placeholder');

    const grid = document.getElementById('calendar-grid');
    const monthLabel = document.getElementById('calendar-month-label');
    const prevButton = document.getElementById('calendar-prev');
    const nextButton = document.getElementById('calendar-next');
    const summary = document.getElementById('calendar-summary');
    const upcomingList = document.getElementById('upcoming-list');
    const legendList = document.getElementById('legend-list');

    const dayModal = document.getElementById('day-modal');
    const dayModalClose = document.getElementById('day-modal-close');
    const dayModalLabel = document.getElementById('day-modal-label');
    const dayModalTitle = document.getElementById('day-modal-title');
    const dayModalBody = document.getElementById('day-modal-body');
    let lastFocusedElement = null;

    if (!grid) return;

    const schedule = buildSchedule();

    const byDay = new Map();
    schedule.sessions.forEach((session) => {
        if (!byDay.has(session.key)) byDay.set(session.key, []);
        byDay.get(session.key).push(session);
    });

    const firstSession = schedule.sessions[0].date;
    const lastSession = schedule.sessions[schedule.sessions.length - 1].date;

    const minMonth = firstSession.getFullYear() * 12 + firstSession.getMonth();
    const maxMonth = lastSession.getFullYear() * 12 + lastSession.getMonth();

    let viewYear = firstSession.getFullYear();
    let viewMonth = firstSession.getMonth();
    let selectedKey = WORKSHOP_START_DATE;

    // No celular a grade mensal fica ilegível: usamos uma agenda semanal.
    const mobileQuery = window.matchMedia('(max-width: 620px)');
    let viewMode = mobileQuery.matches ? 'week' : 'month';
    let weekAnchor = firstSession;

    function weekStartOf(date) {
        const clean = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return addDays(clean, -clean.getDay());
    }


    function renderSummary() {
        summary.replaceChildren();

        const chips = [
            `<strong>${WORKSHOPS.length}</strong> oficinas`,
            `<strong>${schedule.sessions.length}</strong> encontros`,
            `${formatDate(firstSession)} <span class="calendar-chip-sep">→</span> ${formatDate(lastSession)}`,
        ];

        chips.forEach((html) => {
            const chip = document.createElement('span');
            chip.className = 'calendar-chip';
            chip.innerHTML = html;
            summary.appendChild(chip);
        });
    }


    function renderCalendar() {
        if (viewMode === 'week') {
            renderWeek();
            return;
        }

        grid.className = 'calendar-grid';

        const reference = new Date(viewYear, viewMonth, 1);
        monthLabel.textContent = capitalize(
            reference.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
        );

        const currentMonth = viewYear * 12 + viewMonth;
        prevButton.disabled = currentMonth <= minMonth;
        nextButton.disabled = currentMonth >= maxMonth;

        grid.replaceChildren();

        WEEKDAY_SHORT.forEach((label) => {
            const cell = document.createElement('div');
            cell.className = 'calendar-weekday';
            cell.textContent = label;
            grid.appendChild(cell);
        });

        const offset = reference.getDay();
        const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
        const totalCells = Math.ceil((offset + daysInMonth) / 7) * 7;
        const todayKey = isoKey(new Date());

        for (let cellIndex = 0; cellIndex < totalCells; cellIndex += 1) {
            const dayNumber = cellIndex - offset + 1;
            const cell = document.createElement('div');
            cell.className = 'calendar-cell';

            if (dayNumber < 1 || dayNumber > daysInMonth) {
                cell.classList.add('is-empty');
                grid.appendChild(cell);
                continue;
            }

            const date = new Date(viewYear, viewMonth, dayNumber);
            const key = isoKey(date);
            const dayClasses = byDay.get(key) || [];

            const number = document.createElement('span');
            number.className = 'calendar-daynum';
            number.textContent = dayNumber;
            cell.appendChild(number);

            if (key === todayKey) cell.classList.add('is-today');
            if (key === selectedKey) cell.classList.add('is-selected');
            if (dayClasses.length) cell.classList.add('has-classes');

            dayClasses
                .slice()
                .sort((a, b) => a.time.localeCompare(b.time))
                .slice(0, 3)
                .forEach((session) => {
                    const pill = document.createElement('span');
                    pill.className = 'calendar-pill';
                    pill.style.backgroundColor = session.color;
                    pill.textContent = `${session.time} ${session.short}`;
                    cell.appendChild(pill);
                });

            if (dayClasses.length > 3) {
                const more = document.createElement('span');
                more.className = 'calendar-more';
                more.textContent = `+${dayClasses.length - 3}`;
                cell.appendChild(more);
            }

            if (dayClasses.length) {
                cell.addEventListener('click', () => {
                    selectedKey = key;
                    renderCalendar();
                    openDayModal(key, cell);
                });
            }

            grid.appendChild(cell);
        }
    }


    function renderWeek() {
        grid.className = 'calendar-grid calendar-grid--week';

        const start = weekStartOf(weekAnchor);
        const end = addDays(start, 6);

        monthLabel.textContent = `${formatShortDate(start)} a ${formatShortDate(end)}`;

        prevButton.disabled = start.getTime() <= weekStartOf(firstSession).getTime();
        nextButton.disabled = start.getTime() >= weekStartOf(lastSession).getTime();

        grid.replaceChildren();

        const todayKey = isoKey(new Date());
        let hasAny = false;

        for (let i = 0; i < 7; i += 1) {
            const date = addDays(start, i);
            const key = isoKey(date);
            const dayClasses = (byDay.get(key) || [])
                .slice()
                .sort((a, b) => a.time.localeCompare(b.time));

            if (!dayClasses.length) continue;
            hasAny = true;

            const block = document.createElement('div');
            block.className = 'agenda-day';
            if (key === todayKey) block.classList.add('is-today');

            const rows = dayClasses.map((session) => `
                <li class="agenda-class">
                    <span class="agenda-bar" style="background:${session.color}"></span>
                    <span class="agenda-class-main">
                        <span class="agenda-class-time">${session.time} – ${session.endTime}</span>
                        <span class="agenda-class-name">${session.title}</span>
                    </span>
                </li>`).join('');

            block.innerHTML = `
                <div class="agenda-day-head">
                    <span class="agenda-dow">${capitalize(WEEKDAY_LABELS[date.getDay()])}</span>
                    <span class="agenda-date">${formatShortDate(date)}</span>
                </div>
                <ul class="agenda-classes">${rows}</ul>`;

            block.addEventListener('click', () => {
                selectedKey = key;
                openDayModal(key, block);
            });

            grid.appendChild(block);
        }

        if (!hasAny) {
            const empty = document.createElement('p');
            empty.className = 'day-detail-empty';
            empty.textContent = 'Nenhuma aula nesta semana.';
            grid.appendChild(empty);
        }
    }


    /*
     * ============================================================
     * MODAL DO DIA
     * ============================================================
     */

    function openDayModal(key, trigger) {
        const dayClasses = (byDay.get(key) || [])
            .slice()
            .sort((a, b) => a.time.localeCompare(b.time));

        if (!dayClasses.length || !dayModal) return;

        const date = parseISO(key);

        lastFocusedElement = trigger || null;

        if (dayModalLabel) dayModalLabel.textContent = 'Aulas do dia';

        dayModalTitle.textContent =
            `${capitalize(WEEKDAY_LABELS[date.getDay()])}, ${formatDate(date)}`;

        dayModalBody.replaceChildren();

        dayClasses.forEach((session) => {
            const row = document.createElement('div');
            row.className = 'day-class';
            row.innerHTML = `
                <span class="day-class-bar" style="background:${session.color}"></span>
                <span class="day-class-info">
                    <span class="day-class-time">${session.time} – ${session.endTime}</span>
                    <span class="day-class-title">${session.title}</span>
                    <span class="day-class-meta">Duração ${session.duration} · Encontro ${session.number} de ${session.total}</span>
                    <span class="day-class-room"><i class="fas fa-location-dot"></i> Sala ${WORKSHOP_ROOM}</span>
                </span>`;
            dayModalBody.appendChild(row);
        });

        dayModal.hidden = false;
        document.body.classList.add('modal-open');
        dayModalClose?.focus();
    }


    function openWorkshopModal(workshop, trigger) {
        if (!dayModal || !workshop) return;

        lastFocusedElement = trigger || null;

        const sessionsLabel = workshop.sessions === 1 ? '1 encontro' : `${workshop.sessions} encontros`;

        if (dayModalLabel) dayModalLabel.textContent = 'Oficina';
        dayModalTitle.textContent = workshop.title;

        dayModalBody.replaceChildren();

        const facts = [
            `<i class="far fa-calendar"></i> ${workshop.classWeekday} às ${workshop.time}`,
            `<i class="far fa-clock"></i> Duração ${workshop.duration} · ${sessionsLabel}`,
            `<i class="fas fa-arrow-right-arrow-left"></i> ${formatDate(workshop.firstDate)} até ${formatDate(workshop.lastDate)}`,
            `<i class="fas fa-location-dot"></i> Sala ${WORKSHOP_ROOM}`,
        ];

        if (workshop.weekdays.length > 1) {
            facts.push(`<i class="fas fa-circle-info"></i> Dias possíveis: ${workshop.possibleDays}`);
        }

        const description = (workshop.description || [])
            .map((paragraph) => `<p>${paragraph}</p>`)
            .join('');

        dayModalBody.innerHTML = `
            <ul class="workshop-modal-facts">
                ${facts.map((fact) => `<li>${fact}</li>`).join('')}
            </ul>
            ${description ? `<div class="workshop-modal-desc">${description}</div>` : ''}`;

        dayModal.hidden = false;
        document.body.classList.add('modal-open');
        dayModalClose?.focus();
    }


    function closeDayModal() {
        if (!dayModal) return;

        dayModal.hidden = true;
        document.body.classList.remove('modal-open');

        lastFocusedElement?.focus();
        lastFocusedElement = null;
    }


    dayModalClose?.addEventListener('click', closeDayModal);

    dayModal?.querySelectorAll('[data-close-day-modal]').forEach((element) => {
        element.addEventListener('click', closeDayModal);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && dayModal && !dayModal.hidden) {
            closeDayModal();
        }
    });


    function renderUpcoming() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcoming = schedule.sessions.filter((session) => session.date >= today);

        upcomingList.replaceChildren();

        if (!upcoming.length) {
            const empty = document.createElement('p');
            empty.className = 'day-detail-empty';
            empty.textContent = 'Todos os encontros já foram realizados.';
            upcomingList.appendChild(empty);
            return;
        }

        upcoming.slice(0, 8).forEach((session) => {
            const item = document.createElement('div');
            item.className = 'upcoming-item';
            item.innerHTML = `
                <span class="upcoming-date">${formatShortDate(session.date)}</span>
                <span class="upcoming-dot" style="background:${session.color}"></span>
                <span class="upcoming-text">${session.time} · ${session.short}</span>`;

            item.addEventListener('click', () => {
                viewYear = session.date.getFullYear();
                viewMonth = session.date.getMonth();
                selectedKey = session.key;
                renderCalendar();
                openDayModal(session.key, item);
            });

            upcomingList.appendChild(item);
        });
    }


    function renderLegend() {
        legendList.replaceChildren();

        schedule.legend.forEach((workshop) => {
            const item = document.createElement('button');
            item.type = 'button';
            item.className = 'legend-item';
            item.setAttribute('aria-label', `Ver descrição de ${workshop.title}`);

            const sessionsLabel = workshop.sessions === 1 ? '1 encontro' : `${workshop.sessions} encontros`;
            const possibleLine = workshop.weekdays.length > 1
                ? `<span class="legend-meta">Dias possíveis: ${workshop.possibleDays}</span>`
                : '';

            item.innerHTML = `
                <span class="legend-swatch" style="background:${workshop.color}"></span>
                <span class="legend-info">
                    <span class="legend-name">${workshop.title}</span>
                    <span class="legend-meta">${workshop.classWeekday} às ${workshop.time} · ${workshop.duration} · ${sessionsLabel}</span>
                    <span class="legend-meta">${formatDate(workshop.firstDate)} → ${formatDate(workshop.lastDate)}</span>
                    ${possibleLine}
                </span>
                <i class="fas fa-chevron-right legend-arrow"></i>`;

            item.addEventListener('click', () => openWorkshopModal(workshop, item));

            legendList.appendChild(item);
        });
    }


    function step(direction) {
        if (viewMode === 'week') {
            weekAnchor = addDays(weekStartOf(weekAnchor), direction * 7);
        } else {
            viewMonth += direction;
            if (viewMonth < 0) {
                viewMonth = 11;
                viewYear -= 1;
            } else if (viewMonth > 11) {
                viewMonth = 0;
                viewYear += 1;
            }
        }
        renderCalendar();
    }

    prevButton.addEventListener('click', () => {
        if (!prevButton.disabled) step(-1);
    });

    nextButton.addEventListener('click', () => {
        if (!nextButton.disabled) step(1);
    });


    // Alterna entre agenda semanal (celular) e grade mensal (telas maiores)
    // quando o tamanho da janela cruza o limite.
    function handleViewportChange(event) {
        const nextMode = event.matches ? 'week' : 'month';
        if (nextMode === viewMode) return;

        if (nextMode === 'week') {
            const inMonth = schedule.sessions.find((session) =>
                session.date.getFullYear() === viewYear
                && session.date.getMonth() === viewMonth);
            weekAnchor = inMonth ? inMonth.date : firstSession;
        } else {
            viewYear = weekAnchor.getFullYear();
            viewMonth = weekAnchor.getMonth();
        }

        viewMode = nextMode;
        renderCalendar();
    }

    if (mobileQuery.addEventListener) {
        mobileQuery.addEventListener('change', handleViewportChange);
    } else if (mobileQuery.addListener) {
        mobileQuery.addListener(handleViewportChange);
    }


    renderSummary();
    renderCalendar();
    renderUpcoming();
    renderLegend();
});


/*
 * ============================================================
 * NAVEGAÇÃO INERTE (copiado de inscricao-oficina.js)
 * ============================================================
 *
 * Header e footer são carregados de forma assíncrona (script.js).
 * Assim que chegam, bloqueamos clique/ativação por teclado — o CSS
 * de inscricao-oficina.css já cuida do cursor "not-allowed".
 */

function preventDisabledClick(event) {
    event.preventDefault();
    event.stopPropagation();
}

function preventDisabledActivation(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.stopPropagation();
    }
}

function disableLinksAndButtonsWhenReady(placeholderId, excludeSelector) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    const disableInteractiveElements = () => {
        placeholder.querySelectorAll('a, button').forEach((el) => {
            if (excludeSelector && el.matches(excludeSelector)) return;
            el.setAttribute('tabindex', '-1');
            el.setAttribute('aria-disabled', 'true');
            el.addEventListener('click', preventDisabledClick);
            el.addEventListener('keydown', preventDisabledActivation);
        });
    };

    if (placeholder.children.length > 0) {
        disableInteractiveElements();
        return;
    }

    const observer = new MutationObserver(() => {
        if (placeholder.children.length > 0) {
            disableInteractiveElements();
            observer.disconnect();
        }
    });

    observer.observe(placeholder, { childList: true });
}
