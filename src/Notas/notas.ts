

export type typeColor = ("rojo" | "verde" | "azul" | "amarillo");

export class Nota {
  constructor(private titulo: string, private cuerpo: string, private color: typeColor) {}

  getTitulo(): string {
    return this.titulo;
  }

  getCuerpo(): string {
    return this.cuerpo;
  }

  getColor(): string {
    return this.color;
  }

  setTitulo(newTitulo: string) {
    this.titulo = newTitulo;
  }

  setCuerpo(newCuerpo: string) {
    this.cuerpo = newCuerpo;
  }

  setColor(newColor: typeColor) {
    this.color = newColor;
  }
}
