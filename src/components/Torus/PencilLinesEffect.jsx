import { Effect } from "postprocessing";
// import pencilLineFragmentShader from "../../shaders/pencilLine/fragment.glsl";
import pencilEffectFragmentShader from "../../shaders/pencilEffect/fragment.glsl";
export default class PencilLinesEffect extends Effect {
  constructor() {
    super("PencilLinesEffect", pencilEffectFragmentShader);
  }
}
