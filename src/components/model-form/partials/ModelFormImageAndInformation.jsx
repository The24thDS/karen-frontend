import PropTypes from "prop-types";
import React, { useState } from "react";
import { tw } from "twind";
import { Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import FileInput from "components/form/inputs/FileInput";
import Input from "components/form/inputs/Input";
import Textarea from "components/form/textarea/Textarea";
import Error from "components/error/Error";
import SubmitButton from "components/form/inputs/SubmitButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useInitialModelInfo, useTagsOptions } from "../custom-hooks";
import {
  ModelEditFormSchemaStep1,
  ModelFormSchemaStep1,
} from "../validation.schema";
import { imagesFileInputServerConfig } from "../file-inputs-server-configs";
import ExistingFilesSection from "components/model-form/partials/ExistingFilesSection";

const ModelFormImageAndInformation = ({
  initialModel,
  sectionStyle,
  onButtonClick,
}) => {
  const { register, handleSubmit, control, errors, setValue, getValues } =
    useForm({
      resolver: yupResolver(
        initialModel?.model?.images
          ? ModelEditFormSchemaStep1
          : ModelFormSchemaStep1
      ),
    });
  const tagsOptions = useTagsOptions();
  useInitialModelInfo(setValue, initialModel);

  return (
    <form
      onSubmit={handleSubmit(onButtonClick)}
      className={tw`grid(& cols-1 lg:cols-2) gap-4 mt-8`}
    >
      <div>
        <p className={sectionStyle}>
          Choose images that will be displayed on your model's page
        </p>
        <Controller
          name="images"
          defaultValue={[]}
          control={control}
          render={({ field }) => (
            <FileInput
              {...field}
              server={imagesFileInputServerConfig(getValues)}
              id="images"
              name="images"
              allowMultiple={true}
              acceptedFileTypes={["image/*"]}
              errors={errors.images}
              onprocessfile={(error, file) => {
                if (error === null) {
                  setValue("images", [
                    ...getValues("images"),
                    { id: file.serverId, name: file.filename },
                  ]);
                }
              }}
              onremovefile={(error, file) => {
                if (error === null) {
                  setValue(
                    "images",
                    getValues("images").filter(
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
          files={initialModel?.model?.images}
          slug={initialModel?.model?.slug}
          username={initialModel?.user?.username}
          type="images"
        />
      </div>
      <div>
        <p className={sectionStyle}>Add some information about your model</p>
        <Input
          id="model-title"
          name="name"
          label="Name"
          register={register}
          errors={errors.name}
        />
        <Textarea
          id="description"
          name="description"
          label="Description"
          rows={5}
          register={register}
          classNames={{
            textarea: "text-sm",
          }}
          errors={errors.description}
        />

        <label>Tags</label>
        <Controller
          options={tagsOptions}
          isMulti
          name="tags"
          control={control}
          as={CreatableSelect}
          defaultValue={[]}
        />
        {errors.tags && <Error message={errors.tags.message} />}
        <SubmitButton text="Next" />
      </div>
    </form>
  );
};

ModelFormImageAndInformation.propTypes = {
  sectionStyle: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
};

export default ModelFormImageAndInformation;
