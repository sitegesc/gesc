const SHEETDB_URL = 'https://sheetdb.io/api/v1/nidpepp383c9l?sheet=PAIS';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('enrollment-form');
    const feedback = document.getElementById('form-feedback');
    const workshopsGroup = document.getElementById('workshops-choice-group');
    const workshopCheckboxes = document.querySelectorAll('input[name="workshops"]');
    const submitButton = document.getElementById('submit-button');
    const formContainer = document.querySelector('.enrollment-form-container');
    const successScreen = document.getElementById('success-screen');
    const newEnrollmentButton = document.getElementById('new-enrollment-button');
    const phoneInput = document.getElementById('phone');

    if (!form) return;

    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            if (val.length > 11) val = val.slice(0, 11);

            if (val.length > 10) {
                val = val.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
            } else if (val.length > 5) {
                val = val.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
            } else if (val.length > 2) {
                val = val.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
            } else {
                val = val.replace(/^(\d*)$/, '$1');
            }
            e.target.value = val;
        });
    }

    function showFeedback(message, isError) {
        if (!feedback) return;
        feedback.textContent = message;
        feedback.hidden = false;
        feedback.classList.toggle('error', !!isError);
        feedback.classList.toggle('success', !isError);
    }

    function clearFeedback() {
        if (!feedback) return;
        feedback.hidden = true;
        feedback.textContent = '';
    }

    function hasAtLeastOneWorkshop() {
        return Array.from(workshopCheckboxes).some(cb => cb.checked);
    }

    function updateWorkshopValidationState() {
        const valid = hasAtLeastOneWorkshop();

        if (submitButton) {
            submitButton.disabled = !valid;
        }

        if (workshopsGroup) {
            workshopsGroup.classList.toggle('invalid', !valid);
        }

        if (valid) {
            clearFeedback();
        }

        return valid;
    }

    workshopCheckboxes.forEach(cb => {
        cb.addEventListener('change', updateWorkshopValidationState);
    });

    updateWorkshopValidationState();

    function showSuccessScreen() {
        if (formContainer) formContainer.hidden = true;
        if (successScreen) successScreen.hidden = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showFormScreen() {
        if (successScreen) successScreen.hidden = true;
        if (formContainer) formContainer.hidden = false;
        form.reset();
        updateWorkshopValidationState();
        clearFeedback();
    }

    if (newEnrollmentButton) {
        newEnrollmentButton.addEventListener('click', showFormScreen);
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!updateWorkshopValidationState()) {
            showFeedback('Selecione pelo menos uma oficina para continuar.', true);
            return;
        }

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const selectedWorkshops = formData.getAll('workshops');

        const row = {
            nome_completo: formData.get('fullName'),
            idade: formData.get('age'),
            nome_responsavel: formData.get('guardianName'),
            telefone_contato: formData.get('phone'),
            'oficinas_selecionadas': selectedWorkshops.join(', '),
            data_envio: 'DATETIME'
        };

        const originalBtnHtml = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

        try {
            const response = await fetch(SHEETDB_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: [row] })
            });

            if (!response.ok) {
                throw new Error(`Erro na resposta do SheetDB: ${response.status}`);
            }

            showSuccessScreen();
        } catch (error) {
            console.error(error);
            showFeedback('Não foi possível enviar a inscrição. Verifique sua conexão e tente novamente.', true);
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalBtnHtml;
        }
    });
});