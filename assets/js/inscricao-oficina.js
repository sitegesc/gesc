// TODO: substituir pela URL do Web App do Google Apps Script quando a planilha for criada.
const GOOGLE_SCRIPT_URL = "";

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
    const data = Object.fromEntries(formData.entries());
    data.days = formData.getAll('days');
    return data;
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
    const data = collectFormData(form);

    if (data.days.length === 0) {
        showFeedback('Selecione ao menos um dia de interesse para aplicar a oficina.', 'error');
        return;
    }

    submitButton.disabled = true;

    try {
        if (GOOGLE_SCRIPT_URL) {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
        }

        showFeedback('Inscrição enviada com sucesso! Em breve entraremos em contato.', 'success');
        form.reset();
        toggleRaField();
    } catch (error) {
        console.error(error);
        showFeedback('Não foi possível enviar sua inscrição agora. Tente novamente em instantes.', 'error');
    } finally {
        submitButton.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[name="isStudent"]').forEach((radio) => {
        radio.addEventListener('change', toggleRaField);
    });
    toggleRaField();

    document.getElementById('enrollment-form').addEventListener('submit', handleFormSubmit);
});
