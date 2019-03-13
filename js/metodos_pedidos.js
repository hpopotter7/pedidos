function inicio(){

  var contador=1;

	 function generate(type, text, time) {
    

            var n = noty({
                text        : text,
                type        : type,
                dismissQueue: true,
                layout      : 'topRight',  //bottomLeft/
                animation: {
			         open: 'animated fadeInDownBig',
		            close: 'animated flipOutX',
		            easing:'swing',
		            speed:500
			    },
                //closeWith   : ['button'],
                //theme       : 'semanticUI',
                progressBar : false,
                maxVisible  : 10,
                timeout     : [time],
                
            });
            
            return n;
        }

	
	
	$('#seccion').hide();
	$('#div_log').show();
	$('#txt_username').focus();

	       var clave= Array("");
          var desc= Array("");
          var equipo= Array("");
          var existencias= Array("");
          var fecha1= Array("");
          var stock= Array("");
          var fecha2= Array("");
          var costo= Array("");
          var con= Array("");
          var user= Array("");
          var nombres_filtro=Array();
          var datos_filtro_cliente=Array();

	 function removeDups(array) {
    
  var outArray = [];
  array.sort();

  outArray.push(array[0]);
  for(var n in array){
    if(outArray[outArray.length-1]!=array[n]){
      outArray.push(array[n]);
    }
  }
  return outArray;
}

    	$('#lineas').change(function(){
    		var posiciones=Array("");
        nombres_filtro.splice(0,nombres_filtro.length)
         
    		var valor_seleccionado=$('#lineas option:selected').val();
        valor_seleccionado="#"+valor_seleccionado;
          for(var r=0;r<=datos_filtro_cliente.length-1;r++){
          	//if(equipo[r]==valor_seleccionado){
              console.log(datos_filtro_cliente[r]);
              
              if(datos_filtro_cliente[r].includes(valor_seleccionado)){

                var arr_datos=datos_filtro_cliente[r].split("#");
                var codigo_nombre=arr_datos[1]+"("+arr_datos[3]+") - ["+arr_datos[0]+"]";
          		posiciones.push(r);
          		nombres_filtro.push(codigo_nombre);

          	}
          }
          nombres_filtro.sort();
          //nombres_filtro.splice(0, 1);
           
         /* $('#nombres').html("<option value='vacio'>Selecciona...</option");
          for (var i=0;i<=nombres_filtro.length-1;i++) {
            var code=nombres_filtro[i].split(" - ");
            $('#nombres').append("<option value='"+nombres_filtro[i]+"'>"+code[1]+"</option");
          }*/
          
        });



		$('#btn_enviar').click(function(){
      
			var v1=$('#lineas option:selected').val();
			/*var v2=$('#nombres option:selected').val();*/
      var v2=$('#txt_nombre').val();
      var v3=$('#txt_cantidad').val();
      if(v1=="vacio"){
        generate("warning", "Debe seleccionar un equipo.", 3000);
      }
      else if(v2=="") {
          generate("warning", "Debe ingresar un producto.", 3000);
      }
      
      else if(v3=="") {
          generate("warning", "Debe ingresar una cantidad.", 3000);
      }
      else{
        var arr=v2.split("[");
        var producto=arr[1];
        var code=arr[0];
  			code=code.replace(' - ','');
        producto=producto.replace(']','');
        id_tr="tr"+contador;
  			$('#cuerpo').append('<tr id="'+id_tr+'"><td>'+v1+'</td><td>'+producto+'</td><td>'+code+'</td><td>'+v3+'<button type="button" id="btn'+id_tr+'" class="boton_borrar btn btn-danger btn-xs pull-right"><i class="fa fa-trash" aria-hidden="true"></i> Borrar</button></td></tr>');
        contador++;
  			$('#txt_cantidad').val('');
        $('#txt_nombre').val('');
  	   }
		});

		$('#btn_limpiar').click(function(){
			$('#cuerpo').html('');
			$('#txt_cantidad').val('');
	        
		});

		$('#btn_login').click(function(e){
			e.preventDefault();
			var user=$('#txt_username').val();
			var pass=$('#txt_pass').val();
			if((user=='StarMedica' && pass=='123') || (user=='Tec100' && pass=='123') || (user=='SNA JOSE' && pass=='123')){
				leer_hoja();
				$('#seccion').show();
				$('#div_log').hide();
				
			}
			else{
				$('#respon').html("Error de usuario/contraseña")
			}
		});


function mayus(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
	         
	         function leer_hoja(){
	         	$.ajax("https://docs.google.com/spreadsheets/d/e/2PACX-1vTg3fk6hSo2YYSVP9507C03LvRzR37s9rZifPwFIomXCnAAiYadp7pyUgCEIWvO2xmu_JBuu3YR6CeL/pub?output=csv").done(function(result){
          var arr=result.split("\n");
          
           var usuario=$('#txt_username').val();
           $('#txt_usuario').val(usuario);
           generate("warning", "Bienveid@:"+usuario, 2000);
          for(var r=1;r<=arr.length-1;r++){
              var filas=arr[r].split(",");
              var arreglo_linea=filas[9].split("\r");              
              	var cliente=arreglo_linea[0];
              	if(cliente==usuario){
              		clave.push(filas[0]);
		              desc.push(filas[1]);
		              equipo.push(filas[2]);
		              user.push(filas[9]);
                  datos_filtro_cliente.push(filas[0]+"#"+filas[1]+"#"+filas[2]+"#"+filas[3]);
                  
              	}
	          
          }
          var linea_sin = [];
          
			$.each(equipo, function(i, el){
			    if($.inArray(el, linea_sin) === -1) linea_sin.push(el);
          
			});
      
			     linea_sin.sort();
          linea_sin.splice(0, 1);
          $('#lineas').append("<option value='vacio'>Selecciona...</option");
          for (var i=0;i<=linea_sin.length-1;i++) {
            $('#lineas').append("<option value='"+linea_sin[i]+"'>"+linea_sin[i]+"</option");
          }
          
        });
	         }   

$('#btn_solicitar').click(function(){
	var cliente=$('#txt_usuario').val();
	var tabla=$('#tabla_pedido').html();
	
	var datos = {
              "cliente": cliente,
              "tabla": tabla,
          };

	$.ajax({
              	url: 'enviar_mail.php',
                data: datos,
                type: 'POST',
                 beforeSend: function(){
                $('#btn_solicitar').html("<img src='img/fancybox_loading.gif'>");
               },
                 success: function(response){
                 	console.log(response);

                 	if(response.includes("Enviado")){
                    var texto="Su pedido ha sido enviado!. En un momento uno de nuestros ejecutivos se pondrá en contacto con usted";
                     generate("warning", texto, 5000);
	                 	 $('#btn_solicitar').html('<i class="fa fa-send" aria-hidden="true"></i> Solicitar pedido');
                      
                     $('#cuerpo').html('');
                    $('#txt_cantidad').val('');
                 	}
                 },
});
	});

$( "#txt_nombre" ).autocomplete({
      source: nombres_filtro,
      change: function (e, ui) {
                if (!( ui.item)) e.target.value = "";
            },
    });

$("#cuerpo").delegate(".boton_borrar", "click", function() {
  var nombre=$(this).attr("id");
  nombre=nombre.replace("btn", "");
  document.getElementById(nombre).remove();
  
});
	
}