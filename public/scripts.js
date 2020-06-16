const bSubmit = document.querySelector('#bSubmit');
let id = 0;

bSubmit.addEventListener('click',()=>{
    addMovie();
});

function addMovie(){
    const name = document.querySelector('#name').value
    const rating = document.querySelector('#rating').value

    if(name.trim() == ''){
        alert('should put a movie name')
        return null;
    }

    id++;

    fetch('/new',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({id:id,name:name,rating:rating})
        })
    .then(res => res.text())
    .then(data => {
        alert(data);
        loadMovie()
    })

}

loadMovie()

function loadMovie(){
    
    fetch('/api',{method:'GET'})
    .then(res => res.json())
    .then(data => {
        const container = document.querySelector('#moviesContainer');
        let html = '';
        data.movies.forEach( movie => {
            id = movie.id;
            html += `<div>
            <p><span> ${movie.id}  </span>${movie.name}  <span><img src="./img/star.png" width="16">  ${movie.rating}</span></p>            
            </div>`
        });
        container.innerHTML = html;
    });


}