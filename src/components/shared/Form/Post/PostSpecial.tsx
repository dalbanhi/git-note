import DynamicChecklist from "./DynamicChecklist";
import CodeEditor from "./CodeEditor/CodeEditor";

interface PostSpecialProps {
  type: string | null;
  control: any;
  register: any;
  setSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostSpecial: React.FC<PostSpecialProps> = ({
  type,
  control,
  register,
  setSubmitButtonDisabled,
}) => {
  switch (type) {
    case "component":
      return (
        <CodeEditor
          control={control}
          setSubmitButtonDisabled={setSubmitButtonDisabled}
        />
      );
    case "workflow":
      return (
        <DynamicChecklist
          register={register}
          control={control}
          fieldStringLabel="Steps to follow"
          fieldArrayName="stepsToFollow"
          placeholderText="Enter a step to follow"
        />
      );
    case "knowledge":
      return (
        <DynamicChecklist
          register={register}
          control={control}
          fieldStringLabel="What you learned"
          fieldArrayName="whatYouLearned"
          placeholderText="Enter what you learned"
        />
      );
    default:
      return null;
  }
};

export default PostSpecial;
