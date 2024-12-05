import { StaticImageData } from 'next/image';

export interface IModal {
  size: string;
  title: string;
  color: string[];
  img: StaticImageData;
  rotation: number;
}
