const API = 'https://api.themoviedb.org/3';
const API_KEY = '372bba5a437d2b60c7c8430e3b28c6ca';

export function get(path) {
    const separator = path.includes('?') ? '&' : '?';
    return fetch(`${API}${path}${separator}api_key=${API_KEY}&language=es-ES`)
        .then((result) => result.json());
}
