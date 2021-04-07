import React from 'react';
import ImageGallery from 'react-image-gallery';
import { useParams } from 'react-router';
import { getImagePath } from '../../utils/general';
import { useModel } from './custom-hooks';
import './model.css';

const Model = () => {
  const { id } = useParams();
  const model = useModel(id);

  const galleryItems =
    model.images?.map((image) => ({
      original: getImagePath(image),
    })) ?? [];

  return (
    <div className="grid grid-cols-2 gap-10 mt-10 mx-20">
      <div>
        <ImageGallery items={galleryItems} lazyLoad={true} />
      </div>
      <div>
        <h1 className="font-bold text-gray-800 text-2xl">{model.name}</h1>
        <div className="description my-3 py-3 border border-l-0 border-r-0">
          {model.description
            ?.split('\r\n')
            .filter((s) => s !== '')
            .map((sentence, idx) => (
              <p key={idx} className="text-gray-900 text-sm my-1">
                {sentence}
              </p>
            ))}
        </div>
        <h3>Tags</h3>
        {model.tags?.map(({ name }) => (
          <span
            key={name}
            className="p-1 m-1 rounded border font-semibold text-gray-400 inline-block"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Model;
