# Plugin de Máscaras para Input

O **Plugin de Máscaras para Input** é uma biblioteca utilitária para a formatação e aplicação de máscaras em campos de entrada de formulários. Este plugin inclui métodos para a formatação de CPF, CNPJ, números de telefone, códigos postais e valores monetários. Além disso, fornece funções para o gerenciamento de cookies.

## Desenvolvedor

- **Nome:** Pablo Sousa
- **Versão:** 1.0
- **Licença:** GPL (Licença Pública Geral)

## Funcionalidades

- **Formatação de CPF e CNPJ**: Máscaras para os documentos brasileiros de CPF e CNPJ.
- **Máscaras para números de telefone e códigos postais**: Aplicação de máscaras para formatar números de telefone e códigos postais.
- **Formatação de valores monetários**: Formatação de valores monetários com separadores decimais e de milhar personalizáveis.
- **Gerenciamento de cookies**: Funções para definir, obter, verificar e excluir cookies.

## Instalação

Para instalar o plugin, utilize o seguinte comando npm:

```bash
npm install input-masker
```

## Uso
Para utilizar este plugin, importe a classe InputMasker e chame os métodos estáticos conforme necessário. Certifique-se de passar o objeto de evento para o método apropriado quando formatar campos de entrada.

## Importação
```ts
import { InputMasker } from 'input-masker';
```

## Exemplos de Uso
### Formatação de CPF
No Angular, você pode aplicar a máscara de CPF em um campo de entrada usando a diretiva `ngModel` para associar a máscara ao valor do campo.
```html
<input type="text" [(ngModel)]="cpf" (ngModelChange)="applyCpfMask($event)" />
```

### Componente TypeScript:
```ts
import { Component } from '@angular/core';
import { InputMasker } from 'input-masker';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
})
export class MyComponent {
  cpf: string;

  applyCpfMask(value: string): void {
    this.cpf = InputMasker.removeNonDigits(value);
    InputMasker.cpf({ target: { value: this.cpf } } as Event);
  }
}
```
### Formatação de CNPJ
```html
<input type="text" [(ngModel)]="cnpj" (ngModelChange)="applyCnpjMask($event)" />
```
```ts
import { Component } from '@angular/core';
import { InputMasker } from 'input-masker';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
})
export class MyComponent {
  cnpj: string;

  applyCnpjMask(value: string): void {
    this.cnpj = InputMasker.removeNonDigits(value);
    InputMasker.cnpj({ target: { value: this.cnpj } } as Event);
  }
}
```

### Formatação de Valores Monetários
```ts
const formattedMoney = InputMasker.formatMoney(1234567.89);
console.log(formattedMoney); // Exemplo: R$ 1.234.567,89

```
```html
<input type="text" [(ngModel)]="money" (ngModelChange)="applyMoneyMask($event)" />

```
```ts
import { Component } from '@angular/core';
import { InputMasker } from 'input-masker';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
})
export class MyComponent {
  money: string;

  applyMoneyMask(value: string): void {
    this.money = InputMasker.removeNonDigits(value);
    InputMasker.maskMoney({ target: { value: this.money } } as Event);
  }
}

```

### Máscara de Telefone
```html
<input type="text" [(ngModel)]="phone" (ngModelChange)="applyPhoneMask($event)" />
```
```ts
import { Component } from '@angular/core';
import { InputMasker } from 'input-masker';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
})
export class MyComponent {
  phone: string;

  applyPhoneMask(value: string): void {
    this.phone = InputMasker.removeNonDigits(value);
    InputMasker.maskPhone({ target: { value: this.phone } } as Event);
  }
}

```

### Máscara de Código Postal
```html
<input type="text" [(ngModel)]="postal" (ngModelChange)="applyPostalMask($event)" />

```
```ts
import { Component } from '@angular/core';
import { InputMasker } from 'input-masker';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
})
export class MyComponent {
  postal: string;

  applyPostalMask(value: string): void {
    this.postal = InputMasker.removeNonDigits(value);
    InputMasker.maskPostal({ target: { value: this.postal } } as Event);
  }
}

```



### Funções de Gerenciamento de Cookies
```ts
InputMasker.setCookie('cookieName', 'cookieValue', 30);
```
#### Exemplo:
- Nome do Cookie: userSession
- Valor: abc123
- Expiração: 30 dias


### Obter Cookie
```ts
const cookieValue = InputMasker.getCookie('cookieName');
console.log(cookieValue);

```
#### Exemplo:
- Nome do Cookie: userSession
- Saída: abc123 (ou null se o cookie não existir)

### Verificar Cookie
```ts
const cookieExists = InputMasker.checkCookie('cookieName');
console.log(cookieExists); // true ou false

```
#### Exemplo:
- Nome do Cookie: userSession
- Saída: true (se o cookie existir) ou false (se o cookie não existir)

### Excluir Cookie
```ts
InputMasker.delCookie('cookieName');
```
#### Exemplo:
- Nome do Cookie: userSession
- Ação: O cookie é excluído.
