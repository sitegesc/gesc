const SHEETDB_URL = 'https://sheetdb.io/api/v1/nidpepp383c9l?sheet=PAIS';

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('enrollment-form');
    const feedback = document.getElementById('form-feedback');
    const workshopsGroup = document.getElementById('workshops-choice-group');
    const submitButton = document.getElementById('submit-button');
    const formContainer = document.querySelector('.enrollment-form-container');
    const successScreen = document.getElementById('success-screen');
    const newEnrollmentButton = document.getElementById('new-enrollment-button');
    const phoneInput = document.getElementById('phone');
    const ageInput = document.getElementById('age');

    if (!form) return;


    /*
     * ============================================================
     * CONFIGURAÇÃO DAS OFICINAS
     * ============================================================
     *
     * As oficinas abaixo possuem turmas diferentes de acordo
     * com a idade:
     *
     * Até 9 anos  -> Turma 1
     * 10 anos ou mais -> Turma 2
     *
     * As demais oficinas não precisam estar aqui porque
     * possuem apenas uma turma.
     */

    const ageBasedWorkshops = {
        ia: {
            baseValue: 'Introdução a IA',
            label: 'Introdução a IA/Letramento em IA'
        },

        historias: {
            baseValue: 'Criando Histórias de uma forma lógica',
            label: 'Criando Histórias de uma forma lógica'
        },

        calculo: {
            baseValue: 'Cálculo',
            label: 'Cálculo'
        }
    };


    /*
     * ============================================================
     * MÁSCARA DE TELEFONE
     * ============================================================
     */

    if (phoneInput) {

        phoneInput.addEventListener('input', (e) => {

            let val = e.target.value.replace(/\D/g, '');

            if (val.length > 11) {
                val = val.slice(0, 11);
            }

            if (val.length > 10) {

                val = val.replace(
                    /^(\d{2})(\d{5})(\d{4})$/,
                    '($1) $2-$3'
                );

            } else if (val.length > 5) {

                val = val.replace(
                    /^(\d{2})(\d{4})(\d{0,4})$/,
                    '($1) $2-$3'
                );

            } else if (val.length > 2) {

                val = val.replace(
                    /^(\d{2})(\d{0,5})$/,
                    '($1) $2'
                );

            } else {

                val = val.replace(
                    /^(\d*)$/,
                    '$1'
                );
            }

            e.target.value = val;
        });
    }


    /*
     * ============================================================
     * FEEDBACK
     * ============================================================
     */

    function showFeedback(message, isError) {

        if (!feedback) return;

        feedback.textContent = message;
        feedback.hidden = false;

        feedback.classList.toggle(
            'error',
            !!isError
        );

        feedback.classList.toggle(
            'success',
            !isError
        );
    }


    function clearFeedback() {

        if (!feedback) return;

        feedback.hidden = true;
        feedback.textContent = '';
    }


    /*
     * ============================================================
     * OFICINAS SELECIONADAS
     * ============================================================
     */

    function getWorkshopCheckboxes() {

        return Array.from(
            document.querySelectorAll(
                'input[name="workshops"]'
            )
        );
    }


    function hasAtLeastOneWorkshop() {

        return getWorkshopCheckboxes().some(
            checkbox => checkbox.checked
        );
    }


    /*
     * ============================================================
     * ATUALIZAÇÃO DAS TURMAS DE ACORDO COM A IDADE
     * ============================================================
     */

    function updateWorkshopClasses() {

        const age = Number(ageInput?.value);

        /*
         * Se a idade não estiver preenchida, não escolhemos
         * nenhuma turma ainda.
         */
        if (!age || age < 1) {

            Object.keys(ageBasedWorkshops).forEach((workshopId) => {

                const checkbox = document.querySelector(
                    `input[data-workshop="${workshopId}"]`
                );

                const label = document.querySelector(
                    `[data-workshop-label="${workshopId}"]`
                );

                if (!checkbox) return;

                /*
                 * Remove uma eventual seleção enquanto a idade
                 * ainda não está definida.
                 */
                checkbox.checked = false;

                checkbox.disabled = true;

                checkbox.value =
                    ageBasedWorkshops[workshopId].baseValue;

                if (label) {
                    label.classList.add('workshop-disabled');
                }
            });

            updateWorkshopValidationState();

            return;
        }


        /*
         * Determina a turma:
         *
         * 1 -> até 9 anos
         * 2 -> 10 anos ou mais
         */
        const turma = age <= 9 ? 1 : 2;


        Object.entries(ageBasedWorkshops).forEach(
            ([workshopId, workshop]) => {

                const checkbox = document.querySelector(
                    `input[data-workshop="${workshopId}"]`
                );

                const label = document.querySelector(
                    `[data-workshop-label="${workshopId}"]`
                );

                const text = document.querySelector(
                    `[data-workshop-text="${workshopId}"]`
                );

                if (!checkbox) return;


                /*
                 * Atualiza o VALUE que será enviado para o SheetDB.
                 *
                 * Exemplo:
                 *
                 * Introdução a IA - Turma 1
                 * Introdução a IA - Turma 2
                 */
                checkbox.value =
                    `${workshop.baseValue} - Turma ${turma}`;

                checkbox.disabled = false;


                if (label) {
                    label.classList.remove('workshop-disabled');
                }


                /*
                 * Mantém o texto amigável para o usuário.
                 *
                 * O usuário vê a turma que foi determinada
                 * automaticamente.
                 */
                if (text) {
                    text.textContent =
                        `${workshop.label} — Turma ${turma}`;
                }
            }
        );


        updateWorkshopValidationState();
    }


    /*
     * ============================================================
     * VALIDAÇÃO DAS OFICINAS
     * ============================================================
     */

    function updateWorkshopValidationState() {

        const valid = hasAtLeastOneWorkshop();

        if (submitButton) {
            submitButton.disabled = !valid;
        }

        if (workshopsGroup) {

            workshopsGroup.classList.toggle(
                'invalid',
                !valid
            );
        }

        if (valid) {
            clearFeedback();
        }

        return valid;
    }


    /*
     * ============================================================
     * EVENTOS DOS CHECKBOXES
     * ============================================================
     */

    function registerWorkshopListeners() {

        getWorkshopCheckboxes().forEach((checkbox) => {

            checkbox.addEventListener(
                'change',
                updateWorkshopValidationState
            );

        });
    }


    registerWorkshopListeners();


    /*
     * ============================================================
     * EVENTO DA IDADE
     * ============================================================
     */

    if (ageInput) {

        ageInput.addEventListener(
            'input',
            updateWorkshopClasses
        );

        ageInput.addEventListener(
            'change',
            updateWorkshopClasses
        );
    }


    /*
     * Inicializa o estado das oficinas.
     *
     * Como a idade começa vazia, as oficinas que dependem
     * da idade ficam desabilitadas até que ela seja informada.
     */
    updateWorkshopClasses();

    updateWorkshopValidationState();


    /*
     * ============================================================
     * TELA DE SUCESSO
     * ============================================================
     */

    function showSuccessScreen() {

        if (formContainer) {
            formContainer.hidden = true;
        }

        if (successScreen) {
            successScreen.hidden = false;
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }


    /*
     * ============================================================
     * VOLTAR PARA NOVA INSCRIÇÃO
     * ============================================================
     */

    function showFormScreen() {

        if (successScreen) {
            successScreen.hidden = true;
        }

        if (formContainer) {
            formContainer.hidden = false;
        }

        form.reset();

        /*
         * Depois do reset, as oficinas dependentes da idade
         * precisam voltar para o estado inicial.
         */
        updateWorkshopClasses();

        updateWorkshopValidationState();

        clearFeedback();
    }


    if (newEnrollmentButton) {

        newEnrollmentButton.addEventListener(
            'click',
            showFormScreen
        );
    }


    /*
     * ============================================================
     * ENVIO DO FORMULÁRIO
     * ============================================================
     */

    form.addEventListener(
        'submit',
        async (event) => {

            event.preventDefault();


            /*
             * Verifica se existe pelo menos uma oficina.
             */
            if (!updateWorkshopValidationState()) {

                showFeedback(
                    'Selecione pelo menos uma oficina para continuar.',
                    true
                );

                return;
            }


            /*
             * Validação nativa do HTML.
             */
            if (!form.checkValidity()) {

                form.reportValidity();

                return;
            }


            /*
             * Validação adicional da idade.
             */
            const age = Number(ageInput?.value);

            if (!Number.isInteger(age) || age < 1) {

                showFeedback(
                    'Informe uma idade válida para continuar.',
                    true
                );

                ageInput?.focus();

                return;
            }


            /*
             * Pega os dados do formulário.
             */
            const formData = new FormData(form);


            /*
             * Aqui são capturados os VALUES dos checkboxes.
             *
             * Portanto, para uma pessoa de 15 anos:
             *
             * Introdução a IA - Turma 2
             *
             * será enviado para a planilha.
             */
            const selectedWorkshops =
                formData.getAll('workshops');


            /*
             * Segurança adicional:
             *
             * Não permite enviar o formulário sem oficinas.
             */
            if (selectedWorkshops.length === 0) {

                showFeedback(
                    'Selecione pelo menos uma oficina para continuar.',
                    true
                );

                return;
            }


            /*
             * Monta exatamente as colunas existentes
             * na sua planilha.
             */
            const row = {

                nome_completo:
                    formData.get('fullName'),

                idade:
                    formData.get('age'),

                nome_responsavel:
                    formData.get('guardianName'),

                telefone_contato:
                    formData.get('phone'),

                oficinas_selecionadas:
                    selectedWorkshops.join(', '),

                data_envio:
                    'DATETIME'
            };


            /*
             * Guarda o HTML original do botão.
             */
            const originalBtnHtml =
                submitButton.innerHTML;


            /*
             * Desabilita o botão enquanto envia.
             */
            submitButton.disabled = true;

            submitButton.innerHTML =
                '<i class="fas fa-spinner fa-spin"></i> Enviando...';


            try {

                const response = await fetch(
                    SHEETDB_URL,
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body: JSON.stringify({
                            data: [row]
                        })
                    }
                );


                if (!response.ok) {

                    throw new Error(
                        `Erro na resposta do SheetDB: ${response.status}`
                    );
                }


                /*
                 * Se chegou aqui, a inscrição foi enviada.
                 */
                showSuccessScreen();

            } catch (error) {

                console.error(error);

                showFeedback(
                    'Não foi possível enviar a inscrição. Verifique sua conexão e tente novamente.',
                    true
                );

            } finally {

                /*
                 * Restaura o botão.
                 */
                submitButton.disabled = false;

                submitButton.innerHTML =
                    originalBtnHtml;
            }
        }
    );

});