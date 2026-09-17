(function () {
    'use strict';

    var WHATSAPP_NUMERO = '5521966729503';
    var ADDON_PRECO = 97;
    var ADDON_NOME = 'Onboarding Prioritário';
    var ADDON2_PRECO = 19.99;
    var ADDON2_NOME = 'Gator Protect PRO';

    var PLANOS = {
        essencial: {
            nome: 'Essencial',
            badge: 'ECONÔMICO',
            desc: 'Feito para quem quer começar com automação no WhatsApp',
            precoAntigo: 'R$ 1.190,00',
            precoMensal: 397,
            precoAnual: 4764,
            economiaAnual: 1390,
            beneficios: [
                'IA no WhatsApp 24/7',
                'Respostas personalizadas',
                'Envio de imagens e figurinhas',
                'Captação de clientes',
                'Follow-up automático',
                'Suporte por e-mail'
            ]
        },
        profissional: {
            nome: 'Profissional',
            badge: 'MAIS ESCOLHIDO',
            desc: 'O mais escolhido por negócios que querem vender no automático',
            precoAntigo: 'R$ 1.790,00',
            precoMensal: 597,
            precoAnual: 7164,
            economiaAnual: 2090,
            beneficios: [
                'Tudo do Essencial',
                'Agendamento automático',
                'Google Agenda integrado',
                'Confirmação e reagendamento',
                'Pós-atendimento',
                'Otimização de atendimentos',
                'Suporte prioritário'
            ]
        },
        premium: {
            nome: 'Premium',
            badge: 'COMPLETO',
            desc: 'Para negócios que buscam automação completa e integrações',
            precoAntigo: 'R$ 2.690,00',
            precoMensal: 897,
            precoAnual: 10764,
            economiaAnual: 3130,
            beneficios: [
                'Tudo do Profissional',
                'IA por voz',
                'Agendamento por voz',
                'Atendimento por áudio',
                'Organização de rotas',
                'Manutenção contínua',
                'Relatórios avançados',
                'Suporte VIP 24/7'
            ]
        }
    };

    function formatarReal(valor) {
        return 'R$ ' + valor.toLocaleString('pt-BR');
    }

    function getPlanoDaUrl() {
        var params = new URLSearchParams(window.location.search);
        var slug = (params.get('plano') || '').toLowerCase();
        return PLANOS[slug] ? slug : 'profissional';
    }

    function formatarNumeroAnimado(valor, valorFinal, comPrefixo) {
        var temCentavos = Math.round(valorFinal * 100) % 100 !== 0;
        var texto = temCentavos
            ? valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : Math.round(valor).toLocaleString('pt-BR');
        return comPrefixo ? 'R$ ' + texto : texto;
    }

    function animarNumero(el, valorFinal, comPrefixo) {
        var valorInicial = parseFloat(el.dataset.valorAtual || '0');
        var inicio = performance.now();
        var duracao = 500;

        function passo(agora) {
            var progresso = Math.min((agora - inicio) / duracao, 1);
            var facilitado = 1 - Math.pow(1 - progresso, 3);
            var valorAtual = valorInicial + (valorFinal - valorInicial) * facilitado;
            el.textContent = formatarNumeroAnimado(valorAtual, valorFinal, comPrefixo);
            if (progresso < 1) {
                requestAnimationFrame(passo);
            } else {
                el.textContent = formatarNumeroAnimado(valorFinal, valorFinal, comPrefixo);
                el.dataset.valorAtual = valorFinal;
            }
        }
        requestAnimationFrame(passo);
    }

    document.addEventListener('DOMContentLoaded', function () {
        var slugAtual = getPlanoDaUrl();
        var plano = PLANOS[slugAtual];
        var ciclo = 'mensal';
        var addonSelecionado = false;
        var addon2Selecionado = false;

        var elBadge = document.getElementById('cartBadge');
        var elNome = document.getElementById('cartNome');
        var elDesc = document.getElementById('cartDesc');
        var elPrecoAntigo = document.getElementById('cartPrecoAntigo');
        var elPreco = document.getElementById('cartPreco');
        var elPrecoSufixo = document.getElementById('cartPrecoSufixo');
        var elBeneficios = document.getElementById('cartBeneficios');
        var ciclobtns = document.querySelectorAll('.cart-ciclo-btn');
        var addonBtn = document.getElementById('cartAddonBtn');
        var addon2Btn = document.getElementById('cartAddon2Btn');

        var resumoNome = document.getElementById('resumoNome');
        var resumoCiclo = document.getElementById('resumoCiclo');
        var resumoPreco = document.getElementById('resumoPreco');
        var resumoAddonLinha = document.getElementById('resumoAddonLinha');
        var resumoAddon2Linha = document.getElementById('resumoAddon2Linha');
        var resumoAddonRemover = document.getElementById('resumoAddonRemover');
        var resumoAddon2Remover = document.getElementById('resumoAddon2Remover');
        var resumoEconomia = document.getElementById('resumoEconomia');
        var resumoTotal = document.getElementById('resumoTotal');
        var continuarBtn = document.getElementById('cartContinuar');

        function render() {
            elBadge.textContent = plano.badge;
            elNome.textContent = plano.nome;
            elDesc.textContent = plano.desc;
            elBeneficios.innerHTML = plano.beneficios.map(function (b) {
                return '<li>' + b + '</li>';
            }).join('');

            var precoPlano = ciclo === 'mensal' ? plano.precoMensal : plano.precoAnual;
            var sufixo = ciclo === 'mensal' ? '/mês' : '/ano';

            elPrecoAntigo.textContent = plano.precoAntigo;
            animarNumero(elPreco, precoPlano, false);
            elPrecoSufixo.textContent = sufixo;

            resumoNome.textContent = plano.nome;
            resumoCiclo.textContent = ciclo === 'mensal' ? 'Pago mensalmente' : 'Pago anualmente';
            animarNumero(resumoPreco, precoPlano, true);

            var total = precoPlano;
            if (addonSelecionado) {
                resumoAddonLinha.hidden = false;
                total += ADDON_PRECO;
            } else {
                resumoAddonLinha.hidden = true;
            }
            if (addon2Selecionado) {
                resumoAddon2Linha.hidden = false;
                total += ADDON2_PRECO;
            } else {
                resumoAddon2Linha.hidden = true;
            }

            resumoEconomia.textContent = ciclo === 'mensal'
                ? '70% OFF já aplicado'
                : formatarReal(plano.economiaAnual);

            animarNumero(resumoTotal, total, true);
        }

        ciclobtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                ciclobtns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                ciclo = btn.dataset.ciclo;
                render();
            });
        });

        addonBtn.addEventListener('click', function () {
            addonSelecionado = !addonSelecionado;
            addonBtn.textContent = addonSelecionado ? 'Adicionado ✓' : 'Adicionar';
            addonBtn.classList.toggle('selecionado', addonSelecionado);
            render();
        });

        addon2Btn.addEventListener('click', function () {
            addon2Selecionado = !addon2Selecionado;
            addon2Btn.textContent = addon2Selecionado ? 'Adicionado ✓' : 'Adicionar';
            addon2Btn.classList.toggle('selecionado', addon2Selecionado);
            render();
        });

        resumoAddonRemover.addEventListener('click', function () {
            addonSelecionado = false;
            addonBtn.textContent = 'Adicionar';
            addonBtn.classList.remove('selecionado');
            render();
        });

        resumoAddon2Remover.addEventListener('click', function () {
            addon2Selecionado = false;
            addon2Btn.textContent = 'Adicionar';
            addon2Btn.classList.remove('selecionado');
            render();
        });

        continuarBtn.addEventListener('click', function () {
            var precoPlano = ciclo === 'mensal' ? plano.precoMensal : plano.precoAnual;
            var sufixo = ciclo === 'mensal' ? '/mês' : '/ano';
            var addonsEscolhidos = [];
            if (addonSelecionado) addonsEscolhidos.push(ADDON_NOME);
            if (addon2Selecionado) addonsEscolhidos.push(ADDON2_NOME);
            var msg = 'Olá! Quero contratar o plano ' + plano.nome +
                ' (' + formatarReal(precoPlano) + sufixo + ')' +
                (addonsEscolhidos.length ? ' com ' + addonsEscolhidos.join(' e ') : '') + '.';
            var url = 'https://wa.me/' + WHATSAPP_NUMERO + '?text=' + encodeURIComponent(msg);
            window.open(url, '_blank', 'noopener');
        });

        render();
    });
})();
