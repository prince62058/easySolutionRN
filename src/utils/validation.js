const validation = (type, text) => {

    switch (type) {
        case 'name':
            var regex = /^[a-zA-Z ]*$/
            return regex?.test(text)
        case 'phone':
            var regex = /^[6-9]{1}[0-9]{9}/
            return regex?.test(text)
        case 'email':
            var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return regex?.test(text)
        case 'url':
            var regex = /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g
            return regex?.test(text)
    }
}

export default validation