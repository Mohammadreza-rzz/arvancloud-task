"use client"

import React, { useState } from "react"

import type { dropDownActivator } from "@/types"
import { ModalsLayout, TableActions } from "@/ui/components"
import DeleteArticlesModal from "@/ui/view/deleteArticlesModal"

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
  // states & Logic
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
        // eslint-disable-next-line no-nested-ternary
        id === item.id
          ? !item.isActive
            ? { ...item, isActive: true }
            : { ...item, isActive: false }
          : { ...item, isActive: false }
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
          {data.map((item, index) => (
            <tr
              key={item.id}
              className='border-b border-gray-200 hover:bg-gray-200'
            >
              <td className='px-4 py-5 text-paragraph_md text-light-500'>
                {index + 1}
              </td>
              <td className='px-4 py-5 text-paragraph_md text-light-500'>
                {item.title}
              </td>
              <td className='px-4 py-5 text-paragraph_md text-light-500'>
                {item.author}
              </td>
              <td className='px-4 py-5 text-paragraph_md text-light-500'>
                {item.tags}
              </td>
              <td className='px-4 py-5 text-paragraph_md text-light-500'>
                {item.excerpt}
              </td>
              <td className='flex items-center justify-between px-4 py-5'>
                <p className='text-paragraph_md text-light-500'>
                  {item.created}
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
