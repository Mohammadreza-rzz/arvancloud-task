"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import React, { useEffect, useState, useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import Select from "react-select"
import { toast } from "react-toastify"

import type { addArticleFormValues, Article, Option } from "@/types"
import { Button, CustomToast, TextInput } from "@/ui/components"
import LoadingUi from "@/ui/components/loadingUi"
import { addNewArticleAction, editArticleAction } from "@/utils/actions"
import { articleDetailsFormSchema } from "@/utils/validations/FormSchema"

interface IProps {
  initialTag: string[]
  initailData?: Article
  isEdit?: boolean
}

const handleToast = (
  statusCode: number,
  message: string = "Something went wrong, please try again later!",
) => {
  if (statusCode === 409 || statusCode === 422 || statusCode === 400) {
    return toast(
      <CustomToast
        toastId='addArticle-faild'
        containerClass=''
        header='Add Article Failed!'
        description={`${message}`}
      />,
      {
        style: {
          backgroundColor: "#e7cecd",
          color: "#9f4f48",
          minHeight: "50px",
          minWidth: "auto",
        },
        isLoading: false,
        toastId: "addArticle-faild",
      },
    )
  }
  if (statusCode === 201) {
    return toast(
      <CustomToast
        toastId='addArticle-success'
        containerClass=''
        header='Well done'
        description={`${message}`}
      />,
      {
        style: {
          backgroundColor: "#E2EED8",
          color: "#517643",
          minHeight: "50px",
          minWidth: "auto",
        },
        isLoading: false,
        toastId: "addArticle-success",
      },
    )
  }
}

