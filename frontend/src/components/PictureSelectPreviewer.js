import { useContext } from "react";
import { getFormatedFileSize } from "../utilities/image_process_utilities";
import { Button, Col } from "reactstrap";
import ButtonableIconOpacityColored from "./ButtonableIconOpacityColored";
import Icon from "./Icon";
import {useGlobalContext} from '../data/applicationContext';
import { CreateAppContext } from "../data/applicationContext";

const PictureSelectPreviewer = ({ fileObject, onDelete, onEdit }) => {
  const { handleFieldChange } = useContext(CreateAppContext);

  const ImgOrIcon = "image/png, image/jpeg, image/jpg".includes(
    fileObject.type
  ) ? (
    <img
      className="d-block w-100"
      alt=""
      src={fileObject.url}
      style={{ objectFit: "contain" }}
    />
  ) : (
    <Icon iconName="file-image-o text-blue" faSize="2x" />
  );

  /**
   * 
   * 
   * 
   * 
   */
    const {username, setUsername, isUsernameEntered, setIsUsernameEntered} = useGlobalContext();
    const handleSubmit = (e)=>{
      e.preventDefault();
      setIsUsernameEntered(true);
    }
  /**
   * 
   * 
   */
  return (
    <Col className="p-3">
      <div className="d-flex justify-content-center align-items-stretch">
        {onEdit?.action && (
          <ButtonableIconOpacityColored
            isButton={true}
            bs_theme_color="primary"
            iconName={onEdit.iconName || "pencil-square-o"}
            className={onDelete?.action && "me-2"}
            onClick={onEdit.action}
          />
        )}
        {onDelete?.action && (
          <ButtonableIconOpacityColored
            isButton={true}
            bs_theme_color="danger"
            iconName={onDelete.iconName || "trash-o"}
            onClick={onDelete.action}
          />
        )}
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center py-2">
        <div
          className="d-flex align-items-center my-4 border"
          style={{ maxWidth: "25%" }}
        >
          {ImgOrIcon}
        </div>

        <div className="text-secondary text-break text-truncate fs-7 overflow-hidden px-2">
          {fileObject.name.replace(/^(.*)\.[^.]*$/i, "$1")} -
          {` ${fileObject.name
            .replace(/^.*\.([^.]*)$/i, "$1")
            .toUpperCase()} - ${getFormatedFileSize(fileObject.size)}`}
        </div>

        <div className="select-name">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="İsminizi giriniz..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isUsernameEntered}
            />
            <button className="" type="submit" disabled={isUsernameEntered}>
              Onay
            </button>
          </form>
        </div>
        <Button
          size="sm"
          className="my-4 mix-start-btn"
          onClick={() => handleFieldChange("current_screen", "GameScreen")}
          disabled={!isUsernameEntered}
        >
          <span className="p-1">Karıştır ve Başlat</span>
        </Button>
      </div>
    </Col>
  );
};

export default PictureSelectPreviewer;
