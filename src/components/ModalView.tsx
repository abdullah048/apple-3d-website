'use client';

import { IModal } from '@/types';
import { StaticImageData } from 'next/image';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { Group, Object3DEventMap } from 'three';

type Props = {
  index: number;
  groupRef: MutableRefObject<Group<Object3DEventMap>>;
  gsapType: 'view1' | 'view2';
  controlRef: MutableRefObject<null>;
  setModalInfo: Dispatch<
    SetStateAction<{
      size: string;
      title: string;
      color: string[];
      img: StaticImageData;
      rotation: number;
    }>
  >;
  modal: IModal;
};

const ModalView = (props: Props) => {
  const { index, groupRef, gsapType, controlRef, setModalInfo, modal } = props;
  return <div>ModalView</div>;
};

export default ModalView;
