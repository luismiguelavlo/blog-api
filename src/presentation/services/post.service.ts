export class PostService {
  constructor() {}

  async findAllPost() {
    return {
      message: "Buscando Todos los Post",
    };
  }

  async createPost() {
    return {
      message: "Creando Post",
    };
  }
}
