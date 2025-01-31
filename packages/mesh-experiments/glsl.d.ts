// glsl.d.ts
declare module '*.glsl' {
    const content: string;
    export default content;
  }

  declare module '*.glsl?import' {
    const content: string;
    export default content;
  }


  


  declare module "vertexShader.glsl" {
    const content: string;
    export default content;

  }

  declare module "fragmentShader.glsl" {
    const content: string;
    export default content;

  }