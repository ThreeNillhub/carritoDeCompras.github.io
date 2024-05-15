//variables
// www.netfly.com
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];
cargarEventListeners();
function cargarEventListeners() {
    //Agregar curso presionando "agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);
    //Eliminar curso con evento click
    carrito.addEventListener('click', eliminarCurso);
    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',() => {
        articulosCarrito = [];
        limpiarHTML();
    } );
}
//funciones
function agregarCurso(e) {
    e.preventDefault()
     if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
//console.log('Presionando cursos....')
}
//Elimina un curso del carrito
function eliminarCurso (e) {
   //console.log('desde eliminar curso');
   //para ver la etiqueta html a que hace referncia
   //console.log(e.target.classList);
   if(e.target.classList.contains('borrar-curso'))
   {
    //console.log(e.target.getAttribute('data-id'))
    const cursoId = e.target.getAttribute('data-id')
    //Eliminar del arreglo por data-id:
    articulosCarrito = articulosCarrito.filter ( curso => curso.id !== cursoId);
    //console.log(articulosCarrito)
    carritoHTML(); //para refrescar el html 

   }
}
//Funcion leer contenido del HTML
function leerDatosCurso(curso) {
 //  console.log(curso);
//Crear un objeto con el contenido del curso actual
const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
}
//console.log(infoCurso)
//Agerga elementos al arreglo carrito
//comprobar cantidad de cursos para no repetir
//Revisar si un elemento existe en el carrito:
const existe = articulosCarrito.some (curso => curso.id === infoCurso.id);
    if (existe) {
    //console.log(existe);
    //Actualizamos cantidad
     const cursos = articulosCarrito.map ( curso => {
         if (curso.id === infoCurso.id ) {
             curso.cantidad++;
             return curso;  //Retorna objeto actualizado
         }else {
             return curso; // Retorna los objetos que no son duplicados
        }
     })
     articulosCarrito = [...cursos];

    } else {
articulosCarrito = [...articulosCarrito, infoCurso];
//console.log(articulosCarrito);
    }
carritoHTML();
}
//Muestra carrito en HTML
function carritoHTML () {
    //Limpiar HTML
    limpiarHTML();
    //Recorre el carrito y genera el html
    articulosCarrito.forEach( curso => {
       // console.log(curso);
        //Destruturing: 
        const {imagen, titulo, precio, cantidad, id} = curso; 
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href ="#" class="borrar-curso" data-id="${id}" > X </a>
            </td>
        `;
        //agrega el html delcarrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}
//Elmina los cursos del tbody
function limpiarHTML () {
    //Forma lenta
    //contenedorCarrito.innerHTML = '';
    //Mientras haya un hijo removerá el primero 
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}