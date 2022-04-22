import {Nota} from './notas';

export class PrintNota {
  constructor(private nota: Nota) {}
  print(): string {
    const contenido = '{\n "titulo": \"' + this.nota.getTitulo() + "\"," +
      '\n "cuerpo": \"' + this.nota.getCuerpo() + "\"," +
      '\n "color": \"' + this.nota.getColor() + "\"" +
      '\n}';
  
    console.log(contenido);
    return contenido;
  }
}
  
