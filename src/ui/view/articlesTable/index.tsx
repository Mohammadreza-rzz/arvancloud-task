"use client"
import React, { useState } from "react"
import { TableActions } from "@/ui/components"
import { dropDownActivator } from "@/types"
import { useForm, useFieldArray } from "react-hook-form"
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
                        console.log("click on delete")
                      },
                    },
                  ]}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Articlestable
