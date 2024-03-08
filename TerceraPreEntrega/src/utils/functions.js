export function generarCodigoAleatorio() {
  var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var codigo = '';

  for (var i = 0; i < 10; i++) {
      var indice = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indice);
  }

  return codigo;
}