
//Función para seleccionar una celda o quitarle la selección
//También para asociar el evento 'keyDown' para poder desplazarnos conel teclado
$("td").click( function() {
    //Primero eliminamos el evento (por si está en cualquier otra celda o en esta misma)
    $("body").off("keydown")
    //Eliminamos cualquier celda seleccionada (esta u otras)
    $(".selected").removeClass("selected")
    if (!$(this).hasClass("selected")) {
        //Añadimos la clase 'selected' para darle estilo a la celda
        $(this).addClass("selected");
        //Lo asociamos al evento
        $("body").on("keydown", moverCelda );
    };
})


//Función que administra el movimiento con el teclado
var moverCelda = function(e) {
    var selected = $(".selected")
    switch (e.which) {
        //Izquierda
        case 37:
            //Conseguimos el tamaño de la fila
            var tamannoFila = $("tr").length;
            //Conseguimos la posición del elemento
            var index = selected.index("td") % tamannoFila;
            //Comprobamos si se sale de los límites
            if (index != 0) {
                //Seleccionamos el elemento sigiente
                selected.prev().addClass("selected");
            } else {
                //Seleccionamos el último elemento
                selected.parent().children().eq(tamannoFila-1).addClass("selected");
            }
            //Eliminamos la selección actual
            selected.removeClass("selected");
            break;
        //Arriba
        case 38:
            //Conseguimos el tamaño de la fila
            var tamannoFila = $("tr").length;
            //Conseguimos la posición en la fila
            var index = selected.index("td") % tamannoFila;
            //Conseguimos el padre
            var padre = selected.parent()
            //Conseguimos el tamaño de la columna
            var tamannoColumna = padre.parent().children().length
            //Conseguimos la posición respecto a las columnas
            var indexColumna = padre.index("tr") % tamannoColumna
            //Comprobamos si al movernos nos salimos de los límites
            if (indexColumna != 0) {
                //Si no nos salimos, seleccionamos el elemento de la fila anterior en la misma posición que estábamos
                padre.prev().children().eq(index).addClass("selected");
            } else {
                //Si nos salimos, seleccionamos el elemento de la última fila, en la misma columna que estábamos
                padre.parent().children().eq(tamannoColumna-1).children().eq(index).addClass("selected");
            }
            selected.removeClass("selected");
            break;

            //Estos dos siguientes movimientos son análogos a los dos anteriores
        //Derecha
        case 39:
            //Conseguimos la posición del elemento
            var tamannoFila = $("tr").length;
            var index = selected.index("td") % tamannoFila;
            if (index != tamannoFila-1) {
                selected.next().addClass("selected");
            } else {
                selected.parent().children().eq(0).addClass("selected");
            }
            selected.removeClass("selected");
            break;
        //Abajo
        case 40:
            //Conseguimos la posición del elemento
            var tamannoFila = $("tr").length;
            var index = selected.index("td") % tamannoFila;
            var padre = selected.parent()
            var tamannoColumna = padre.parent().children().length
            var indexColumna = padre.index("tr") % tamannoColumna
            if (indexColumna != tamannoColumna-1) {
                padre.next().children().eq(index).addClass("selected");
            } else {
                padre.parent().children().eq(0).children().eq(index).addClass("selected");
            }
            selected.removeClass("selected");
            break;
        default:
            null;
            break;
    };
}

