$(document).ready(function(){
    addListeners();
});

var viewChain=['main'];
// Function que agrega listener a elementos que cambiaran de views
function addListeners(){
    $("[link-to-view]").click(function(e){
        e.preventDefault();
        var viewName = $(this).attr('link-to-view');
        transition(viewName);
    });
    document.addEventListener("backbutton", backKeyDown, true); 
}


//Listener para el boton back del telefono
function backKeyDown() { 
    viewCount = viewChain.length;
    viewName = viewChain[viewCount-2];
    if(viewCount > 1){
        viewChain.pop();
        transition(viewName, "right", true);
    }
    else navigator.app.exitApp();
}

/**
* Funcion que crea la transicion entre views. 
* Para hacer link a view, agregar el atributo 'link-to-view' con el 
* nombre del view sin la extension .html
*
* @param String con el nombre del view
* @param String direccion de la animacion ('left', 'right', 'up', 'down') default 'left'
* @param Boolean esta llendo atras ? default false
*/
function transition(viewName, direction, goBack){
    direction=direction || "left";
    goBack = goBack || false;
    var options = {
        "href" : null,
        "direction"        : direction, 
        "duration"         :  500, // in milliseconds (ms), default 400
        "iosdelay"         :  -1, // ms to wait for the iOS webview to update before animation kicks in, default 60
        "androiddelay"     :  -1, // same as above but for Android, default 70
        "winphonedelay"    :  -1, // same as above but for Windows Phone, default 200
    };
    window.plugins.nativepagetransitions.slide(options, function(){
        var wrapper = $("#index");
        wrapper.load("views/"+viewName+".html", function(){
            setTimeout(function(){
                window.plugins.nativepagetransitions.executePendingTransition();
                addListeners();
                if(viewName!=='main' && !goBack) viewChain.push(viewName);
            }, 500);
        }); 
    });
}