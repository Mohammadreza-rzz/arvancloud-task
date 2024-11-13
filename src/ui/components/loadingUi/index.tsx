import React from "react"
import Lottie from "react-lottie"

import * as animationData from "@/assets/lottie/loading.json"
import { cn } from "@/utils/helper"

interface IProps {
  classname?: string
}

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
}

const LoadingUi: React.FC<IProps> = ({ classname }) => {
  return (
    <div
      className={cn(
        "absolute left-0 top-0 z-50 flex size-full items-center justify-center bg-blue-500/50",
        classname
      )}
    >
      <Lottie options={defaultOptions} height={150} width={150} />
    </div>
  )
}

export default LoadingUi
