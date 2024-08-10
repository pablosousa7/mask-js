/**
 * Plugin de Máscaras para Input
 * 
 * Este plugin fornece funções utilitárias para formatação e máscara de campos de entrada.
 * Inclui métodos para formatação de CPF, CNPJ, números de telefone, códigos postais e valores monetários.
 * 
 * Desenvolvedor: Pablo Sousa
 * Versão: 1.0
 * Licença: GPL (Licença Pública Geral)
 * 
 * Funcionalidades:
 * - Formatação de CPF e CNPJ
 * - Máscaras para números de telefone e códigos postais
 * - Formatação de valores monetários com separadores decimais e de milhar personalizáveis
 * - Funções para gerenciamento de cookies: definir, obter, verificar e excluir cookies
 * 
 * Uso:
 * Para utilizar este plugin, chame os métodos estáticos da classe `InputMasker`. Para formatação de campos de entrada, 
 * certifique-se de passar o objeto de evento para o método apropriado.
 * 
 * Exemplo:
 * ```typescript
 * document.getElementById('meuInput').addEventListener('input', (event) => {
 *     InputMasker.cpf(event);
 * });
 * ```
 */
export class InputMasker {
    private static ensureInputElement(target: EventTarget | null): HTMLInputElement {
        if (!(target instanceof HTMLInputElement)) {
            throw new Error('Target is not an HTMLInputElement');
        }
        return target;
    }

    private static removeNonDigits(value: string): string {
        return value.replace(/\D/g, '');
    }

    static cpf(event: Event): void {
        const target = this.ensureInputElement(event.target);
        if (!target.value) return;

        target.setAttribute('maxLength', '14');
        target.value = this.removeNonDigits(target.value)
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    }

    static cnpj(event: Event): void {
        const target = this.ensureInputElement(event.target);
        if (!target.value) return;

        target.setAttribute('maxLength', '18');
        target.value = this.removeNonDigits(target.value)
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    }

    static formatMoney(value: number, lang: string = 'pt-BR', currency: string = 'BRL'): string {
        return new Intl.NumberFormat(lang, { style: 'currency', currency }).format(value);
    }

    static maskMoney(event: Event, d: number = 2, sm: string = '.', sd: string = ','): void {
        const target = this.ensureInputElement(event.target);
        if (!target.value) return;

        target.setAttribute('maxLength', '20');
        const decimalPotention = Math.pow(10, d);
        const separatorThousend = sm;
        let value = this.removeNonDigits(target.value);
        let valuePointer = (parseFloat(value) / decimalPotention).toFixed(d);
        let [integerPart, decimalPart] = valuePointer.split('.');
        let formattedIntegerPart = integerPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, separatorThousend);
        target.value = `R$ ${decimalPart ? formattedIntegerPart + sd + decimalPart : formattedIntegerPart}`;
    }

    static maskPhone(event: Event): void {
        const target = this.ensureInputElement(event.target);
        if (!target.value) return;

        target.setAttribute('maxLength', '17');
        const matched = this.removeNonDigits(target.value).match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
        if (matched) {
            target.value = matched[2] ? `( ${matched[1]} ) ${matched[2]}${matched[3] ? '-' + matched[3] : ''}` : matched[1];
        }
    }

    static maskPostal(event: Event): void {
        const target = this.ensureInputElement(event.target);
        if (!target.value) return;

        target.setAttribute('maxLength', '9');
        target.value = this.removeNonDigits(target.value)
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1');
    }

    static setCookie(cname: string, cvalue: string, exdays: number = 30): void {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = `expires=${d.toUTCString()}`;
        document.cookie = `${cname}=${cvalue};${expires};path=/`;
    }

    static getCookie(cname: string): string | null {
        if (!cname) throw new Error('Nome do cookie não especificado');
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let cookie of ca) {
            let [name, value] = cookie.trim().split('=');
            if (name === cname) return value;
        }
        return null;
    }

    static checkCookie(cname: string): boolean {
        return this.getCookie(cname) !== null;
    }

    static delCookie(cname: string): void {
        document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}
