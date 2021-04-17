**Simples Plugin JS MASK**

Um simples plugin para você poder formatar o valor de um campo, para modo moeda, cpf, cnpj, criar cookies, selecionar
cookie, deletar cookie, código postal e telefone. São funções básicas e qualquer melhoria seria bem vindo.

para que o plugin funcione você precisa ter um campo para passar como paramêtro, exemplo:
```HTML
<input type="text" id="my-field" placeholder="Your field" />
```

instanciando o objeto:
```javascript
let mask = JSXHelper;
```

usando tipo moeda:
```javascript
// Select the field
let myField = document.getElementById('my-field')

// call event keydown
myField.addEventListener('keydown', myFunctionFormatMoney)

// function example
function myFunctionFormatMoney(event){
    
    // call method money
    mask.money(event)
}
```

_Você pode usar outros métodos de acordo com sua necessidade, abaixo está a lista de todos os métodos._<br/>
| Função | Descrição |
| --- | --- |
| `.money(event)` | Formata o campo com a moeda BRL |
| `.moneyBr(value, lang, currency` | Formata uma string stática em um valor de moeda |
| `.cpf(event)` | Formata o campo com a máscara de CPF |
| `.cnpj(event)` | Formata o campo com a máscara de CNPJ |
| `.phone(event)` | Formata o campo com a máscara de Telefone (Brasil) |
| `.postal(event)` | Formata o campo com a máscara de código postal (Brasil) |
| `.setCookie(nome, valor, dias)` | Cria um cookie |
| `.getCookie(nome)` | Obtêm o cookie |
| `.checkCookie(nome)` | Verifica se o cookie existe |
| `.delCookie(nome)` | Deleta o cookie |


<br/>
Contato: pablodeveloper8@gmail.com<br/>
Dev: Pablo Sousa
