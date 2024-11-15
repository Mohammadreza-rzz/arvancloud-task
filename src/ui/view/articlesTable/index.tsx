"use client"

import { useParams, useRouter } from "next/navigation"
import React, { useState, useTransition } from "react"
import { useFieldArray, useForm } from "react-hook-form"

import type { Article, ArticleFormValue, dropDownActivator } from "@/types"
import { ModalsLayout, TableActions } from "@/ui/components"
import LoadingUi from "@/ui/components/loadingUi"
import DeleteArticlesModal from "@/ui/view/deleteArticlesModal"
import { deleteArticles } from "@/utils/api/ClinetSideRequest"
import { toastHandler, truncateText } from "@/utils/helper"

interface IProps {
  initialArticles: Article[]
}

const Articlestable: React.FC<IProps> = ({ initialArticles }) => {
  // states & Logic
  const params = useParams()
  const router = useRouter()
  const { page } = params
  const [ispending, startTransition] = useTransition()
  const [deleteModalIsActive, setDeleteModalIsActive] = useState<boolean>(false)
  const [activeArticle, setActiveArticle] = useState<Article>()
  const { control } = useForm<ArticleFormValue>({
    defaultValues: {
      articles: initialArticles,
    },
  })
  const { fields } = useFieldArray({
    control,
    name: "articles",
  })

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
    setActiveArticle(fields.filter(el => el.id === id)[0])
  }

  const closeDeleteModal = () => {
    setDeleteModalIsActive(false)
  }

  const deleteAction = async () => {
    // console.log(slug, "slugg")
    startTransition(async () => {
      const res = await deleteArticles(
        activeArticle?.slug ? activeArticle?.slug : " ",
      )
      if (res.status) {
        if (res?.status >= 200 && res?.status < 400) {
          toastHandler(
            200,
            "Well done",
            res?.message ? res?.message : " ",
            "delete-success",
          )
          router.push("/articles")
        } else {
          toastHandler(
            400,
            "Delete Article Failed!",
            res?.message ? res?.message : " ",
            "deleteArticle-faild",
          )
        }
        closeDeleteModal()
        if (res?.status === 200) {
          if (page) {
            router.push(
              `/articles/page/${page}?refreshId=${new Date().getTime()}`,
            )
          } else {
            router.push(`/articles/page/1?refreshId=${new Date().getTime()}`)
          }
        }
      }
    })
  }

  //   useEffects
  return (
    <>
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
                  {page ? (+page - 1) * 10 + index + 1 : index + 1}
                </td>
                <td className='px-4 py-5 text-paragraph_md text-light-500'>
                  {item.title}
                </td>
                <td className='px-4 py-5 text-paragraph_md text-light-500'>
                  {item.author}
                </td>
                <td className='px-4 py-5 text-paragraph_md text-light-500'>
                  {item?.tagList?.map(tag => (
                    <p key={Math.random()}>
                      {tag}
                      <br />
                    </p>
                  ))}
                </td>
                <td className='px-4 py-5 text-paragraph_md text-light-500'>
                  {item?.body ? truncateText(item?.body, 20) : ""}
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
                            router.push(`/articles/edit/${item?.slug}`)
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
                yesButtonHandler={deleteAction}
              />
            </div>
          </ModalsLayout>
        )}
      </div>
      {ispending && <LoadingUi />}
    </>
  )
}

export default Articlestable
