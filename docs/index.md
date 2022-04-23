# Práctica 9

## **Índice**
 * [Tareas Previas](#dv1)
 * [Explicación de solucion diseñada](#dv2)
 * [Conclusión](#dv3)


<div id='dv1'/>

## Tareas Previas
> Typedoc: nos permitira realizar la documentación de nuestro código de manera automática. Para instalarlo y configurarlo pinche [aqui](https://drive.google.com/file/d/19LLLCuWg7u0TjjKz9q8ZhOXgbrKtPUme/view).

> Chai y mocha para aplicar metodología TDD en nuestro proyecto. Para instalarlo y configurarlo pinche [aqui](https://drive.google.com/file/d/1-z1oNOZP70WBDyhaaUijjHvFtqd6eAmJ/view).

> [TDD](https://en.wikipedia.org/wiki/Test-driven_development) Iremos desarrollando primero las pruebas de la funcionalidad que queremos desarrollar y luego escribiremos el código necesario para ello por ello estableceremos primero el fichero `.spec.ts` y luego el `.ts`.

> [Instanbul y Coveralls](https://coveralls.io/) añadiremos nuestro repositorio a la página de coveralls para llevar un seguimiento en la realización y cubrimiento de pruebas de nuestro código.

> [Principios Solid](https://profile.es/blog/principios-solid-desarrollo-software-calidad/) Aplicaremos los principios Solud para mantener una alta cohesión y por tanto un buen acoplamiento de software.

> [Sonar Cloud](https://sonarcloud.io/) Nos permitirá mejorar el flujo de trabajo con calidad y seguridad de codigo.

> [Github Action](https://github.com/features/actions) Usaremos las githubs Actions para aplicar 3 tareas a la hora de realizar un push en nuestro reporsitorio, pruebas con coveralls, pruebas con mocha y integración de Sonar Cloud.

> [Yargs](https://www.npmjs.com/package/yargs) Permite crear herramientas de línea de comandos interactivas analizando argumentos y generando una interfaz de usuario elegante

> [Chalk](https://www.npmjs.com/package/chalk) Permite crear herramientas de línea de comandos interactivas analizando argumentos y generando una interfaz de usuario elegante

> [Sistema de ficheros](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#synchronous-api) Api que nos permite crear y trabajar con ficheros

<div id='dv2'/>

## Metodología de trabajo.

El primer paso sería el desarrollo de la clase Notas para poder almacenar los valores que se nos indican en el enunciado en este caso se ha respetado el Single responsibility principle separando lo que es la clase encargada de almacenar el contenido de la nota con la clase encargada de impirmir/devolver el contenido de la nota de una manera que comentaremos más adelante. Para limitar los colores se ha introducido un ripo de dato que solo contempla los colores del enunciado.

```typescript
/**
 * Nos permitira limitar los tipos de colores en Chalk
 * 
 */
export type typeColor = ("red" | "green" | "blue" | "yellow");
```
Clase para almacenar la `Nota`:

```typescript
/**
 * Clase Notas que alamacenara el titulo de la nota,
 * el cuerpo y el color
 */
export class Nota {
  /**
   * Constructor que permitirá crear la Nota
   * @param titulo titulo de la nota
   * @param cuerpo contenido de la nota
   * @param color  color de la nota
   */
  constructor(private titulo: string, private cuerpo: string, private color: typeColor) {}

  /**
   * Conocer el titulo de la nota
   * @returns string
   */
  getTitulo(): string {
    return this.titulo;
  }

  /**
   * Conocer el contenido de la nota
   * @returns string
   */
  getCuerpo(): string {
    return this.cuerpo;
  }

  /**
   * Obtener el color de la nota
   * @returns string
   */
  getColor(): string {
    return this.color;
  }

  /**
   * Cambiar el titulo de la nota
   * @param newTitulo 
   */
  setTitulo(newTitulo: string) {
    this.titulo = newTitulo;
  }

  /**
   * Cambiar el contenido de la nota
   * @param newCuerpo 
   */
  setCuerpo(newCuerpo: string) {
    this.cuerpo = newCuerpo;
  }

  /**
   * Cambiar el color de la nota
   * @param newColor 
   */
  setColor(newColor: typeColor) {
    this.color = newColor;
  }
}

```
Clase para `impirmir` nota:

```typescript
/**
 * Clase que nos permite imprimir una nota
 */
export class PrintNota {
  /**
   * Contructor que recibe el objeto nota
   * @param nota 
   */
  constructor(private nota: Nota) {}

  /**
   * Metodo que permite construir un string y imprimirlo
   * o visualizarlo por consola
   * @returns string
   */
  print(): string {
    const contenido = '{\n "titulo": \"' + this.nota.getTitulo() + "\"," +
      '\n "cuerpo": \"' + this.nota.getCuerpo() + "\"," +
      '\n "color": \"' + this.nota.getColor() + "\"" +
      '\n}';
  
    console.log(contenido);
    return contenido;
  }
}
```
Algo importante a destacar es que este metodo debe devolver un string en formato [JSON](https://en.wikipedia.org/wiki/JSON) ya que este será el que almacenemos en la base de datos por ello el formato debe ser el mostrado encima es decir el objeto debe estar encerrado en llaves y cada par clave-valor debe tener comillas simples, teniendo en cuenta que cada par debe estar separado por una coma.

Pruebas desarrolladas para verificar la correcta implementacion de lo anterior:
```typescript
let color: typeColor = "red";
const nota= new Nota("Lista de la compra", "->Leche", color);
describe("Pruebas clase Nota", () => {
    it('Se puede instanciar un objeto', () => {
      expect(nota).instanceOf(Nota);
    });
    describe('Getters', () => {
      it('La nota tiene un titulo', () => {
        expect(nota.getTitulo()).to.eql('Lista de la compra');
      });
      it('La nota tiene un cuerpo', () => {
        expect(nota.getCuerpo()).to.eql('->Leche');
      });
      it('La nota tiene un color', () => {
        expect(nota.getColor()).to.eql('red');
      });
    });
    describe('Setter', () => {
        it('Se puede cambiar el titulo', () => {
            nota.setTitulo("AA")
          expect(nota.getTitulo()).to.eql('AA');
        });
        it('Se puede cambiar el cuerpo', () => {
            nota.setCuerpo("BB")
          expect(nota.getCuerpo()).to.eql('BB');
        });
        it('Se puede cambiar el color', () => {
            nota.setColor("blue")
          expect(nota.getColor()).to.eql('blue');
        });
      });
  });

  const printnota = new PrintNota(nota);
  describe("Pruebas de la clase PrintNota", () => {
    it('Se puede instanciar un objeto', () => {
        expect(printnota).instanceOf(PrintNota);
    });
    it('Metodo para imprimir una nota', () => {
        expect(printnota.print()).to.eql(`{
 "titulo": "AA",
 "cuerpo": "BB",
 "color": "blue"
}`)
    });
  })
```

Una vez ya tenemos la clase que almacena la nota y la clase "imprime" la nota, nos quedaría crear una clase que manipule las notas es decir que permite añadir, modificar, eliminar, listar y leer tal y como se nos indica en el enunciado para ello he desarrollado una clase `ManejarNotas`

añadirNotas recibe como parametros el usuario, el titulo, cuerpo y color de la nota, Lo primero que tendremos que hacer es mediante la API síncrona comrpobar si ese usuario ya dispone de un archivo dentro de la base de datos en caso de que no lo este se crear el directorio `BaseDatosNotas/usuario` para ello haremos uso del metodo [mkdirSync](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#fsmkdirsyncpath-options). Una vez creado el directorio del usuario comprobamos si el titulo de la nota que quiere añadir ya existe en caso de que si informamos de que no se ha creado imprimiendo por pantalla usando ckalk para que el mensaje se muestre rojo, en caso de que ese titulo no exista para ese usuario escribimos gracias a [writeFileSync](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#fsmkdirsyncpath-options) para ello el parámetro que le pasamos es el string que devuelve la clase PrintNote en formarto JSON.