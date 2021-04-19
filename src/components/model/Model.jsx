import React from 'react';
import ImageGallery from 'react-image-gallery';
import { useParams } from 'react-router';
import { getImagePath } from '../../utils/general';
import { useModel } from './custom-hooks';
import './model.css';

const Model = () => {
  const { id } = useParams();
  const { model, user, tags } = useModel(id);

  const galleryItems =
    model?.images?.map((image) => ({
      original: getImagePath(image),
    })) ?? [];

  return (
    <>
      <h1 className="col-span-2 font-bold text-gray-800 text-2xl">
        {model.name}
      </h1>
      <div>
        <ImageGallery items={galleryItems} lazyLoad={true} />
      </div>
      <div className="grid grid-cols-6 gap-y-4 content-start">
        <div className="description col-span-6">
          <h3 className="font-semibold">description</h3>
          {model.description
            ?.split('\r\n')
            .filter((s) => s !== '')
            .map((sentence, idx) => (
              <p key={idx} className="text-gray-900 text-sm my-1">
                {sentence}
              </p>
            ))}
        </div>
        <div className="col-span-6">
          <h3 className="font-semibold">keywords</h3>
          {tags.map((tag) => (
            <span
              key={tag}
              className="p-1 m-1 rounded border font-semibold text-gray-400 inline-block"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="col-span-3">
          <h3 className="font-semibold">uploaded by</h3>
          <p className="text-sm">{user.email}</p>
        </div>
        <div className="col-span-3">
          <h3 className="font-semibold">date uploaded</h3>
        </div>
        <div className="col-span-6">
          <h3 className="font-semibold">files available</h3>
          <ul className="text-sm">
            {model.files?.map((fileName, idx) => (
              <li key={idx}>{fileName}</li>
            ))}
          </ul>
        </div>
        <div className="col-span-2">
          <h3 className="font-semibold">views</h3>
          <p>{model.views || 0}</p>
        </div>
        <div className="col-span-2">
          <h3 className="font-semibold">downloads</h3>
          <p>{model.downloads || 0}</p>
        </div>
        <div className="col-span-2">
          <h3 className="font-semibold">rating</h3>
          <p>{model.rating || 0}</p>
        </div>
      </div>
    </>
  );
};

export default Model;