const Articledetails: React.FC<IProps> = ({
  initialTag,
  initailData,
  isEdit = false,
}) => {
  // states & Logic
  const router = useRouter()
  const [ispending, startTransition] = useTransition()
  const [tags, setTags] = useState<Option[]>(
    initialTag?.map((el: string) => {
      return { value: el, label: el }
    }),
  )
  const [isClient, setIsClient] = useState<boolean>(false)
  const { control, handleSubmit, getValues, setValue } =
    useForm<addArticleFormValues>({
      resolver: yupResolver<any>(articleDetailsFormSchema),
      defaultValues: {
        selectedOptions: [],
        addArticleBox: "",
        title: "",
        description: "",
        body: "",
      },
    })

  // handlers

  const addTagsHandler = () => {
    const { addArticleBox, selectedOptions } = getValues()
    if (addArticleBox.trim()) {
      if (
        !!selectedOptions &&
        !tags.flatMap(items => items.value).includes(addArticleBox)
      ) {
        setValue("selectedOptions", [...selectedOptions, addArticleBox])
        setTags(PreData => [
          ...PreData,
          { value: addArticleBox, label: addArticleBox },
        ])
      }
      setValue("addArticleBox", "")
    }
  }

  const onSubmit = (data: addArticleFormValues) => {
    startTransition(async () => {
      if (!isEdit) {
        const res = await addNewArticleAction(data)
        handleToast(
          res?.status ? res?.status : 400,
          res?.message ? res?.message : " ",
        )
        if (res?.status === 201) {
          router.push("/articles")
        }
      } else {
        const res = await editArticleAction(data, initailData?.slug ?? " ")
        handleToast(
          res?.status ? res?.status : 400,
          res?.message ? res?.message : " ",
        )
        if (res?.status === 200) {
          router.push("/articles")
        }
      }
    })
  }

  //   useEffects
  useEffect(() => {
    setIsClient(true)
    if (initailData) {
      setValue("title", initailData?.title ?? "")
      setValue("body", initailData?.body ?? "")
      setValue("description", initailData?.description ?? "")
      setValue(
        "selectedOptions",
        initailData?.tagList ? initailData?.tagList : [],
      )
    }
  }, [])

  return (
    <>
      <div className='mt-6  flex space-x-8'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex-1 '>
          <div className='flex flex-col space-y-6 '>
            <TextInput
              hasErrorMessage
              InputContainerStyle='!py-0'
              InputStyle='!p-2 text-paragraph_sm'
              label='Title'
              placeholder='Title'
              inputProps={{
                control,
                name: "title",
                disabled: false,
              }}
            />
            <TextInput
              hasErrorMessage
              InputContainerStyle='!py-0'
              InputStyle='!p-2 text-paragraph_sm'
              label='Description'
              placeholder='Description'
              inputProps={{
                control,
                name: "description",
                disabled: false,
              }}
            />
            <div className='flex items-end space-x-2 lg:hidden'>
              <TextInput
                hasErrorMessage
                containerStyle='w-full'
                InputContainerStyle='!py-0'
                InputStyle='!p-2 text-paragraph_sm'
                label='Add tags'
                placeholder='New Tag'
                inputProps={{
                  control,
                  name: "addArticleBox",
                  disabled: false,
                }}
              />
              <Button
                clickHandler={addTagsHandler}
                type='button'
                label='Add'
                classnames='bg-danger-100 text-white w-[75px] !py-[9px] rounded-[4px] hover:bg-danger-100/90 text-paragraph_sm'
              />
            </div>
            {/* fix hydration error , conflict with react select package   */}
            {isClient && (
              <div className='flex flex-col space-y-2.5 lg:hidden'>
                <label
                  htmlFor='selectedOptions'
                  className='text-paragraph_sm text-light-500'
                >
                  Tags
                </label>
                <Controller
                  name='selectedOptions'
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isMulti
                      options={tags}
                      className='basic-multi-select '
                      classNamePrefix='select'
                      placeholder='Select options...'
                      closeMenuOnSelect={false}
                      onChange={selectedOptions => {
                        field.onChange(
                          selectedOptions
                            ? selectedOptions.map(option => option.value)
                            : [],
                        )
                      }}
                      value={tags.filter(option =>
                        field.value.includes(option.value),
                      )}
                    />
                  )}
                />
              </div>
            )}

            <div className='flex flex-col space-y-2.5'>
              <label
                htmlFor='body'
                className='text-paragraph_sm text-light-500'
              >
                Body
              </label>
              <Controller
                name='body'
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id='body'
                    className='relative h-52 max-h-52 min-h-52 w-full resize-none rounded-[4px] border border-light-100 bg-white p-3 text-paragraph_sm text-light-400 outline-none placeholder:text-light-200 focus-visible:border-warning-100'
                  />
                )}
              />
            </div>
            <Button
              disabled={!!ispending}
              classnames='w-[100px] !py-2 text-paragraph_sm bg-primary-100 mt-7'
              type='submit'
              label='Submit'
            />
          </div>
        </form>
        {/* tags Box in DesktopView */}
        <div className='hidden  w-[252px] lg:block'>
          <div className='flex items-end space-x-2'>
            <TextInput
              hasErrorMessage
              containerStyle=''
              InputContainerStyle='!py-0'
              InputStyle='!p-2 text-paragraph_sm'
              label='tags'
              placeholder='New Tag'
              inputProps={{
                control,
                name: "addArticleBox",
                disabled: false,
              }}
            />
            <Button
              clickHandler={addTagsHandler}
              type='button'
              label='Add'
              classnames='bg-danger-100 text-white w-[75px] !py-[9px] rounded-[4px] hover:bg-danger-100/90 text-paragraph_sm'
            />
          </div>
          <div className='mt-4 h-[355px] space-y-4 overflow-auto rounded-[4px] border border-light-100 bg-white px-4 pb-7 pt-4'>
            {tags?.map(option => (
              <Controller
                key={option.value}
                name='selectedOptions'
                control={control}
                render={({ field }) => (
                  <label
                    htmlFor={`'checkbox-${option.value}}'`}
                    className='flex items-center space-x-2'
                  >
                    <input
                      id={`'checkbox-${option.value}}'`}
                      type='checkbox'
                      value={option.value}
                      checked={field.value.includes(option.value)}
                      onChange={() => {
                        const newValue = field.value.includes(option.value)
                          ? field.value.filter(
                              (val: string) => val !== option.value,
                            )
                          : [...field.value, option.value]
                        field.onChange(newValue)
                      }}
                    />
                    <span className='text-paragraph_sm text-light-400'>
                      {option.label}
                    </span>
                  </label>
                )}
              />
            ))}
          </div>
        </div>
      </div>
      {ispending && <LoadingUi />}
    </>
  )
}

export default Articledetails
