let generatedNumbers = [];

function getDomId(id) {
    return document.getElementById(id);
}

function generateRandomNumbers() {
    let totalOfNumbers = parseInt(getDomId('quantidade').value);
    let fromNumber = parseInt(getDomId('de').value);
    let upToNumber = parseInt(getDomId('ate').value);

    if (totalOfNumbers > (upToNumber - fromNumber + 1)) {
        alert('A quantidade de números a serem sorteados não pode ser maior que o valor "Até o número",\n' +
            'ou o valor "Do número" não pode ser maior que o valor "Até o número"');
        return;
    }

    while (generatedNumbers.length < totalOfNumbers) {
        const randomNumber = Math.floor(Math.random() * (upToNumber - fromNumber + 1)) + fromNumber;
        if (!generatedNumbers.includes(randomNumber)) {
            generatedNumbers.push(randomNumber);
        }
    }
    return generatedNumbers;
}

function sortNumbers() {
    generatedNumbers.sort((a, b) => a - b);
    return generatedNumbers;
}

function showResultsText() {
    if (isGeneratedNumbersEmpty()) {
        return;
    }
    sortNumbers();
    getDomId('resultado').innerHTML = `<label class="texto__paragrafo">Números sorteados: ${generatedNumbers.join(', ')}</label>`;
}

function originalTextResult() {
    getDomId('resultado').innerHTML = `<label class="texto__paragrafo">Números sorteados:  nenhum até agora</label>`;
}

function clearInputValues() {
    getDomId('quantidade').value = '';
    getDomId('de').value = '';
    getDomId('ate').value = '';
}

function toggleResetButton(isEnabled) {
    const restartButton = getDomId('btn-reiniciar');

    if (isEnabled) {
        restartButton.classList.remove('container__botao-desabilitado');
        restartButton.classList.add('container__botao');
    } else {
        restartButton.classList.remove('container__botao');
        restartButton.classList.add('container__botao-desabilitado');
    }
}

function sortear() {
    generatedNumbers = [];
    generateRandomNumbers();
    showResultsText();
    toggleResetButton(!isGeneratedNumbersEmpty()); 
}

function reiniciar() {
    generatedNumbers = [];
    clearInputValues();
    originalTextResult();
    toggleResetButton(false);
}

function isGeneratedNumbersEmpty() {
    return generatedNumbers.length === 0; 
}

getDomId('btn-sortear').addEventListener('click', sortear);
