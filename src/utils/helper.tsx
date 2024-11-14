import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { toast } from "react-toastify"
import { twMerge } from "tailwind-merge"

// eslint-disable-next-line import/no-cycle
import { CustomToast } from "@/ui/components"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const formatDateToLongString = (dateStr: string) => {
  const date = new Date(dateStr)
  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid date string")
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const truncateText = (text: string, limit: number): string => {
  if (text.length <= limit) {
    return text
  }

  return `${text.slice(0, limit)} ...`
}

export const toastHandler = (
  code: number,
  title: string,
  description: string,
  toastId: string
) => {
  if (code >= 200 && code < 400) {
    return toast(
      <CustomToast
        toastId={toastId}
        containerClass=''
        header={title ?? " "}
        description={description ?? " "}
      />,
      {
        style: {
          backgroundColor: "#E2EED8",
          color: "#517643",
          minHeight: "50px",
          minWidth: "auto",
        },
        isLoading: false,
        toastId: toastId ?? " ",
      }
    )
  }
  return toast(
    <CustomToast
      toastId={toastId}
      containerClass=''
      header={title ?? " "}
      description={description ?? " "}
    />,
    {
      style: {
        backgroundColor: "#e7cecd",
        color: "#9f4f48",
        minHeight: "50px",
        minWidth: "auto",
      },
      isLoading: false,
      toastId: toastId ?? " ",
    }
  )
}
