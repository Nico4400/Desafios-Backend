export function generateCode() {
  var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var codigo = '';

  for (var i = 0; i < 10; i++) {
      var indice = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indice);
  }

  return codigo;
}

export function actualDate(){
  //Obtengo la fecha actual, restandole 3 horas por el UTC
  const currentDate = new Date()
  const utcHours = currentDate.getUTCHours() - 3 
  
  const utcDate = new Date(Date.UTC(
        currentDate.getUTCFullYear(),
        currentDate.getUTCMonth(),
        currentDate.getUTCDate(),
        (utcHours < 0) ? (utcHours + 24) : utcHours,
        currentDate.getUTCMinutes(),
        currentDate.getUTCSeconds()
  ))  
  return utcDate
}