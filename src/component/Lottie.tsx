import { useLottie } from "lottie-react";
import animation_lky5rz5i from "../assets/animation_lky5rz5i.json";

const Lottie = () => {
  const options = {
    animationData: animation_lky5rz5i,
    loop: true,
  };
  const style = {
    height: 80,
  };
  const { View } = useLottie(options, style);
  return <>{View}</>;
};

export default Lottie;
