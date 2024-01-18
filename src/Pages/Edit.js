import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [originData, setOriginData] = useState();
  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    if (diaryList.length > 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [diaryList, id]);
  return (
    <div>
      <div>
        {originData && <DiaryEditor isEdit={true} originData={originData} />}
      </div>
    </div>
  );
};

export default Edit;
