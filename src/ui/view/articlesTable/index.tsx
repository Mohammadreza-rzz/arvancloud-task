"use client"
import React, { useState } from "react"
import { Button, TableActions, ModalsLayout } from "@/ui/components"
import { dropDownActivator } from "@/types"
import { useForm, useFieldArray } from "react-hook-form"
import { XIcon } from "@/ui/components/icons"
import { DeleteArticlesModal } from "@/ui/view"
interface IProps {}

const data = [
  {
    id: 1,
    title: "Article title",
    author: "@author_username",
    tags: "list of tags",
    excerpt: "First 20 words of article body",
    created: "June 11, 2019",
  },
  {
    id: 2,
    title: "Article title",
    author: "@author_username",
    tags: "list of tags",
    excerpt: "First 20 words of article body",
    created: "June 11, 2019",
  },
  {
    id: 13,
    title: "Article title",
    author: "@author_username",
    tags: "list of tags",
    excerpt: "First 20 words of article body",
    created: "June 11, 2019",
  },
  {
    id: 41,
    title: "Article title",
    author: "@author_username",
    tags: "list of tags",
    excerpt: "First 20 words of article body",
    created: "June 11, 2019",
  },
  {
    id: 15,
    title: "Article title",
    author: "@author_username",
    tags: "list of tags",
    excerpt: "First 20 words of article body",
    created: "June 11, 2019",
  },
  {
    id: 16,
    title: "Article title",
    author: "@author_username",
    tags: "list of tags",
    excerpt: "First 20 words of article body",
    created: "June 11, 2019",
  },
  {
    id: 17,
    title: "Article title",
    author: "@author_username",
    tags: "list of tags",
    excerpt: "First 20 words of article body",
    created: "June 11, 2019",
  },
  {
    id: 18,
    title: "Article title",
    author: "@author_username",
    tags: "list of tags",
    excerpt: "First 20 words of article body",
    created: "June 11, 2019",
  },
  {
    id: 19,
    title: "Article title",
    author: "@author_username",
    tags: "list of tags",
    excerpt: "First 20 words of article body",
    created: "June 11, 2019",
  },
  {
    id: 12,
    title: "Article title",
    author: "@author_username",
    tags: "list of tags",
    excerpt: "First 20 words of article body",
    created: "June 11, 2019",
  },
  // Add more articles here
]

const Articlestable: React.FC<IProps> = () => {
  //states & Logic
  const [deleteModalIsActive, setDeleteModalIsActive] = useState<boolean>(false)
  const [dropdownsIsActive, setDropdownsIsActive] = useState<
    dropDownActivator[]
  >(
    data.map(item => {
      return { id: item.id, isActive: false }
    }),
  )

  // handlers

  const ActionButtonHandler = (id: string | number) => {
    setDropdownsIsActive(preData =>
      preData?.map(item =>
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
      <table className='min-w-full bg-white border border-gray-200 border-none'>
        <thead className='bg-light-50'>
          <tr className='text-left border-b border-gray-200'>
            <th className='text-light-400 text-sub_heading_lg px-4 py-2.5'>
              #
            </th>
            <th className='text-light-400 text-sub_heading_lg px-4 py-2.5'>
              Title
            </th>
            <th className='text-light-400 text-sub_heading_lg px-4 py-2.5'>
              Author
            </th>
            <th className='text-light-400 text-sub_heading_lg px-4 py-2.5'>
              Tags
            </th>
            <th className='text-light-400 text-sub_heading_lg px-4 py-2.5'>
              Excerpt
            </th>
            <th className='text-light-400 text-sub_heading_lg px-4 py-2.5'>
              Created
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className='border-b border-gray-200 hover:bg-gray-200'
            >
              <td className='px-4 py-5 text-light-500 text-paragraph_md'>
                {index + 1}
              </td>
              <td className='px-4 py-5 text-light-500 text-paragraph_md'>
                {item.title}
              </td>
              <td className='px-4 py-5 text-light-500 text-paragraph_md'>
                {item.author}
              </td>
              <td className='px-4 py-5 text-light-500 text-paragraph_md'>
                {item.tags}
              </td>
              <td className='px-4 py-5 text-light-500 text-paragraph_md'>
                {item.excerpt}
              </td>
              <td className='px-4 py-5 flex justify-between items-center'>
                <p className='text-light-500 text-paragraph_md'>
                  {item.created}
                </p>

                <TableActions
                  clickhandler={ActionButtonHandler.bind(this, item?.id)}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!!deleteModalIsActive && (
        <ModalsLayout>
          <div className='fixed h-screen w-screen bg-black/50 left-0 top-0 flex items-center justify-center z-40 '>
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
