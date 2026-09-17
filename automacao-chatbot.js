// ============================================================
// Celly AUTOMAÇÃO — CHATBOT COM IA (VERSÃO FINAL CORRIGIDA)
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // MENU MOBILE (HAMBURGER)
    // ============================================
    const menuToggle = document.getElementById('botMenuToggle');
    const navMenu = document.getElementById('botNavMenu');

    // ============================================
    // NAVBAR SÓ APARECE NO TOPO (HOME)
    // ============================================
    const navbar = document.querySelector('.bot-navbar');
    if (navbar) {
        function atualizarNavbar() {
            if (window.scrollY > 10) {
                navbar.classList.add('bot-navbar-oculta');
            } else {
                navbar.classList.remove('bot-navbar-oculta');
            }
        }
        atualizarNavbar();
        window.addEventListener('scroll', atualizarNavbar);
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        document.querySelectorAll('.bot-nav-menu a').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // ============================================
    // PLANOS - ABAS MENSAL / ANUAL
    // ============================================
    const tabs = document.querySelectorAll('.bot-planos-tab');
    const mensalGrid = document.getElementById('botPlanosMensal');
    const anualGrid = document.getElementById('botPlanosAnual');

    if (mensalGrid && anualGrid) {
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabs.forEach(function (t) { t.classList.remove('active'); });
                tab.classList.add('active');

                const plano = tab.dataset.plano;
                if (plano === 'mensal') {
                    mensalGrid.classList.add('active');
                    anualGrid.classList.remove('active');
                } else {
                    mensalGrid.classList.remove('active');
                    anualGrid.classList.add('active');
                }
            });
        });
    }

    // ============================================
    // FAQ ACORDEON
    // ============================================
    const faqItems = document.querySelectorAll('.bot-faq-item');
    faqItems.forEach(function (item) {
        const btn = item.querySelector('.bot-faq-btn');
        if (btn) {
            btn.addEventListener('click', function () {
                faqItems.forEach(function (other) {
                    if (other !== item) other.classList.remove('active');
                });
                item.classList.toggle('active');
            });
        }
    });
    if (faqItems.length > 0) faqItems[0].classList.add('active');

    // ============================================
    // SCROLL REVEAL
    // ============================================
    const revelaveis = document.querySelectorAll('.bot-reveal, .bot-showcase-imagem-wrapper');

    // Escalona a entrada dos 4 passos
    document.querySelectorAll('.bot-steps-grid .bot-step').forEach(function (passo, index) {
        const atraso = index * 0.15;
        passo.style.transitionDelay = atraso + 's';

        const numero = passo.querySelector('.bot-step-num');
        if (numero) numero.style.transitionDelay = (atraso + 0.15) + 's';
    });

    function revelar() {
        revelaveis.forEach(function (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80 && rect.bottom > 0) {
                el.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', revelar);
    window.addEventListener('resize', revelar);
    setTimeout(revelar, 300);

    // ============================================
    // FORMULÁRIO CTA (DEMO)
    // ============================================
    const form = document.getElementById('botCtaForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const btn = form.querySelector('.btn-bot-form-submit');
            const textoOriginal = btn.textContent;
            btn.textContent = '✅ Recebemos! Vamos te chamar no WhatsApp';
            btn.disabled = true;
            setTimeout(function () {
                btn.textContent = textoOriginal;
                btn.disabled = false;
                form.reset();
            }, 3500);
        });
    }


    
    // ============================================
    // CARROSSEL INFINITO (SEGMENTOS)
    // ============================================
    const carrosselTrack = document.getElementById('botCarrosselTrack');
    if (carrosselTrack) {
        const segmentos = [
            { icone: 'fa-utensils', titulo: 'Restaurantes & Delivery', desc: 'Pedidos, promoções e reservas 24h' },
            { icone: 'fa-cart-shopping', titulo: 'E-commerce', desc: 'Recuperação de carrinho e upsell' },
            { icone: 'fa-spa', titulo: 'Clínicas & Estética', desc: 'Agendamentos e confirmações automáticas' },
            { icone: 'fa-house', titulo: 'Imobiliárias', desc: 'Agenda de visitas e informações do imóvel' },
            { icone: 'fa-screwdriver-wrench', titulo: 'Prestadores de Serviço', desc: 'Orçamentos e agendamentos no automático' },
            { icone: 'fa-hotel', titulo: 'Hospedagem & Turismo', desc: 'Reservas, check-in e recomendações' }
        ];

        // Popula o carrossel (duplica pra efeito infinito)
        const html = segmentos.map(function (seg) {
            return '<div class="bot-carrossel-item">' +
                '<i class="fas ' + seg.icone + '"></i>' +
                '<h3>' + seg.titulo + '</h3>' +
                '<p>' + seg.desc + '</p>' +
                '</div>';
        }).join('');

        carrosselTrack.innerHTML = html + html; // duplica pra efeito infinito

        // Anima o carrossel
        let scrollPos = 0;
        const velocidade = 0.5; // pixels por frame
        function animarCarrossel() {
            scrollPos += velocidade;
            const maxScroll = carrosselTrack.scrollWidth / 2;
            if (scrollPos >= maxScroll) {
                scrollPos = 0;
            }
            carrosselTrack.style.transform = 'translateX(-' + scrollPos + 'px)';
            requestAnimationFrame(animarCarrossel);
        }
        animarCarrossel();
    }

    // ============================================
    // CHAT DEMO (nova estrutura com bot-chatdemo-corpo)
    // ============================================
    const chatReplay = document.getElementById('botChatReplay');
    const chatCorpo = document.getElementById('botChatCorpo');

    const conversaDemoInicial = [
        { tipo: 'bot', texto: 'Oi, tudo bem? 👋' },
        { tipo: 'me', texto: 'Oi, tudo! Quero saber sobre seus planos' },
        { tipo: 'bot', texto: 'Claro! Temos 3 planos:\n\n💎 ESSENCIAL - R$197/mês\n💎 PROFISSIONAL - R$397/mês\n💎 ENTERPRISE - sob consulta\n\nQual te interessa?' },
        { tipo: 'me', texto: 'Qual é a diferença?' },
        { tipo: 'bot', texto: 'O Profissional tem conversas ilimitadas, recuperação de carrinho, agendamentos automáticos e integração com Instagram. Quer agendar uma demo?' },
        { tipo: 'me', texto: 'Sim! Próxima segunda funciona?' },
        { tipo: 'bot', texto: '✅ Perfeito! Vou agendar para segunda às 10h. Confirma aí? 📅' },
        { tipo: 'me', texto: 'Confirma! Obrigado' }
    ];

    let conversaVersao = 0;

    function scrollChatParaFinal() {
        if (chatCorpo.parentElement) {
            chatCorpo.parentElement.scrollTop = chatCorpo.parentElement.scrollHeight;
        }
    }

    function adicionarBalao(tipo, texto) {
        const row = document.createElement('div');
        row.className = 'bot-chatdemo-row ' + tipo;

        const bolha = document.createElement('div');
        bolha.className = 'bot-chatdemo-bolha';
        bolha.textContent = texto;

        row.appendChild(bolha);
        chatCorpo.appendChild(row);
        scrollChatParaFinal();
    }

    function renderizarConversa() {
        if (!chatCorpo) return;

        // Invalida qualquer timeout de uma renderização anterior (replay rápido)
        const minhaVersao = ++conversaVersao;
        chatCorpo.innerHTML = '';

        let atraso = 400;
        let typingEl = null;

        conversaDemoInicial.forEach(function (msg) {
            if (msg.tipo === 'bot') {
                // A Andressa "digita" por um tempo antes de responder
                const horaDigitando = atraso;
                setTimeout(function () {
                    if (minhaVersao !== conversaVersao) return;
                    const row = document.createElement('div');
                    row.className = 'bot-chatdemo-row bot';
                    row.innerHTML = '<div class="bot-chatdemo-typing"><i></i><i></i><i></i></div>';
                    chatCorpo.appendChild(row);
                    typingEl = row;
                    scrollChatParaFinal();
                }, horaDigitando);

                atraso += 1100 + Math.random() * 600; // tempo "digitando..."

                const horaResposta = atraso;
                setTimeout(function () {
                    if (minhaVersao !== conversaVersao) return;
                    if (typingEl) { typingEl.remove(); typingEl = null; }
                    adicionarBalao('bot', msg.texto);
                }, horaResposta);

                atraso += 400;
            } else {
                // Mensagem do cliente entra sem "digitando", com um pequeno atraso natural
                const horaMsg = atraso;
                setTimeout(function () {
                    if (minhaVersao !== conversaVersao) return;
                    adicionarBalao('me', msg.texto);
                }, horaMsg);

                atraso += 700 + Math.random() * 400;
            }
        });
    }

    // Renderiza ao carregar
    renderizarConversa();

    // Botão de replay
    if (chatReplay) {
        chatReplay.addEventListener('click', function () {
            renderizarConversa();
        });
    }

    // ============================================
    // CHAT FLUTUANTE (widget no canto)
    // ============================================
    const chatToggle = document.getElementById('botChatToggle');
    const chatClose = document.getElementById('botChatClose');
    const chatWindow = document.getElementById('botChatWindow');
    const chatMessages = document.getElementById('botChatMessages');
    const chatInput = document.getElementById('botChatInput');
    const chatSend = document.getElementById('botChatSend');
    const chatOptions = document.querySelectorAll('.bot-chat-option');

    function toggleChat() {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            setTimeout(function () {
                if (chatMessages) {
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
            }, 100);
        }
    }

    if (chatToggle) chatToggle.addEventListener('click', toggleChat);
    if (chatClose) chatClose.addEventListener('click', toggleChat);

    const respostas = {
        'planos': '💎 Temos 3 planos de automação:<br><br>• <strong>ESSENCIAL</strong> — R$ 197/mês<br>• <strong>PROFISSIONAL</strong> — R$ 397/mês<br>• <strong>ENTERPRISE</strong> — sob consulta<br><br>Todos incluem configuração da IA no seu WhatsApp!',
        'funciona': '🤖 É simples: conectamos a IA ao seu WhatsApp, treinamos com as informações do seu negócio e ela passa a atender, tirar dúvidas, recuperar clientes e vender sozinha, 24 horas por dia.',
        'demo': '🎥 Posso te mostrar como a automação funciona na prática! Preenche o formulário aqui embaixo que um especialista te chama no WhatsApp com uma demonstração ao vivo.',
        'contato': '📞 Quer falar com um especialista agora?<br><br><a href="https://wa.me/5521966729503" target="_blank" rel="noopener" class="bot-chat-wa-link"><i class="fab fa-whatsapp"></i> Conversar no WhatsApp</a><br><br>📧 E-mail: contato@cellysistemas.com'
    };

    function addMsg(text, isUser) {
        if (!chatMessages) return null;

        const div = document.createElement('div');
        div.className = 'bot-chat-msg' + (isUser ? ' bot-chat-msg-user' : '');
        div.innerHTML =
            '<div class="bot-chat-msg-avatar"><i class="fas ' + (isUser ? 'fa-user' : 'fa-robot') + '"></i></div>' +
            '<p>' + text + '</p>';
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return div;
    }

    chatOptions.forEach(function (opt) {
        opt.addEventListener('click', function () {
            const key = this.dataset.pergunta;
            addMsg(this.textContent.trim(), true);
            const msgDigitando = addMsg('<span class="bot-chat-typing-dots"><span></span><span></span><span></span></span>', false);
            setTimeout(function () {
                msgDigitando.remove();
                addMsg(respostas[key] || 'Deixa eu verificar isso para você! 😊', false);
            }, 2000);
        });
    });

    // ============================================
    // IA DE VERDADE (chama chat-ia.php)
    // ============================================
    const historicoConversa = [];

    function enviarMensagem() {
        const texto = chatInput.value.trim();
        if (!texto) return;
        addMsg(texto, true);
        chatInput.value = '';
        historicoConversa.push({ role: 'user', content: texto });

        const msgDigitando = addMsg('<span class="bot-chat-typing-dots"><span></span><span></span><span></span></span>', false);
        const inicio = Date.now();
        const ATRASO_MINIMO = 2000;

        function mostrarResposta(fn) {
            const passou = Date.now() - inicio;
            const espera = Math.max(ATRASO_MINIMO - passou, 0);
            setTimeout(function () {
                msgDigitando.remove();
                fn();
            }, espera);
        }

        fetch('chat-ia.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: historicoConversa })
        })
            .then(function (r) { return r.json(); })
            .then(function (dados) {
                mostrarResposta(function () {
                    if (dados.resposta) {
                        addMsg(dados.resposta, false);
                        historicoConversa.push({ role: 'assistant', content: dados.resposta });
                    } else {
                        addMsg('Desculpa, tive um probleminha aqui. 😅 Chama a gente no WhatsApp que resolvemos rapidinho!', false);
                    }
                });
            })
            .catch(function () {
                mostrarResposta(function () {
                    addMsg('Não consegui me conectar agora. 😅 Tenta de novo em instantes ou chama no WhatsApp!', false);
                });
            });
    }

    if (chatSend) chatSend.addEventListener('click', enviarMensagem);
    if (chatInput) {
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                enviarMensagem();
            }
        });
    }

    // ============================================
    // ESTATÍSTICAS ANIMADAS
    // ============================================
    function animarContador(el, duracao) {
        if (!el) return;

        const alvo = parseInt(el.dataset.alvo, 10) || 0;
        const prefixo = el.dataset.prefixo || '';
        const sufixo = el.dataset.sufixo || '';
        const inicio = performance.now();

        function passo(agora) {
            const progresso = Math.min((agora - inicio) / duracao, 1);
            const facilitado = 1 - Math.pow(1 - progresso, 3);
            const valorAtual = Math.round(alvo * facilitado);

            el.textContent = prefixo + valorAtual + sufixo;

            if (progresso < 1) {
                requestAnimationFrame(passo);
            } else {
                el.textContent = prefixo + alvo + sufixo;
            }
        }

        requestAnimationFrame(passo);
    }

    ['.bot-hero-mini-stats', '.bot-stats-bar .container'].forEach(function (seletorGrupo) {
        const grupo = document.querySelector(seletorGrupo);
        if (!grupo) return;

        const itens = grupo.querySelectorAll('.bot-stat-item');
        itens.forEach(function (item, index) {
            item.style.transitionDelay = (index * 0.15) + 's';
        });

        if (!itens.length) return;

        const observerGrupo = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (entrada) {
                if (!entrada.isIntersecting) return;

                entrada.target.classList.add('bot-stat-visivel');

                const contador = entrada.target.querySelector('.bot-contador');
                if (contador) animarContador(contador, 2200);

                observerGrupo.unobserve(entrada.target);
            });
        }, { threshold: 0.4 });

        itens.forEach(function (item) { observerGrupo.observe(item); });
    });

});