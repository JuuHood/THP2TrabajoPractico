export class Receta {
  constructor(id, nombre, ingredientes, instrucciones, usuario_id) {
    this.id = id;
    this.nombre = nombre;
    this.ingredientes = ingredientes;
    this.instrucciones = instrucciones;
    this.usuario_id = usuario_id;
  }
}
