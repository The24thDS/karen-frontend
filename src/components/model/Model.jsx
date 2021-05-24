import '@google/model-viewer/dist/model-viewer';
import Rating from 'components/rating/Rating';
import { formatDistanceToNow, parse } from 'date-fns';
import React, { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { useParams } from 'react-router';
import { tw } from 'twind';
import { TiEye, TiDownload } from 'react-icons/ti';
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
  const [rating, setRating] = useState(0);
  const [ratingStatus, setRatingStatus] = useState({
    upvoted: false,
    downvoted: false,
  });

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

  const onVote = (type) => {
    let valueChange = type === 'up' ? 1 : -1;
    const typeName = `${type}voted`;
    if (ratingStatus[typeName]) {
      setRating((rating) => rating - valueChange);
      setRatingStatus((state) => ({ ...state, [typeName]: false }));
    } else {
      const otherType = Object.keys(ratingStatus).find((k) => k !== typeName);
      if (ratingStatus[otherType]) {
        valueChange += valueChange;
      }
      setRatingStatus({ [typeName]: true, [otherType]: false });
      setRating((rating) => rating + valueChange);
    }
  };

  const render3dViewer = () => {
    if (model.useGltfViewer) {
      const file = getGltfFilePath(slug, user.username, model.gltf);
      return (
        // @ts-ignore
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
        <div className="col-span-1 col-start-4 flex justify-around items-center">
          <p className="flex flex-col items-center justify-center">
            <TiEye />
            {model.views || 0}
          </p>
          <p className="flex flex-col items-center justify-center">
            <TiDownload />
            {model.downloads || 0}
          </p>
        </div>
        <div className="col-span-2 flex justify-center">
          <Rating
            value={rating}
            onUpvote={() => onVote('up')}
            onDownvote={() => onVote('down')}
            isUpvoted={ratingStatus.upvoted}
            isDownvoted={ratingStatus.downvoted}
          />
        </div>
        <h1 className="col-span-6 font-bold text-gray-800 text-2xl">
          {model.name}
        </h1>
        <div className="description col-span-6">
          <h3 className="font-semibold">Description</h3>
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
          <h3 className="font-semibold">Keywords</h3>
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
          <h3 className="font-semibold">Uploaded by</h3>
          <p className="text-sm">{user.username}</p>
        </div>
        <div className="col-span-3">
          <h3 className="font-semibold">Upload time</h3>
          <p className="text-sm">
            {model.created_at &&
              formatDistanceToNow(
                parse(model.created_at, 'dd-MM-yyyy HH:mm:ss xxx', new Date()),
                { addSuffix: true }
              )}
          </p>
        </div>
        <div className="col-span-6">
          <h3 className="font-semibold">Available files</h3>
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
        <div className="col-span-6 grid grid-cols-2">
          <h3 className="col-span-2 font-semibold">Model data</h3>
          <p>Total Vertex Count</p>
          <p>{model.totalVertexCount}</p>
          <p>Total Triangle Count</p>
          <p>{model.totalTriangleCount}</p>
          {Object.entries(model.metadata).map(([key, value]) => (
            <>
              <p>{key}</p>
              <p>{value}</p>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Model;
