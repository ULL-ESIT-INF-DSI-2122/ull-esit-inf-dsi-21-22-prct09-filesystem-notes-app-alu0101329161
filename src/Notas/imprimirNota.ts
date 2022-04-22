import {Nota} from './notas';

export class PrintNota {
  constructor(private nota: Nota) {}
  print(): string {
    const contenido = '{\n Titulo: ' + this.nota.getTitulo() +
      '\n Cuerpo: ' + this.nota.getCuerpo() +
      '\n Color: ' + this.nota.getColor() + '}';
  
    console.log(contenido);
    return contenido;
  }
}
  
