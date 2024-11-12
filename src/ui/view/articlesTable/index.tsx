"use client"

import React, { useState } from "react"

import type { Article, dropDownActivator } from "@/types"
import { ModalsLayout, TableActions } from "@/ui/components"
import DeleteArticlesModal from "@/ui/view/deleteArticlesModal"
import { useForm, useFieldArray } from "react-hook-form"
import { ArticleFormValue } from "@/types"
import { truncateText } from "@/utils/helper"
import { useParams } from "next/navigation"

interface IProps {
  initialArticles: Article[]
}

const Articlestable: React.FC<IProps> = ({ initialArticles }) => {
  // states & Logic
  const params = useParams()
  const { page } = params

  console.log([page], "pageNumber")

  const [deleteModalIsActive, setDeleteModalIsActive] = useState<boolean>(false)

  const { control, register } = useForm<ArticleFormValue>({
    defaultValues: {
      articles: initialArticles,
    },
  })
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "articles",
    },
  )

  const [dropdownsIsActive, setDropdownsIsActive] = useState<
    dropDownActivator[]
  >(
    fields.map(item => {
      return { id: item.id, isActive: false }
    }),
  )

  // console.log(fields, "fieslsllss")

  // handlers

  const ActionButtonHandler = (id: string | number) => {
    setDropdownsIsActive(preData =>
      preData?.map(item =>
        // eslint-disable-next-line no-nested-ternary
        id === item.id
          ? !item.isActive
            ? { ...item, isActive: true }
            : { ...item, isActive: false }
          : { ...item, isActive: false },
      ),
    )
  }

  const closeDeleteModal = () => {
    setDeleteModalIsActive(false)
  }

  //   useEffects
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full border border-none border-gray-200 bg-white'>
        <thead className='bg-light-50'>
          <tr className='border-b border-gray-200 text-left'>
            <th className='px-4 py-2.5 text-sub_heading_lg text-light-400'>
              #
            </th>
            <th className='px-4 py-2.5 text-sub_heading_lg text-light-400'>
              Title
            </th>
            <th className='px-4 py-2.5 text-sub_heading_lg text-light-400'>
              Author
            </th>
            <th className='px-4 py-2.5 text-sub_heading_lg text-light-400'>
              Tags
            </th>
            <th className='px-4 py-2.5 text-sub_heading_lg text-light-400'>
              Excerpt
            </th>
            <th className='px-4 py-2.5 text-sub_heading_lg text-light-400'>
              Created
            </th>
          </tr>
        </thead>
        <tbody>
          {fields.map((item, index) => (
            <tr
              key={item.id}
              className='border-b border-gray-200 hover:bg-gray-200'
            >
              <td className='px-4 py-5 text-paragraph_md text-light-500'>
                {!!page ? (+page - 1) * 10 + index + 1 : index + 1}
              </td>
              <td className='px-4 py-5 text-paragraph_md text-light-500'>
                {item.title}
              </td>
              <td className='px-4 py-5 text-paragraph_md text-light-500'>
                {item.author}
              </td>
              <td className='px-4 py-5 text-paragraph_md text-light-500'>
                {item?.tagList?.map((tag, index) => (
                  <p key={index}>
                    {tag}
                    <br />
                  </p>
                ))}
              </td>
              <td className='px-4 py-5 text-paragraph_md text-light-500'>
                {truncateText(item?.body!, 20)}
              </td>
              <td className='items-center justify-between px-4 py-5'>
                <div className='inline-flex justify-between '>
                  <p className='text-paragraph_md text-light-500'>
                    {item?.createdAt}
                  </p>
                  <TableActions
                    clickhandler={() => ActionButtonHandler(item?.id)}
                    isActive={
                      dropdownsIsActive?.filter(
                        activeListItem => activeListItem.id === item.id,
                      )[0].isActive
                    }
                    actionList={[
                      {
                        title: "Edit",
                        clickHandler: () => {
                          console.log("click on Edit")
                        },
                      },
                      {
                        title: "Delete",
                        clickHandler: () => {
                          setDeleteModalIsActive(true)
                        },
                      },
                    ]}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!!deleteModalIsActive && (
        <ModalsLayout>
          <div className='fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-black/50 '>
            <DeleteArticlesModal
              NoButtonHandler={closeDeleteModal}
              closeButtonHandler={closeDeleteModal}
              yesButtonHandler={() => {
                console.log("yes delete items")
              }}
            />
          </div>
        </ModalsLayout>
      )}
    </div>
  )
}

export default Articlestable
