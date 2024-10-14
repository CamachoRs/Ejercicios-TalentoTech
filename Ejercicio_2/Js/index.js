let display = document.getElementById('display');

function borrar() {
    display.value = '';
}

function numeros(valor) {
    if (document.getElementById("display").value == "Infinity") {
        borrar()
    }
    display.value += valor;
}

function calcular() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}