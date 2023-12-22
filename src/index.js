import './styles/global.scss';
// Allow dist on git for vercel

const container = document.querySelector('#container');
const h1 = document.createElement('h1');
h1.textContent = 'Setup';
container.append(h1);
