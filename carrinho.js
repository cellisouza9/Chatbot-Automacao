(function () {
    'use strict';

    var WHATSAPP_NUMERO = '5521966729503';
    var ADDON_PRECO = 97;
    var ADDON_NOME = 'Onboarding Prioritário';

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

    document.addEventListener('DOMContentLoaded', function () {
        var slugAtual = getPlanoDaUrl();
        var plano = PLANOS[slugAtual];
        var ciclo = 'mensal';
        var addonSelecionado = false;

        var elBadge = document.getElementById('cartBadge');
        var elNome = document.getElementById('cartNome');
        var elDesc = document.getElementById('cartDesc');
        var elPrecoAntigo = document.getElementById('cartPrecoAntigo');
        var elPreco = document.getElementById('cartPreco');
        var elPrecoSufixo = document.getElementById('cartPrecoSufixo');
        var elBeneficios = document.getElementById('cartBeneficios');
        var ciclobtns = document.querySelectorAll('.cart-ciclo-btn');
        var addonBtn = document.getElementById('cartAddonBtn');

        var resumoNome = document.getElementById('resumoNome');
        var resumoCiclo = document.getElementById('resumoCiclo');
        var resumoPreco = document.getElementById('resumoPreco');
        var resumoAddonLinha = document.getElementById('resumoAddonLinha');
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
            elPreco.textContent = precoPlano.toLocaleString('pt-BR');
            elPrecoSufixo.textContent = sufixo;

            resumoNome.textContent = plano.nome;
            resumoCiclo.textContent = ciclo === 'mensal' ? 'Pago mensalmente' : 'Pago anualmente';
            resumoPreco.textContent = formatarReal(precoPlano);

            var total = precoPlano;
            if (addonSelecionado) {
                resumoAddonLinha.hidden = false;
                total += ADDON_PRECO;
            } else {
                resumoAddonLinha.hidden = true;
            }

            resumoEconomia.textContent = ciclo === 'mensal'
                ? '70% OFF já aplicado'
                : formatarReal(plano.economiaAnual);

            resumoTotal.textContent = formatarReal(total);
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

        continuarBtn.addEventListener('click', function () {
            var precoPlano = ciclo === 'mensal' ? plano.precoMensal : plano.precoAnual;
            var sufixo = ciclo === 'mensal' ? '/mês' : '/ano';
            var msg = 'Olá! Quero contratar o plano ' + plano.nome +
                ' (' + formatarReal(precoPlano) + sufixo + ')' +
                (addonSelecionado ? ' com o ' + ADDON_NOME : '') + '.';
            var url = 'https://wa.me/' + WHATSAPP_NUMERO + '?text=' + encodeURIComponent(msg);
            window.open(url, '_blank', 'noopener');
        });

        render();
    });
})();
