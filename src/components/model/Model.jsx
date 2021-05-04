import '@google/model-viewer/dist/model-viewer';
import { formatDistanceToNow, parse } from 'date-fns';
import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { useParams } from 'react-router';
import { tw } from 'twind';
import {
  getGltfFilePath,
  getImagePath,
  getModelFilePath,
} from '../../utils/general';
import DownloadButton from '../download-button/DownloadButton';
import { useModel } from './custom-hooks';
import './model.css';

const Model = () => {
  const { slug } = useParams();
  const { model, user, tags } = useModel(slug);
  const [viewer, setViewer] = useState('gallery');

  const galleryItems =
    model?.images?.map((image) => ({
      original: getImagePath(slug, user.username, image),
    })) ?? [];

  const viewerButtonClasses = (buttonViewer) =>
    tw`p-2 ${
      viewer === buttonViewer
        ? 'bg-green-500 text-white border-b-2 border-blue-500'
        : 'bg-gray-300 text-gray-800'
    }`;

  const render3dViewer = () => {
    if (model.useGltfViewer) {
      const file = getGltfFilePath(slug, user.username, model.gltf);
      return (
        <model-viewer
          src={file}
          ios-src=""
          poster={galleryItems[0].original}
          alt="A 3D model of an astronaut"
          shadow-intensity="1"
          camera-controls
          auto-rotate
        ></model-viewer>
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
          {model.useGltfViewer && (
            <button
              className={viewerButtonClasses('3d')}
              onClick={() => setViewer('3d')}
            >
              3D preview
            </button>
          )}
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
          <h3 className="font-semibold">by</h3>
          <p className="text-sm">{user.username}</p>
        </div>
        <div className="col-span-3">
          <h3 className="font-semibold">uploaded</h3>
          <p className="text-sm">
            {model.created_at &&
              formatDistanceToNow(
                parse(model.created_at, 'dd-MM-yyyy HH:mm:ss xxx', new Date()),
                { addSuffix: true }
              )}
          </p>
        </div>
        <div className="col-span-6">
          <h3 className="font-semibold">files available</h3>
          {model?.files?.map(({ name, size }) => (
            <DownloadButton
              key={slug + name}
              link={getModelFilePath(slug, user.username, name)}
              label={`DOWNLOAD ${name
                .slice(name.lastIndexOf('.') + 1)
                .toUpperCase()}`}
              size={size}
            />
          ))}
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
