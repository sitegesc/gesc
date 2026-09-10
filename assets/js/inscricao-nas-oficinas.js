const SHEETDB_URL = 'https://sheetdb.io/api/v1/nidpepp383c9l?sheet=PAIS';

const WORKSHOP_DETAILS = {
    // Para incluir outra oficina, adicione um item aqui com o mesmo
    // data-workshop usado no respectivo cartão do HTML.
    'criando-jogos': {
        title: 'Criando Jogos com MIT App Inventor',
        days: 'Segunda-feira',
        availableDays: ['Segunda-feira'],
        time: '14:00',
        duration: '2 horas',
        sessions: 6,
        description: [
            'As crianças aprendem programação em blocos criando jogos no MIT App Inventor.',
            'A atividade trabalha variáveis, condições, raciocínio lógico, criatividade e autonomia na resolução de problemas.'
        ]
    },
    'detetives-ciencia': {
        title: 'Detetives da Ciência: Investigação Forense e Dados',
        days: 'Quinta-feira',
        availableDays: ['Quinta-feira'],
        time: '16:00',
        duration: '2 horas',
        sessions: 4,
        description: [
            'Os participantes investigam casos fictícios usando conceitos de ciência forense, química, biologia, física e lógica matemática.',
            'A oficina combina explicação teórica e aplicação prática em desafios investigativos.'
        ]
    },
    'mapa-cidade': {
        title: 'Do Mapa à Cidade: Como projetar um bairro?',
        days: 'Segunda-feira',
        availableDays: ['Segunda-feira'],
        time: '14:00',
        duration: '2 horas',
        sessions: 1,
        description: [
            'A partir de uma planta topográfica simplificada, as crianças planejam um pequeno bairro, definindo ruas, lotes, áreas verdes e soluções para o escoamento da água da chuva.',
            'A atividade trabalha interpretação do relevo, raciocínio espacial, criatividade e tomada de decisões.'
        ]
    },
    'missao-ingles': {
        title: 'Missão Inglês: Uma jornada de diversão',
        days: 'Quinta e sexta-feira',
        availableDays: ['Quinta-feira', 'Sexta-feira'],
        time: '16:00',
        duration: '2 horas',
        sessions: 4,
        description: [
            'Atividades como caça-palavras, dublagens, jogos e curiosidades aproximam as crianças da língua inglesa de forma leve e divertida.',
            'A oficina ajuda a desenvolver vocabulário, compreensão e confiança para se expressar.'
        ]
    },
    ferrovias: {
        title: 'Workshop de Trens e Ferrovias',
        days: 'Segunda-feira a sábado',
        availableDays: [
            'Segunda-feira',
            'Terça-feira',
            'Quarta-feira',
            'Quinta-feira',
            'Sexta-feira',
            'Sábado'
        ],
        time: '17:00',
        duration: '2 horas',
        sessions: 2,
        description: [
            'As crianças assumem o papel de engenheiros para conhecer trens, infraestrutura e os princípios de um projeto ferroviário.',
            'Experimentos e desafios exploram força, atrito, velocidade, frenagem, inclinação, curvas, rampas, pontes e operação ferroviária. Ao final, os participantes constroem e testam uma solução.'
        ]
    },
    'logica-programacao': {
        title: 'Introdução a Lógica de Programação e Algoritmos',
        days: 'Segunda e terça-feira',
        availableDays: ['Segunda-feira', 'Terça-feira'],
        time: '08:00',
        duration: '2 horas',
        sessions: 2,
        description: [
            'Uma introdução objetiva aos conceitos fundamentais de lógica de programação e algoritmos.',
            'As atividades são voltadas a desenvolver e consolidar o raciocínio lógico das crianças.'
        ]
    },
    'explorar-habilidades': {
        title: 'Explorar Habilidades a partir de Card Games Modernos',
        days: 'Quarta-feira',
        availableDays: ['Quarta-feira'],
        time: '14:00',
        duration: '1 hora',
        sessions: 6,
        description: [
            'Nas oficinas usaremos jogos de cartas modernos para explorar habilidades lógicas, social e cognitiva.'
        ]
    },
    ia: {
        title: 'Introdução a IA/Letramento em IA',
        days: 'Segunda-feira a sábado',
        availableDays: [
            'Segunda-feira',
            'Terça-feira',
            'Quarta-feira',
            'Quinta-feira',
            'Sexta-feira',
            'Sábado'
        ],
        time: '08:00',
        duration: '1h30',
        sessions: 8,
        turma1: [
            'Uma introdução lúdica aos conceitos e à história da inteligência artificial, explicando como ela funciona e como escrever bons comandos.',
            'As crianças também criam uma árvore de decisão no Scratch e experimentam diferentes ferramentas de IA.'
        ],
        turma2: [
            'A oficina apresenta conceitos e a história da inteligência artificial com atividades de análise de gráficos e dados.',
            'Os participantes treinam um modelo simples de aprendizado de máquina e buscam maneiras de melhorar seus resultados.'
        ]
    },
    historias: {
        title: 'Criando Histórias de uma forma lógica',
        days: 'Terça-feira',
        availableDays: ['Terça-feira'],
        time: '17:00',
        duration: '2 horas',
        sessions: 5,
        description: [
            'As crianças usam o Scratch para aprender lógica e criar histórias por meio de programação em blocos, sem precisar escrever código.'
        ]
    },
    calculo: {
        title: 'Cálculo',
        days: 'Quarta-feira',
        availableDays: ['Quarta-feira'],
        time: '14:00',
        duration: '1h30',
        sessions: 10,
        description: [
            'Uma oficina de introdução aos conceitos de cálculo.'
        ]
    }
};

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
    const workshopModal = document.getElementById('workshop-modal');
    const workshopModalClose = document.getElementById('workshop-modal-close');
    const workshopModalTitle = document.getElementById('workshop-modal-title');
    const workshopModalTime = document.getElementById('workshop-modal-time');
    const workshopModalDescription = document.getElementById('workshop-modal-description');
    let lastFocusedElement = null;

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
     * DETALHES DAS OFICINAS
     * ============================================================
     */

    function getWorkshopDescription(workshopId) {

        const workshop = WORKSHOP_DETAILS[workshopId];

        if (!workshop) return [];

        if (workshopId !== 'ia') {
            return workshop.description;
        }

        const age = Number(ageInput?.value);

        if (!age || age < 1) {
            return [
                'Preencha a idade do aluno para o site indicar automaticamente a turma e mostrar o conteúdo correspondente.'
            ];
        }

        return age <= 9
            ? workshop.turma1
            : workshop.turma2;
    }


    function getWorkshopTitle(workshopId) {

        const dynamicTitle = document.querySelector(
            `[data-workshop-text="${workshopId}"]`
        );

        return dynamicTitle?.textContent.trim()
            || WORKSHOP_DETAILS[workshopId]?.title
            || 'Oficina';
    }


    function closeWorkshopModal() {

        if (!workshopModal) return;

        workshopModal.hidden = true;
        document.body.classList.remove('modal-open');

        lastFocusedElement?.focus();
        lastFocusedElement = null;
    }


    function openWorkshopModal(workshopId, trigger) {

        const workshop = WORKSHOP_DETAILS[workshopId];

        if (
            !workshop
            || !workshopModal
            || !workshopModalTitle
            || !workshopModalTime
            || !workshopModalDescription
        ) {
            return;
        }

        lastFocusedElement = trigger;

        workshopModalTitle.textContent =
            getWorkshopTitle(workshopId);

        const sessionsLabel = workshop.sessions === 1
            ? '1 encontro'
            : `${workshop.sessions} encontros`;

        workshopModalTime.textContent =
            `Dias possíveis: ${workshop.days} • horário proposto: ${workshop.time} • duração: ${workshop.duration} • quantidade proposta: ${sessionsLabel}`;

        workshopModalDescription.replaceChildren();

        getWorkshopDescription(workshopId).forEach((paragraph) => {

            const text = document.createElement('p');
            text.textContent = paragraph;
            workshopModalDescription.appendChild(text);
        });

        workshopModal.hidden = false;
        document.body.classList.add('modal-open');
        workshopModalClose?.focus();
    }


    document.querySelectorAll(
        '[data-workshop-details]'
    ).forEach((button) => {

        button.addEventListener('click', () => {

            openWorkshopModal(
                button.dataset.workshopDetails,
                button
            );
        });
    });


    workshopModalClose?.addEventListener(
        'click',
        closeWorkshopModal
    );


    workshopModal?.querySelectorAll(
        '[data-close-workshop-modal]'
    ).forEach((element) => {

        element.addEventListener(
            'click',
            closeWorkshopModal
        );
    });


    document.addEventListener('keydown', (event) => {

        if (
            event.key === 'Escape'
            && workshopModal
            && !workshopModal.hidden
        ) {
            closeWorkshopModal();
        }
    });


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


    function getWorkshopDayCheckboxes(workshopId) {

        return Array.from(
            document.querySelectorAll(
                `input[data-workshop-day="${workshopId}"]`
            )
        );
    }


    function createWorkshopAvailabilityFields() {

        getWorkshopCheckboxes().forEach((workshopCheckbox) => {

            const workshopId = workshopCheckbox.dataset.workshop;
            const workshop = WORKSHOP_DETAILS[workshopId];
            const workshopOption = workshopCheckbox.closest('.workshop-option');

            if (!workshop || !workshopOption) return;

            const fieldset = document.createElement('fieldset');
            fieldset.className = 'workshop-availability';
            fieldset.dataset.workshopAvailability = workshopId;
            fieldset.hidden = true;

            const legend = document.createElement('legend');
            legend.textContent = 'Em quais desses dias a criança pode participar?';
            fieldset.appendChild(legend);

            const daysContainer = document.createElement('div');
            daysContainer.className = 'workshop-day-options';

            workshop.availableDays.forEach((day) => {

                const label = document.createElement('label');
                label.className = 'workshop-day-option';

                const dayCheckbox = document.createElement('input');
                dayCheckbox.type = 'checkbox';
                dayCheckbox.value = day;
                dayCheckbox.dataset.workshopDay = workshopId;
                dayCheckbox.setAttribute(
                    'aria-label',
                    `${getWorkshopTitle(workshopId)}: ${day}`
                );

                const dayText = document.createElement('span');
                dayText.textContent = day;

                label.append(dayCheckbox, dayText);
                daysContainer.appendChild(label);
            });

            fieldset.appendChild(daysContainer);
            workshopOption.appendChild(fieldset);
        });
    }


    function updateWorkshopAvailabilityVisibility(workshopCheckbox) {

        const workshopId = workshopCheckbox.dataset.workshop;
        const availability = document.querySelector(
            `[data-workshop-availability="${workshopId}"]`
        );

        if (!availability) return;

        const shouldShow =
            workshopCheckbox.checked
            && !workshopCheckbox.disabled;

        availability.hidden = !shouldShow;

        if (!shouldShow) {
            getWorkshopDayCheckboxes(workshopId).forEach((dayCheckbox) => {
                dayCheckbox.checked = false;
            });

            availability.classList.remove('invalid');
        }
    }


    function selectedWorkshopsHaveAvailability() {

        return getWorkshopCheckboxes()
            .filter(checkbox => checkbox.checked)
            .every((workshopCheckbox) => {

                const workshopId = workshopCheckbox.dataset.workshop;

                return getWorkshopDayCheckboxes(workshopId).some(
                    dayCheckbox => dayCheckbox.checked
                );
            });
    }


    createWorkshopAvailabilityFields();


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

                updateWorkshopAvailabilityVisibility(checkbox);

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

        const hasWorkshop = hasAtLeastOneWorkshop();
        const hasAvailability =
            hasWorkshop
            && selectedWorkshopsHaveAvailability();
        const valid = hasWorkshop && hasAvailability;

        if (submitButton) {
            submitButton.disabled = !valid;
        }

        if (workshopsGroup) {

            workshopsGroup.classList.toggle(
                'invalid',
                !hasWorkshop
            );
        }

        getWorkshopCheckboxes().forEach((workshopCheckbox) => {

            const workshopId = workshopCheckbox.dataset.workshop;
            const availability = document.querySelector(
                `[data-workshop-availability="${workshopId}"]`
            );

            if (!availability) return;

            const missingAvailability =
                workshopCheckbox.checked
                && !getWorkshopDayCheckboxes(workshopId).some(
                    dayCheckbox => dayCheckbox.checked
                );

            availability.classList.toggle(
                'invalid',
                missingAvailability
            );
        });

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
                () => {
                    updateWorkshopAvailabilityVisibility(checkbox);
                    updateWorkshopValidationState();
                }
            );

        });

        document.querySelectorAll(
            'input[data-workshop-day]'
        ).forEach((dayCheckbox) => {

            dayCheckbox.addEventListener(
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

        getWorkshopCheckboxes().forEach(
            updateWorkshopAvailabilityVisibility
        );

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

                const hasWorkshop = hasAtLeastOneWorkshop();

                showFeedback(
                    hasWorkshop
                        ? 'Para cada oficina selecionada, marque pelo menos um dia em que a criança pode participar.'
                        : 'Selecione pelo menos uma oficina para continuar.',
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
            const selectedWorkshops = getWorkshopCheckboxes()
                .filter(checkbox => checkbox.checked)
                .map((workshopCheckbox) => {

                    const workshopId = workshopCheckbox.dataset.workshop;

                    const availableDays = getWorkshopDayCheckboxes(workshopId)
                        .filter(dayCheckbox => dayCheckbox.checked)
                        .map(dayCheckbox => dayCheckbox.value);

                    return `${workshopCheckbox.value} [dias disponíveis: ${availableDays.join(', ')}]`;
                });


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
                    selectedWorkshops.join(' | '),

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
