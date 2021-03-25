import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import STLViewer from 'stl-viewer';
import TvUnit from '../../tv_unit.stl';

// TODO: refactor this using redux and sagas
const Model = () => {
  const { id } = useParams();
  const [state, setState] = useState({});

  useEffect(() => {
    const fetchModel = async () => {
      const url = `http://localhost:3001/models/${id}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();

        setState(data);
      }
    };
    fetchModel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>{state.name}</h1>
      {state.file?.length && (
        <>
          <STLViewer
            model={TvUnit}
            width={400}
            height={400}
            modelColor="#B92C2C"
            backgroundColor="#EAEAEA"
            rotate={true}
            orbitControls={true}
          />
        </>
      )}
      {state.tags?.length && (
        <p>{state.tags.map(({ name }) => name).join(', ')}</p>
      )}
    </>
  );
};

export default Model;
