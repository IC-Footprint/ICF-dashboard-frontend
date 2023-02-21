export interface EntityModel {
  name: string;
  link?: string;
  image: string;
}

export function createEntity(
  name: string,
  image: string,
  link?: string
): EntityModel {
  return {
    image,
    link,
    name
  };
}
