"use client";
import React from "react";
import Autocomplete from "react-google-autocomplete";

import { useForm, Controller } from "react-hook-form";

const EditProfile = () => {
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <button type="submit">Submit</button>
      </form>
      <Controller
        name="location"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            apiKey={process.env.NEXT_PUBLIC_GMAPS}
            onPlaceSelected={(place) => {
              console.log(place);
              onChange(place.formatted_address);
            }}
          />
        )}
      ></Controller>
    </React.Fragment>
  );
};

export default EditProfile;
