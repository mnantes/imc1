document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.includes('index.html')) {
        document.querySelector("button").onclick = calcularIMC;
    } else if (window.location.pathname.includes('resultado.html')) {
        mostrarResultado();
    }
});

function calcularIMC() {
    var altura = parseFloat(document.getElementById('altura').value);
    var peso = parseFloat(document.getElementById('peso').value);
    var idade = parseInt(document.getElementById('idade').value);

    if (altura > 0 && peso > 0 && idade > 0) {
        var imc = peso / (altura * altura);
        sessionStorage.setItem('IMC', imc.toFixed(2));
        sessionStorage.setItem('Idade', idade);
        window.location.href = 'resultado.html';
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
}

function mostrarResultado() {
    var imc = parseFloat(sessionStorage.getItem('IMC'));
    var ctx = document.getElementById('imcChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Seu IMC', 'IMC Ideal'],
            datasets: [{
                label: 'IMC',
                data: [imc, 22], // 22 é considerado um valor de IMC saudável médio
                backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    var resultDiv = document.getElementById('imcResult');
    resultDiv.innerHTML = `<h2>Seu IMC é ${imc.toFixed(2)}</h2>`;

    var recommendationDiv = document.getElementById('recommendation');
    if (imc < 18.5) {
        recommendationDiv.innerHTML = `<p>Você está abaixo do peso ideal. Considere aumentar sua ingestão calórica com alimentos nutritivos e consultar um nutricionista.</p>`;
    } else if (imc >= 18.5 && imc <= 24.9) {
        recommendationDiv.innerHTML = `<p>Parabéns, você está dentro da faixa de peso ideal! Continue mantendo um estilo de vida saudável.</p>`;
    } else if (imc >= 25) {
        recommendationDiv.innerHTML = `<p>Você está acima do peso ideal. Considere reduzir sua ingestão calórica e aumentar sua atividade física. Consultar um nutricionista pode ajudar.</p>`;
    }
}
