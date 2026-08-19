const SHEETDB_URL = 'https://sheetdb.io/api/v1/nidpepp383c9l';

const DAY_LABELS = {
    segunda: 'Segunda',
    terca: 'Terça',
    quarta: 'Quarta',
    quinta: 'Quinta',
    sexta: 'Sexta',
    sabado: 'Sábado',
};

function toggleRaField() {
    const isStudent = document.querySelector('input[name="isStudent"]:checked');
    const raGroup = document.getElementById('ra-group');
    const raInput = document.getElementById('ra');

    const studentSelected = isStudent && isStudent.value === 'sim';
    raGroup.hidden = !studentSelected;
    raInput.required = studentSelected;
    if (!studentSelected) raInput.value = '';
}

function collectFormData(form) {
    const formData = new FormData(form);
    const selectedDays = formData.getAll('days');

    return {
        selectedDays,
        row: {
            eh_aluno: formData.get('isStudent') === 'sim' ? 'Sim' : 'Não',
            ra: formData.get('ra') || '',
            nome_completo: formData.get('fullName'),
            email: formData.get('email'),
            whatsapp: formData.get('whatsapp'),
            nome_oficina: formData.get('workshopName'),
            descricao_oficina: formData.get('workshopDescription'),
            dias_aplicacao: selectedDays.map((day) => DAY_LABELS[day] || day).join(', '),
            horario_aplicacao: formData.get('preferredTime'),
            duracao_horas: formData.get('dayDuration'),
            total_oficinas: formData.get('totalWorkshops'),
            data_envio: 'DATETIME',
        },
    };
}

function showFeedback(message, type) {
    const feedback = document.getElementById('form-feedback');
    feedback.textContent = message;
    feedback.className = `form-feedback ${type}`;
    feedback.hidden = false;
}

async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = form.querySelector('.btn-submit');
    const originalButtonContent = submitButton.innerHTML;
    const { selectedDays, row } = collectFormData(form);

    if (selectedDays.length === 0) {
        showFeedback('Selecione ao menos um dia de interesse para aplicar a oficina.', 'error');
        return;
    }

    if (submitButton.disabled) return;

    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    try {
        const response = await fetch(SHEETDB_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: [row] }),
        });

        if (!response.ok) {
            throw new Error(`SheetDB respondeu com status ${response.status}`);
        }

        showFeedback('Inscrição enviada com sucesso! Em breve entraremos em contato.', 'success');
        form.reset();
        toggleRaField();
    } catch (error) {
        console.error(error);
        showFeedback('Não foi possível enviar sua inscrição agora. Tente novamente em instantes.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonContent;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[name="isStudent"]').forEach((radio) => {
        radio.addEventListener('change', toggleRaField);
    });
    toggleRaField();

    document.getElementById('enrollment-form').addEventListener('submit', handleFormSubmit);

    initTimePicker();

    // O botão do menu hambúrguer (.mobile-menu-btn) fica de fora: ele só
    // abre/fecha o painel do menu, não navega para lugar nenhum.
    disableLinksAndButtonsWhenReady('header-placeholder', '.mobile-menu-btn');
    disableLinksAndButtonsWhenReady('footer-placeholder');
});

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

// Header e footer são carregados de forma assíncrona (script.js/loadComponent).
// Nesta tela só o formulário deve funcionar: assim que os componentes chegarem,
// bloqueamos o clique/ativação por teclado via JS (o CSS só cuida do cursor
// "not-allowed" — pointer-events:none impediria o navegador de mostrar esse
// cursor, então o bloqueio real do clique precisa ser feito aqui).
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

// Seletor de horário personalizado (troca o <input type="time"> nativo,
// que muda muito de aparência entre navegadores/sistemas). Começa em 14:00.
const TIME_PICKER_HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const TIME_PICKER_MINUTES = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
const TIME_PICKER_DEFAULT = { hour: '14', minute: '00' };

function initTimePicker() {
    const wrapper = document.getElementById('time-picker');
    if (!wrapper) return;

    const trigger = document.getElementById('time-picker-trigger');
    const panel = document.getElementById('time-picker-panel');
    const valueLabel = document.getElementById('time-picker-value');
    const hoursCol = document.getElementById('time-picker-hours');
    const minutesCol = document.getElementById('time-picker-minutes');
    const hiddenInput = document.getElementById('preferredTime');

    let selectedHour = TIME_PICKER_DEFAULT.hour;
    let selectedMinute = TIME_PICKER_DEFAULT.minute;

    function renderColumn(container, values, selectedValue, onSelect) {
        container.innerHTML = '';
        values.forEach((value) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = value;
            button.classList.toggle('selected', value === selectedValue);
            button.addEventListener('click', () => onSelect(value));
            container.appendChild(button);
        });
    }

    function render() {
        valueLabel.textContent = `${selectedHour}:${selectedMinute}`;
        hiddenInput.value = `${selectedHour}:${selectedMinute}`;
        renderColumn(hoursCol, TIME_PICKER_HOURS, selectedHour, (value) => {
            selectedHour = value;
            render();
        });
        renderColumn(minutesCol, TIME_PICKER_MINUTES, selectedMinute, (value) => {
            selectedMinute = value;
            render();
        });
    }

    function openPanel() {
        panel.hidden = false;
        trigger.setAttribute('aria-expanded', 'true');
        const selectedButtons = panel.querySelectorAll('.selected');
        selectedButtons.forEach((button) => button.scrollIntoView({ block: 'center' }));
    }

    function closePanel() {
        panel.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', () => {
        if (panel.hidden) openPanel();
        else closePanel();
    });

    document.addEventListener('click', (event) => {
        if (!wrapper.contains(event.target)) closePanel();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closePanel();
    });

    render();
}
