'use client';

// 2:26:00

import useModalAnimations from '@/hooks/useModalAnimations';
import ModalView from '@/components/ModalView';
import { useCallback, useRef, useState } from 'react';
import { yellowImg } from '@/utils';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';
import { models, sizes } from '@/constants';
import { IModal } from '@/types';

const Modal = () => {
  useModalAnimations();

  const [modalInfo, setModalInfo] = useState({
    size: 'small',
    title: 'Iphone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64 '],
    img: yellowImg,
    rotation: 0,
  });

  //   const [smallRotation, setSmallRotation] = useState(0);
  //   const [largeRotation, setLargeRotation] = useState(0);

  //   Camera control refs
  const cameraControlSmallRef = useRef(null);
  const cameraControlLargeRef = useRef(null);

  //   Modal refs
  const smallModalRef = useRef(new THREE.Group());
  const largeModalRef = useRef(new THREE.Group());

  const handleColorSelect = useCallback((modal: Partial<IModal>) => {
    setModalInfo(prev => ({ ...prev, ...modal }));
  }, []);

  const handleSizeSelect = useCallback((value: string) => {
    setModalInfo(prev => ({ ...prev, size: value }));
  }, []);

  return (
    <section className='common-padding'>
      <div className='screen-max-width'>
        <h1 id='modal-heading' className='section-heading'>
          Take a closer look
        </h1>

        <div className='flex flex-col items-center mt-5 w-full'>
          <div className='w-full h-[75vh] md:h-[90vh] overflow-hidden relative'>
            <ModalView
              index={1}
              groupRef={smallModalRef}
              gsapType='view1'
              controlRef={cameraControlSmallRef}
              setModalInfo={setModalInfo}
              modal={modalInfo}
            />

            <ModalView
              index={2}
              groupRef={largeModalRef}
              gsapType='view2'
              controlRef={cameraControlLargeRef}
              setModalInfo={setModalInfo}
              modal={modalInfo}
            />

            <Canvas
              className='w-full h-full'
              style={{
                position: 'fixed',
                inset: 0,
                overflow: 'hidden',
              }}
              //   eventSource={document.getElementById('root')}
            >
              <View.Port />
            </Canvas>
          </div>

          <div className='w-full mx-auto'>
            <p className='text-sm font-light text-center mb-5'>
              {modalInfo.title}
            </p>

            <div className='flex-center'>
              <ul className='color-container'>
                {models?.map(modal => (
                  <li
                    key={modal.id}
                    className='w-6 h-6 rounded-full mx-2 cursor-pointer'
                    style={{ backgroundColor: modal.color[0] }}
                    onClick={() => handleColorSelect(modal)}></li>
                ))}
              </ul>

              <button className='size-btn-container'>
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className='size-btn'
                    style={{
                      backgroundColor:
                        modalInfo.size === value ? 'white' : 'transparent',
                      color: modalInfo.size === value ? 'black' : 'white',
                    }}
                    onClick={() => handleSizeSelect(value)}>
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modal;
