import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import quizService from "../../services/quizService";
import "./ResultScreen.css";

type Props = {
  show: boolean;
  quizId: number | undefined;
  onHide: any;
};

const ResultScreen = (props: Props) => {
  const [results, setResults] = useState<any>();

  const getResult = async () => {
    if (props.quizId != undefined) {
      await quizService.getByQuizId(props.quizId).then((response) => {
        setResults(response);
      });
    }
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="">
          <div className="modal-content">
            <Modal.Body>
              <div className="quiz-screen">
                <div className="result-screen ">
                  <span className="result-title">Test Sonucu</span>
                  <div className="result-items col-15">
                    <span className="d-flex flex-column col-md-2 h-50">
                      {results?.correctAnswerCount}
                      <a> Doğru</a>
                    </span>
                    <span className="d-flex flex-column col-md-2">
                      {results?.wrongAnswerCount}
                      <a>Yanlış</a>
                    </span>
                    <span className="d-flex flex-column col-md-2">
                      {results?.emptyAnswerCount}
                      <a>Boş</a>
                    </span>
                    <span className="d-flex flex-column col-md-2">
                      {results?.point} <a>Puan</a>
                    </span>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ResultScreen;