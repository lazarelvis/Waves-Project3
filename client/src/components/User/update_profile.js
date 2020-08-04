import React from "react";
import UserLayout from "../../hoc/user";
import UpdatePersonalNfo from "./update_personal_nfo";

const UpdateProfile = () => {
  return (
    <UserLayout>
      <div>
        <h1>Profile</h1>
        <UpdatePersonalNfo />
      </div>
    </UserLayout>
  );
};

export default UpdateProfile;
