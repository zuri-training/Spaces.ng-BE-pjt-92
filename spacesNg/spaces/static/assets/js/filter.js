window.onpopstate = (event) => {
    if (event.state !== null) {
        if (event.state.capacity !== undefined) {
            filter(getUrl('capacity', event.state.capacity))
            document.querySelector('#attendees').selectedIndex = event.state.index  // Handles what item is being selected
        } else {
            if (event.state.facilities !== undefined) {
                filter(getUrl('facilities', event.state.facilities))
            } else {
                if (event.state.sort !== undefined) {
                    filter(getUrl('sort', event.state.sort))
                    document.querySelector('#attendees').selectedIndex = event.state.index
                }
            }
        }
    } else {  // No state was stored
        filter(document.location.href)
        document.querySelector('#attendees').selectedIndex = 0
    }

    // Handles what item is being checked
    document.querySelectorAll('input[type=checkbox]').forEach((item) => {
        if (document.location.search.replace('+', ' ').includes(item.name)) {
            item.checked = true
        } else {
            item.checked = false
        }
    })
    // Handles what sort item is selected
    if (document.location.search.includes('sort')) {
        let url = new URLSearchParams(document.location.search)
        sort_value = url.get('sort')
        for (let i = 0; i < document.querySelector('#sort').options.length; i++) {
            if (document.querySelector('#sort').item(i).value === sort_value) {
                document.querySelector('#sort').selectedIndex = i
            }
        }
    }
}



document.querySelector('#attendees').onchange = function() {
        let url = getUrl('capacity', this.value)
        const index = this.selectedIndex
        history.pushState({'capacity': this.value, 'index': index}, "", url)
        filter(url)
}

document.querySelector('#sort').onchange = function() {
    let url = getUrl('sort', this.value)
    const index = this.selectedIndex
    history.pushState({'sort': this.value, 'index': index}, "", url)
    filter(url)
}

// Create an array of all checkboxes for check whether event.target is in the array
let checkbox = []
document.querySelectorAll('input[type=checkbox]').forEach((item) => {
    checkbox.push(item)
})

window.onclick = (event) => {
    if (checkbox.includes(event.target)) {
        // Work here
        let param = document.querySelectorAll('input[type=checkbox]')
        let facilities = []
        param.forEach((item) => {
            if (item.checked) {
                facilities.push(item.name)
            }
        })
        facilities = facilities.join(',')
        let url = getUrl('facilities', facilities)
        history.pushState({'facilities': facilities}, "", url)
        filter(url)
    }
}


let getUrl = (key, value) => {
    if ('URLSearchParams' in window) {
        let url = new URLSearchParams(document.location.search)
        url.set(key, value)
        url = url.toString()
        url = '?' + url
        return url
    }
}


let getPath = (facilities) => {
    let search = document.location.search
    // let pathname = document.location.pathname
    if (search.length) {
        url = search + `&facilities=${facilities}`
    } else {
        url = `?facilities=${facilities}`
    }
    console.log(url)
    return url
}

let trim = (text) => {
    const space = '<div class="spaces-wrap">'
    const pagination = '<div class="pagination">'
    const num = '<span class="spaces-found">'
    let space_head = text.indexOf(space)
    let page_head = text.indexOf(pagination)
    let num_head = text.indexOf(num)
    let space_html = text.slice(space_head)
    let page_html = text.slice(page_head)
    let num_html = text.slice(num_head)
    let space_tail = space_html.indexOf('<!-- end of spaces -->')
    let page_tail = page_html.indexOf('</div>')
    let num_tail = num_html.indexOf('</span>')
    space_html = space_html.slice(space.length, space_tail)
    page_html = page_html.slice(pagination.length, page_tail)
    num_html = num_html.slice(num.length, num_tail)
    return [space_html, page_html, num_html]
}

let filter = (url) => {
    fetch(url)
    .then(response => response.text())
    .then(data => {
        document.querySelector('.spaces-wrap').innerHTML = trim(data)[0]  // Replace current space-wrap result HTML
        document.querySelector('.pagination').innerHTML = trim(data)[1]  // Replace current pagination HTML
        document.querySelector('.spaces-found').innerHTML = trim(data)[2]  // Replace current pagination HTML
        console.log(trim(data)[2])
    })
}


// maintain checked boxes after loading next or prev page of the same filter
window.onload = () => {
    document.querySelectorAll('input[type=checkbox]').forEach((item) => {
        if (document.location.search.replace('+', ' ').includes(item.name)) {
            item.checked = true
        }
    })
    if (document.location.search.includes('sort')) {
        let url = new URLSearchParams(document.location.search)
        sort_value = url.get('sort')
        for (let i = 0; i < document.querySelector('#sort').options.length; i++) {
            if (document.querySelector('#sort').item(i).value === sort_value) {
                document.querySelector('#sort').selectedIndex = i
            }
        }
    }
    if (document.location.search.includes('capacity')) {
        let url = new URLSearchParams(document.location.search)
        capacity_value = url.get('capacity')
        for (let i = 0; i < document.querySelector('#attendees').options.length; i++) {
            if (document.querySelector('#attendees').item(i).value === capacity_value) {
                document.querySelector('#attendees').selectedIndex = i
            }
        }
    }
}

