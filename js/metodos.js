function inicio(){

	 function generate(type, text, time) {
    if(type=="error" || type=='warning'){
      $("#audio_error")[0].play();
    }

            var n = noty({
                text        : text,
                type        : type,
                dismissQueue: true,
                layout      : 'topRight',  //bottomLeft
                animation: {
			         open: 'animated fadeInDownBig',
		            close: 'animated flipOutX',
		            easing:'swing',
		            speed:500
			    },
                //closeWith   : ['button'],
                //theme       : 'defau',
                progressBar : false,
                maxVisible  : 10,
                timeout     : [time],
                
            });
            //console.log('html: ' + n.options.id);
            return n;
        }

	
	//$('#btn_enviar').hide();
	//$('#btn_solicitar').hide();
	$('section').hide();
	$('#div_log').show();
	$('#txt_username').focus();

	var clave= Array("");
          var desc= Array("");
          var linea= Array("");
          var existencias= Array("");
          var fecha1= Array("");
          var stock= Array("");
          var fecha2= Array("");
          var costo= Array("");
          var con= Array("");
          var user= Array("");

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
		//console.log(linea.length);
		var posiciones=Array("");
		var nombres_filtro=Array("");
		var valor_seleccionado=$('#lineas option:selected').val();
		//console.log(linea);
		//console.log(desc);
          for(var r=0;r<=linea.length-1;r++){
          	if(linea[r]==valor_seleccionado){
          		posiciones.push(r);

          		nombres_filtro.push(desc[r]);
          		//console.log(valor_seleccionado+"=="+desc[r]);
          	}
          	
          }
          //console.log(posiciones);
          nombres_filtro.sort();
          nombres_filtro.splice(0, 1);
          $('#nombres').html("<option value='vacio'>Selecciona...</option");
          for (var i=0;i<=nombres_filtro.length-1;i++) {
            var code=nombres_filtro[i].split(" - ");
            $('#nombres').append("<option value='"+nombres_filtro[i]+"'>"+code[1]+"</option");
          }
        });

	


		$('#btn_enviar').click(function(){
			var v1=$('#lineas option:selected').val();
			var v2=$('#nombres option:selected').val();
      var arr=v2.split(" - ");
      var code=arr[0];
			var v3=$('#txt_cantidad').val();

			$('#cuerpo').append('<tr><td>'+v1+'</td><td>'+code+'</td><td>'+arr[1]+'</td><td>'+v3+'</td></tr>');
			var total="<tr><td> </td><td> </td><td>Total:</td><td>$180</td></tr>";
			//$('#foot').html(total);
			$('#txt_cantidad').val('');
	        
		});

		$('#btn_limpiar').click(function(){
			$('#cuerpo').html('');
			$('#txt_cantidad').val('');
	        
		});

		$('#btn_login').click(function(e){
			e.preventDefault();
			var user=$('#txt_username').val();
			var pass=$('#txt_pass').val();
			if((user=='StarMedica' && pass=='123') || (user=='tec100' && pass=='123') || (user=='SNA JOSE' && pass=='123')){
				leer_hoja();
				$('section').show();
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
           //alert("Binevenido: "+usuario);
           generate("success", "Bienveid@:"+usuario, 2000);
          for(var r=1;r<=arr.length-1;r++){
              var filas=arr[r].split(",");
              var arreglo_linea=filas[9].split("\r");
              //console.log(arreglo_linea);
              
              	var cliente=arreglo_linea[0];
              	if(cliente==usuario){
              		clave.push(filas[0]);
		              desc.push(filas[0]+" - "+filas[1]);
		              linea.push(filas[2]);
		              existencias.push(filas[3]);
		              fecha1.push(filas[4]);
		              stock.push(filas[5]);
		              fecha2.push(filas[6]);
		              costo.push(filas[7]);
		              con.push(filas[8]);
		              user.push(filas[9]);
              	}
	          
          }
          //console.log(linea);
          var linea_sin = [];
			$.each(linea, function(i, el){
			    if($.inArray(el, linea_sin) === -1) linea_sin.push(el);
			});
			linea_sin.sort();
          linea_sin.splice(0, 1);
          $('#lineas').append("<option value='vacio'>Selecciona...</option");
          for (var i=0;i<=linea_sin.length-1;i++) {
            $('#lineas').append("<option value='"+linea_sin[i]+"'>"+linea_sin[i]+"</option");
          }
          
		  //console.log(desc);
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
	                 	 $('#btn_solicitar').html('<i class="fa fa-send" aria-hidden="true"></i> Solicitar pedido');
	                 	 
                     var texto="Su pedido ha sido enviado!. En un momento uno de nuestros ejecutivos se pondrá en contacto con usted";
                     generate("success", texto, 5000);
                     $('#cuerpo').html('');
                    $('#txt_cantidad').val('');
                 	}
                 },
});
	});
	
}