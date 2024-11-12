import React from "react"
import { cn } from "@/utils/helper"
import Lottie from "react-lottie"
import * as animationData from "@/assets/lottie/loading.json"

interface IProps {
  classname?: string
}

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}

const LoadingUi: React.FC<IProps> = ({ classname }) => {
  return (
    <div
      className={cn(
        "bg-blue-500/50 w-full h-full absolute top-0 left-0 z-10 flex justify-center items-center",
        classname,
      )}
    >
      <Lottie options={defaultOptions} height={150} width={150} />
    </div>
  )
}

export default LoadingUi
