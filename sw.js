const CACHE ='cache';
const CACHE_DINAMICO ='dinamico-1';
const CACHE_INMUTABLE ='inmutable-1';


self.addEventListener('install', evento=>{
    const promesa =caches.open(CACHE)
    .then(cache=>{
    return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/app.js',
        '/styles.css'
    ]);
    });
    const cacheInmutable =  caches.open(CACHE_INMUTABLE)
        .then(cache => cache.add(
            'https://swapi.dev/api/people/?format=json'
        ));
            

        evento.waitUntil(Promise.all([promesa,cacheInmutable]));
});

self.addEventListener('fetch', evento => {  

    const respuesta=caches.match(evento.request)
        .then(res=>{

            if (res) return res;
                     console.log('No existe', evento.request.url);
                return fetch(evento.request)
                .then(resWeb=>{
                    caches.open(CACHE_DINAMICO)
                
                })
 
            return resWeb.clone();
            });
        });
