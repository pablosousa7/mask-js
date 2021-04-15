/**
 * Simple Plugin
 * developer: Pablo Sousa
 * version 1.0
 * licence: GPL
 * */

const JSXHelper = {
    /**
     * mask cpf
     * event => object
     * return void
     * */
    cpf(event){
        let isObj = typeof event == 'object',
            isEmpty = event.target.value.length <= 0;

        event.target.setAttribute('maxLength', 14);

        if(!isObj || isEmpty){
            throw new Error('Bad format object');
        }

        let v = event.target.value;

        event.target.value = v
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');
    },


    /**
     * mask cnpj
     * event => object
     * return void
     * */
    cnpj(event){
        let isObj = typeof event == 'object',
            isEmpty = event.target.value.length <= 0;

        event.target.setAttribute('maxLength', 18);

        if(!isObj || isEmpty){
            throw new Error('Bad format object');
        }

        let v = event.target.value;

        event.target.value = v
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
    },


    /**
     * mask money
     * event => object
     * d = decimal point (string)
     * sm = separator milhar (string)
     * sd = separator decimal (string)
     * return void
     * */
    money(event, d = 2, sm = '.', sd = ','){
        let decimal = d,
            separator_milhar = sd,
            separator_decimal = sd,
            decimal_potention = Math.pow(10, decimal),
            separator_thousend = `$1` + separator_milhar,
            override_value,
            value_pointer,
            blocks,
            parts,
            isObj = typeof event == 'object',
            isEmpty = event.target.value.length <= 0;

        if(!isObj || isEmpty){
            throw new Error('Bad format object');
        }

        event.target.setAttribute('maxLength', 20);

        override_value = event.target.value.replace(/\D/g, '');
        value_pointer = (override_value / decimal_potention).toFixed(decimal);
        blocks = value_pointer.split('.');
        parts = blocks[0]
                    .toString()
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, separator_thousend);

        event.target.value = `R$ ${typeof blocks[1] === 'undefined' ? parts : parts + separator_decimal + blocks[1]}`;
    },


    /**
     * mask phone
     * event => object
     * return void
     * */
    phone(event){
        let isObj = typeof event == 'object',
            isEmpty = event.target.value.length <= 0;

        if(!isObj || isEmpty){
            throw new Error('Bad format object');
        }

        event.target.setAttribute('maxLength', 17);

        let v = event.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);

        event.target.value = !v[2] ? v[1] : '( ' + v[1] + ' ) ' + v[2] + (v[3] ? '-' + v[3] : '');
    },


    /**
     * mask postal
     * event => object
     * return void
     * */
    postal(event){
        let isObj = typeof event == 'object',
            isEmpty = event.target.value.length <= 0;

        if(!isObj || isEmpty){
            throw new Error('Bad format object');
        }

        event.target.setAttribute('maxLength', 9);

        let v = event.target.value;

        event.target.value = v
            .replace(/\D/g, '')
           .replace(/(\d{5})(\d)/, "$1-$2")
           .replace(/(-\d{3})\d+?$/, "$1");
    },


    /**
     * This attribute create a cookie
     *
     * cname is name of your cookie
     * cvalue is the value of cookie
     * exdays is total days
     * */
    setCookie(cname, cvalue, exdays){
        let d = new Date();

        exdays = exdays ?? 30;

        d.setTime(d.getTime() + (exdays*24*60*60*1000));

        let expires = "expires="+d.toUTCString();

        document.cookie = `${cname}=${cvalue};${expires};path=/`
    },


    /*
    * This function return a cookie
    * */
    getCookie(cname){
      if(!cname) throw new Error('name cookie not specified');

      let decodedCookie = decodeURIComponent(document.cookie);

      let ca = decodedCookie.split(';');

      for(let i of ca){
          let c = i.trim();
          let explode = c.split('=');

          if(explode[0] && explode[0] == cname){
              return `${explode[0]}=${explode[1]}`;
          }
      }

      return null;
    },


    /*
    * This function check cookie
    * el => (string)
    * return bool
    * */
    checkCookie(el){
        let status = this.getCookie(el);

        if(status == "" || status == null){
            return false;
        }

        return true;
    },


    /**
     * This attribute delete a cookie especific
     * */
    delCookie(cname){
        document.cookie = `"${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";`;
    }

}
