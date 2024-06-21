import { notifyError } from "../../drawables/containers/errorCont";

export function checkAcess(value) {
    if (value === !true) 
     {
      notifyError('You have No Access')
    }
  }
  