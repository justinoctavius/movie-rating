
const bSubmit = document.querySelector('#bSubmit');

bSubmit.addEventListener('click',()=>{
   //validar campos
    const name = document.querySelector('#name').value
    const rating = document.querySelector('#rating').value
   
    if(name.trim() == ''){
        alert('Should to put a movie name');
        return null
    }
    //mandar solicitud POST a /new
    fetch('/new', {
        method:'POST',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify({name:name,rating:rating})
    })
    .then(res => res.text())
    .then(data =>{
        //mostrar mensaje de error/exito
        alert(data);
        //actualizar lista
        loadMovies();
    })

});


loadMovies()

function loadMovies(){
    fetch('/get-movie',{method:'GET'})
    .then(res =>  res.json())
    .then(data => {
        const movies = document.querySelector('#moviesContainer');
        let html = '';
        data.movies.forEach(item => {
            let items = item;
            html += `<div>${item.name}  <img src="./img/star.png" width="16" class="img">${item.rating}</div> `
        });
        
        movies.innerHTML = html;
    });
}