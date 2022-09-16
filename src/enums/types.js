import normal from "../assets/capa-normal.png";
import planta from "../assets/capa-planta.png";
import fogo from "../assets/capa-fogo.png";
import agua from "../assets/capa-agua.png";
import eletrico from "../assets/capa-eletrico.png";
import voador from "../assets/capa-voador.png";
import gelo from "../assets/capa-gelo.png";
import pedra from "../assets/capa-pedra.png";
import terra from "../assets/capa-terrestre.png";
import aco from "../assets/capa-aço.png";
import lutador from "../assets/capa-lutador.png";
import sombrio from "../assets/capa-sombrio.png";
import psy from "../assets/capa-psy.png";
import venom from "../assets/capa-venenoso.png";
import inseto from "../assets/capa-inseto.png";
import fada from "../assets/capa-fada.png";
import ghost from "../assets/capa-fantasma.png";
import dragon from "../assets/capa-dragon.png";

const types = [
  { type: "fire", color: "#FFA351", background: fogo },
  { type: "water", color: "#5499D8", background: agua },
  { type: "grass", color: "#5EBC5F", background: planta },
  { type: "electric", color: "#F4D543", background: eletrico },
  { type: "fighting", color: "#D14166", background: lutador },
  { type: "ice", color: "#78D0C3", background: gelo },
  { type: "psychic", color: "#F87278", background: psy },
  { type: "poison", color: "#A866C8", background: venom },
  { type: "normal", color: "#949BA1", background: normal },
  { type: "dragon", color: "#096AC1", background: dragon },
  { type: "rock", color: "#C8B88B", background: pedra },
  { type: "bug", color: "#93C22E", background: inseto },
  { type: "fairy", color: "#A82101", background: fada },
  { type: "ghost", color: "#586AB2", background: ghost },
  { type: "flying", color: "#94AEE1", background: voador },
  { type: "ground", color: "#D87B4A", background: terra },
  { type: "steel", color: "#D87B4A", background: aco },
  { type: "dark", color: "#5C5769", background: sombrio },
];

export default types;
