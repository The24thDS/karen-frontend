import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { useParams } from 'react-router';
import { getImagePath, getModelFilePath } from '../../utils/general';
import { useModel } from './custom-hooks';
import { tw } from 'twind';
import './model.css';
import { OBJModel } from 'react-3d-viewer';

const Model = () => {
  const { id } = useParams();
  const { model, user, tags } = useModel(id);
  const [viewer, setViewer] = useState('gallery');

  const galleryItems =
    model?.images?.map((image) => ({
      original: getImagePath(image),
    })) ?? [];

  const viewerButtonClasses = (buttonViewer) =>
    tw`p-2 ${
      viewer === buttonViewer
        ? 'bg-green-500 text-white border-b-2 border-blue-500'
        : 'bg-gray-300 text-gray-800'
    }`;

  const render3dViewer = () => {
    if (model.useObjViewer) {
      const objFile = getModelFilePath(
        model.files.find((file) => file.endsWith('.obj'))
      );
      return (
        <OBJModel
          width="400"
          height="400"
          position={{ x: 0, y: -50, z: -50 }}
          rotation={{ x: -1.3, y: 0, z: 0 }}
          src={objFile}
        />
      );
    }
  };

  return (
    <>
      <h1 className="col-span-2 font-bold text-gray-800 text-2xl">
        {model.name}
      </h1>
      <div>
        <div className="mb-3">
          <button
            className={viewerButtonClasses('gallery')}
            onClick={() => setViewer('gallery')}
          >
            Gallery
          </button>
          <button
            className={viewerButtonClasses('3d')}
            onClick={() => setViewer('3d')}
          >
            3D preview
          </button>
        </div>
        {viewer === 'gallery' ? (
          <ImageGallery
            items={galleryItems}
            lazyLoad={true}
            showPlayButton={false}
            showFullscreenButton={false}
          />
        ) : (
          render3dViewer()
        )}
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
