import PropTypes from "prop-types";
import React, { useState } from "react";
import { tw } from "twind";
import { Controller } from "react-hook-form";
import FileInput from "components/form/inputs/FileInput";
import Input from "components/form/inputs/Input";
import ModelInfoInput from "./ModelInfoInput";
import SubmitButton from "components/form/inputs/SubmitButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ModelEditFormSchemaStep2,
  ModelFormSchemaStep2,
} from "../validation.schema";
import {
  gltfFileInputServerConfig,
  modelsFileInputServerConfig,
} from "../file-inputs-server-configs";
import { useCustomMetadataVales } from "../custom-hooks";
import ExistingFilesSection from "components/model-form/partials/ExistingFilesSection";

const ModelForm3dFiles = ({
  initialModel,
  sectionStyle,
  onButtonClick,
  getButtonText,
}) => {
  const { register, handleSubmit, control, errors, setValue, getValues } =
    useForm({
      resolver: yupResolver(
        initialModel?.model?.images
          ? ModelEditFormSchemaStep2
          : ModelFormSchemaStep2
      ),
    });
  const [customMetadataKeys, setCustomMetadataKeys] = useState(
    Object.keys(initialModel?.model?.metadata ?? {})
  );
  const [keyName, setKeyName] = useState("");
  useCustomMetadataVales(setValue, initialModel);
  const acceptedFileTypes = [".stl", ".mtl", ".obj", ".zip", ".dae", ".fbx"];

  const addNewInfo = () => {
    setCustomMetadataKeys([
      ...customMetadataKeys,
      keyName.toLowerCase().trim().replace(" ", "-"),
    ]);
  };

  return (
    <form
      onSubmit={handleSubmit(onButtonClick)}
      className={tw`grid(& cols-1 lg:cols-2) gap-4 mt-8`}
    >
      <div>
        <p className={sectionStyle}>
          Choose the files that will be available to download
        </p>
        <Controller
          name="models"
          defaultValue={[]}
          control={control}
          render={({ field }) => (
            <FileInput
              {...field}
              server={modelsFileInputServerConfig(
                getValues,
                initialModel?.model?.slug,
                initialModel?.user?.username
              )}
              id="models"
              name="models"
              allowMultiple={true}
              allowFileTypeValidation={false}
              acceptedFileTypes={acceptedFileTypes}
              errors={errors.models}
              onprocessfile={(error, file) => {
                if (error === null) {
                  setValue("models", [
                    ...getValues("models"),
                    { id: file.serverId, name: file.filename },
                  ]);
                }
              }}
              onremovefile={(error, file) => {
                if (error === null) {
                  setValue(
                    "models",
                    getValues("models").filter(
                      (img) => img.id !== file.serverId
                    )
                  );
                }
              }}
            />
          )}
        />
        <p className={sectionStyle}>Existing files:</p>
        <ExistingFilesSection
          files={initialModel?.model?.files.map((file) => file.name)}
          slug={initialModel?.model?.slug}
          username={initialModel?.user?.username}
          type="models"
        />
        <p className={sectionStyle}>
          Add a GLTF file and its images to activate the 3D preview
        </p>
        <Controller
          name="gltf"
          defaultValue={[]}
          control={control}
          render={({ field }) => (
            <FileInput
              {...field}
              server={gltfFileInputServerConfig(
                getValues,
                initialModel?.model?.slug,
                initialModel?.user?.username
              )}
              id="gltf"
              name="gltf"
              allowMultiple={true}
              errors={errors.gltf}
              onprocessfile={(error, file) => {
                if (error === null) {
                  setValue("gltf", [
                    ...getValues("gltf"),
                    { id: file.serverId, name: file.filename },
                  ]);
                }
              }}
              onremovefile={(error, file) => {
                if (error === null) {
                  setValue(
                    "gltf",
                    getValues("gltf").filter((img) => img.id !== file.serverId)
                  );
                }
              }}
            />
          )}
        />
        <p className={sectionStyle}>
          Existing GLTF file:{" "}
          <span className={tw`text-sm`}>
            (deleting it will delete all the resources it's referencing)
          </span>
        </p>
        <ExistingFilesSection
          files={
            initialModel?.model?.gltf?.length ? [initialModel?.model?.gltf] : []
          }
          slug={initialModel?.model?.slug}
          username={initialModel?.user?.username}
          type="gltf"
        />
      </div>
      <div>
        <p className={sectionStyle}>Add some model related information</p>
        <p className={`${sectionStyle} text-sm`}>
          Total triangle count and total vertex count will be determined on the
          server.
        </p>
        {customMetadataKeys.map((key) => (
          <ModelInfoInput
            id={key}
            key={key}
            name={`metadata.${key}`}
            label={key.slice(0, 1).toUpperCase() + key.slice(1)}
            register={register}
            errors={errors}
          />
        ))}
        <div>
          <div className="flex items-center">
            <Input
              id="key"
              placeholder="Type the key name and press add"
              classNames={{ container: "flex-grow" }}
              onChange={({ target: { value } }) => {
                setKeyName(value);
              }}
            />
            <input
              type="button"
              value="Add"
              className="p-2 rounded shadow-md cursor-pointer"
              onClick={() => addNewInfo()}
            />
          </div>
        </div>
        <SubmitButton text={getButtonText()} />
      </div>
    </form>
  );
};

ModelForm3dFiles.propTypes = {
  sectionStyle: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
  getButtonText: PropTypes.func.isRequired,
};

export default ModelForm3dFiles;
