const togglerMode = document.querySelector('#toggleMode');
const htmlElement = document.querySelector('html');

if(localStorage.getItem('mode') === 'dark') {
    htmlElement.classList.add('dark');
    togglerMode.checked = true;
}

togglerMode.addEventListener('input', () => {
    htmlElement.classList.toggle('dark');

    if(htmlElement.classList.contains('dark')) {
        localStorage.setItem('mode', 'dark');
    } else {
        localStorage.setItem('mode', 'light');
    }
})