const chalk = require("chalk");
import * as yargs from 'yargs';
import {ManejarNotas} from './manejarNotas';

const manejadorNotas = new ManejarNotas();

yargs.command({
  command: 'añadir',
  describe: 'Añadir una nota',
  builder: {
    usuario: {
      describe: 'Nombre del usuario',
      demandOption: true,
      type: 'string',
    },
    titulo: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
    cuerpo: {
      describe: 'Cuerpo de la Nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: "Color de la nota",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    if (typeof argv.usuario === 'string' && typeof argv.titulo === 'string' &&
    typeof argv.cuerpo === 'string' && typeof argv.color === "string") {
      if (argv.color == 'rojo' || argv.color == 'verde' || argv.color == 'azul' || argv.color == 'amarillo' ) {
        manejadorNotas.añadirNota(argv.usuario, argv.titulo, argv.cuerpo, argv.color);
      }
    } else {
      console.log(chalk.red('Argument invalid'));
    }
  },
});

yargs.command({
  command: 'eliminar',
  describe: 'Eliminar una nota',
  builder: {
    usuario: {
      describe: 'Nombre del usuario',
      demandOption: true,
      type: 'string',
    },
    titulo: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.usuario === 'string' && typeof argv.titulo === 'string') {
      manejadorNotas.eliminarNota(argv.usuario, argv.titulo);
    } else {
      console.log(chalk.red('Argument invalid'));
    }
  },
});


yargs.command({
  command: 'modificar',
  describe: 'Modificar una nota',
  builder: {
    usuario: {
      describe: 'Nombre del usuario',
      demandOption: true,
      type: 'string',
    },
    titulo: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
    cuerpo: {
      describe: 'Cuerpo de la Nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: "Color de la nota",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    if (typeof argv.usuario === 'string' && typeof argv.titulo === 'string' &&
    typeof argv.cuerpo === 'string' && typeof argv.color === "string") {
      if (argv.color == 'rojo' || argv.color == 'verde' || argv.color == 'azul' || argv.color == 'amarillo' ) {
        manejadorNotas.modificarNota(argv.usuario, argv.titulo, argv.cuerpo, argv.color);
      }
    } else {
      console.log(chalk.red('Argumento no contemplado'));
    }
  },
});

yargs.command({
  command: 'listar',
  describe: 'Listar todas las notas',
  builder: {
    usuario: {
      describe: 'Nombre del usuario',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.usuario === 'string') {
      console.log(chalk.underline('Notas de ' + argv.usuario));
      manejadorNotas.listarNotas(argv.usuario);
    } else {
      console.log(chalk.red('Argumento no contemplado'));
    }
  },
});

yargs.command({
  command: 'leer',
  describe: 'Leer una nota',
  builder: {
    usuario: {
      describe: 'Nombre del usuario',
      demandOption: true,
      type: 'string',
    },
    titulo: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.usuario === 'string' && typeof argv.titulo === 'string') {
      manejadorNotas.leerNota(argv.usuario, argv.titulo);
    } else {
      console.log(chalk.red('Argumento no contemplado'));
    }
  },
});

yargs.parse();

