const btn_pick_color= document.getElementById ("btn-pick-color");
const archivo= document.getElementById ("file");
const imagen= document.getElementById ("image");
const hexadecimal= document.getElementById ("hex");
const rgb= document.getElementById ("rgb");
const picked_color= document.getElementById ("picked-color");

// eyedropper si el navedor soporta
const init_eyedropper= () => {
    if ("EyeDropper" in window){
        const eyedropper= new EyeDropper ();

        btn_pick_color.addEventListener ("click", async () => {
            try {
                const valor_color= await eyedropper.open ();
                const valor_hexa= valor_color.sRGBHex.toLowerCase ();
                const valor_rgb= hexa_rgb (valor_hexa);

                hexadecimal.value= valor_hexa;
                rgb.value= valor_rgb;
                picked_color.style.backgroundColor= valor_hexa;
            } 
            catch (error){
                alert ("el navegador no soporta EyeDropper");
            }
        });
    }
    else {
        alert ("el navegador no soporta EyeDropper");
    }
};

// convertir hexadecimal a rgb
const hexa_rgb= (hexa) => {
    const r= parseInt (hexa.slice (1, 3), 16);
    const g= parseInt (hexa.slice (3, 5), 16);
    const b= parseInt (hexa.slice (5, 7), 16);

    return `rgb(${r}, ${g}, ${b})`;
}

// copiar los valores 
const copiar= (id) => {
    const elemento= document.getElementById (id);
    elemento.select ();

    document.execCommand ("copy");
}

// cargar una imagen
archivo.addEventListener ("change", () => {
    const cargar_imagen= new FileReader ();

    cargar_imagen.onload= () => imagen.setAttribute ("src", cargar_imagen.result);
    cargar_imagen.readAsDataURL (archivo.files [0]);
});

window.onload= init_eyedropper;