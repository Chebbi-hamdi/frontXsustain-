// config.js todo
import RecImg from "../../../../assets/images/TaskManager/status/card/recimg.png";
import LongImg from "../../../../assets/images/TaskManager/status/card/longImg.jpg";
import CarrImg from "../../../../assets/images/TaskManager/status/card/carrimg.png";
import p1 from '../../../../assets/images/TaskManager/status/teammates/p1.svg';
import p2 from '../../../../assets/images/TaskManager/status/teammates/p2.svg';

const teammateImages = [p1, p2];

export const table = [
  {
    id: 1,
    teammateImages: teammateImages,
    nbrComment: "12",
    nbrFiles: "2",
    Title:'facebook Ads1',
    txtDescription: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus ducimus aperiam doloremque, distinctio ad et quibusdam! Recusandae quae autem ut in nobis ea temporibus animi consequatur ex, illum doloremque vero."
  },
  {
    id: 2,
    teammateImages: teammateImages,
    nbrComment: "12",
    Title:'facebook Ads2',

    nbrFiles: "2",
    ImageTask: CarrImg
  },
  {
    id: 3,
    teammateImages: teammateImages,
    nbrComment: "12",
    Title:'facebook Ads3',

    nbrFiles: "2",
    ImageTask: RecImg
  },
  {
    id: 4,
    teammateImages: teammateImages,
    nbrComment: "12",
    Title:'facebook Ads4',

    nbrFiles: "2",
    ImageTask: LongImg
  }
];
