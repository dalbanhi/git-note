import { Note } from "~/types";
import React from "react";
import { Session } from "next-auth";

interface UpdatePostFormProps {
  session: Session | null;
  noteFromServer: Note;
}

const UpdatePostForm: React.FC<UpdatePostFormProps> = ({
  session,
  noteFromServer,
}) => {
  return (
    <div>
      <p>
        {`"session" :`} {JSON.stringify(session)}
      </p>
      <p>
        {`"post" :`} {JSON.stringify(noteFromServer)}
      </p>
    </div>
  );
};

export default UpdatePostForm;
