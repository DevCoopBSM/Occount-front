// 이미지 파일 형식 선언
declare module "*.svg" {
    const content: string;
    export default content;
  }
  
  declare module "*.png" {
    const content: string;
    export default content;
  }
  
  declare module "*.jpg" {
    const content: string;
    export default content;
  }
  
  // CSS 및 SCSS 모듈 선언
  declare module "*.css" {
    const content: { [className: string]: string };
    export default content;
  }
  
  declare module "*.scss" {
    const content: { [className: string]: string };
    export default content;
  }
  
  // JSON 파일 형식 선언
  declare module "*.json" {
    const content: any;
    export default content;
  }
  