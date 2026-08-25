document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('enrollment-form');
    const feedback = document.getElementById('form-feedback');
    const workshopsGroup = document.getElementById('workshops-choice-group');
    const workshopCheckboxes = document.querySelectorAll('input[name="workshops"]');
    const submitButton = document.getElementById('submit-button');
    const formContainer = document.querySelector('.enrollment-form-container');
    const successScreen = document.getElementById('success-screen');
    const newEnrollmentButton = document.getElementById('new-enrollment-button');

    if (!form) return;

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

    // Regra de negócio: a inscrição só pode ser enviada se pelo menos
    // uma oficina estiver selecionada. O botão fica desabilitado e o
    // grupo de checkboxes é destacado até essa condição ser satisfeita.
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

    // Estado inicial: nenhuma oficina marcada ainda, botão já nasce
    // desabilitado via atributo HTML — aqui só sincronizamos o resto.
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

    form.addEventListener('submit', (event) => {
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

        const payload = {
            fullName: formData.get('fullName'),
            age: formData.get('age'),
            guardianName: formData.get('guardianName'),
            phone: formData.get('phone'),
            workshops: selectedWorkshops
        };

        // TODO: substituir por uma chamada real ao backend/planilha de inscrições
        console.log('Inscrição enviada:', payload);

        showSuccessScreen();
    });
});